const addBtn = document.querySelector(".addbtn");
const mainPage = document.querySelector(".main");

addBtn.addEventListener("click", () => {
  addNote();
});

const addNote = () => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `  <div class="tool-bar">
        <button>new</button>
        <button>save</button>
        <button>delete</button>
    </div>
    <textarea></textarea>`;

  mainPage.appendChild(note);
};
