import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
	{
		mark: {
			type: String,
			required: true,
		},		
		model: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		number: {
			type: String,
			required: true,
		},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
	},
	{ timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
