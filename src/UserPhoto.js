import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPhoto = ({ logout, auth }) => {
  const [profile, setProfile] = useState([]);
  const [photo, setPhoto] = useState([]);
  useEffect(() => {
    axios
      .get("/api/profiles")
      .then((response) =>
        setProfile(response.data.find(({ userId }) => userId === auth.id))
      );
    axios
      .get("/api/photos")
      .then((response) =>
        setPhoto(response.data.find(({ userId }) => userId === auth.id))
      );
  }, []);
  console.log(photo);

  let myPhotoPath;
  if (photo == undefined) {
    myPhotoPath = "/uploads/avatar.jpg";
  } else {
    myPhotoPath = photo.filepath;
    // console.log(myPhotoPath);
  }

  return (
    // <div className="container">
    //   All About {auth.username}{" "}
    <div className="">
      <img className="nav-photo" src={myPhotoPath} />
    </div>
    // </div>
  );
};
export default UserPhoto;
