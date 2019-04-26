//Your htmlRoutes.js file should include two routes:

//1.A GET Route to /survey which should display the survey page.
//2.A default, catch-all route that leads to home.html which displays the home page.

const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = router;
