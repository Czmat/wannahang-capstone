const client = require('../client');

// const readProfiles = async () => {
//   return (await client.query("SELECT * from user_profiles")).rows;
// };

const readProfiles = async () => {
  return (
    await client.query(
      "SELECT userId, gender, politicalAffiliation, religiousAffiliation, careerId, education, pets, DATE_FORMAT(birth_date, '%M %e, %Y'), zipCode, employmentStatus, about FROM user_profiles"
    )
  ).rows;
};

// const readProfiles = async () => {
//     return (await client.query('SELECT
//     "userId", gender, politicalAffiliation, religiousAffiliation, careerId, education, pets, (DATE_FORMAT(birthdate, '%M %e, %Y')), zipCode, employmentStatus, about from user_profiles')).rows;
//   }

const createProfile = async (user_profiles) => {
  const SQL = `INSERT INTO user_profiles("userId", gender, politicalAffiliation, religiousAffiliation, careerId, education, pets, birthdate, zipCode, employmentStatus, about)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`;
  return (
    await client.query(SQL, [
      user_profiles.userId,
      user_profiles.gender,
      user_profiles.politicalAffiliation,
      user_profiles.religiousAffiliation,
      user_profiles.careerId,
      user_profiles.education,
      user_profiles.pets,
      user_profiles.birthdate,
      user_profiles.zipCode,
      user_profiles.employmentStatus,
      user_profiles.about,
    ])
  ).rows[0];
};

// const createProfile = async (user_profiles) => {
//   const SQL = `INSERT INTO user_profiles("userId", gender, politicalAffiliation, religiousAffiliation, careerId, education, pets, birthdate, zipCode, employmentStatus, about)
//         values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`;
//   return (
//     await client.query(SQL, [
//       user_profiles.userId,
//       user_profiles.gender,
//       user_profiles.politicalAffiliation,
//       user_profiles.religiousAffiliation,
//       user_profiles.careerId,
//       user_profiles.education,
//       user_profiles.pets,
//       user_profiles.birthdate,
//       user_profiles.zipCode,
//       user_profiles.employmentStatus,
//       user_profiles.about,
//     ])
//   ).rows[0];
// };

// const updateProfile = async (
//   {
//     gender,
//     politicalAffiliation,
//     religiousAffiliation,
//     careerId,
//     education,
//     pets,
//     birthdate,
//     zipCode,
//     employmentStatus,
//     about
//   },
//   id
// ) => {
//   const SQL = `UPDATE "user_profiles" set gender=$1, politicalAffiliation=$2, religiousAffiliation=$3, careerId=$4, education=$5, pets=$6, birthdate=$7, zipCode=$8, employmentStatus=$9, about=$10 WHERE id = $11 returning *`;

//   const updatedProfile = (
//     await client.query(SQL, [
//       gender,
//       politicalAffiliation,
//       religiousAffiliation,
//       careerId,
//       education,
//       pets,
//       birthdate,
//       zipCode,
//       employmentStatus,
//       about,
//     ])
//   ).rows[0];
//   return updatedProfile;
// };

const updateProfile = async (user_profiles) => {
  const SQL = `UPDATE "user_profiles" set gender=$1, politicalAffiliation=$2, religiousAffiliation=$3, careerId=$4, education=$5, pets=$6, birthdate=$7, zipCode=$8, employmentStatus=$9, about=$10 WHERE id = $11 returning *`;

  const updatedProfile = (
    await client.query(SQL, [
      user_profiles.gender,
      user_profiles.politicalaffiliation,
      user_profiles.religiousaffiliation,
      user_profiles.careerid,
      user_profiles.education,
      user_profiles.pets,
      user_profiles.birthdate,
      user_profiles.zipcode,
      user_profiles.employmentstatus,
      user_profiles.about,
      user_profiles.id,
    ])
  ).rows[0];
  // return updatedProfile;
};

const deleteProfile = async (id) => {
  return await client.query(
    `DELETE FROM "user_profiles" WHERE id=$1 returning *`,
    [id]
  );
};
module.exports = {
  readProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};
