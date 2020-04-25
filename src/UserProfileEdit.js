import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import DeleteAccountPopUp from "./components/User/DeleteAccountPopUp";

const UserProfileEdit = ({ logout, auth, params }) => {
  const deleteAccount = () => {
    axios.delete(`/api/users/${auth.id}`);
  };

  useEffect(() => {
    axios
      .get("/api/profiles")
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);
  useEffect(() => {
    axios
      .get("/api/political_parties")
      .then((response) => setPoliticalParties(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/genders").then((response) => setGenders(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/religions").then((response) => setReligions(response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/education")
      .then((response) => setEducations(response.data));
  }, []);
  useEffect(() => {
    axios.get("/api/pets").then((response) => setPet(response.data));
  }, []);
  useEffect(() => {
    axios
      .get("/api/employment_status")
      .then((response) => setEmployment(response.data));
  }, []);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState([]);
  // console.log("GP", profile.gender);
  // console.log("ID", auth.id);
  // console.log("ID2", profile.userId);
  const [genders, setGenders] = useState([]);
  const [politicalParties, setPoliticalParties] = useState([]);
  const [religions, setReligions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [pet, setPet] = useState([]);
  const [employment, setEmployment] = useState([]);

  const [editedUserProfile, setEditedUserProfile] = useState({
    gender: profile.gender,
    politicalAffiliation: profile.politicalAffiliation,
    religiousAffiliation: profile.religiousAffiliation,
    education: profile.education,
    pets: profile.pets,
    birthdate: profile.birthdate,
    zipcode: profile.zipcode,
    employmentstatus: profile.employmentStatus,
    about: profile.about,
    communicationpreference: profile.communicationPreference,
  });

  const profId = profile.id;

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setEditedUserProfile({ ...editedUserProfile, ...change });
  };
  // console.log("editedUserProfile", editedUserProfile); TO SEE INFO BEING LOADED _ UNCOMMENT

  const updateProfile = (profile, profileId) => {
    axios.put(`/api/updateProfile/:${profileId}`, profile).then((response) => {
      console.log("response data", response);
      // setAuth(response.data);
      // setError(ex.response.data.message);
    });
    // .catch((ex) => setError(ex.response.data.message));
  };

  const onSubmit = (ev) => {
    updateProfile(editedUserProfile, profId);
  };
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
          {/* <label>Gender:</label>
          <input
            name="gender"
            value={editedUserProfile.gender}
            className="form-control"
            type="text"
            placeholder={profile.gender}
            onChange={onChange}
          /> */}

          <div className="col">
            <label htmlFor="gender">Gender:</label>
            <select
              className="form-control"
              name="gender"
              id="gender"
              onChange={onChange}
            >
              <option value={editedUserProfile.gender}>{profile.gender}</option>
              {genders.map((g) => {
                return (
                  <option key={g.id} value={g.gender_name}>
                    {g.gender_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label htmlFor="politicalAffiliation">
                Political Affiliation:
              </label>
              <select
                className="form-control"
                name="politicalAffiliation"
                id="politicalAffiliation"
                placeholder="political"
                // value={editedUserProfile.politicalAffiliation}
                onChange={onChange}
              >
                <option value={editedUserProfile.politicalAffiliation}>
                  {profile.politicalaffiliation}
                </option>
                {politicalParties.map((party) => {
                  return (
                    <option key={party.id} value={party.party_name}>
                      {party.party_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col">
              <label htmlFor="religiousAffiliation">
                Religious Affiliation:{" "}
              </label>
              <select
                className="form-control"
                name="religiousAffiliation"
                id="religiousAffiliation"
                onChange={onChange}
              >
                <option value={editedUserProfile.religiousAffiliation}>
                  {profile.religiousaffiliation}{" "}
                </option>
                {religions.map((religion) => {
                  return (
                    <option key={religion.id} value={religion.religion_name}>
                      {religion.religion_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col">
            <label htmlFor="education">Education:</label>
            <select
              className="form-control"
              name="education"
              id="education"
              onChange={onChange}
            >
              <option value={editedUserProfile.education}>
                {" "}
                {profile.education}{" "}
              </option>
              {educations.map((school) => {
                return (
                  <option key={school.id} value={school.education_name}>
                    {school.education_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="pets">Pets:</label>
            <select
              className="form-control"
              name="pets"
              id="pets"
              onChange={onChange}
            >
              <option value={editedUserProfile.pets}> {profile.pets}</option>
              {pet.map((p) => {
                return (
                  <option key={p.id} value={p.pet_name}>
                    {p.pet_name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* let birthday = moment(profile.birthdate).format("MMMM Do YYYY"); */}

          <label>Birthdate:</label>
          <input
            name="birthdate"
            value={moment(profile.birthdate).format("MMMM Do YYYY")}
            className="form-control"
            type="text"
            placeholder={moment(profile.birthdate).format("MMMM Do YYYY")}
            onChange={onChange}
          />
          <label>Zipcode: </label>
          <input
            name="zipcode"
            value={profile.zipCode}
            className="form-control"
            type="text"
            placeholder={profile.zipcode}
            onChange={onChange}
          />

          <div className="col">
            <label htmlFor="employmentStatus">Employment Status:</label>
            <select
              className="form-control"
              name="employmentstatus"
              id="employmentStatus"
              onChange={onChange}
            >
              <option value={editedUserProfile.employmentStatus}>
                {profile.employmentstatus}
              </option>
              {employment.map((employ) => {
                return (
                  <option key={employ.id} value={employ.status_name}>
                    {employ.status_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="about">About You:</label>
            <textarea
              className="form-control"
              type="text"
              name="about"
              id="about"
              rows="5"
              value={profile.About}
              placeholder={profile.about}
              onChange={onChange}
            />
          </div>

          {/* <label>I prefer to be contacted by: </label>
          <input
            name="communicationpreference"
            value={profile.communicationPreference}
            className="form-control"
            type="text"
            placeholder={profile.communicationpreference}
            onChange={onChange}
          /> */}
          {/* careerid: "7196afea-99c0-46b5-8bcf-f33e526a5467" */}
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>

          {/* <Link
            className="btn"
            // to="/userinfo"
            label="UserProfileEdit"
            onSubmit={onSubmit}
          >
            Submit
          </Link> */}
        </div>{" "}
      </div>
    </div>
  );
};
export default UserProfileEdit;
