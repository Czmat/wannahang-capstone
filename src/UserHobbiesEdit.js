import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const UserHobbiesEdit = ({ auth, hobbies }) => {
  const userid = auth.id;
  const history = useHistory();
  const goToProfile = () => history.push('/UserProfile');
  const [usersHobbies, setUsersHobbies] = useState([]);
  const [userHobby, setUserHobby] = useState({});
  useEffect(() => {
    axios
      .get('/api/user_hobbies')
      .then((response) =>
        setUsersHobbies(response.data.filter((p) => p.user_id === auth.id))
      );
  }, []);

  const deleteUserHobby = (userHobbyToDestroy) => {
    axios
      .delete(`/api/user_hobbies/${userHobbyToDestroy.id}`)
      .then(() =>
        setUsersHobbies(
          usersHobbies.filter((user) => user.id !== userHobbyToDestroy.id)
        )
      );
  };

  const createUserHobby = (userhobby) => {
    axios
      .post('/api/createUserHobbies', userhobby)
      .then((response) => setUsersHobbies([response.data, ...usersHobbies]));
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newVal = hobbies.find((h) => h.hobby_name === value);
    setUserHobby({ [name]: newVal.id, user_id: userid });
  };

  const onSubmit = (event) => {
    event.preventDefault(event);
    createUserHobby(userHobby);
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
              {usersHobbies.map((userhobby) => (
                <li key={userhobby.id}>
                  {userhobby.hobby_name}
                  <button
                    type="button"
                    onClick={() => deleteUserHobby(userhobby)}
                  >
                    Delete Hobby
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <form>
                <label htmlFor="about">Add another hobby</label>
                <select
                  className="form-control"
                  id="hobbies"
                  name="hobby_id"
                  onChange={handleChange}
                >
                  <option name="hobby_id" value="hobby_id">
                    {' '}
                    --select your option--{' '}
                  </option>
                  {hobbies.map((hobby) => {
                    return (
                      <option
                        name="hobby_id"
                        key={hobby.id}
                        value={hobby.hobby_id}
                      >
                        {hobby.hobby_name}
                      </option>
                    );
                  })}
                </select>
                <button type="submit" onClick={(e) => onSubmit(e)}>
                  Save Hobby
                </button>
              </form>
            </div>
            <div>
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
