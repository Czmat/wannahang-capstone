import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateNewUser = ({ login }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const history = useHistory();
  const goToUploadPhoto = () => history.push('/file/upload');

  const createUser = (user) => {
    axios.post('/api/users', user).then((response) => {
      login({ email, password }).catch((ex) =>
        setError(ex.response.data.message)
      );
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (confirmPassword !== password) {
      return setPasswordError("Confirm password doesn't match");
    } else {
      createUser({
        firstname,
        lastname,
        username,
        // zipcode,
        email,
        phone,
        password,
        // birthday,
        // gender,
      });
      goToUploadPhoto();
    }
  };
  return (
    <div className="container-sm">
      <hr />
      <h1>Join the Fam!</h1>
      <form className="w-50" onSubmit={onSubmit}>
        <div className="row form-group">
          <div className="col">
            <input
              value={firstname}
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(ev) => setFirstname(ev.target.value)}
            />
          </div>
          <div className="col">
            <input
              value={lastname}
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(ev) => setLastname(ev.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            value={username}
            className="form-control"
            type="text"
            placeholder="Username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={phone}
            className="form-control"
            type="text"
            placeholder="phone number"
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            type="email"
            className="form-control"
            id="inputEmail1"
            aria-describedby="emailHelp"
            placeholder="email address"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <input
            value={password}
            type="password"
            className="form-control"
            id="inputPassword1"
            placeholder="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={confirmPassword}
            type="password"
            className="form-control"
            id="inputConfirmPassword1"
            placeholder="confirm password"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
          />
          <div>{passwordError}</div>
        </div>
        <button
          className="btn btn-primary"
          disabled={
            !firstname ||
            !lastname ||
            !email ||
            !phone ||
            !username ||
            !password
          }
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateNewUser;
