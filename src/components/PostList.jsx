import { useEffect, useState } from 'react';
import PostCard from './PostCard.jsx';
import supabase from '../supabaseClient.js';
import '../styles/PostList.css';


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
  }

  return (
    <div className="container">
      {posts.map((post) => (
        <PostCard key={post.ACTIVITY_ID} post={post} />
      ))}
    </div>
  );
}

// Exportation de la fonction searchPosts
export async function searchPosts(searchText) {
  const { data, error } = await supabase
    .from('linkedin_data')
    .select('*')
    .filter('TITLE', 'ilike', `%${searchText}%`);

  if (error) console.error('Error searching posts', error);
  else return data;
}

export default PostList;
