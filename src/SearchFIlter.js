import React, { useState } from 'react';
import axios from 'axios';

const SearchFilter = () => {
  const [filter, setFilter] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const searchCriteria = (input) => {
    setFilter(...filter, input);
    switch (filter) {
      case 'career':
        axios
          .get('/api/careers', input)
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case 'employmentStatus':
        console.log('input', input);
        axios
          .post('/api/search/employment_status', { employmentstatus: input })
          .then((response) => {
            setFilteredProfiles([response.data, ...filteredProfiles]);
            console.log('profs', filteredProfiles);
          });
        break;
      default:
        console.log('Sorry, we are out of ' + input + '.');
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    searchCriteria('Retired');
  };

  return (
    <div>
      <h2>Test</h2>
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mt-3">
            <label htmlFor="about">Search for someone that matches my:</label>
            <select
              type="text"
              id="searchFilter"
              name="searchFilter"
              onChange={(ev) => setFilter(ev.target.value)}
            >
              <option value="career">Occupation</option>
              <option value="employmentStatus">Employment Status</option>
              <option value="pets">Pets </option>
              <option value="age">Age</option>
              <option value="gender">Gender</option>
              <option value="politicalAffiliation">
                Political affiliation
              </option>
              <option value="religiousAffiliation">
                Religious affiliation
              </option>
              <option value="hobbies">Hobbies</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {/* <div>
          <ul>
            {filteredProfiles.map((filteredProfile) => {
              return <li key={filteredProfile.length}>{filteredProfile}</li>;
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default SearchFilter;
