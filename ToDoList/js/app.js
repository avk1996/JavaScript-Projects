const textInserted = document.querySelector(".task-text");
const toDoBox = document.querySelector(".task-list");
const addTaskBtn = document.querySelector("#add");

addTaskBtn.addEventListener("click", () => {
  const taskGiven = document.querySelector(".task-text").value;
  if (taskGiven == "") alert("Given task is empty!");
  else {
    textInserted.value = "";
    console.log(`Inside add task button event listener: ${taskGiven}`);
    addTask(taskGiven);
  }
});

const addTask = (task) => {
  const taskList = document.createElement("tr");
  taskList.innerHTML = `
      <td>${task}</td>
      <td><button id="edit">edit</button></td>
      <td><button id="delete">delete</button></td>
  `;
  // <input type="text" id="edit-text"/>
  toDoBox.querySelector(".task-list table").appendChild(taskList);
  // toDoBox.appendChild(taskList);

  const deleteTask = taskList.querySelector("#delete");
  deleteTask.addEventListener("click", () => {
    taskList.remove();
  });

  const editTask = taskList.querySelector("#edit");
  editTask.addEventListener("click", () => {
    taskList.addEventListener("keyup", () => {});
    taskList.querySelector("#edit-text").value = task;
  });
};
