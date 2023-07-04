import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PostCard from './components/PostCard';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const handleSearch = searchText => {
    // Ici, vous pouvez appeler votre API pour obtenir les posts qui correspondent à searchText
    // Pour l'instant, nous allons simplement définir des posts factices
    setPosts([
      {
        title: 'Post 1',
        text: 'Contenu du post 1',
        likes: 10,
        authorName: 'Auteur 1',
        publishedDate: '2023-06-17',
        imageUrl: 'url_de_l_image_1',
        comments: 5,
        shares: 3,
        postUrl: 'url_du_post_1',
      },
      {
        title: 'Post 2',
        text: 'Contenu du post 2',
        likes: 20,
        authorName: 'Auteur 2',
        publishedDate: '2023-06-17',
        imageUrl: 'url_de_l_image_2',
        comments: 10,
        shares: 5,
        postUrl: 'url_du_post_2',
      },
      {
        title: 'Post 3',
        text: 'Contenu du post 1',
        likes: 10,
        authorName: 'Auteur 1',
        publishedDate: '2023-06-17',
        imageUrl: 'url_de_l_image_1',
        comments: 5,
        shares: 3,
        postUrl: 'url_du_post_1',
      },
      {
        title: 'Post 4',
        text: 'Contenu du post 2',
        likes: 20,
        authorName: 'Auteur 2',
        publishedDate: '2023-06-17',
        imageUrl: 'url_de_l_image_2',
        comments: 10,
        shares: 5,
        postUrl: 'url_du_post_2',
      },
      {
        title: 'Post 5',
        text: 'Contenu du post 1',
        likes: 10,
        authorName: 'Auteur 1',
        publishedDate: '2023-06-17',
        imageUrl: 'url_de_l_image_1',
        comments: 5,
        shares: 3,
        postUrl: 'url_du_post_1',
      },
      {
        title: 'Post 6',
        text: 'Contenu du post 2',
        likes: 20,
        authorName: 'Auteur 2',
        publishedDate: '2023-06-17',
        imageUrl: 'url_de_l_image_2',
        comments: 10,
        shares: 5,
        postUrl: 'url_du_post_2',
      },
    ]);
    
  };

  return (
    <div style={{height: "100%"}}>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <div className="cards-container"> 
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
