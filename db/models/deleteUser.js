const client = require('../client');

const deleteUserAccount = async (id) => {
  return await client.query(
    `DELETE FROM user_events USING events WHERE "eventId"= events.id and "userId"=$1`,
    [id]
  );
};
const deleteUserJoined = async (id) => {
  return await client.query(
    `DELETE FROM  user_events WHERE "joinedUserId"=$1`,
    [id]
  );
};
const deleteUser = async (id) => {
  return await client.query(`DELETE FROM  users WHERE "id" =$1`, [id]);
};
const deleteSearchCriteria = async (id) => {
  return await client.query(
    `DELETE FROM  user_search_criteria WHERE "userId"=$1`,
    [id]
  );
};
const deleteRatings = async (id) => {
  return await client.query(`DELETE FROM  user_ratings WHERE user_id=$1`, [id]);
};
const deletePhotosBkgd = async (id) => {
  return await client.query(`DELETE FROM  user_photos_bkgd WHERE "userId"=$1`, [
    id,
  ]);
};
const deletePhotos = async (id) => {
  return await client.query(`DELETE FROM  user_photos WHERE "userId"=$1`, [id]);
};
const deleteHobbies = async (id) => {
  return await client.query(`DELETE FROM  user_hobbies WHERE user_id=$1`, [id]);
};
const deleteGroups = async (id) => {
  return await client.query(`DELETE FROM  user_groups WHERE user_id=$1`, [id]);
};
const deleteFavoriteId = async (id) => {
  return await client.query(
    `DELETE FROM  user_favorites WHERE "favoriteId"=$1`,
    [id]
  );
};
const deleteEvents = async (id) => {
  return await client.query(`DELETE FROM  events WHERE "userId"=$1`, [id]);
};
const deleteProfiles = async (id) => {
  return await client.query(`DELETE FROM  user_profiles WHERE "userId"=$1`, [
    id,
  ]);
};
const deleteFavorites = async (id) => {
  return await client.query(`DELETE FROM  user_favorites WHERE "userId"=$1`, [
    id,
  ]);
};

module.exports = {
  deleteUserAccount,
  deleteUserJoined,
  deleteFavoriteId,
  deleteFavorites,
  deleteGroups,
  deleteHobbies,
  deletePhotos,
  deletePhotosBkgd,
  deleteProfiles,
  deleteRatings,
  deleteSearchCriteria,
  deleteUser,
  deleteEvents,
};
