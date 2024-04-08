// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/dbconnect.js";
dotenv.config({ path: "./env" });

connectDB();

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
