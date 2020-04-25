import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchFIlter = ({ auth }) => {
  const [filter, setFilter] = useState('');
  const [hobbyFilter, setHobbyFilter] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [careers, setCareers] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));

    axios.get('/api/photos').then((response) => setPhotos(response.data));
    // gets zip code of current user
    axios.get('/api/profiles').then((response) => {
      const findProfile = response.data.find(
        ({ userId }) => userId === auth.id
      );
      setProfile(findProfile);
      setProfiles(response.data);
    });
    axios.get('/api/hobbies').then((response) => setHobbies(response.data));
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);

  const getCareerName = (cid) => {
    const career = careers.find((c) => c.id === cid);
    if (career) {
      return career.career_name;
    }
  };

  const findAge = (birthday) => {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const userEmployment = profile.employmentstatus;
  const userAge = findAge(profile.birthdate);
  const userGender = profile.gender;
  const userPets = profile.pets;
  const userPolitics = profile.politicalaffiliation;
  const userReligion = profile.religiousaffiliation;
  const userOccupation = getCareerName(profile.careerid);

  const searchCriteria = (input) => {
    setFilter(...filter, input);
    switch (filter) {
      case userOccupation:
        axios
          .post('/api/search/career', { careerid: input })
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case userGender:
        axios
          .post('/api/search/gender', { gender: input })
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case userAge:
        axios
          .post('/api/search/age', { birthdate: input })
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case userPets:
        axios
          .post('/api/search/pets', { pets: input })
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case userReligion:
        axios
          .post('/api/search/religion', { religiousaffiliation: input })
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case userPolitics:
        axios
          .post('/api/search/politics', { politicalaffiliation: input })
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case userEmployment:
        console.log('input', input);
        axios
          .post('/api/search/employment_status', { employmentstatus: input })
          .then((response) => {
            setFilteredProfiles([response.data, ...filteredProfiles]);
            // setFilteredProfiles([...filteredProfiles, response.data]);
            // setFilteredProfiles(...filteredProfiles, {
            //   username: response.data.username,
            // });
            // setFilteredProfiles(response.data);
            // setFilteredProfiles([response.data]);
            console.log('resp', response.data);
          });
        console.log('filtered?', filteredProfiles);
        break;
      default:
        console.log('show all users w message');
        break;
    }
  };

  const searchHobby = (inp) => {
    axios.post('/api/search/hobbies', { hobby_name: inp }).then((response) => {
      const usernamesWithHobby = response.data;
      setFilteredProfiles([...filteredProfiles, usernamesWithHobby]);
    });
    // const newUserEvent = response.data;
    // setUserEvents([...userEvents, newUserEvent]);
    console.log('frprof', filteredProfiles);
  };

  const submitCriteria = (event) => {
    event.preventDefault();
    searchCriteria(filter);
  };

  const submitHobby = (event) => {
    event.preventDefault();
    searchHobby(hobbyFilter);
  };

  return (
    <div>
      <h2>Test</h2>
      <div>
        <form onSubmit={(e) => submitCriteria(e)}>
          <div className="form-group mt-3">
            <label htmlFor="about">Search for someone that matches my:</label>
            <select
              type="text"
              id="searchFilter"
              name="searchFilter"
              onChange={(ev) => setFilter(ev.target.value)}
            >
              <option value={getCareerName(profile.careerid)}>
                Occupation
              </option>
              <option value={profile.employmentstatus}>
                Employment Status
              </option>
              <option value={profile.pets}>Pets </option>
              {/* <option value="age">Age(DNU)</option> */}
              <option value={profile.gender}>Gender</option>
              <option value={profile.politicalaffiliation}>
                Political affiliation
              </option>
              <option value={profile.religiousaffiliation}>
                Religious affiliation
              </option>
              {/* <option value="hobbies">Hobbies(DNU)</option> */}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <form onSubmit={(e) => submitHobby(e)}>
          <div>
            <label htmlFor="about">Search for someone whose hobby is:</label>
            <select
              className="form-control"
              id="hobbies"
              defaultValue
              onChange={(ev) => setHobbyFilter(ev.target.value)}
            >
              <option value={hobbyFilter}> --select your option-- </option>
              {hobbies.map((hobby) => {
                return (
                  <option key={hobby.id} value={hobby.hobby_name}>
                    {hobby.hobby_name}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {/* <div>
          <ul>
            {filteredProfiles.map((filteredProfile) => {
              return <li key={filteredProfile.length}>{filteredProfile}</li>;
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default SearchFIlter;
