// Importation des modules nécessaires 
import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config(); // Pour charger les variables d'environnement

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration de Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration de AWS S3 avec AWS SDK v3
const s3Client = new S3Client({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Configuration de multer pour le stockage des fichiers dans AWS S3
const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + path.extname(file.originalname))
  }
});

// Filtre pour définir les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf|mp4|mov/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Erreur : Type de fichier non valide !');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Initialisation de l'application Express
const app = express();

// Middleware pour logger les requêtes
app.use((req, _, next) => {
    console.log(`Requête reçue : ${req.method} ${req.path}`);
    next();
}); 


// Route pour télécharger un fichier
app.post('/upload', upload.single('file'), (req, res) => {
  // Stocker l'URL du fichier dans la base de données
  // ...
  res.send('Fichier téléchargé et stocké avec succès !');
});

// Fonction pour télécharger et stocker les médias de Supabase dans AWS S3
const updateMediaLinks = async () => {
  const { data, error } = await supabase.from('linkedin_data').select('*');
  if (error) throw error;

  for (const row of data) {
    const { CONTENT_URL, IMAGE_URL, POST_URL } = row;

    console.log(`Traitement de POST_URL: ${POST_URL}`);
    console.log(`CONTENT_URL: ${CONTENT_URL}`);
    console.log(`IMAGE_URL: ${IMAGE_URL}`);

    if (CONTENT_URL && CONTENT_URL !== 'None') {
      // Téléchargement et stockage de CONTENT_URL
      const contentResponse = await fetch(CONTENT_URL);
      if (contentResponse.ok) {
        const contentBuffer = await contentResponse.buffer();
        const contentKey = Date.now().toString() + path.extname(CONTENT_URL);
        await s3Client.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: contentKey,
          Body: contentBuffer,
          ACL: 'public-read'
        }));
        const newContentUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${contentKey}`;

        // Mise à jour du lien CONTENT_URL dans Supabase
        await supabase.from('linkedin_data').update({
          CONTENT_URL: newContentUrl
        }).eq('POST_URL', POST_URL);
      } else {
        console.error(`Erreur lors du téléchargement de CONTENT_URL pour POST_URL: ${POST_URL}`);
      }
    }

    if (IMAGE_URL && IMAGE_URL !== 'None') {
      // Téléchargement et stockage de IMAGE_URL
      const imageResponse = await fetch(IMAGE_URL);
      if (imageResponse.ok) {
        const imageBuffer = await imageResponse.buffer();
        const imageKey = Date.now().toString() + path.extname(IMAGE_URL);
        await s3Client.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
          Body: imageBuffer,
          ACL: 'public-read'
        }));
        const newImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;

        // Mise à jour du lien IMAGE_URL dans Supabase
        await supabase.from('linkedin_data').update({
          IMAGE_URL: newImageUrl
        }).eq('POST_URL', POST_URL);
      } else {
        console.error(`Erreur lors du téléchargement de IMAGE_URL pour POST_URL: ${POST_URL}`);
      }
    }
  }
};

// Appel de la fonction pour mettre à jour les liens
updateMediaLinks().catch(console.error);

// Utilisation des fichiers statiques du dossier 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Route par défaut pour servir l'application React
app.get('/*', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Démarrage du serveur
app.listen(process.env.PORT || 8080, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT || 8080}`);
});
