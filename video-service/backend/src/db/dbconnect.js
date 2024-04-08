import mongoose from "moongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log(`connection to : ${process.env.MONGODB_URI}/${DB_NAME}`);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MONGODB connection established ${connectionInstance}`);
  } catch (error) {
    console.log(`MONGODB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
