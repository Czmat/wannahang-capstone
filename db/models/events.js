const client = require('../client');

const events = {
  show: async (id) => {
    return (
      await client.query(
        `select events.id , events.name from events where "userId" = $1`,
        [id]
      )
    ).rows;
  },
  read: async () => {
    return (await client.query('SELECT * from events ORDER BY date')).rows;
  },
  create: async ({
    name,
    date,
    location,
    description,
    isPublic,
    isAccepted,
    userId,
  }) => {
    const SQL = `INSERT INTO events(
      name,
      date,
      location,
      description,
      "isPublic",
      "isAccepted",
      "userId"
      ) values($1, $2, $3, $4, $5, $6, $7 ) returning *`;

    return (
      await client.query(SQL, [
        name,
        date,
        location,
        description,
        isPublic,
        isAccepted,
        userId,
      ])
    ).rows[0];
  },
  update: async (
    { name, date, location, description, isPublic, isAccepted, userId },
    id
  ) => {
    const SQL = `UPDATE "events" set  name=$1, date=$2, location=$3, description=$4, "isPublic"=$5, "isAccepted"=$6, "userId"=$7  WHERE id = $8 returning *`;

    const updatedEvent = (
      await client.query(SQL, [
        name,
        date,
        location,
        description,
        isPublic,
        isAccepted,
        userId,
        id,
      ])
    ).rows[0];
    return updatedEvent;
  },
  delete: async (id) => {
    return await client.query(`DELETE FROM "events" WHERE id=$1 returning *`, [
      id,
    ]);
  },
};

module.exports = events;
