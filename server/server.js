import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import carRoutes from "./routes/car.routes.js"
import parkingRoutes from "./routes/parking.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
//import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);
app.use("/api/parking", parkingRoutes);

//app.use(express.static(path.join(__dirname, "/frontend/dist")));

(async () => {
    try {
        await connectToMongoDB();
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
})();