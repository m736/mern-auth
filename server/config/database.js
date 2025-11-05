import mongoose from "mongoose";
const connection = {};
const connectDatabase = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
    // mongoose.connection.on("connected", () =>
    //   console.log("Database connected")
    // );
    // await mongoose.connect(`${process.env.DB_LOCAL_URI}`);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export default connectDatabase;
