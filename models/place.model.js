import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
    {
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
