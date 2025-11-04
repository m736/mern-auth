import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/database.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import ErrorMiddleWare from "./middleware/error.js";
const app = express();
const port = process.env.PORT || 4000;
connectDatabase();
app.use(express.json());
app.use(cookieParser());
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://mern-auth-oepn.onrender.com",
// ];
// app.use(cors({ origin: allowedOrigins, credentials: true }));
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => res.send("API working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(port, () => console.log(`Server startted on PORT:${port}`));
app.use(ErrorMiddleWare);
