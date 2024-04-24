const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".minute-hand");
const hourHand = document.querySelector(".hour-hand");

const setDate = () => {
  const now = new Date();
  // console.log(now);
  const seconds = now.getSeconds();
  const degreeSeconds = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${degreeSeconds}deg)`;
  //   secondHand.style.backgroundColor = `rgb(135,${degreeSeconds},${degreeSeconds})`;

  const minutes = now.getMinutes();
  const degreeMinutes = (minutes / 60) * 360 + 90;
  minuteHand.style.transform = `rotate(${degreeMinutes}deg)`;
  //   minuteHand.style.backgroundColor = `rgb(135,${degreeSeconds},${degreeSeconds})`;

  const hours = now.getHours();
  const degreeHours = (hours / 60) * 360 + 90;
  hourHand.style.transform = `rotate(${degreeHours}deg)`;
  //   secondHand.style.backgroundColor = `rgb(135,${degreeSeconds},${degreeSeconds})`;
};

setInterval(() => {
  setDate();
}, 1000);
