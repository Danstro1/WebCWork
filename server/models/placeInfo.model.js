import mongoose from "mongoose";

const placeInfoSchema = new mongoose.Schema(
    {
        place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
            required: true,
        },
        occupiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
            default: null,
        },
        endedAt: {
            type: Date,
            default: null,
        }
    },
    { timestamps: true }
);

const PlaceInfo = mongoose.model("PlaceInfo", placeInfoSchema);

export default PlaceInfo;
