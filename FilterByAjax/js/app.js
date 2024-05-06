const cityEndpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let cities = [];

// const prom = fetch(cityEndpoint);
// console.log(prom);

fetch(cityEndpoint)
  .then((result) => result.json())
  .then((data) => cities.push(...data))
  .catch((err) => {
    console.log("Error fetching data: ", err);
  });

console.log(cities);
console.table(cities);
