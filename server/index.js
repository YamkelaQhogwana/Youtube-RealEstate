import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Add CORS middleware to allow requests from 'https://youtube-real-estate-xk5e.vercel.app'
app.use(cors({
    origin: 'https://youtube-real-estate-xk5e.vercel.app'
}));

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

app.listen(port, () => {
    console.log("The server is running on the port " + port );
});
