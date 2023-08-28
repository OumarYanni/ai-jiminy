// Pour charger les variables d'environnement
require('dotenv').config();

// Importation des modules nécessaires
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

// URL du serveur à vérifier
const SERVER_URL = 'http://localhost:8080';

// Fonction pour vérifier le serveur
const checkServer = async () => {
    try {
        // Vérification de la route principale
        const response = await fetch(SERVER_URL);
        if (response.ok) {
            console.log("La route principale du serveur fonctionne correctement.");
        } else {
            console.error("Erreur lors de l'accès à la route principale du serveur.");
        }

        // Vérification de la route d'upload en envoyant un fichier test
        const formData = new FormData();
        formData.append('file', fs.createReadStream('https://th.bing.com/th/id/OIP.uoOvbNG2b8QP5bvCGLyQ_wHaKc?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'));

        const uploadResponse = await fetch(`${SERVER_URL}/upload`, { 
            method: 'POST',
            body: formData
        });

        if (uploadResponse.ok) {
            console.log("La route d'upload du serveur fonctionne correctement avec l'envoi de fichier.");
        } else {
            console.error("Erreur lors de l'accès à la route d'upload du serveur avec l'envoi de fichier.");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du serveur:", error.message);
    }
};

// Appel de la fonction pour vérifier le serveur
checkServer();
