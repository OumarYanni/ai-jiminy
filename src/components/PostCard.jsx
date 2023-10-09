import React, { useState } from 'react';
import '../styles/PostCard.css';

function PostCard({ post }) {
  const [showFullText, setShowFullText] = useState(false);
  const maxTextLength = 210;
  const truncatedText = post.TEXT.length > maxTextLength 
    ? post.TEXT.substring(0, maxTextLength) + "..." 
    : post.TEXT;

  const handleCopy = () => {
    navigator.clipboard.writeText(post.TEXT);
  };

  const handleError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.innerText = `Erreur de chargement de l'image : ${e.type}`;
  };

  return (
    <div className='cards-container'>
      <div className='card'>
        <h3 className='card-title'>{post.TITLE}</h3>
        {post.IMAGE_URL && post.IMAGE_URL !== "none" ? (
          <div className='img-container'>
            <img 
                src={post.IMAGE_URL} 
                alt="" 
                onError={handleError} 
                className='card-img'
            />
            <div style={{display: 'none'}}>
                Erreur de chargement de l'image
            </div>
          </div>
        ) : (
          <div className='img-container'>
            {post.IMAGE_URL === "none" ? "Ce post ne contient pas d'image" : null}
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

export default PostCard;
