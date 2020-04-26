import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchResults = ({ auth, setUserToBeInvited }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [careers, setCareers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState([]);
  //const [userToBeInvited, setUserToBeInvited] = useState([]);
  //console.log(profiles, 'profiles');

  //const usersId = auth.id;

  // console.log(favorite);
  // let fave = favorites.data.find(({ userId }) => userId === favoriteId);
  // console.log(fave);

  //for createUserWithInvite
  const inviteUser = (userToInvite) => {
    console.log(userToInvite, "invite button");
    setUserToBeInvited(userToInvite);
  };

  const findFave = (friendId) => {
    //console.log('FI', friendId);
    // for (let i = 0; i <= favorite.length; i++) {
    //   if (favorite[i].userId === friendId) {
    //     console.log("UF", favorites[i]);
    //   }
    // }
    const userFave = favorite.find((fave) => fave.userId === friendId);
    //console.log('UF', userFave);
  };

  // const redHeart = () => {
  //   // document.getElementsByClassName("gray")[0].style.backgroundColor = "red";
  //   document.getElementById("heart").style.backgroundColor = "red";
  //   //  = favorites.find(findFave);
  // };
  useEffect(() => {
    axios.get("/api/users").then((response) => setUsers(response.data));

    axios.get("/api/photos").then((response) => setPhotos(response.data));
    // gets zip code of current user
    axios.get("/api/profiles").then((response) => {
      const findProfile = response.data.find(
        ({ userId }) => userId === auth.id
      );
      setProfile(findProfile);
      setProfiles(response.data);
    });
    axios.get("/api/careers").then((response) => setCareers(response.data));
  }, []);

  const userZip = profile.zipcode;

  // useEffect(() => {
  //   axios.get('/api/careers').then((response) => setCareers(response.data));
  // }, []);

  // useEffect(() => {
  //   // find userids of profiles with same zip code
  //   axios.get('/api/profiles').then((response) => setProfiles(response.data));
  // }, []);

  //need to rename this to userProfilesInZip
  const userProfiles = profiles.filter(
    (p) => p.zipcode === userZip && p.userId !== auth.id
  );

  // console.log(
  //   profile,
  //   'profile',
  //   userZip,
  //   'user zip',
  //   userProfiles,
  //   'user profiles'
  // );

  const getUsername = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      return user.username;
    }
  };
  //console.log(getUsername())
  const getCareerName = (cid) => {
    const career = careers.find((c) => c.id === cid);
    if (career) {
      return career.career_name;
    }
  };
  useEffect(() => {
    axios
      .get("/api/user_hobbies")
      .then((response) => setUsersHobbies(response.data));
  }, []);

  useEffect(() => {
    axios.get("/api/hobbies").then((response) => setHobbies(response.data));
  }, []);

  const getUserHobbies = (uid) => {
    // console.log('uh', usersHobbies);
    const uHobs = usersHobbies.find((h) => h.user_id === uid);
    return uHobs;
  };

  const getHobbyName = (hobbyId) => {
    // console.log('hobbyid', hobbyId);
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

  const getProfilePic = (friendId) => {
    // if (photos) {
    const profilePic = photos.find((photo) => photo.userId === friendId);
    if (!profilePic.filename) {
      const filename = "/avatar.jpg";
      const filepath = "/images";
      const src = filepath + filename;
      return src;
    }
    if (profilePic) {
      console.log(profilePic);

      const filename = profilePic.filename;
      const filepath = profilePic.filepath;
      const src = filepath + filename;
      return src;
    }
  };

  const saveAsFavorite = async (fave) => {
    await axios
      .post("/api/createFavorite", fave)
      .then((response) => setFavorites([response.data, ...favorites]));
  };
  // useEffect(() => {
  //   axios.get('/api/favorites').then((response) => setFavorite(response.data));
  // }, []);
  // const onSubmit = (fav) => {
  //   const user1 = auth.id;
  //   const user2 = fav;
  //   const faveUser = {
  //     userId: user1,
  //     favoriteId: user2,
  //   };
  //   saveAsFavorite(faveUser);
  // };
  // function myFunction(x) {
  //   x.classList.toggle("fa fa-heart");
  // }

  if (!users) {
    Loading;
  } else {
    return (
      <div className="container">
        {/* <i onclick="myFunction(this)" className="fa fa-thumbs-up"></i> */}
        <h3>
          Future Friends Nearby{" "}
          <span className="smaller-headline">
            (There are {userProfiles.length} in your zip: {userZip} )
          </span>
        </h3>
        <div className="row">
          {userProfiles.map((userProfile) => {
            // const use = users.find((u) => u.id === userProfile.userId);

            // const profilePic = photos.find(
            //   (photo) => photo.userId === userProfile.userId
            // );

            // console.log(userProfile.userId, 'username');
            //console.log(profilePic, 'profile pic');

            // console.log('ID', userProfile.userId);
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
                      {/* {getProfilePic(userProfile.userId)} */}
                    </div>
                    <div className="card-info">
                      <h5 className="card-title d-inline p-2 card-name">
                        {getUsername(userProfile.userId)
                          .charAt(0)
                          .toUpperCase() +
                          getUsername(userProfile.userId).slice(1)}{" "}
                      </h5>
                      <p className="card-text d-inline p-2 card-age">
                        {findAge(userProfile.birthdate)}{" "}
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
                    >
                      {" "}
                    </button>
                    {/* <p className="card-text">
                      Age {findAge(userProfile.birthdate)}{' '}
                    </p> */}

                    {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a> */}

                    {/* //TEST */}

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
                        {/* =======FAVE MODAL SECTION======= */}

                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="exampleModalCenterTitle"
                            >
                              Details of user {getUsername(userProfile.userId)}
                              Save this user as a favorite?
                            </h5>
                            {/* =======FAVE X BTN======= */}

                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
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
                        {/* =======FAVE MODAL SECTION ENDS======= */}
                      </div>
                    </div>
                    {/* =======CARD VIEW DETAILS BTN======= */}
                    <div className="side-by-side">
                      <button
                        type="button"
                        className="btn-outline-primary btn-rounded btn-sm p-2 d-inline mr-2 sbs"
                        data-toggle="modal"
                        data-target="#exampleModalCenter2"
                      >
                        About Me
                      </button>
                      {/* =======CARD INVITE BTN======= */}
                      <button
                        type="button"
                        className="btn-outline-success btn-rounded btn-sm p-2 d-inline sbs"
                        onClick={() => inviteUser(userProfile.userId)}
                      >
                        Invite Me
                      </button>
                    </div>
                    {/* ==================SECOND MODAL================== */}

                    <div
                      className="modal fade"
                      id="exampleModalCenter2"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-body mb-0 p-0">
                            <div class="embed-responsive profile-photo">
                              <img
                                src="/images/scuba-diver.jpg"
                                alt={getUsername(userProfile.userId)}
                              />
                            </div>
                            {/* ====PROFILE PHOTO====== */}
                            <div>
                              <img
                                className="profile-photo round-photo-inset"
                                src={getProfilePic(userProfile.userId)}
                                alt={getUsername(userProfile.userId)}
                              />
                            </div>
                            <div className="about-user mb-3 mt-2">
                              <h5>
                                Hi! I am{" "}
                                {getUsername(userProfile.userId)
                                  .charAt(0)
                                  .toUpperCase() +
                                  getUsername(userProfile.userId).slice(1)}
                                .
                              </h5>
                            </div>
                            <div className="about-user mb-3 mt-2">
                              <i>{userProfile.about}</i>
                            </div>
                            <div className="about-user mb-2">
                              My interests:
                              <br />
                              {/* ========REPLACE WITH HOBBIES========= */}
                              <i>I like sports and outdoors, music, camping</i>
                            </div>
                            <div className="about-user mb-2">
                              My stats:
                              <br />
                              <i>
                                I love {userProfile.pets}
                                &nbsp;&bull;&nbsp;
                                {userProfile.politicalaffiliation}
                                &nbsp;&bull;&nbsp;{" "}
                                {userProfile.religiousaffiliation}
                                &nbsp;&bull;&nbsp; {userProfile.education}
                                &nbsp;&bull;&nbsp;{" "}
                                {getCareerName(userProfile.careerid)}
                                &nbsp;&bull;&nbsp;{" "}
                                {userProfile.employmentstatus}
                              </i>
                            </div>
                          </div>
                          <div className="modal-footer justify-content-center flex-column flex-md-row">
                            <span class="mr-4">Wanna Hang?</span>
                            <div>
                              <a class="px-2 fa-lg fb-ic">
                                <i class="fab fa-facebook-f"></i>
                              </a>

                              <a class="px-2 fa-lg tw-ic">
                                <i class="fab fa-twitter"></i>
                              </a>

                              <a class="px-2 fa-lg li-ic">
                                <i class="fab fa-linkedin-in"></i>
                              </a>

                              <button
                                type="submit"
                                className="fas fa-heart fa-lg gray-modal"
                                onClick={() => onSubmit(userProfile.userId)}
                                data-dismiss="modal"
                              ></button>
                              <button
                                type="button"
                                className="btn-outline-success btn-rounded btn-sm mr-1"
                                onClick={() => inviteUser(userProfile.userId)}
                                data-dismiss="modal"
                              >
                                Invite?
                              </button>
                            </div>
                            <button
                              type="button"
                              className="btn-outline-primary btn-rounded btn-sm"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            {/* <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => onSubmit(userProfile.userId)}
                              data-dismiss="modal"
                            >
                              Save as favorite?
                            </button> */}
                            {/* <button
                              //to="/create/invite/event"
                              type="button"
                              data-dismiss="modal"
                              className="btn btn-primary"
                              onClick={() =>
                                inviteUser({
                                  id: userProfile.userId,
                                  name: getUsername(userProfile.userId),
                                })
                              }
                            >
                              Invite user
                            </button> */}
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
  }
};

export default SearchResults;
