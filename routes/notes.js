const notes = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// GET route for retrieving new note
notes.get("/", (req, res) =>
  sendFile("db/db.json").then((data) => res.json(JSON.parse(data)))
);

// app.post("/", (req, res) => {
//   console.log(req.body);

//   let db = fs.readFileSync("db/db.json");
//   db = JSON.parse(db);
//   res.json(db);

//   let newNote = {
//     noteTitle: req.body.title,
//     noteText: req.body.text,
//   };

//   db.push(newNote);
//   fs.writeFileSync("db/db.json", JSON.stringify(db));
//   res.json(db);
// });

notes.post("/", (req, res) => {
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
      note_id: uuidv4(),
    };

    fs.appendFile(newNote, "db/db.json");
    res.json("New note has been created!");
  } else {
    res.error(
      "Please check your note! There was an error when trying to save."
    );
  }
});

module.exports = notes;
