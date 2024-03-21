const textInserted = document.querySelector(".task-text");
const toDoBox = document.querySelector(".task-list");
const addTaskBtn = document.querySelector("#add");

addTaskBtn.addEventListener("click", () => {
  const taskGiven = document.querySelector(".task-text").value;
  console.log(`Inside add task button event listener: ${taskGiven}`);
  addTask(taskGiven);
});

const addTask = (task) => {
  const taskList = document.createElement("div");
  taskList.innerHTML = `
  <div class="task-given">${task}</div>
  <div><button id="edit">edit task</button></div>
  <div><button id="delete">delete task</button></div>
  `;

  toDoBox.appendChild(taskList);
};
