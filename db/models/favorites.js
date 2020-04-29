const client = require('../client');

const favorites = {
  show: async (id) => {
    return (
      await client.query('SELECT * from user_favorites where "userId" =$1', [
        id,
      ])
    ).rows;
  },
  create: async ({ userId, favoriteId }) => {
    const SQL = `INSERT INTO user_favorites("userId", "favoriteId") values($1, $2) returning *`;

    return (await client.query(SQL, [userId, favoriteId])).rows[0];
  },
  update: async ({ userId }, id) => {
    const SQL = `UPDATE `;
    // const findFavorites = async (userid) => {
    //   const SQL = `SELECT * from user_favorites WHERE userid = $1`;
    //   return (await client.query(SQL, [userid])).rows;
    // };

    // const createFavorite = async (userfavorite) => {
    //   const SQL = `INSERT INTO user_favorites("userId", "favoriteId")
    //         values($1, $2) returning *`;
    //   return (
    //     await client.query(SQL, [userfavorite.userId, userfavorite.favoriteId])
    //   ).rows[0];
    // };

    const updatedEvent = (await client.query(SQL, [userId, id])).rows[0];
    return updatedEvent;
  },
  delete: async (id) => {
    return (
      await client.query(
        `DELETE FROM user_favorites WHERE "favoriteId"=$1 returning *`,
        [id]
      )
    ).rows[0];
  },
};

module.exports = favorites;
// const client = require('../client');

// const readFavorites = async () => {
//   return (await client.query('SELECT * from user_favorites')).rows;
// };

// const createFavorite = async (userfavorite) => {
//   const SQL = `INSERT INTO user_favorites("userId", "favoriteId")
//         values($1, $2) returning *`;
//   return (
//     await client.query(SQL, [userfavorite.userId, userfavorite.favoriteId])
//   ).rows[0];
// };

// const deleteFavorite = async (id) => {
//   return await client.query(
//     `DELETE FROM user_favorites WHERE id=$1 returning *`,
//     [id]
//   );
// };

// module.exports = {
//   readFavorites,
//   createFavorite,
//   deleteFavorite,
// };
// module.exports = {
//   readFavorites,
//   createFavorite,
//   deleteFavorite,
//   findFavorites,
// };
