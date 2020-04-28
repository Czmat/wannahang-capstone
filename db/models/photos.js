const client = require('../client');

const readPhotos = async () => {
  return (await client.query('SELECT * from user_photos')).rows;
};

const createPhoto = async (user_photos) => {
  const SQL = `INSERT INTO user_photos(fileName, filePath, "userId")
        values($1, $2, $3) returning *`;
  return (
    await client.query(SQL, [
      user_photos.fileName,
      user_photos.filePath,
      user_photos.userId,
    ])
  ).rows[0];
};

const updatePhoto = async ({ fileName, filePath }, id) => {
  const SQL = `UPDATE "photos" set fileName=$1, filePath=$2 WHERE id = $3 returning *`;

  const updatedPhoto = (await client.query(SQL, [fileName, filePath])).rows[0];
  return updatedPhoto;
};
const deletePhoto = async (id) => {
  return await client.query(`DELETE FROM "photos" WHERE id=$1 returning *`, [
    id,
  ]);
};

const showUserPhotos = async (id) => {
  return (
    await client.query(
      `select user_photos.id from user_photos where "userId" = $1`,
      [id]
    )
  ).rows;
};

module.exports = {
  readPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
  showUserPhotos,
};
