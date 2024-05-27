import Car from "../models/car.model.js";

export const addCar = async (req, res) => {
    try {
        const {brand, model, color, number} = req.body;
        const owner = req.user._id;

        const car = await Car.findOne({
            number: { $all: number },
        })

        if(car) res.status(200).json("Car is already added");
        else{
            const newCar = await Car.create({
                brand,
                model,
                color,
                number,
                owner
            });
    
            if(newCar) await newCar.save();
    
            res.status(201).json({
                _id: newCar._id,
                brand: newCar.brand,
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