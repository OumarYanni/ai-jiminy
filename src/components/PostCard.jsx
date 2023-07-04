import React from 'react';

function PostCard({ post }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(post.text);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      marginBottom: '20px',
      display: 'inline-block',
      width: '100%',
      marginRight: '20px',
      marginLeft: '20px',
      boxSizing: 'border-box',
    }}>
      <h3>{post.title}</h3>
      {post.imageUrl && <img src={post.imageUrl} alt='' style={{width: '100%', borderRadius: '10px', objectFit: 'cover', height: 'auto'}} />}
      <p>Auteur : {post.authorName}</p>
      <p>Date de publication : {post.publishedDate}</p>
      <p>
        <i className='material-icons'>thumb_up</i> {post.likes} 
        <i className='material-icons'>comment</i> {post.comments} 
        <i className='material-icons'>share</i> {post.shares}
      </p>
      <p>{post.text}</p>
      <button onClick={handleCopy}>Copier le post</button>
      {post.postUrl && <a href={post.postUrl} target="_blank" rel="noopener noreferrer">Lien vers le contenu</a>}
    </div>
  );
}

export default PostCard;