const client = require('../client');

const readFavorites = async () => {
  return (await client.query('SELECT * from user_favorites')).rows;
};

const findFavorites = async (userid) => {
  const SQL = `SELECT * from user_favorites WHERE userid = $1`;
  return (await client.query(SQL, [userid])).rows;
};

const createFavorite = async (userfavorite) => {
  const SQL = `INSERT INTO user_favorites("userId", "favoriteId")
        values($1, $2) returning *`;
  return (
    await client.query(SQL, [userfavorite.userId, userfavorite.favoriteId])
  ).rows[0];
};

const deleteFavorite = async (id) => {
  return await client.query(
    `DELETE FROM user_favorites WHERE id=$1 returning *`,
    [id]
  );
};

module.exports = {
  readFavorites,
  createFavorite,
  deleteFavorite,
  findFavorites,
};
