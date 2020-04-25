import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchFilter = () => {
  const [filter, setFilter] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const searchCriteria = (input) => {
    switch (input) {
      case 'Occupation':
        axios
          .get('/api/careers', input)
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case 'Employment Status':
        axios
          .get('/api/employment_status', input)
          .then((response) =>
            setFilteredProfiles([response.data, ...filteredProfiles])
          );
        break;
      case 'Age':
        console.log('Mangoes and papayas are $2.79 a pound.');
        break;
      case 'Pets':
        console.log('Oranges are $0.59 a pound.');
        break;
      case 'Gender':
        console.log('Oranges are $0.59 a pound.');
        break;
      case 'Political affiliation':
        console.log('Oranges are $0.59 a pound.');
        break;
      case 'Religious affiliation':
        console.log('Oranges are $0.59 a pound.');
        break;
      default:
        console.log('Sorry, we are out of ' + expr + '.');
        break;
    }

    const onSubmit = (event) => {
      event.preventDefault();
      searchCriteria();
    };

    return (
      <div>Please work</div>
      // <div>
      //   <form onSubmit={(e) => onSubmit(e)}>
      //     <div className="form-group mt-3">
      //       <label htmlFor="about">Search for someone that matches my:</label>
      //       <select
      //         type="text"
      //         id="searchFilter"
      //         name="searchFilter"
      //         onChange={(ev) => setFilter(ev.target.value)}
      //       >
      //         <option value="career">Occupation</option>
      //         <option value="employmentStatus">Employment Status</option>
      //         <option value="pets">Pets </option>
      //         <option value="age">Age</option>
      //         <option value="gender">Gender</option>
      //         <option value="politicalAffiliation">
      //           Political affiliation
      //         </option>
      //         <option value="religiousAffiliation">
      //           Religious affiliation
      //         </option>
      //         <option value="hobbies">Hobbies</option>
      //       </select>
      //     </div>
      //     <button type="submit">Submit</button>
      //   </form>
      //   {/* <div>
      //     <ul>
      //       {filteredProfiles.map((filteredProfile) => {
      //         return (
      //           <li key={filteredProfile.id} className="col-sm-4">
      //             {filteredProfile}
      //           </li>
      //         );
      //       })}
      //     </ul>
      //   </div> */}
      // </div>
    );
  };
};

export default SearchFilter;
