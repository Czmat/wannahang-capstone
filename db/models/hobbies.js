const client = require('../client');

const readUserHobbies = async () => {
  return (
    await client.query(`SELECT * FROM user_hobbies
  JOIN hobbies ON user_hobbies.hobby_id = hobbies.id`)
  ).rows;
};

const getHobbies = async () => {
  return (await client.query('SELECT * from user_hobbies')).rows;
};

const findUserHobbies = async (userid) => {
  const SQL = `SELECT * from user_hobbies WHERE user_id = $1`;
  return (await client.query(SQL, [userid.user_id])).rows;
};

const createUserHobbies = async (user_hobbies) => {
  const SQL = `INSERT INTO user_hobbies(user_id, hobby_id)
        values($1, $2) returning *`;
  return (
    await client.query(SQL, [user_hobbies.user_id, user_hobbies.hobby_id])
  ).rows[0];
};

const findHobbyId = async (hobbyName) => {
  const SQL = `SELECT * FROM hobbies WHERE hobby_name = $1`;
  return (await client.query(SQL, [hobbyName])).rows[0];
};

const findHobbyName = async (hobbyid) => {
  const SQL = `SELECT hobby_name FROM hobbies WHERE id = $1`;
  return (await client.query(SQL, [hobbyid])).rows[0];
};
const showUserHobbies = async (id) => {
  return (
    await client.query(`select id from user_hobbies where user_id = $1`, [id])
  ).rows;
};

const deleteUserHobby = async (id) => {
  return await client.query(
    `DELETE FROM user_hobbies WHERE id=$1 returning *`,
    [id]
  );
};
const deleteHobbies = async (id) => {
  return await client.query(`DELETE FROM user_hobbies WHERE id=$1 `, [id]);
};
module.exports = {
  readUserHobbies,
  findUserHobbies,
  createUserHobbies,
  findHobbyId,
  findHobbyName,
  showUserHobbies,
  deleteUserHobby,
  deleteHobbies,
  getHobbies,
};
