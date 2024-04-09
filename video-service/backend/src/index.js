// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/dbconnect.js";
import app from "./app.js";
dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running at http://localhost:${process.env.PORT || 8000}`
      );
    });

    app.on("error", () => {
      console.log(`Error: ${error}`);
      throw error;
    }); 
  })
  .catch(() => {
    console.log("Mongodb connection failed in index.js");
  });

/*
Method 1: to connect mongodb database

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", () => {
      console.log("Error: " + error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
})();*/
