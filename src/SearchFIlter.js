import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchFIlter = ({ usersid }) => {
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
    axios.get('/api/profiles').then((response) => {
      const findProfile = response.data.find(
        ({ userId }) => userId === usersid
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

  const getUsername = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      return user.username;
    }
  };

  const userEmployment = profile.employmentstatus;
  const userGender = profile.gender;
  const userPets = profile.pets;
  const userPolitics = profile.politicalaffiliation;
  const userReligion = profile.religiousaffiliation;
  const userOccupation = getCareerName(profile.careerid);
  const userBirthday = profile.birthdate;

  const searchCriteria = (input) => {
    setFilter(...filter, input);
    if (filter === userOccupation) {
      axios.post('/api/search/career', { careerid: input }).then((response) => {
        setFilteredProfiles(response.data);
      });
    } else if (filter === userGender) {
      axios
        .post('/api/search/gender', { gender: input })
        .then((response) => setFilteredProfiles(response.data));
    } else if (filter === userBirthday) {
      const bDay = input.substring(0, 4);
      axios
        .post('/api/search/age', { birthdate: bDay })
        .then((response) => setFilteredProfiles(response.data));
    } else if (filter === userPets) {
      axios
        .post('/api/search/pets', { pets: input })
        .then((response) => setFilteredProfiles(response.data));
    } else if (filter === userReligion) {
      axios
        .post('/api/search/religion', { religiousaffiliation: input })
        .then((response) => setFilteredProfiles(response.data));
    } else if (filter === userPolitics) {
      axios
        .post('/api/search/politics', { politicalaffiliation: input })
        .then((response) => setFilteredProfiles(response.data));
    } else if (filter === userEmployment) {
      axios
        .post('/api/search/employment_status', { employmentstatus: input })
        .then((response) => setFilteredProfiles(response.data));
    } else {
      console.log('no results');
    }
  };

  const searchHobby = (inp) => {
    axios.post('/api/search/hobbies', { hobby_name: inp }).then((response) => {
      const usernamesWithHobby = response.data;
      setFilteredProfiles([...filteredProfiles, usernamesWithHobby]);
    });
  };

  const submitCriteria = (event) => {
    event.preventDefault();
    searchCriteria(filter);
    // console.log("fp", filteredProfiles);
  };

  const submitHobby = (event) => {
    event.preventDefault();
    searchHobby(hobbyFilter);
    //console.log("FP", filteredProfiles);
  };

  const showAllUsers = () => {
    const all = document.querySelector('#allUsers');
    all.className = ' ';
  };

  const submitAll = (event) => {
    event.preventDefault();
    showAllUsers();
  };

  return (
    <div>
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" className="btn btn-secondary">
            1
          </button>
          <button type="button" className="btn btn-secondary">
            2
          </button>
          <button type="button" className="btn btn-secondary">
            3
          </button>
          <button type="button" className="btn btn-secondary">
            4
          </button>
        </div>
        <div className="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" className="btn btn-secondary">
            5
          </button>
          <button type="button" className="btn btn-secondary">
            6
          </button>
          <button type="button" className="btn btn-secondary">
            7
          </button>
        </div>
        <div className="btn-group" role="group" aria-label="Third group">
          <button type="button" className="btn btn-secondary">
            8
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFIlter;
