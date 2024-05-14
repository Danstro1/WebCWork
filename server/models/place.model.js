import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
        },
        parking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parking",
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "free"
        }
    },
    { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
