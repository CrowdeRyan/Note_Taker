const express = require("express");
// experimenting with this a little, Let's see how it goes
const { v1: uuidv1 } = require("uuid");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// html routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// api routes
app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", function (error, data) {
    if (error) throw error;
    res.json(JSON.parse(data));
  });
});
