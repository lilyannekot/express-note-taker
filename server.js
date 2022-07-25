// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const api = require("/public/assets/js/index.js");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for JSON parsing and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);

// Do I need the below if we use * on line 24?
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Listener
app.listen(PORT, function () {
  console.log(`App listening on at http://localhost${PORT}`);
});
