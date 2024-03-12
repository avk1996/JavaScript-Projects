const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  console.log(button);
  addEventListener("click", (e) => {
    console.log(e);
    console.log(e.target);
    if (e.target.id === "grey") {
      document.body.style.backgroundColor = e.target.id;
    } else if (e.target.id === "blue") {
      document.body.style.backgroundColor = e.target.id;
    } else if (e.target.id === "green") {
      document.body.style.backgroundColor = e.target.id;
    } else if (e.target.id === "red") {
      document.body.style.backgroundColor = e.target.id;
    } else {
      document.body.style.backgroundColor = e.target.id;
    }
  });
});
