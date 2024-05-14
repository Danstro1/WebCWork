import express from "express";
import { addParkings, addPlaces, getParkings, parkCar, unparkCar } from "../controllers/parking.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/get", protectRoute, getParkings);
router.post("/parkCar/:id", protectRoute, parkCar)
router.post("/add/:id", protectRoute, addPlaces)
router.post("/addParking", protectRoute, addParkings)
router.post("/unparkCar", protectRoute, unparkCar)

export default router;
