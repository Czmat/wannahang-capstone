const client = require('../client');

const searchPerfectMatch = async (criteria) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE zipCode = ($1) AND careerId = ($2) AND employmentStatus = ($3)
  AND pets = ($4) AND gender = ($5) AND politicalAffiliation = ($6) AND religiousAffiliation = ($7) returning *`;
  return (
    await client.query(SQL, [
      criteria.zipCode,
      criteria.careerId,
      criteria.employmentStatus,
      criteria.pets,
      criteria.gender,
      criteria.politicalAffiliation,
      criteria.religiousAffiliation,
    ])
  ).rows[0];
};

const searchCareer = async (careerId) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE careerId = $1 returning *`;
  return (await client.query(SQL, [careerId])).rows[0];
};
const searchUsersByCareer = async (careerId) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  JOIN careers ON careers.id = user_profiles.careerid
  WHERE career_name = $1 `;
  return (await client.query(SQL, [careerId])).rows;
};
const searchGender = async (gender) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE gender = $1 returning *`;
  return (await client.query(SQL, [gender])).rows[0];
};
const searchUsersByGender = async (gender) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE gender = $1 `;
  return (await client.query(SQL, [gender])).rows;
};
const searchHobbies = async (hobbies) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_hobbies."userId" = users.id
  WHERE hobbies = $1 returning *`;
  return (await client.query(SQL, [hobbies])).rows[0];
};

const searchUsersByHobbies = async (hobby) => {
  const SQL = `SELECT users.username FROM user_hobbies
  JOIN users ON user_hobbies.user_id = users.id
  JOIN hobbies ON user_hobbies.hobby_id = hobbies.id
  WHERE hobby_name = $1 `;
  return (await client.query(SQL, [hobby])).rows;
};

const searchPets = async (pets) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE pets = $1 returning *`;
  return (await client.query(SQL, [pets])).rows[0];
};
const searchUsersByPets = async (pets) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE pets = $1 `;
  return (await client.query(SQL, [pets])).rows;
};
const searchPoliticalAffiliation = async (politicalAffiliation) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE politicalAffiliation = $1 returning *`;
  return (await client.query(SQL, [politicalAffiliation])).rows[0];
};
const searchUsersByPoliticalAffiliation = async (politicalAffiliation) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE politicalAffiliation = $1 `;
  return (await client.query(SQL, [politicalAffiliation])).rows;
};
const searchReligiousAffiliation = async (religiousAffiliation) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE religiousAffiliation = $1 returning *`;
  return (await client.query(SQL, [religiousAffiliation])).rows[0];
};
const searchUsersByReligiousAffiliation = async (religiousAffiliation) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE religiousAffiliation = $1 `;
  return (await client.query(SQL, [religiousAffiliation])).rows;
};
const searchEmploymentStatus = async (employmentStatus) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE status_name = $1 returning *`;
  return (await client.query(SQL, [employmentStatus])).rows[0];
};

const searchUsersByEmploymentStatus = async (employmentStatus) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE employmentstatus = $1`;
  return (await client.query(SQL, [employmentStatus])).rows;
};

const searchAgeRange = async (birthdate, ageMin, ageMax) => {
  const SQL = `
  SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE date_part('year',age(user_profiles.birthdate)) BETWEEN ($1) AND ($2) returning *`;
  return (await client.query(SQL, [ageMin, ageMax])).rows[0];
};
const searchUsersByAge = async (age) => {
  const SQL = `SELECT users.username FROM user_profiles 
  JOIN users ON user_profiles."userId" = users.id
  WHERE birthdate = $1`;
  return (await client.query(SQL, [age])).rows;
};
const createUserSearchCriteria = async (searchCriteria) => {
  const SQL = `
    INSERT INTO user_search_criteria 
    (
    gender,
    politicalAffiliation,
    religiousAffiliation,
    careerId,
    education,
    pets,
    zipCode,
    employmentStatus) 
    VALUES ($1, $2, $3,$4, $5, $6, $7, $8) returning *`;
  return (
    await client.query(SQL, [
      searchCriteria.gender,
      searchCriteria.politicalAffiliation,
      searchCriteria.religiousAffiliation,
      searchCriteria.careerId,
      searchCriteria.education,
      searchCriteria.pets,
      searchCriteria.zipCode,
      searchCriteria.employmentStatus,
    ])
  ).rows[0];
};
module.exports = {
  searchPerfectMatch,
  searchCareer,
  searchPets,
  searchGender,
  searchHobbies,
  searchEmploymentStatus,
  searchPoliticalAffiliation,
  searchReligiousAffiliation,
  searchAgeRange,
  createUserSearchCriteria,
  searchUsersByEmploymentStatus,
  searchUsersByAge,
  searchUsersByCareer,
  searchUsersByPets,
  searchUsersByGender,
  searchUsersByHobbies,
  searchUsersByPoliticalAffiliation,
  searchUsersByReligiousAffiliation,
};
