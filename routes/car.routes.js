import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addCar, deleteCar, getCars, getParkedCars, getUnparkedCars, updateCar } from "../controllers/car.controller.js";

const router = express.Router();

router.post("/add", protectRoute, addCar);
router.get("/get", protectRoute, getCars);
router.get("/getUnparked", protectRoute, getUnparkedCars);
router.get("/getParked", protectRoute, getParkedCars);
router.delete("/delete", protectRoute, deleteCar);
router.put("/update", protectRoute, updateCar);


export default router;