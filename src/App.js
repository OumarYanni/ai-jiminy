import React from 'react';
import SearchBar from './components/SearchBar.jsx';
import PostList, { searchPosts } from './components/PostList.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div style={{height: "100%"}}>
      <Header />
      <SearchBar onSearch={searchPosts} />
      <PostList />
      <Footer />
    </div>
  );
}

export default App;
