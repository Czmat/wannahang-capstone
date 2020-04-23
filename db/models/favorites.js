const client = require('../client');

const readFavorites = async () => {
  return (await client.query('SELECT * from user_favorites')).rows;
};

const createFavorite = async (user_favorite) => {
  const SQL = `INSERT INTO user_favorites("userId", "favoriteId")
        values($1, $2) returning *`;
  return (
    await client.query(SQL, [user_favorite.userId, user_favorite.favoriteId])
  ).rows[0];
};

const deleteFavorite = async (id) => {
  return await client.query(
    `DELETE FROM user_favorites WHERE id=$1 returning *`,
    [id]
  );
};

module.exports = { readFavorites, createFavorite, deleteFavorite };
