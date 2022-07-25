const notes = require("express").Router();
const fs = require("fs");
const path = require("path");

// GET route for retrieving new note
notes.get("/api/notes", (req, res) =>
  sendFile("../db/db.json").then((data) => res.json(JSON.parse(data)))
);

app.post("/api/notes", (req, res) => {
  console.log(req.body);

  let db = fs.readFileSync("../db/db.json");
  db = JSON.parse(db);
  res.json(db);

  let newNote = {
    noteTitle: req.body.title,
    noteText: req.body.text,
  };

  db.push(newNote);
  fs.writeFileSync("../db/db.json", JSON.stringify(db));
  res.json(db);
});

module.exports = notes;
