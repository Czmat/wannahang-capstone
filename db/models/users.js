const client = require('../client');
const { hash } = require('../auth');

const users = {
  read: async () => {
    return (await client.query('SELECT * from users')).rows;
  },
  create: async ({
    firstname,
    lastname,
    username,
    phone,
    // zipcode,
    email,
    password,
    // birthday,
    // gender,
    role,
  }) => {
    const SQL = `INSERT INTO users(
      firstname,
      lastname,
      username,
      phone,
      email,
      password,
      role) values($1, $2, $3, $4, $5, $6, $7 ) returning *`;

    return (
      await client.query(SQL, [
        firstname,
        lastname,
        username,
        // zipcode,
        phone,
        email,
        await hash(password),
        // birthday,
        // gender,
        role || 'USER',
      ])
    ).rows[0];
  },
  update: async (
    { firstname, lastname, username, phone, zipcode, email, birthday, gender },
    id
  ) => {
    const SQL = `UPDATE "users" set  firstname=$1, lastname=$2, username=$3, email=$4, phone=$5  WHERE id = $6 returning *`;

    const updatedUser = (
      await client.query(SQL, [
        firstname,
        lastname,
        username,
        // zipcode,
        email,
        phone,
        // birthday,
        // gender,
        id,
      ])
    ).rows[0];
    delete updatedUser.password;
    return updatedUser;
  },
  delete: async (id) => {
    await client.query(`DELETE FROM "users" WHERE id=$1 returning *`, [id]);
  },

  findUserId: async (username) => {
    const SQL = `SELECT id FROM users WHERE username = $1`;
    return (await client.query(SQL, [username])).rows[0];
  },
};

module.exports = users;
