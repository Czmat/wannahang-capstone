import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import DeleteAccountPopUp from './components/User/DeleteAccountPopUp';

const UserHobbiesEdit = ({ logout, auth }) => {
  return (
    <div>
      {/* //============HOBBY INFO===============// */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Hobbies</h5>
          <ul className="list-group list-group-flush">
            {/* {userHobbies.map((userHobby) => {
            return (
              <li key={userHobby.id}>{getHobbyName(userHobby.hobby_id)}</li>
            );
          })} */}
            Hobbies:
          </ul>
        </div>
      </div>
    </div>
  );
};
export default UserHobbiesEdit;
