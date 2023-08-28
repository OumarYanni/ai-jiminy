import React from 'react';

function PostCard({ post }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(post.TEXT);
  };

  return (
    <div className='cards-container'>
      <div className='card'>
        <h3>{post.TITLE}</h3>
        {post.IMAGE_URL && <img src={post.IMAGE_URL} alt='' style={{width: '100%', borderRadius: '10px', objectFit: 'cover', height: 'auto'}} />}
        <p>Auteur : {post.AUTHOR_NAME}</p>
        <p>Date de publication : {post.PUBLISHED_DATE}</p>
        <p>
          <i className='material-icons'>thumb_up</i> {post.LIKES} 
          <i className='material-icons'>comment</i> {post.COMMENTS} 
          <i className='material-icons'>share</i> {post.SHARES}
        </p>
        <p>{post.TEXT}</p>
        <button onClick={handleCopy}>Copier le post</button>
        {post.POST_URL && <a href={post.POST_URL} target="_blank" rel="noopener noreferrer">Lien vers le contenu</a>}
      </div>
    </div>
  );
}

export default PostCard;