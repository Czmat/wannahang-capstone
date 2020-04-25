const client = require('../client');

const readUserHobbies = async () => {
  return (await client.query('SELECT * from user_hobbies')).rows;
};

const createUserHobbies = async (user_hobbies) => {
  const SQL = `INSERT INTO user_hobbies(user_id, hobby_id)
        values($1, $2) returning *`;
  return (await client.query(SQL, [user_hobbies.userId, user_hobbies.hobbyId]))
    .rows[0];
};

const findHobbyId = async (hobbyName) => {
  const SQL = `SELECT * FROM hobbies WHERE hobby_name = $1`;
  return (await client.query(SQL, [hobbyName])).rows[0];
};

const findHobbyName = async (hobbyid) => {
  const SQL = `SELECT hobby_name FROM hobbies WHERE id = $1`;
  return (await client.query(SQL, [hobbyid])).rows[0];
};
module.exports = {
  readUserHobbies,
  createUserHobbies,
  findHobbyId,
  findHobbyName,
};
