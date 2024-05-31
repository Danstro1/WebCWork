import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        freePlaces: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPlaces: {
            type: Number,
            required: true,
            default: 0,
        },
        xCoordinate: {
            type: Number,
            required: true,
        },
        yCoordinate: {
            type: Number,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

const Parking = mongoose.model("Parking", parkingSchema);

export default Parking;
