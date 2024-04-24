const inputs = document.querySelectorAll(".controls input");
console.log(inputs);

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  // view custom attributes in input tags
  console.log(suffix);
  // view which input is selected
  console.log(this.name);
  // document element will get reference of root node of document
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
// inputs.forEach((input) => input.addEventListener("click", handleUpdate));
