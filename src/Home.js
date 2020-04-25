import React, { useState } from "react";
import { Player } from "video-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import qs from "qs";

const Home = (login) => {
  return (
    <div>
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
          <img
            src="/images/WannaHang.png"
            alt="WannaHang Logo"
            className="logo"
          />
          <h1>WannaHang</h1>{" "}
          <p>
            The online community of friends you have yet to meet!
            {/* <br />
            WannaHang */}
          </p>
          <form className=" my-2 my-lg-0">
            <Link
              className="btn btn-outline-success my-2 my-sm-0 mr-2"
              to="/register"
            >
              Create New Account
            </Link>
            <Link
              to="/login"
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
            >
              Log In
            </Link>
          </form>{" "}
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
export default Home;
