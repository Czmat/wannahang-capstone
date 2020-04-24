import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const ChangeUserPassword = ({
  login,

  auth,
}) => {
  const [message, setMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();
  const goToUserAccount = () => history.push('/UserProfile');

  const validatePassword = async (credentials) => {
    const creds = {
      email: auth.email,
      password: credentials.currentPassword,
    };
    const tokenToValidate = (await axios.post('/api/auth/validate', creds)).data
      .token;
    const token = window.localStorage.getItem('token');
    if (tokenToValidate === token) {
      changePassword(credentials.newPassword);
    }
  };

  const changePassword = (password) => {
    const userPassword = { id: auth.id, password };
    axios
      .put(`/api/user/password/${auth.id}`, userPassword)
      .then((response) => {
        setMessage('You have changed your password successfully');
      });
  };

  const resetMessage = () => {
    setMessage('');
    setCurrentPassword('');
    setNewPassword('');
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    validatePassword({ currentPassword, newPassword }).catch((ex) =>
      setError(ex.response.data.message)
    );
    setTimeout(resetMessage, 3000);
    setTimeout(goToUserAccount, 3000);
  };

  if (!message) {
    return (
      <div>
        <form className="w-50" onSubmit={onSubmit}>
          <h1>Change your password</h1>
          <div className="error">{error}</div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Current password</label>
            <input
              //type="password"
              className="form-control"
              id="inputPassword1"
              aria-describedby="emailHelp"
              value={currentPassword}
              placeholder="current password"
              onChange={(ev) => setCurrentPassword(ev.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">New password</label>
            <input
              //type="password"
              className="form-control"
              //id="inputPassword1"
              value={newPassword}
              placeholder="new password"
              onChange={(ev) => setNewPassword(ev.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!currentPassword || !newPassword}
          >
            Change password
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="message">{message}</h2>
      </div>
    );
  }
};

export default ChangeUserPassword;
