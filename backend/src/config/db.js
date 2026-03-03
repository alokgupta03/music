import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Connected to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected successfully");
};

export default connectDB;
