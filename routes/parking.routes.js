import express from "express";
import { addParkings, addPlaces, changeCost, getParkings, parkCar, removePlace, unparkCar } from "../controllers/parking.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/get", protectRoute, getParkings);
router.post("/parkCar", protectRoute, parkCar);
router.post("/add", protectRoute, addPlaces);
router.delete("/remove", protectRoute, removePlace);
router.put("/changeCost", protectRoute, changeCost);
router.post("/addParking", protectRoute, addParkings);
router.post("/unparkCar", protectRoute, unparkCar);

export default router;
