const addBtn = document.querySelector(".addbtn");
const mainPage = document.querySelector(".main");
const autoSave = document.querySelector(".autosave");

const saveNote = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);

  const notesData = [];
  notes.forEach((note) => {
    notesData.push(note.value);
  });

  notes.length === 0
    ? localStorage.removeItem("notes")
    : localStorage.setItem("notes", JSON.stringify(notesData));

  // for retention of data, we use localStorage as key-value pair
  // notes is key and notesData is value
  // localStorage.setItem("notes", JSON.stringify(notesData));
};

addBtn.addEventListener("click", () => {
  addNote();
});

const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = ` 
  <div class="tool-bar">
      <button class="new">new</button>
      <button class="save">save</button>
      <button class="delete">delete</button>
  </div>
  <textarea>${text}</textarea>`;

  // delete note function:
  note.querySelector(".delete").addEventListener("click", () => {
    note.remove();
    saveNote();
  });

  // save note function
  note.querySelector(".save").addEventListener("click", () => {
    saveNote();
  });

  // add new note
  note.querySelector(".new").addEventListener("click", () => {
    addNote();
  });

  // auto save function
  autoSave.addEventListener("click", () => {
    document.getElementById("autosave").style.backgroundColor = "green";
    document.getElementById("autosave").style.color = "white";
    note.querySelector("textarea").addEventListener("focusout", () => {
      saveNote();
    });
  });

  mainPage.appendChild(note);
  // save the inital data
  saveNote();
};

// lets create a self-calling function to recover the saved data
(function () {
  const savedNotes = JSON.parse(localStorage.getItem("notes"));
  // conversion from object to array
  if (savedNotes === null) {
    addNote();
  } else {
    savedNotes.forEach((note) => {
      addNote(note);
    });
  }

  console.log(savedNotes);
})();
