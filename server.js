// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for JSON parsing and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// GET route for retrieving new note
app.get("/api/notes", (req, res) => res.json(notes));

// POST route for sending new notes
app.post("/api/notes", (req, res) => {
  console.log(req.body);

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 1000000),
  };

  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// DELETE route to delete old notes
app.delete("/api/notes/:id", (req, res) => {
  for (var i = 0; i < notes.length; i++) {
    console.log(typeof notes[i].id);
    console.log(typeof req.params.id);

    if (notes[i].id == req.params.id) {
      notes.splice(i, 1);
      fs.writeFileSync("./db/db.json", JSON.stringify(notes));
      res.json(notes);
    }
  }
});

// Listener
app.listen(PORT, function () {
  console.log(`App listening on at http://localhost:${PORT}`);
});
