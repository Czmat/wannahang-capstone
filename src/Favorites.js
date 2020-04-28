import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Favorites = ({ auth }) => {
  const [favorites, setFavorites] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios.get('/api/favorites').then((response) => setFavorites(response.data));
    axios.get('/api/profiles').then((response) => {
      const findProfile = response.data.find(
        ({ userId }) => userId === auth.id
      );
      setProfile(findProfile);
      setProfiles(response.data.filter((up) => up.userId !== auth.id));
    });
  }, []);
  console.log('f', favorites);
  console.log('p', profiles);

  if (!favorites) {
    return <h3>Loading</h3>;
  } else {
    return (
      <div>
        <h2>My Friends</h2>
        <ul>
          {favorites.map((favorite) => {
            return <li key={favorite.id}>{favorite.favoriteId}</li>;
          })}
        </ul>
      </div>
    );
  }
};
export default Favorites;
