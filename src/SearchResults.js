/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchResultAboutModal from './components/SearchResultAboutModal';
import FavModal from './components/FavModal';
import SearchFilter from './SearchFIlter';

const SearchResults = ({ auth, setUserToBeInvited }) => {
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [careers, setCareers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosBkgd, setPhotosBkgd] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);
  const [usersHobbies, setUsersHobbies] = useState([]);
  const [hobbyFilter, setHobbyFilter] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const history = useHistory();
  const goToCreateEvent = () => history.push('/create/invite/event');

  const inviteUser = (userToInvite) => {
    setUserToBeInvited(userToInvite);
  };

  const findFave = (friendId) => {
    const userFave = favorite.find((fave) => fave.userId === friendId);
    return userFave;
  };

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));

    axios.get('/api/photos').then((response) => setPhotos(response.data));
    axios
      .get('/api/photosBkgd')
      .then((response) => setPhotosBkgd(response.data));

    axios.get('/api/profiles').then((response) => {
      const findProfile = response.data.find(
        ({ userId }) => userId === auth.id
      );
      setProfile(findProfile);
      setProfiles(response.data);
    });
    axios.get('/api/careers').then((response) => setCareers(response.data));

    axios.get('/api/hobbies').then((response) => setHobbies(response.data));

    axios
      .get('/api/user_hobbies')
      .then((response) => setUserHobbies(response.data));
  }, []);

  const userZip = profile.zipcode;
  const userEmployment = profile.employmentstatus;
  const userGender = profile.gender;
  const userPets = profile.pets;
  const userPolitics = profile.politicalaffiliation;
  const userReligion = profile.religiousaffiliation;
  const userOccupation = profile.careerid;
  const userBirthday = profile.birthdate;

  const searchZipCriteria = () => {
    axios
      .post('/api/search/zipcode', { zipcode: userZip })
      .then((response) => setUserProfiles(response.data));
  };

  const searchHobby = (inp) => {
    axios.post('/api/search/hobbies', { hobby_name: inp }).then((response) => {
      const rd = response.data;
      setUserProfiles(rd.filter((up) => up.userId !== auth.id));
    });
  };

  const searchAll = () => {
    axios.get('/api/profiles').then((response) => {
      const rd = response.data;
      setUserProfiles(rd.filter((up) => up.userId !== auth.id));
    });
  };

  const getCareerName = (cid) => {
    const career = careers.find((c) => c.id === cid);
    if (career) {
      return career.career_name;
    }
  };

  const onSubmitHobby = (event) => {
    event.preventDefault();
    searchHobby(hobbyFilter);
  };

  const onSubmitAll = (event) => {
    event.preventDefault();
    searchAll();
  };

  const searchCriteria = (input) => {
    setFilter(...filter, input);
    if (filter === userOccupation) {
      axios.post('/api/search/career', { careerid: input }).then((response) => {
        const rd = response.data;
        setUserProfiles(rd.filter((up) => up.userId !== auth.id));
      });
    } else if (filter === userGender) {
      axios.post('/api/search/gender', { gender: input }).then((response) => {
        const rd = response.data;
        setUserProfiles(rd.filter((up) => up.userId !== auth.id));
      });
    } else if (filter === userBirthday) {
      const bDay = input.substring(0, 4);
      axios.post('/api/search/age', { birthdate: bDay }).then((response) => {
        const rd = response.data;
        setUserProfiles(rd.filter((up) => up.userId !== auth.id));
      });
    } else if (filter === userPets) {
      axios.post('/api/search/pets', { pets: input }).then((response) => {
        const rd = response.data;
        setUserProfiles(rd.filter((up) => up.userId !== auth.id));
      });
    } else if (filter === userReligion) {
      axios
        .post('/api/search/religion', { religiousaffiliation: input })
        .then((response) => {
          const rd = response.data;
          setUserProfiles(rd.filter((up) => up.userId !== auth.id));
        });
    } else if (filter === userPolitics) {
      axios
        .post('/api/search/politics', { politicalaffiliation: input })
        .then((response) => {
          const rd = response.data;
          setUserProfiles(rd.filter((up) => up.userId !== auth.id));
        });
    } else if (filter === userEmployment) {
      axios
        .post('/api/search/employment_status', { employmentstatus: input })
        .then((response) => {
          const rd = response.data;
          setUserProfiles(rd.filter((up) => up.userId !== auth.id));
        });
    } else {
      console.log('Sorry, no results');
    }
  };

  const onSubmitZip = (event) => {
    event.preventDefault();
    searchZipCriteria();
  };

  const onSubmitCriteria = (event) => {
    event.preventDefault();
    searchCriteria(filter);
  };

  const getUserHobbies = (uid) => {
    const uHobs = userHobbies.find((h) => h.user_id === uid);
    setUsersHobbies(uHobs);
  };

  const getHobbyName = (hobbyId) => {
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

  const saveAsFavorite = async (fave) => {
    await axios
      .post('/api/createFavorite', fave)
      .then((response) => setFavorites([response.data, ...favorites]));
  };

  const onSubmit = (fav) => {
    const user1 = auth.id;
    const user2 = fav;
    const faveUser = {
      userId: user1,
      favoriteId: user2,
    };
    saveAsFavorite(faveUser);
  };

  const usersid = auth.id;

  if (!users || !photos || !profiles) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="container">
        <div>
          <div>
            <div>
              <form onSubmit={(e) => onSubmitCriteria(e)}>
                <div className="form-group mt-3">
                  <label htmlFor="about">
                    Search for someone that matches my:
                  </label>
                  <select
                    type="text"
                    id="searchFilter"
                    name="searchFilter"
                    onChange={(ev) => setFilter(ev.target.value)}
                  >
                    <option value="">--select your option--</option>
                    <option value={getCareerName(profile.careerid)}>
                      Occupation
                    </option>
                    <option value={profile.employmentstatus}>
                      Employment Status
                    </option>
                    <option value={profile.pets}>Pets </option>
                    <option value={userBirthday}>Age</option>
                    <option value={profile.gender}>Gender</option>
                    <option value={profile.politicalaffiliation}>
                      Political affiliation
                    </option>
                    <option value={profile.religiousaffiliation}>
                      Religious affiliation
                    </option>
                  </select>
                </div>
                <button type="submit">Show</button>
              </form>
            </div>
            <div>
              <form onSubmit={(e) => onSubmitHobby(e)}>
                <div>
                  <label htmlFor="about">
                    Search for someone whose hobby is:
                  </label>
                  <select
                    className="form-control"
                    id="hobbies"
                    defaultValue
                    onChange={(ev) => setHobbyFilter(ev.target.value)}
                  >
                    <option value={hobbyFilter}>
                      {' '}
                      --select your option--{' '}
                    </option>
                    {hobbies.map((hobby) => {
                      return (
                        <option key={hobby.id} value={hobby.hobby_name}>
                          {hobby.hobby_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button type="submit">Show</button>
              </form>
            </div>
            <div>
              <div>
                <h4>Search for someone nearby:</h4>
                <button type="button" onClick={(e) => onSubmitZip(e)}>
                  Show
                </button>
              </div>
            </div>
            <div>
              <div>
                <h4>I just want to see all users with no filters</h4>
                <button type="button" onClick={(e) => onSubmitAll(e)}>
                  Show
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3 className="smaller-headline">Results ({userProfiles.length})</h3>
        {/* <h3>
          Future Friends Nearby{' '}
          <span className="smaller-headline">
            (There are {userProfiles.length} in your zip: {userZip} )
          </span>
        </h3> */}
        <div className="row">
          {userProfiles.map((userProfile) => {
            //users
            const user = users.find((u) => u.id === userProfile.userId);
            let username;
            if (user) {
              username = user.username;
            }
            //photos
            const profilePic = photos.find(
              (photo) => photo.userId === userProfile.userId
            );
            let src;
            if (profilePic) {
              {
                !profilePic.filename
                  ? (src = '/images/avatar.jpg')
                  : (src = profilePic.filepath);
              }
            }

            //photosbkgd
            const profilePicBkgd = photosBkgd.find(
              (photoBkgd) => photoBkgd.userId === userProfile.userId
            );
            let srcBkgd;
            if (profilePicBkgd) {
              {
                !profilePicBkgd.filename
                  ? (srcBkgd = '/images/no-bkgd.jpg')
                  : (srcBkgd = profilePicBkgd.filepath);
              }
            }
            //career
            const career = careers.find((c) => c.id === userProfile.careerid);
            let careerName;
            if (career) {
              careerName = career.career_name;
            }

            return (
              <div key={userProfile.id} className="col-sm-4">
                <div className="card profile-card">
                  <div className="card-body">
                    <div>
                      <img className="profile-photo" src={src} alt={username} />
                    </div>
                    <div className="card-info">
                      <h5 className="card-title d-inline p-2 card-name">
                        {username
                          ? username.charAt(0).toUpperCase() + username.slice(1)
                          : ''}
                      </h5>
                      <p className="card-text d-inline p-2 card-age">
                        {findAge(userProfile.birthdate)}{' '}
                      </p>
                    </div>
                    <button
                      type="button"
                      id="heart"
                      className="fas fa-heart fa-lg gray"
                      onClick={(e) => findFave(userProfile.userId)}
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      data-dismiss="modal"
                      onClick={() => {
                        setAboutMe({
                          userId: userProfile.userId,
                          username,
                          src,
                          srcBkgd,
                          careerName,
                          about: userProfile.about,
                          pets: userProfile.pets,
                          political: userProfile.politicalaffiliation,
                          religion: userProfile.religiousaffiliation,
                          education: userProfile.education,
                          employment: userProfile.employmentstatus,
                        });
                      }}
                    >
                      {' '}
                    </button>
                    <div className="side-by-side">
                      <button
                        type="button"
                        className="btn-outline-primary btn-rounded btn-sm p-2 d-inline mr-2 sbs"
                        data-toggle="modal"
                        data-target="#exampleModalCenter2"
                        onClick={() => {
                          setAboutMe({
                            userId: userProfile.userId,
                            username,
                            src,
                            srcBkgd,
                            careerName,
                            about: userProfile.about,
                            pets: userProfile.pets,
                            political: userProfile.politicalaffiliation,
                            religion: userProfile.religiousaffiliation,
                            education: userProfile.education,
                            employment: userProfile.employmentstatus,
                          });
                        }}
                      >
                        About Me
                      </button>
                      {/* =======CARD INVITE BTN======= */}
                      <button
                        type="button"
                        className="btn-outline-success btn-rounded btn-sm p-2 d-inline sbs"
                        onClick={() => {
                          inviteUser({
                            id: userProfile.userId,
                            name: username,
                          });
                          goToCreateEvent();
                        }}
                      >
                        Invite me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <SearchResultAboutModal
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
          inviteUser={inviteUser}
          onSubmit={onSubmit}
          goToCreateEvent={goToCreateEvent}
        />
        <FavModal aboutMe={aboutMe} onSubmit={onSubmit} />
      </div>
    );
  }
};

export default SearchResults;
