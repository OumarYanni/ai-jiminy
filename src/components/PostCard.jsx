// Importation des dépendances nécessaires
import React, { useState } from 'react';
import '../styles/PostCard.css';

// Définition du composant PostCard
function PostCard({ post }) {
  // État local pour gérer l'affichage du texte complet ou tronqué
  const [showFullText, setShowFullText] = useState(false);
  
  // Longueur maximale du texte avant troncature
  const maxTextLength = 210;
  
  // Texte tronqué si la longueur dépasse maxTextLength
  const truncatedText = post.TEXT.length > maxTextLength 
    ? post.TEXT.substring(0, maxTextLength) + "..." 
    : post.TEXT;

  // Fonction pour copier le texte du post dans le presse-papiers
  const handleCopy = () => {
    navigator.clipboard.writeText(post.TEXT);
  };

  // Fonction pour gérer les erreurs de chargement de média
  const handleError = (e) => {
    // Masquage de l'élément média
    e.target.style.display = 'none';
    
    // Affichage du message d'erreur
    e.target.nextSibling.style.display = 'block';
  };

  // Fonction pour déterminer le type de média et le rendre en conséquence
  const renderMedia = (url) => {
    // Utilisation de la méthode indexOf pour identifier la présence de certains éléments dans l'URL
    if (url.indexOf('image') !== -1 || url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return (
        <img 
            src={url} 
            alt="" 
            onError={handleError} 
            className='card-media card-img'
        />
      );
    } else if (url.indexOf('video') !== -1 || url.match(/\.(mp4|webm|ogg)$/)) {
      return (
        <video 
            src={url} 
            controls 
            muted
            onError={handleError} 
            className='card-media card-video'
        >
            Votre navigateur ne prend pas en charge la vidéo.
        </video>
      );
    } else if (url.match(/\.pdf$/)) {
      return (
        <object 
            data={url} 
            type="application/pdf" 
            onError={handleError} 
            className='card-media card-pdf'
        >
            <embed 
                src={url} 
                type="application/pdf"
                onError={handleError}
            />
        </object>
      );
    } else {
      return (
        <div className="unsupported-media">
          Type de média non pris en charge
        </div>
      );
    }
  };

  // Rendu du composant
  return (
    <div className='cards-container'>
      <div className='card'>
        <h3 className='card-title'>{post.TITLE}</h3>
        {post.IMAGE_URL && post.IMAGE_URL !== "None" ? (
          <div className='media-container'>
            {/* Appel de la fonction renderMedia avec post.IMAGE_URL comme argument */}
            {renderMedia(post.IMAGE_URL)}
            <div style={{display: 'none'}}>
                Erreur de chargement du média
            </div>
          </div>
        ) : (
          <div className='media-container'>
            {post.IMAGE_URL === "None" ? "Ce post ne contient pas de média" : null}
          </div>
        )}
        <p className='card-author'> <strong>Auteur :</strong> {post.AUTHOR_NAME}</p>
        <p className='card-published_date'><strong>Date de publication :</strong>  {post.PUBLISHED_DATE}</p>
        <p>
          <i className='material-icons'>thumb_up</i> <span>{post.LIKES}</span>  
          <i className='material-icons'>comment</i> <span>{post.COMMENTS}</span>  
          <i className='material-icons'>share</i> <span>{post.SHARES}</span> 
        </p>
        <p className='card-text'>
          {showFullText ? post.TEXT : truncatedText}
          {post.TEXT.length > maxTextLength && !showFullText && <button onClick={() => setShowFullText(true)}>voir plus...</button>}
        </p>
        <button className='card-button-copy_post' onClick={handleCopy}>Copier le post</button>
        {post.POST_URL && <a className='card-link-content_link' href={post.POST_URL} target="_blank" rel="noopener noreferrer">Lien vers le contenu</a>}
      </div>
    </div>
  );
}

// Exportation du composant PostCard
export default PostCard;
