import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    await mongoose.connect(`${process.env.DB_LOCAL_URI}`);
  } catch {
    (err) => console.log("Database connection error: ", err);
  }
};
export default connectDatabase;
