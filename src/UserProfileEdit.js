import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import DeleteAccountPopUp from './components/User/DeleteAccountPopUp';

const UserProfileEdit = ({ logout, auth, params }) => {
  const history = useHistory();
  const goToProfile = () => history.push('/UserProfile');

  const deleteAccount = () => {
    axios.delete(`/api/users/${auth.id}`);
  };
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get('/api/profiles')
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );

    axios
      .get('/api/political_parties')
      .then((response) => setPoliticalParties(response.data));

    axios.get('/api/genders').then((response) => setGenders(response.data));

    axios.get('/api/careers').then((response) => setCareers(response.data));

    axios.get('/api/religions').then((response) => setReligions(response.data));

    axios
      .get('/api/education')
      .then((response) => setEducations(response.data));

    axios.get('/api/pets').then((response) => setPet(response.data));

    axios
      .get('/api/employment_status')
      .then((response) => setEmployment(response.data));
  }, []);
  // const [editedUserProfile, setEditedUserProfile] = useState(profile);

  const [error, setError] = useState('');
  const [genders, setGenders] = useState([]);
  const [careers, setCareers] = useState([]);
  const [politicalParties, setPoliticalParties] = useState([]);
  const [religions, setReligions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [pet, setPet] = useState([]);
  const [employment, setEmployment] = useState([]);

  const profId = profile.id;

  const getCareerName = (cid) => {
    const career = careers.find((c) => c.id === cid);
    if (career) {
      return career.career_name;
    }
  };
  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setProfile({ ...profile, ...change });
  };
  // console.log("editedUserProfile", editedUserProfile); TO SEE INFO BEING LOADED _ UNCOMMENT

  const updateProfile = (profile, profileId) => {
    axios.put(`/api/updateProfile/:${profileId}`, profile).then((response) => {
      // console.log('response data', response);
      // setAuth(response.data);
      // setError(ex.response.data.message);
    });
    // .catch((ex) => setError(ex.response.data.message));
  };

  const onSubmit = (ev) => {
    updateProfile(profile, profId);
    goToProfile();
  };

  // console.log('profile', profile);

  // const [editedUserProfile, setEditedUserProfile] = useState(profile);
  // console.log('eup', editedUserProfile);
  return (
    <div className="container">
      <h3 className="userName">
        All About {auth.username}{' '}
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
            Would you like to reset your password?{' '}
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
              value={profile.gender}
              onChange={onChange}
            >
              <option value={profile.gender}>{profile.gender}</option>
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
                name="politicalaffiliation"
                id="politicalaffiliation"
                placeholder="political"
                value={profile.politicalaffiliation}
                onChange={onChange}
              >
                <option value={profile.politicalaffiliation}>
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
                Religious Affiliation:{' '}
              </label>
              <select
                className="form-control"
                name="religiousaffiliation"
                id="religiousAffiliation"
                value={profile.religiousaffiliation}
                onChange={onChange}
              >
                <option value={profile.religiousaffiliation}>
                  {profile.religiousaffiliation}{' '}
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
              value={profile.education}
              onChange={onChange}
            >
              <option value={profile.education}> {profile.education} </option>
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
              value={profile.pets}
              onChange={onChange}
            >
              <option value={profile.pets}> {profile.pets}</option>
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
            value={moment(profile.birthdate).format('MMMM Do YYYY')}
            className="form-control"
            type="text"
            placeholder={moment(profile.birthdate).format('MMMM Do YYYY')}
            onChange={onChange}
          />
          <label>Zipcode: </label>
          <input
            name="zipcode"
            value={profile.zipcode}
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
              value={profile.employmentstatus}
              onChange={onChange}
            >
              <option value={profile.employmentstatus}>
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

          <div className="col">
            <label htmlFor="careerid">Occupation:</label>
            <select
              className="form-control"
              name="careerid"
              id="careerid"
              value={profile.careerid}
              onChange={onChange}
            >
              <option value={profile.careerid}>
                {getCareerName(profile.careerid)}
              </option>
              {careers.map((career) => {
                return (
                  <option key={career.id} value={career.id}>
                    {career.career_name}
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
              value={profile.about}
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
        </div>{' '}
      </div>
    </div>
  );
};
export default UserProfileEdit;
