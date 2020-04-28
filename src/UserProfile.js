import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import DeleteAccountPopUp from "./components/User/DeleteAccountPopUp";
import FileUploadPlain from "./components/FileUploadPlain";
import FileUploadBkgd from "./components/FileUploadBkgd";

const UserProfile = ({ logout, auth, params }) => {
  const [myUserEvents, setMyUserEvents] = useState([]);
  const [myEvents, setMyEvent] = useState([]);

  useEffect(() => {
    console.log(auth.id, "auth id");
    axios.get(`/api/events/${auth.id}`).then((response) => {
      //console.log(response.data);
      setMyEvent(response.data);
    });
    axios.get(`/api/user_events/${auth.id}`).then((response) => {
      //console.log(response.data);
      setMyUserEvents(response.data);
    });
    axios.get(`/api/user/hobbies/${auth.id}`).then((response) => {
      //console.log(response.data, 'hobbies');
      //setMyUserHobbies(response.data);
    });
    axios.get(`/api/user/photos/${auth.id}`).then((response) => {
      console.log(response.data, "photos");
      //setMyUserPhotos(response.data);
    });
  }, []);

  const deleteAccount = () => {
    axios.delete(`/api/users/${auth.id}`);
  };
  //console.log(auth.id, 'auth id');

  const [profile, setProfile] = useState([]);
  const [photo, setPhoto] = useState([]);
  useEffect(() => {
    axios
      .get("/api/profiles")
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);
  // console.log("RES", response);
  // console.log("P", photo);

  useEffect(() => {
    axios
      .get("/api/photos")
      .then((response) =>
        setPhoto(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);
  let myPhotoPath;
  if (photo == undefined) {
    myPhotoPath = "/uploads/avatar.jpg";
  } else {
    myPhotoPath = photo.filepath;
  }

  // console.log("photo", photo);
  let birthday = moment(profile.birthdate).format("MMMM Do YYYY");

  // let birth = profile.birthdate;
  // let birthday = DATE_FORMAT(birthdate, "%M %e, %Y");
  return (
    <div className="container">
      <h3 className="userName">
        All About {auth.username}{" "}
        <button
          type="button"
          className="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >
          Delete my account
        </button>
      </h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Account Ownership</h5>

          <div className="col-md-12">
            <div className="col-md-6">
              {/* <img className="userPhoto" src="/avatar-1577909_1280.png" /> */}
              <img className="userPhoto" src={myPhotoPath} />
            </div>
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Name: {auth.firstname} {auth.lastname}
                </li>
                <li className="list-group-item">Username: {auth.username}</li>
                <li className="list-group-item">email: {auth.email}</li>
                <li className="list-group-item">Phone: {auth.phone}</li>
              </ul>
              <Link to="/useraccount/edit" className="card-link">
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* //============CHANGE PASSWORD===============// */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Would you like to reset your password?{" "}
            <Link to="/useraccount/password" className="btn btn-primary btn-sm">
              Change password
            </Link>
          </h5>
        </div>
      </div>

      <DeleteAccountPopUp
        auth={auth}
        deleteAccount={deleteAccount}
        logout={logout}
      />

      {/* //============MORE INFO===============// */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Personal Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Gender: {profile.gender}</li>
            <li className="list-group-item">
              Political Affiliation: {profile.politicalaffiliation}
            </li>
            <li className="list-group-item">
              Religious Affiliation: {profile.religiousaffiliation}
            </li>
            <li className="list-group-item">Education: {profile.education}</li>
            <li className="list-group-item">Pets: {profile.pets}</li>

            {/* <li className="list-group-item">
              Birthdate: {DATE_FORMAT(profile.birthdate, "%M %e, %Y")}
            </li> */}

            <li className="list-group-item">Birthdate: {birthday}</li>
            <li className="list-group-item">Zipcode: {profile.zipcode}</li>
            <li className="list-group-item">
              Employment Status: {profile.employmentstatus}
            </li>
            <li className="list-group-item">About: {profile.about}</li>
            <li className="list-group-item">
              I prefer to be contacted by: {profile.communicationpreference}
            </li>
            {/* careerid: "7196afea-99c0-46b5-8bcf-f33e526a5467" */}
          </ul>

          <Link
            className="card-link"
            to="/userprofile/edit"
            label="UserProfileEdit"
            profile={profile}
          >
            Edit
          </Link>
        </div>{" "}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="card col-md-6">
            <div className="card-body">
              <FileUploadPlain auth={auth} />
            </div>
          </div>
          <div className="card  col-md-6">
            <div className="card-body">
              <FileUploadBkgd auth={auth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
