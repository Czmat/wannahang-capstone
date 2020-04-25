const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const db = require("./db");
const app = require("./app");

const port = process.env.PORT || 3080;

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
