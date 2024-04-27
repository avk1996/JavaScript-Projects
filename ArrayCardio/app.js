// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
  { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];

const people = [
  "Bernhard, Sandra",
  "Bethea, Erin",
  "Becker, Carl",
  "Bentsen, Lloyd",
  "Beckett, Samuel",
  "Blake, William",
  "Berger, Ric",
  "Beddoes, Mick",
  "Beethoven, Ludwig",
  "Belloc, Hilaire",
  "Begin, Menachem",
  "Bellow, Saul",
  "Benchley, Robert",
  "Blair, Robert",
  "Benenson, Peter",
  "Benjamin, Walter",
  "Berlin, Irving",
  "Benn, Tony",
  "Benson, Leana",
  "Bent, Silas",
  "Berle, Milton",
  "Berry, Halle",
  "Biko, Steve",
  "Beck, Glenn",
  "Bergman, Ingmar",
  "Black, Elk",
  "Berio, Luciano",
  "Berne, Eric",
  "Berra, Yogi",
  "Berry, Wendell",
  "Bevan, Aneurin",
  "Ben-Gurion, David",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bennington, Chester",
  "Bierce, Ambrose",
  "Billings, Josh",
  "Birrell, Augustine",
  "Blair, Tony",
  "Beecher, Henry",
  "Biondo, Frank",
];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
inventors.forEach((inventor) => {
  if (inventor.year >= 1500 && inventor.year < 1600) console.log(inventor.year);
});

inventors
  .filter((inventor) => inventor.year >= 1500 && inventor.year < 1600)
  .forEach((inventor) => console.table(inventor));

const fifteens = inventors.filter(
  (inventor) => inventor.year >= 1500 && inventor.year < 1600
);
console.table(fifteens);

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names

const firstLastName = inventors.map(
  (inventor) => `${inventor.first} ${inventor.last}`
);
console.table(firstLastName);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
inventors.sort((bd1, bd2) => bd1.year - bd2.year);
console.log("Oldest to yongest inventors: ");
console.table(inventors);

console.log("Sort by first name");
inventors.sort((a, b) => {
  const fname1 = a.first.toLowerCase();
  const fname2 = b.first.toLowerCase();
  return fname1 > fname2 ? 1 : -1;
});
console.table(inventors);

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
console.log("inventors age");
const ages = inventors.map((inventor) => {
  const age = inventor.passed - inventor.year;
  return `${inventor.first} ${inventor.last} Age: ${age}`;
});

console.table(ages);

const totalAge = inventors.reduce((accumulator, inventor) => {
  //   console.log(accumulator, " ", inventor.passed, " ", inventor.year);
  return accumulator + (inventor.passed - inventor.year);
}, 0);
console.log("Inventors total ages: ", totalAge);

// 5. Sort the inventors by years lived

const sortByAge = inventors.sort((a, b) => {
  const inventor1 = a.passed - a.year;
  const inventor2 = b.passed - b.year;
  return inventor1 > inventor2 ? 1 : -1;
});

console.table(sortByAge);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// const category = document.querySelector(".mw-selector");
// const links = Array.from(category.querySelectorAll("a"));
// console.log(a);

// const de = links
//   .map((link) => link.textContent)
//   .filter((streetName) => streetName.includes("de"));

// 7. sort Exercise
// Sort the people alphabetically by last name
inventors.sort((i1, i2) => {
  const last1 = i1.last.toLowerCase();
  const last2 = i2.last.toLowerCase();
  return last1 > last2 ? 1 : -1;
});

console.log("Sort people by last name");
console.table(inventors);

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = [
  "car",
  "car",
  "truck",
  "truck",
  "bike",
  "walk",
  "car",
  "van",
  "bike",
  "walk",
  "car",
  "van",
  "car",
  "truck",
];

console.log("Transportation counts");
const mobile = data.reduce((mobileObj, currentMobile) => {
  if (!mobileObj[currentMobile]) mobileObj[currentMobile] = 0;
  mobileObj[currentMobile]++;
  return mobileObj;
}, {});

console.table(mobile);
