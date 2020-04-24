import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ auth }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [careers, setCareers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [usersHobbies, setUsersHobbies] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  const usersId = auth.id;

  useEffect(() => {
    // gets zip code of current user
    axios
      .get('/api/profiles')
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);
  const userZip = profile.zipcode;
  useEffect(() => {
    // find userids of profiles with same zip code
    axios.get('/api/profiles').then((response) => setProfiles(response.data));
  }, []);

  const userProfiles = profiles.filter(
    (p) => p.zipcode === userZip && p.userId !== auth.id
  );

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));
  }, []);

  const getUsername = (id) => {
    const user = users.find((u) => u.id === id);
    return user.username;
  };

  useEffect(() => {
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);

  const getCareerName = (cid) => {
    const career = careers.find((c) => c.id === cid);
    return career.career_name;
  };
  useEffect(() => {
    axios
      .get('/api/user_hobbies')
      .then((response) => setUsersHobbies(response.data));
  }, []);

  useEffect(() => {
    axios.get('/api/hobbies').then((response) => setHobbies(response.data));
  }, []);

  const getUserHobbies = (uid) => {
    console.log('uh', usersHobbies);
    const uHobs = usersHobbies.find((h) => h.user_id === uid);
    return uHobs;
  };

  const getHobbyName = (hobbyId) => {
    console.log('hobbyid', hobbyId);
    const hobNm = hobbies.find((b) => b.id === hobbyId.hobby_id);
    return hobNm.hobby_name;
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

  useEffect(() => {
    axios.get('/api/photos').then((response) => setPhotos(response.data));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('/api/user_hobbies')
  //     .then((response) => setUserHobbies(response.data));
  // }, []);

  const getProfilePic = (friendId) => {
    const profilePic = photos.find((photo) => photo.userId === friendId);
    const filename = profilePic.filename;
    const filepath = profilePic.filepath;
    const src = filepath + '/' + filename;
    return src;
  };

  const saveAsFavorite = async (fave) => {
    await axios
      .post('/api/createFavorite', fave)
      .then((response) => setFavorites([response.data, ...favorites]));
  };

  // const getHobbies = () => {
  //   axios
  //     .get('/api/user_hobbies')
  //     .then((response) => setUserHobbies(response.data));
  // };

  const onSubmit = (fav) => {
    const user1 = usersId;
    const user2 = fav;
    const faveUser = {
      userId: user1,
      favoriteId: user2,
    };
    saveAsFavorite(faveUser);
  };
  function myFunction(x) {
    x.classList.toggle('fa fa-heart');
  }
  // function setColor(button, color) {
  //   let count = 1;
  //   let property = document.getElementById("heart");
  //   if (count == 0) {
  //     property.style.backgroundColor = "gray";
  //     count = 1;
  //   } else {
  //     property.style.backgroundColor = "red";
  //     count = 0;
  //   }
  // }
  return (
    <div className="container">
      {/* <i onclick="myFunction(this)" class="fa fa-thumbs-up"></i> */}
      <h3>
        Future Friends Nearby (There are {userProfiles.length} in your zip:{' '}
        {userZip} )
      </h3>
      <div className="row">
        {userProfiles.map((userProfile) => {
          return (
            <div key={userProfile.id} className="col-sm-4">
              <div className="card profile-card">
                <div className="card-body">
                  <div>
                    <img
                      className="profile-photo"
                      src={getProfilePic(userProfile.userId)}
                      alt={getUsername(userProfile.userId)}
                    />
                  </div>
                  <h5 className="card-title">
                    {getUsername(userProfile.userId)}
                  </h5>
                  <p className="card-text">
                    Age {findAge(userProfile.birthdate)}{' '}
                  </p>
                  <button
                    type="button"
                    id="heart"
                    className="fas fa-heart"
                    // onClick={myFunction}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    data-dismiss="modal"
                  >
                    {' '}
                    Friend
                  </button>
                  <p className="card-text">
                    Age {findAge(userProfile.birthdate)}{' '}
                  </p>

                  {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a> */}
                  {/* TESTING */}

                  <div
                    className="modal fade"
                    id="exampleModalCenter"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="exampleModalCenterTitle"
                          >
                            Save this user as a favorite?
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          {getUsername(userProfile.userId)}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => onSubmit(userProfile.userId)}
                            data-dismiss="modal"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModalCenter2"
                  >
                    View details
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModalCenter2"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="exampleModalCenterTitle"
                          >
                            Details of user {getUsername(userProfile.userId)}
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <li>Politics: {userProfile.politicalaffiliation}</li>
                          <li>Religion: {userProfile.religiousaffiliation}</li>
                          <li>Education: {userProfile.education}</li>
                          <li>Career: {getCareerName(userProfile.careerid)}</li>
                          <li>Pets: {userProfile.pets}</li>
                          <li>Employment: {userProfile.employmentstatus}</li>
                          {/* <li>Hobbies: {getUserHobbies(userProfile.userId)}</li> */}
                          <li>About: {userProfile.about}</li>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => onSubmit(userProfile.userId)}
                            data-dismiss="modal"
                          >
                            Save as favorite?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TESTING */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
