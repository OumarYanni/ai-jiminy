import { useEffect, useState } from 'react';
import PostCard from './PostCard.jsx';
import SearchBar from './SearchBar.jsx'; 
import supabase from '../supabaseClient.js';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Cette fonction est appelée lorsque le composant est monté
  // Elle récupère les posts de la base de données Supabase
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('linkedin_data')
      .select('*');

    if (error) console.error('Error loading posts', error);
    else setPosts(data);
    console.log(data);
  }

  // Cette fonction est appelée lorsque l'utilisateur soumet le formulaire de recherche
  // Elle recherche les posts dans la base de données Supabase en fonction du texte de recherche de l'utilisateur
  async function searchPosts(searchText) {
    const { data, error } = await supabase
      .from('linkedin_data')
      .select('*')
      .filter('TITLE', 'ilike', `%${searchText}%`);

    if (error) console.error('Error searching posts', error);
    else setPosts(data);
  }

  return (
    <div>
      <SearchBar onSearch={searchPosts} />
      {posts.map((post) => (
        <PostCard key={post.ACTIVITY_ID} post={post} />
      ))}
    </div>
  );
}

export default PostList;
