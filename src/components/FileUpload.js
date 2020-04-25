import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import qs from "qs";
import { BrowserRouter as Router, Link } from "react-router-dom";

const FileUpload = ({ auth, params }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [page, setPage] = useState(
    <p className="medium-type">Skip This Step</p>
  );

  // console.log("AUTH", auth.id);
  let userId = auth.id;
  // console.log("USER", userId);

  const createUserPhoto = (fileName, filePath, userId) => {
    axios
      .post("/api/createPhoto", fileName, filePath, userId)
      .then((response) => {
        console.log("Response", response);
      });
  };
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        // const res = await axios.post("http://localhost:3090/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      // console.log("filePath", filePath);
      setMessage("File Uploaded");
      setPage(<p className="medium-type">Next Page</p>);
      createUserPhoto({
        fileName,
        filePath,
        userId,
      });
      console.log("HERE", fileName, filePath, userId);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("PROBLEM WITH SERVER");
        setMessage("There was a problem with the server");
      } else {
        console.log("PROBLEM HERE", err.response.data.msg);

        setMessage(err.response.data.msg);
      }
    }
  };
  console.log("file", { uploadedFile });
  console.log("Path", uploadedFile.filePath);

  // const nextPage;
  //   if (filePath) {
  //      nextPage= "Next"
  //   } else {
  //       nextPage= "Skip This Step"
  //   }

  return (
    <Fragment>
      <div>
        <header className="v-header container-wrap w-50 d-flex justify-content-center">
          <div className="fullscreen-bkgd-wrap">
            <img
              className="imgbkgd"
              src="/images/main-photo-background.jpg"
            ></img>
          </div>
          <div className="overlay"></div>
          <div className="header-content text-md-center">
            <p>
              <div className="container">
                <h4 className="display-4 text-center mb-4 welcome">
                  Welcome, {auth.firstname}!
                </h4>
                <h5 className="display-6 text-center mb-4">
                  Add a photo so people know who you are
                </h5>
                {message ? <Message msg={message} /> : null}
                <form onSubmit={onSubmit}>
                  <div className="custom-file mb-4">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {filename}
                    </label>
                  </div>

                  <Progress percentage={uploadPercentage} />

                  <input
                    type="submit"
                    value="Upload"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>

                {uploadedFile ? (
                  <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                      <h3 className="text-center">{uploadedFile.fileName}</h3>
                      <img
                        style={{ width: "100%" }}
                        src={uploadedFile.filePath}
                        alt=""
                      />
                    </div>
                  </div>
                ) : null}
                <div className="nav-item">
                  <Link className="nav-link" to="/userinfo">
                    {page}
                  </Link>
                </div>
              </div>
            </p>
          </div>
        </header>

        <section className="section section-a">
          <div className="container">
            <h2>WannaHang</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              impedit amet minima iste autem cumque et maiores blanditiis
              doloribus aut dolorum quaerat non est voluptatum, tempore ut
              dolorem voluptas quod quae accusantium, ex inventore ducimus.
              Beatae mollitia exercitationem, quam similique, consectetur
              ratione reprehenderit delectus neque eligendi facere soluta dolor
              ducimus!
            </p>
            <p>©2020 The TEC Group</p>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default FileUpload;
