import express from "express";
import {createUser, bookVisit, getAllBookings, cancelBooking, toFav, allFaves} from "../controllers/userController.js"
const router = express.Router();
import jwtCheck from "../config/auth0Config.js";

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking)
router.post("/toFav/:rid", jwtCheck,  toFav);
router.post("/allFav", jwtCheck,  allFaves);
export {router as userRoute}

