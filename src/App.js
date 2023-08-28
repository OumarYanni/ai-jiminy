import React from 'react';
import PostList from './components/PostList.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div style={{height: "100%"}}>
      <Header />
      <PostList />
      <Footer />
    </div>
  );
}

export default App;
