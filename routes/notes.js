const notes = require("./db/db.json");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// GET route for retrieving new note
app.get("/api/notes", (req, res) =>
  sendFile("db/db.json").then((data) => res.json(JSON.parse(data)))
);

app.post("/api/notes", (req, res) => {
  console.log(req.body);

  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  db.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(db));
  res.json(db);
});

app.delete("/api/notes:id", (req, res) => {
  for (var i = 0; i < notes.length; i++) {
    console.log(typeof notes[i].id);
    console.log(typeof req.params.is);

    if (notes[i].id == req.params.id) {
      notes.splice(i, 1);
      fs.writeFileSync("./db/db.json", JSON.stringify(notes));
      res.json(notes);
    }
  }
});

module.exports = notes;
