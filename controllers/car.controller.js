import Car from "../models/car.model.js";
import Parking from "../models/parking.model.js";
import Place from "../models/place.model.js";
import PlaceInfo from "../models/placeInfo.model.js";

export const addCar = async (req, res) => {
    try {
        const { mark, model, color, number } = req.body;
        const owner = req.user._id;

        const car = await Car.findOne({ number });

        if (car) res.status(400).json("Car is already added");
        else {
            const newCar = await Car.create({
                mark,
                model,
                color,
                number,
                owner
            });

            if (newCar) await newCar.save();

            res.status(201).json({
                _id: newCar._id,
                mark: newCar.mark,
                model: newCar.model,
                color: newCar.color,
                number: newCar.number,
                owner: newCar.owner,
            });
        }


    } catch (error) {
        console.log("Error in addCar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateCar = async (req, res) => {
    try {
        const user = req.user._id;
        const { number } = req.body;
        const { mark, model, color, newNumber } = req.body;

        const car = await Car.findOne({ number, owner: user });

        if (!car) {
            return res.status(404).json({ error: "Машина не найдена" });
        }

        car.mark = mark || car.mark;
        car.model = model || car.model;
        car.color = color || car.color;
        car.number = newNumber || car.number;

        await car.save();

        res.status(200).json({
            _id: car._id,
            mark: car.mark,
            model: car.model,
            color: car.color,
            number: car.number,
            owner: car.owner,
        });
    } catch (error) {
        console.log("Error in updateCar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getCars = async (req, res) => {
    try {
        const owner = req.user._id;

        const cars = await Car.find({ owner });

        res.status(200).json(cars);

    } catch (error) {
        console.log("Error in getCars controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getUnparkedCars = async (req, res) => {
    try {
        const owner = req.user._id;

        const cars = await Car.find({ owner });

        const carIds = cars.map(car => car._id);
        const placesInfo = await PlaceInfo.find({ occupiedBy: { $in: carIds } });

        const activePlacesInfo = placesInfo.filter(place => place.endedAt === null);

        const activeCarIds = activePlacesInfo.map(place => place.occupiedBy.toString());
        const filteredCars = cars.filter(car => !activeCarIds.includes(car._id.toString()));

        res.status(200).json(filteredCars);

    } catch (error) {
        console.log("Error in getCars controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getParkedCars = async (req, res) => {
    try {
        const owner = req.user._id;

        const cars = await Car.find({ owner });

        const carIds = cars.map(car => car._id);
        
        const placesInfo = await PlaceInfo.find({ occupiedBy: { $in: carIds }, endedAt: null });

        const activeCarIds = placesInfo.map(place => place.occupiedBy.toString());

        const parkedCars = cars.filter(car => activeCarIds.includes(car._id.toString()));

        const parkedCarsWithParking = await Promise.all(parkedCars.map(async car => {
            const placeInfo = await PlaceInfo.findOne({ occupiedBy: car._id, endedAt: null });
            const place = await Place.findOne({ _id: placeInfo.place });
            const parking = await Parking.findOne({ _id: place.parking });
            return {
                car,
                parking,
                startedAt: placeInfo.createdAt
            };
        }));

        res.status(200).json(parkedCarsWithParking);

    } catch (error) {
        console.log("Error in getParkedCars controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteCar = async (req, res) => {
    try {
        const user = req.user._id;

        const { number } = req.body

        const car = await Car.findOne({ number: number, owner: user });

        if (!car) return res.status(404).json({ error: "машина не найдена" });

        await Car.deleteOne({ _id: car._id });

        res.status(200).json({ message: "Машина удалена" });
    } catch (error) {
        console.log("Error in deleteCar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}