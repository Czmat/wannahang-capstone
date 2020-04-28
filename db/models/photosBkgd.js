const client = require('../client');

const readPhotosBkgd = async () => {
  return (await client.query('SELECT * from user_photos_bkgd')).rows;
};

const createPhotoBkgd = async (user_photos_bkgd) => {
  const SQL = `INSERT INTO user_photos_bkgd(fileName, filePath, "userId")
        values($1, $2, $3) returning *`;
  return (
    await client.query(SQL, [
      user_photos_bkgd.fileName,
      user_photos_bkgd.filePath,
      user_photos_bkgd.userId,
    ])
  ).rows[0];
};

const updatePhotoBkgd = async ({ fileName, filePath }, id) => {
  const SQL = `UPDATE "photos" set fileName=$1, filePath=$2 WHERE id = $3 returning *`;

  const updatedPhoto = (await client.query(SQL, [fileName, filePath])).rows[0];
  return updatedPhoto;
};
const deletePhotoBkgd = async (id) => {
  return await client.query(
    `DELETE FROM "user_photos_bkgd" WHERE id=$1 returning *`,
    [id]
  );
};

module.exports = {
  readPhotosBkgd,
  createPhotoBkgd,
  updatePhotoBkgd,
  deletePhotoBkgd,
};
