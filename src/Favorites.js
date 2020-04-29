/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchResultAboutModal from './components/SearchResultAboutModal';
import FavModal from './components/FavModal';
import NotFavModal from './components/NotFavModal';
import SearchFilter from './SearchFIlter';

const SearchResults = ({ auth, setUserToBeInvited }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [careers, setCareers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photosBkgd, setPhotosBkgd] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [userHobbies, setUserHobbies] = useState([]);
  const [aboutMe, setAboutMe] = useState('');

  const history = useHistory();
  const goToCreateEvent = () => history.push('/create/invite/event');

  const inviteUser = (userToInvite) => {
    setUserToBeInvited(userToInvite);
  };

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));
    axios.get('/api/photos').then((response) => setPhotos(response.data));
    axios
      .get('/api/photosBkgd')
      .then((response) => setPhotosBkgd(response.data));
    axios.get(`/api/fav/profiles/${auth.id}`).then((response) => {
      setUserProfiles(response.data);
    });
    axios.get('/api/careers').then((response) => setCareers(response.data));
    axios.get('/api/hobbies').then((response) => setHobbies(response.data));
    axios
      .get('/api/user_hobbies')
      .then((response) => setUserHobbies(response.data));
    axios.get(`/api/favorites/${auth.id}`).then((response) => {
      setFavorites(response.data);
    });
  }, []);

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

  const addToFavorites = (favOdj) => {
    axios.post('/api/favorites', favOdj).then((response) => {
      setFavorites([...favorites, response.data]);
    });
  };

  const removeFromFavorites = (favToRemove) => {
    axios
      .delete(`/api/favorites/${favToRemove.favoriteId}`)
      .then((response) => {
        const fav = response.data;
        const updated = favorites.filter((f) => f.id !== fav.id);
        setFavorites(updated);
      });
  };

  if (!users || !photos || !profiles || !userProfiles) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="container-fluid ">
        <div className="row search-btn-group">
          <h3 className="smaller-headline">I have ({userProfiles.length})</h3>
        </div>
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
            //hobbies
            const userHobby = userHobbies.filter((h) => {
              return h.user_id === userProfile.userId;
            });
            //career
            const career = careers.find((c) => c.id === userProfile.careerid);
            let careerName;
            if (career) {
              careerName = career.career_name;
            }
            //favorites
            const isFavorite = favorites.find(
              (f) => f.favoriteId === userProfile.userId
            );

            return (
              <div key={userProfile.id} className="col-sm-3">
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
                      className={
                        isFavorite
                          ? 'fas fa-heart fa-lg red'
                          : 'fas fa-heart fa-lg gray'
                      }
                      data-toggle="modal"
                      data-target={
                        isFavorite ? '#exampleModalNotFav' : '#exampleModalFav'
                      }
                      data-dismiss="modal"
                      onClick={() => {
                        setAboutMe({
                          userId: userProfile.userId,
                          username,
                          src,
                          srcBkgd,
                          userHobby,
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
                            userHobby,
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
          goToCreateEvent={goToCreateEvent}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          auth={auth}
          favorites={favorites}
        />
        <FavModal
          aboutMe={aboutMe}
          addToFavorites={addToFavorites}
          auth={auth}
        />

        <NotFavModal
          aboutMe={aboutMe}
          removeFromFavorites={removeFromFavorites}
          auth={auth}
        />
      </div>
    );
  }
};

export default SearchResults;

// import React, { useState, useEffect } from 'react';
// import { useHistory, Link } from 'react-router-dom';
// import axios from 'axios';

// const Favorites = ({ auth }) => {
//   const [favorites, setFavorites] = useState([]);
//   const [profile, setProfile] = useState([]);
//   const [profiles, setProfiles] = useState([]);

//   useEffect(() => {
//     axios.get('/api/favorites').then((response) => setFavorites(response.data));
//     axios.get('/api/profiles').then((response) => {
//       const findProfile = response.data.find(
//         ({ userId }) => userId === auth.id
//       );
//       setProfile(findProfile);
//       setProfiles(response.data.filter((up) => up.userId !== auth.id));
//     });
//   }, []);
//   console.log('f', favorites);
//   console.log('p', profiles);

//   if (!favorites) {
//     return <h3>Loading</h3>;
//   } else {
//     return (
//       <div>
//         <h2>My Friends</h2>
//         <ul>
//           {favorites.map((favorite) => {
//             return <li key={favorite.id}>{favorite.favoriteId}</li>;
//           })}
//         </ul>
//       </div>
//     );
//   }
// };
// export default Favorites;
