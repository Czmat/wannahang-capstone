import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const SearchCriteria = ({ auth }) => {
  const [criteria, setCriteria] = useState([
    {
      // userId: '',
      gender: '',
      politicalAffiliation: '',
      religiousAffiliation: '',
      careerId: '',
      education: '',
      pets: '',
      zipCode: '',
      employmentStatus: '',
      // hobby: '',
      // ageRange: '',
    },
  ]);

  const [results, setResults] = useState([]);

  const [criteriaInput, setCriteriaInput] = useReducer(
    (criteria, setCriteriaInput) => ({ ...criteria, ...setCriteriaInput }),
    {
      // userId: '',
      gender: '',
      politicalAffiliation: '',
      religiousAffiliation: '',
      careerId: '',
      education: '',
      pets: '',
      zipCode: '',
      employmentStatus: '',
      // hobby: '',
      // ageRange: '',
    }
  );
  // useEffect(() => {
  //   axios
  //     .get('/api/search_criteria')
  //     .then((response) =>
  //       setCriteria(response.data.find(({ userId }) => userId === auth.id))
  //     );
  // }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setCriteriaInput({ [name]: value });
  };
  const [zipCode, setZipCode] = useState('');
  const [zipCodes, setZipCodes] = useState([]);
  const [careers, setCareers] = useState([]);
  const [education, setEducation] = useState([]);
  const [religions, setReligions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [employmentStatus, setEmploymentStatus] = useState([]);
  const [politicalAffiliation, setPoliticalAffiliation] = useState([]);
  const [pets, setPets] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [ageRange, setAgeRange] = useState('');
  const [hobby, setHobby] = useState('');

  useEffect(() => {
    axios.get('/api/religions').then((response) => setReligions(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/education').then((response) => setEducation(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/genders').then((response) => setGenders(response.data));
  }, []);
  useEffect(() => {
    axios
      .get('/api/employment_status')
      .then((response) => setEmploymentStatus(response.data));
  }, []);
  useEffect(() => {
    axios
      .get('/api/political_parties')
      .then((response) => setPoliticalAffiliation(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/pets').then((response) => setPets(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/hobbies').then((response) => setHobbies(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/careers').then((response) => setCareers(response.data));
  }, []);
  useEffect(() => {
    axios.get('/api/zipCodes').then((response) => setZipCodes(response.data));
  }, []);

  const searchCriteria = async (input) => {
    // ev.preventDefault();
    // await axios
    //   .post('/api/search/user_search_criteria', criteriaInput)
    //   .then((response) => setCriteria([response.data, ...criteria]));
    await axios
      .post('/api/search/user_search_criteria', input)
      .then((response) => {
        // console.log('criteria', response);
      });
    // login({ email, password }).catch((ex) =>
    //   setError(ex.response.data.message)
    // );
  };

  // const createUserInfo = (user) => {
  //   axios.post("/api/createProfile", user).then((response) => {
  //     console.log("USERINFO", response);
  //     // login({ email, password }).catch((ex) =>
  //     //   setError(ex.response.data.message)
  //     // );
  //   });
  // };

  const onSubmit = (ev) => {
    ev.preventDefault();
    // const userId = auth.id;
    searchCriteria(criteriaInput);
  };

  // const searchPerfectMatch = () => {
  //   axios
  //     .post('/api/search/perfect_match', criteriaInput)
  //     .then((response) => setResults([response.data, ...results]));
  // };
  // const searchZipCode = (zipcode) => {
  //   axios
  //     .post("/api/search/zipcode", zipcode)
  //     .then((response) => setResults([response.data, ...results]));
  // };
  const usernamesWithZipcode = async (ev) => {
    ev.preventDefault();
    await axios
      .post('/api/search/zipCode', { zipCode })
      .then((response) => setResults([response.data, ...results]));
  };
  // const usernamesWithZipcode = async (ev) => {
  //   ev.preventDefault();
  //   console.log('zipCodeSC', zipCode);
  //   await axios
  //     .post('/api/search/zipCode', zipCode)
  //     .then((response) => setResults([response.data, ...results]));
  // };

  // const onSubmit = (ev) => {
  //   ev.preventDefault();
  //   searchZipCode(zipCode);
  // };
  return (
    <div className="container">
      <h3>Tell Us Who You Want to Hang With</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="career">Where do they live?</label>
          <input
            placeholder=" -- enter zip code --"
            type="text"
            name="zipCode"
            pattern="(\d{5}([\-]\d{4})?)"
            // value={zipCode}
            // onChange={(ev) => setZipCode(ev.target.value)}
            value={criteriaInput.zipCode}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="career">What is their education?</label>
          <select
            name="education"
            className="form-control"
            type="text"
            value={criteriaInput.education}
            onChange={handleChange}
          >
            {education.map((edu) => {
              return <option key={edu.id}>{edu.education_name}</option>;
            })}
          </select>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="career">What is their occupation?</label>
            <select
              className="form-control"
              id="careerId"
              name="careerId"
              value={criteriaInput.careerId}
              onChange={handleChange}
            >
              {careers.map((career) => {
                return (
                  <option value={career.id} key={career.id}>
                    {career.career_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="employmentStatus">Their employment status?</label>
            <select
              className="form-control"
              id="employmentStatus"
              name="employmentStatus"
              value={criteriaInput.employmentStatus}
              onChange={handleChange}
            >
              {employmentStatus.map((status) => {
                return <option key={status.id}>{status.status_name}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="pets">Do they have pets?</label>
          <select
            className="form-control"
            id="pets"
            name="pets"
            value={criteriaInput.pets}
            onChange={handleChange}
          >
            {pets.map((pet) => {
              return <option key={pet.id}>{pet.pet_name}</option>;
            })}
          </select>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="age">What is their age?</label>
            <select
              type="text"
              id="ageRange"
              name="ageRange"
              value={ageRange}
              onChange={(ev) => setAgeRange(ev.target.value)}
            >
              <option value="teens">18 to 21</option>
              <option value="twenties">22 to 29</option>
              <option value="thirties">30 t0 39</option>
              <option value="forties">40 to 49</option>
              <option value="fifties">50 to 59 </option>
              <option value="sixties">60 to 69</option>
              <option value="seventies">70 to 79</option>
              <option value="goldenYears">80 and up</option>
              <option value="doesntMatter">Does Not Matter</option>
            </select>
          </div>

          <div className="col">
            {' '}
            <label htmlFor="gender">Their gender?</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={criteriaInput.gender}
              onChange={handleChange}
            >
              {genders.map((gender) => {
                return <option key={gender.id}>{gender.gender_name}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            {' '}
            <label htmlFor="politicalAffiliation">
              What is their political affiliation?
            </label>
            <select
              className="form-control"
              id="politicalAffiliation"
              name="politicalAffiliation"
              value={criteriaInput.politicalAffiliation}
              onChange={handleChange}
            >
              {politicalAffiliation.map((party) => {
                return <option key={party.id}>{party.party_name}</option>;
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="religiousAffiliation">
              What is their religious affiliation?
            </label>
            <select
              className="form-control"
              id="religiousAffiliation"
              name="religiousAffiliation"
              value={criteriaInput.religiousAffiliation}
              onChange={handleChange}
            >
              {religions.map((religion) => {
                return (
                  <option key={religion.id}>{religion.religion_name}</option>
                );
              })}
            </select>
          </div>

          <div className="col">
            <label htmlFor="hobby">What is their hobby?</label>
            <select
              className="form-control"
              name="hobby"
              id="hobby"
              value={hobby}
              onChange={(ev) => setHobby(ev.target.value)}
            >
              {hobbies.map((hobbie) => {
                return <option key={hobbie.id}>{hobbie.hobby_name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="nav-item">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SearchCriteria;
