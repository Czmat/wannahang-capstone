const client = require('../client');

const invites = {
  read: async (id) => {
    const SQL = `SELECT * FROM users, events, user_events WHERE "eventId" = events.id AND "userId" = users.id AND "joinedUserId" = $1`;
    return (await client.query(SQL, [id])).rows;
  },

  show: async (id) => {
    const SQL = `SELECT * FROM  users, events, user_events WHERE "userId" = $1 AND "eventId" =  events.id  AND "joinedUserId" = users.id`;
    return (await client.query(SQL, [id])).rows;
  },
};

module.exports = invites;
