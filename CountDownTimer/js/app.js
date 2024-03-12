const endDate = "15 March 2024 10:00 PM";
// new Date().toUTCString();

document.querySelector("#end-date").innerHTML = endDate;

const timer = () => {
  const end = new Date(endDate);
  // time difference in seconds
  // consversion to seconds
  const now = new Date();
  let diff = (end - now) / 1000;
  diff = Math.floor(diff);
  if (diff < 0) {
    document.querySelectorAll("input").value = 0;
  } else {
    // console.log(end, now);
    document.querySelector("#seconds").value = diff;
    // conversion to minutes
    diff = Math.floor(diff / 60);
    document.querySelector("#minutes").value = diff;
    // conversion to hours
    diff = Math.floor(diff / 60);
    document.querySelector("#hours").value = diff;
    // conversion to date
    diff = Math.floor(diff / 24);
    document.querySelector("#days").value = diff;
  }
};

setInterval(timer, 1000);
// timer();
