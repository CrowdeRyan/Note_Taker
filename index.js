const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is the textarea
let activeNote = {};

// A function for pulling all notes from the db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};
