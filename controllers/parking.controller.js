import Car from "../models/car.model.js";
import Parking from "../models/parking.model.js";
import Place from "../models/place.model.js";
import PlaceInfo from "../models/placeInfo.model.js";
import User from "../models/user.model.js";

export const getParkings = async (req, res) => {
    try {
        const parkings = await Parking.find();

        if (!parkings) return res.status(200).json();

        res.status(200).json(parkings);
    } catch (error) {
        console.log("Error in getParkings controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const addParkings = async (req, res) => {
    try {
        const { address, xCoordinate, yCoordinate, cost } = req.body;

        const parkings = await Parking.create({
            address,
            xCoordinate,
            yCoordinate,
            cost,
        })

        await parkings.save();

        res.status(200).json(parkings);
    } catch (error) {
        console.log("Error in addParkings controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const addPlaces = async (req, res) => {
    try {
        const { parkingAddress } = req.body;

        const parking = await Parking.findOne({ address: parkingAddress })

        const newPlace = await Place.create({
            parking
        })

        if (newPlace) {
            parking.freePlaces++
            parking.totalPlaces++
        }

        await Promise.all([newPlace.save(), parking.save()]);

        res.status(200).json(newPlace);


    } catch (error) {
        console.log("Error in addPlaces controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const removePlace = async (req, res) => {
    try {
        const { parkingAddress } = req.body;

        const parking = await Parking.findOne({ address: parkingAddress })

        if (!parking) {
            return res.status(404).json({ error: "Parking not found" });
        }

        if (parking.freePlaces <= 0) {
            return res.status(400).json({ error: "No free places to remove" });
        }

        const place = await Place.findOne({ parking: parking._id, status: "free" });

        if (!place) {
            return res.status(404).json({ error: "Place not found" });
        }

        await Place.deleteOne({ _id: place._id });

        parking.freePlaces--;
        parking.totalPlaces--;

        await parking.save();

        res.status(200).json({ message: "Place removed successfully" });

    } catch (error) {
        console.log("Error in removePlace controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const changeCost = async (req, res) => {
    try {
        const { cost, parkingAddress } = req.body;

        const parking = await Parking.findOne({ address: parkingAddress })

        if (!parking) {
            return res.status(404).json({ error: "Parking not found" });
        }

        parking.cost = cost;

        await parking.save();

        res.status(200).json({ message: "Cost changed successfully" });

    } catch (error) {
        console.log("Error in changeCost controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const parkCar = async (req, res) => {
    try {
        const { carNumber, parkingAddress } = req.body;

        const car = await Car.findOne({ number: carNumber });

        const parking = await Parking.findOne({ address: parkingAddress })

        if (car && parking && parking.freePlaces > 0) {
            const place = await Place.findOne({ status: "free" });
            place.status = "occupied";
            const placeInfo = await PlaceInfo.create({
                place: place._id,
                occupiedBy: car._id,
            });
            parking.freePlaces--;

            await Promise.all([place.save(), parking.save(), placeInfo.save()]);

            res.status(200).json({ place: placeInfo });
        }

    } catch (error) {
        console.log("Error in parkCar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const unparkCar = async (req, res) => {
    try {
        const { carNumber, money } = req.body;

        const car = await Car.findOne({ number: carNumber });

        const owner = await User.findOne({ _id: car.owner });

        const placeInfo = await PlaceInfo.findOne({ occupiedBy: car._id, endedAt: null });

        const place = await Place.findOne({ _id: placeInfo.place })

        const parking = await Parking.findOne({ _id: place.parking });

        if (placeInfo && place && parking) {
            placeInfo.endedAt = new Date();
            place.status = "free";
            parking.freePlaces++;
            owner.money = owner.money - money;
            await Promise.all([placeInfo.save(), place.save(), parking.save(), owner.save()]);
        }

        res.status(200).json();
    } catch (error) {
        console.log("Error in unparkCar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}