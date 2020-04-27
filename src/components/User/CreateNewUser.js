import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Player } from "video-react";

const CreateNewUser = ({ login }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [birthday, setBirthday] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();
  const goToUploadPhoto = () => history.push("/file/upload");
  const goToLogIn = () => history.push("/login");

  const createUser = (user) => {
    axios.post("/api/users", user).then((response) => {
      login({ email, password }).catch((ex) =>
        setError(ex.response.data.message)
      );
    });
  };

  const redirect = (event) => {
    event.preventDefault();
    goToLogIn();
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
    <div>
      <header className="v-header container-wrap w-50 d-flex justify-content-center">
        <div className="fullscreen-video-wrap">
          <video
            src="https://www.precisioncabinetinc.com/Roller-Coaster.mp4"
            autoPlay={true}
            loop={true}
            muted
          ></video>
        </div>
        <div className="header-overlay"></div>
        <div className="header-content text-md-center">
          <h1>WannaHang</h1>
          <p>Sign up today and find a new friend</p>
          <form className="text-center" onSubmit={onSubmit}>
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
              className="btn btn-success my-2 my-sm-0"
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
            <button
              className="btn btn-success my-2 my-sm-0"
              type="button"
              onClick={(event) => {
                redirect(event);
              }}
            >
              Log In
            </button>
          </form>
        </div>
      </header>
      <section className="section section-a">
        <div className="container">
          <h2>WannaHang</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
            impedit amet minima iste autem cumque et maiores blanditiis
            doloribus aut dolorum quaerat non est voluptatum, tempore ut dolorem
            voluptas quod quae accusantium, ex inventore ducimus. Beatae
            mollitia exercitationem, quam similique, consectetur ratione
            reprehenderit delectus neque eligendi facere soluta dolor ducimus!
          </p>
          <p>©2020 The TEC Group</p>
        </div>
      </section>
    </div>
  );
};

export default CreateNewUser;
