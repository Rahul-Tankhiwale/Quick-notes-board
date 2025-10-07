// Quick Notes Board — DOM-focused Starter
// Complete solution with explanations beside each TODO

// ------------------------
// State
// ------------------------
var notes = []; // Each note: { id: string, title: string, text: string }
var filterText = "";

// ------------------------
// DOM References
// ------------------------
var notesEl = document.getElementById("notes");
var formEl = document.getElementById("note-form");
var titleInput = document.getElementById("title");
var textInput = document.getElementById("text");
var submitBtn = document.getElementById("submit-btn");
var cancelEditBtn = document.getElementById("cancel-edit");
var editingIdInput = document.getElementById("editing-id");
var titleErrorEl = document.getElementById("title-error");
var filterInput = document.getElementById("filter");

// ------------------------
// Init
// ------------------------
function init() {
  // TODO(1): Render notes from the current state (notes array).
  // ✅ Explanation: Initially draw any existing notes (empty at first).
  renderNotes();

  // Events
  formEl.addEventListener("submit", onSubmit);
  cancelEditBtn.addEventListener("click", onCancelEdit);
  filterInput.addEventListener("input", onFilterChange);

  // TODO(2): Add event delegation on the notes container for Edit/Delete buttons.
  // ✅ Explanation: Instead of attaching events to every note button, we use delegation on parent.
  notesEl.addEventListener("click", onNotesClick);
}
init();

// ------------------------
// Rendering
// ------------------------
function renderNotes() {
  // TODO(3): Clear notesEl content before re-rendering.
  // ✅ Explanation: Remove previous DOM elements before drawing updated notes.
  notesEl.innerHTML = "";

  // TODO(4): Compute filtered list from notes array using filterText.
  // ✅ Explanation: Only show notes whose title or text matches filterText.
  var visibleNotes = notes.filter(function (note) {
    return (
      note.title.toLowerCase().includes(filterText.toLowerCase()) ||
      note.text.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  // TODO(5): If no visible notes, show a <p class="muted"> message and return.
  // ✅ Explanation: Display message when there are no matching notes.
  if (visibleNotes.length === 0) {
    var msg = document.createElement("p");
    msg.className = "muted";
    msg.textContent = "No notes found.";
    notesEl.appendChild(msg);
    return;
  }

  // TODO(6): For each visible note, build the DOM structure using createElement.
  // ✅ Explanation: Dynamically create HTML for each note and add Edit/Delete buttons.
  visibleNotes.forEach(function (note) {
    var article = document.createElement("article");
    article.className = "note";
    article.dataset.id = note.id;

    var h3 = document.createElement("h3");
    h3.textContent = note.title;

    var p = document.createElement("p");
    p.textContent = note.text;

    var actions = document.createElement("div");
    actions.className = "note-actions";

    var editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(actions);

    notesEl.appendChild(article);
  });
}

// ------------------------
// Events
// ------------------------
function onSubmit(e) {
  e.preventDefault();
  clearError();

  var title = titleInput.value.trim();
  var text = textInput.value.trim();
  var editingId = editingIdInput.value;

  // TODO(7): Validate that title is not empty.
  // ✅ Explanation: Prevent blank titles and show error message.
  if (!title) {
    titleErrorEl.textContent = "Title is required.";
    return;
  }

  if (editingId) {
    // EDIT MODE

    // TODO(8): Find the note by id and update its title and text.
    // ✅ Explanation: Locate the existing note in array and change its values.
    var note = notes.find((n) => n.id === editingId);
    if (note) {
      note.title = title;
      note.text = text;
    }

    // TODO(9): Reset the form back to "Add Note" mode (editingIdInput, buttons, labels).
    // ✅ Explanation: Clear edit mode and restore default form behavior.
    editingIdInput.value = "";
    submitBtn.textContent = "Add Note";
    cancelEditBtn.style.display = "none";
  } else {
    // ADD MODE

    // TODO(10): Create a new note object with a unique id (e.g., Date.now().toString()).
    // ✅ Explanation: Build a new note object with unique ID and user data.
    var newNote = {
      id: Date.now().toString(),
      title: title,
      text: text,
    };

    // TODO(11): Push the new note into the notes array.
    // ✅ Explanation: Add the new note to our notes list (state).
    notes.push(newNote);
  }

  // TODO(12): Re-render notes and reset the form fields.
  // ✅ Explanation: Refresh the note list and clear input fields after submit.
  renderNotes();
  formEl.reset();
}

function onCancelEdit() {
  // TODO(13): Clear edit state and reset form to "Add Note" mode.
  // ✅ Explanation: User cancels editing, so we clear editingId and restore form UI.
  editingIdInput.value = "";
  submitBtn.textContent = "Add Note";
  cancelEditBtn.style.display = "none";
  formEl.reset();
  clearError();
}

function onFilterChange(e) {
  // TODO(14): Update filterText from the input value and re-render notes.
  // ✅ Explanation: Whenever the filter text changes, we update filterText and re-render filtered notes.
  filterText = e.target.value.trim();
  renderNotes();
}

// TODO(15): Implement delegated click handling for Edit/Delete actions on the notes board.
// ✅ Explanation: Listen for clicks on Edit/Delete buttons, identify the note by its dataset id,
// then either load it into the form (Edit) or remove it (Delete).
function onNotesClick(e) {
  var target = e.target;
  if (!target.matches(".edit-btn, .delete-btn")) return;

  var article = target.closest(".note");
  var id = article.dataset.id;

  if (target.classList.contains("edit-btn")) {
    var note = notes.find((n) => n.id === id);
    if (note) {
      titleInput.value = note.title;
      textInput.value = note.text;
      editingIdInput.value = id;
      submitBtn.textContent = "Save Changes";
      cancelEditBtn.style.display = "inline-block";
      clearError();
    }
  }

  if (target.classList.contains("delete-btn")) {
    notes = notes.filter((n) => n.id !== id);
    renderNotes();
  }
}


function clearError() {
  // TODO(16): Clear any validation messages (e.g., titleErrorEl.textContent = "")
  // ✅ Explanation: Simple helper to remove previous error message before revalidation.
  titleErrorEl.textContent = "";
}
