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

// post method
app.post("/api/notes", (req, res) => {
  const noteObj = req.body;
  noteObj.id = uuidv1();
  console.log(noteObj);

  fs.readFile("db/db.json", function (error, data) {
    if (error) throw errow;
    var existingNotes = JSON.parse(data);
    existingNotes.push(noteObj);
    console.log(existingNotes);

    fs.writeFile(
      "db/db.json",
      JSON.stringify(existingNotes, null, "\t"),
      function (error) {
        if (error) throw error;
        return res.json(existingNotes);
      }
    );
  });
});

// delete Method -- come back
app.delete("/api/notes/:id", (req, res) => {
  var chosenNote = req.params.id;
  fs.readFile("db/db.json", function (error, data) {
    if (error) throw error;
    var existingNotes = JSON.parse(data);
    var newNote = function () {
      for (let index = 0; index < existingNotes.length; index++) {
        if (chosenNote == existingNotes[index].id) {
          var newArray = existingNotes.splice(index, 1);
          return newArray;
        }
      }
    };
    newNote();
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("App listner on port: " + PORT);
});
