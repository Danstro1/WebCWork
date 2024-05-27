import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addCar, getCars } from "../controllers/car.controller.js";

const router = express.Router();

router.post("/add", protectRoute, addCar);
router.get("/get", protectRoute, getCars);

export default router;