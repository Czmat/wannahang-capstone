import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchResultAboutModal from './components/SearchResultAboutModal';
import FavModal from './components/FavModal';
import SearchFilter from './SearchFIlter';

const SearchResults = ({ auth, setUserToBeInvited }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [careers, setCareers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosBkgd, setPhotosBkgd] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);
  const [usersHobbies, setUsersHobbies] = useState([]);
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

    // gets zip code of current user
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

  const userProfiles = profiles.filter(
    (p) => p.zipcode === userZip && p.userId !== auth.id
  );

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

  if (!users || !photos) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="container">
        <div>
          <SearchFilter usersid={usersid} />
        </div>
        <h3>
          Future Friends Nearby{' '}
          <span className="smaller-headline">
            (There are {userProfiles.length} in your zip: {userZip} )
          </span>
        </h3>
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
