import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import carRoutes from "./routes/car.routes.js"
import parkingRoutes from "./routes/parking.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { isAdmin, isWorker } from "./middleware/roleMiddleware.js";

const __dirname = path.resolve();

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(authMiddleware);

app.get("/workerPages/parkingControl/parking-control.html", isWorker, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/workerPages/parkingControl/parking-control.html'));
});

app.get("/admin/admin-page.html", isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/admin/admin-page.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    if (req.path === '/') {
        res.redirect('auth/login/login.html');
    } else {
        next();
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/user", userRoutes);


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