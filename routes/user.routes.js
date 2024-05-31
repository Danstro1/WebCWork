import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { changeData, deleteWorker, getUser, getWorkers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get", protectRoute, getUser);
router.put("/change", protectRoute, changeData);
router.get("/getWorkers", protectRoute, getWorkers);
router.delete("/deleteWorker", protectRoute, deleteWorker);


export default router;