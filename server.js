import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import carRoutes from "./routes/car.routes.js"
import parkingRoutes from "./routes/parking.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

const __dirname = path.resolve();

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    if (req.path === '/') {
      res.redirect('html/login.html');
    } else {
      next();
    }
  });

app.use(express.static(path.join(__dirname, '/public')));
app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);
app.use("/api/parking", parkingRoutes);


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