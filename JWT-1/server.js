require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const posts = [
  { username: "abhishek", title: "Post1" },
  { username: "vishal", title: "Post2" },
];

app.get("/posts", (req, res) => {
  console.log(`Request is : ${req.user.name}`);
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, resp) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN);
  resp.json({ accessToken: accessToken });
});

// creating middleware for authorization
function authenticateToken(req, resp, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Authheader: " + authHeader);
  if (token === null)
    return resp.sendStatus(401).json({ message: "token is undefined" });

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data) => {
    if (err) return resp.sendStatus(403);
    req.data = data;
    next();
  });
}

app.listen(3000, () => {
  console.log("server started");
});
