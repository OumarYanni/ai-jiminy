import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  // Cette fonction est appelée chaque fois que l'utilisateur change le texte de recherche
  const handleChange = event => {
    setSearchText(event.target.value);
  };

  // Cette fonction est appelée lorsque l'utilisateur soumet le formulaire de recherche
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
