import mongoose from "mongoose";

const connectDatabase = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(`${process.env.DB_LOCAL_URI}`);
};
export default connectDatabase;
