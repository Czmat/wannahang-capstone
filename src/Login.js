import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const goToUpload = () => history.push("/file/upload");

  const onSubmit = (ev) => {
    ev.preventDefault();
    login({ email, password })
      .then(() => goToUpload())
      .catch((ex) => {
        setError(ex.response.data.message);
      });
  };

  return (
    <div className="">
      <header className="v-header container-wrap w-50 d-flex justify-content-center">
        <div className="fullscreen-video-wrap">
          <video
            src="http://www.terribailey.com/images/Roller-Coaster.mp4"
            autoPlay={true}
            loop={true}
            muted
          ></video>
        </div>
        <div className="header-overlay"></div>
        <div className="header-content text-md-center">
          <h1>WannaHang</h1>{" "}
          <p>
            The online community of friends you have yet to meet!
            <br />
            Login{" "}
          </p>
          <div className=" ">
            <form className="" onSubmit={onSubmit}>
              {error ? (
                <p className="alert  alert-danger error " role="alert">
                  {error}
                </p>
              ) : (
                ""
              )}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted ">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              </div>
              <button className="btn btn-primary">Log In</button>
            </form>
            <Link to="/register">Create Account</Link>
          </div>
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

      {/* <section className="section section-b">
        <div className="container">
          <h2>Section B</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
            impedit amet minima iste autem cumque et maiores blanditiis
            doloribus aut dolorum quaerat non est voluptatum, tempore ut dolorem
            voluptas quod quae accusantium, ex inventore ducimus. Beatae
            mollitia exercitationem, quam similique, consectetur ratione
            reprehenderit delectus neque eligendi facere soluta dolor ducimus!
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default Login;
