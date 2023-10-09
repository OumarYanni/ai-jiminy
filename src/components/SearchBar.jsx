import React, { useState } from 'react';
import '../styles/SearchBar.css';


function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  // Cette fonction est appelée chaque fois que l'utilisateur change le texte de recherche
  const handleChange = event => {
    setSearchText(event.target.value);
  };

  // Cette fonction est appelée lorsque l'utilisateur soumet le formulaire de recherche
  // Elle appelle la fonction onSearch passée en tant que prop avec le texte de recherche de l'utilisateur
  const handleSubmit = event => {
    event.preventDefault();
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchText} onChange={handleChange} placeholder="Rechercher..." />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default SearchBar;
