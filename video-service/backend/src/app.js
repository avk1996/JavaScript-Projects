import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//configuration

// 1. we need to set origin ip for client to access data from here(backend)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// 2. setting up the limit for json from client, whoever is sending me data in json format must be within 16 kb
app.use(express.json({ limit: "16kb" }));

// 3. encode the url only parses with encoded bodies/payload
// payload is some data that you transfer to server using api requests
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// 4. images or any asset for public use
app.use(express.static("public"));

app.use(cookieParser());
export default app;
