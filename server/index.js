import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import jwtCheck from "./config/auth0Config.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(jwtCheck);


app.use("/api/user", userRoute)
app.use("/api/residency", residencyRoute)

app.listen(port, ()=>{
    console.log("The server is running on the port " + port )   
})