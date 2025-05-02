import mongoose from "mongoose";

export const DBCONNECT = async () => {
  try {
    await mongoose.connect(process.env.DB!);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    await mongoose.disconnect();
  }
};
