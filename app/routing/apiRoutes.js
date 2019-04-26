const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const fileName = "../data/friends.json";
const file = require(fileName);

router.get("/api/friends", (req, res) => {
  res.json(file);
});

router.post("/api/friends", (req, res) => {
  const Scores = req.body.scores.map(score => parseInt(score));

  let matchNumber = null;
  let matches = [];

  for (let friend of file) {
    let difference = 0;
    friend.scores.map((score, idx) => {
      difference += Math.abs(score - Scores[idx]);
    });

    if (matchNumber === null || matchNumber > difference) {
      matchNumber = difference;
      matches.length = 0;
      matches.push(friend);
    } else if (matchNumber === difference) {
      matches.push(friend);
    }
  }
  const NewFriend = req.body;
  NewFriend.scores = Scores;
  const UpdatedFile = [...file, NewFriend];

  fs.writeFile(
    path.join(__dirname, "../data/friends.json"),
    JSON.stringify(UpdatedFile),
    err => {
      if (err) throw err;
      console.log("written...");
      res.json(matches);
    }
  );
});

module.exports = router;
