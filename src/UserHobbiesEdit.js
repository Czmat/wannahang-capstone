import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const UserHobbiesEdit = ({ auth, hobbies }) => {
  const userid = auth.id;
  const history = useHistory();
  const goToProfile = () => history.push('/UserProfile');
  const [usersHobbies, setUsersHobbies] = useState([]);
  useEffect(() => {
    axios
      .get('/api/user_hobbies')
      .then((response) =>
        setUsersHobbies(response.data.filter((p) => p.user_id === auth.id))
      );
  }, []);
  console.log(usersHobbies);
  const deleteUserHobby = (userHobbyToDestroy) => {
    axios
      .delete(`/api/user_hobbies/${userHobbyToDestroy.id}`)
      .then(() =>
        setUsersHobbies(
          usersHobbies.filter((user) => user.id !== userHobbyToDestroy.id)
        )
      );
  };

  const createUserHobby = (hobby) => {
    axios
      .post('/api/createUserHobbies', hobby)
      .then((response) => setUsersHobbies(response.data));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createUserHobby({
      userid,
      hobbyId,
    });
  };
  const onReturn = (event) => {
    event.preventDefault();
    goToProfile();
  };
  if (!hobbies || !usersHobbies) {
    return <p>Loading</p>;
  } else {
    return (
      <div>
        {/* //============HOBBY INFO===============// */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Hobbies</h5>
            <ul className="list-group list-group-flush">
              {usersHobbies.map((userHobby) => (
                <li key={userHobby.id}>
                  {userHobby.hobby_id}
                  <button
                    type="button"
                    onClick={() => deleteUserHobby(userHobby)}
                  >
                    Delete Hobby
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <button type="submit" onSubmit={(e) => onSubmit(e)}>
                Save Hobby
              </button>
              <button type="button" onClick={(e) => onReturn(e)}>
                Return to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserHobbiesEdit;
