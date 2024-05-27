import Car from "../models/car.model.js";
import Parking from "../models/parking.model.js";
import Place from "../models/place.model.js";
import PlaceInfo from "../models/placeInfo.model.js";

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
        const { address, cost } = req.body;

        const parkings = await Parking.create({
            address,
            cost,
        })

        await parkings.save();

        res.status(200).json(parkings);
    } catch (error) {
        console.log("Error in getParkings controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const addPlaces = async (req, res) => {
    try {
        const { number } = req.body;

        const { id: parkingId } = req.params;

        const parking = await Parking.findOne({ _id: parkingId });

        const place = await Place.findOne({ number, parking })

        if (!place) {
            const newPlace = await Place.create({
                number,
                parking
            })

            if (newPlace) {
                parking.freePlaces++
            }

            await Promise.all([newPlace.save(), parking.save()]);

            res.status(200).json(newPlace);
        }

    } catch (error) {
        console.log("Error in addPlaces controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const parkCar = async (req, res) => {
    try {
        const { carNumber } = req.body;

        const { id: parkingId } = req.params;

        const car = await Car.findOne({ number: carNumber });

        const parking = await Parking.findOne({ _id: parkingId })

        if (car && parking) {
            const place = await Place.findOne({ status: "free" });
            place.status = "occupied";
            const placeInfo = await PlaceInfo.create({
                place: place._id,
                occupiedBy: car._id,
            });
            parking.freePlaces--;

            await Promise.all([place.save(), parking.save(), placeInfo.save()]);

            res.status(200).json({place: placeInfo});
        }

    } catch (error) {
        console.log("Error in parkCar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const unparkCar = async (req, res) => {
    try {
        const { carNumber } = req.body;

        const car = await Car.findOne({ number: carNumber });

        const placeInfo = await PlaceInfo.findOne({ occupiedBy: car._id, endedAt: null });

        const place = await Place.findOne({ _id: placeInfo.place })

        const parking = await Parking.findOne({ _id: place.parking });

        if(placeInfo && place && parking){
            placeInfo.endedAt = new Date();
            place.status = "free";
            parking.freePlaces++;
            await Promise.all([placeInfo.save(), place.save(), parking.save()]);
        }

        res.status(200).json();
    } catch (error) {
        console.log("Error in getCar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}