const client = require('../client');

const invites = {
  read: async (id) => {
    const SQL = `SELECT * FROM users, events, user_events WHERE "eventId" = events.id AND "userId" = users.id AND "joinedUserId" = $1`;
    return (await client.query(SQL, [id])).rows;
  },
};

module.exports = invites;
