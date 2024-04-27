const panels = document.querySelectorAll(".panel");
console.log(panels);
function toggleOpen() {
  //   console.log(this.classList);
  this.classList.toggle("open");
}
function toggleActive(e) {
  //   console.log(e.propertyName);
  if (e.propertyName === "flex-grow") {
    // console.log("clicked");
    this.classList.toggle("active-open");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);
