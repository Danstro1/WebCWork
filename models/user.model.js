import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 40
		},		
		surname: {
			type: String,
			required: true,
			maxlength: 40
		},
		phone: {
			type: String,
			required: true,
			maxlength: 11
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		money: {
			type: Number,
			default: 100000,
		},
		isWorker: {
			type: Boolean,
			default: false,
		}
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
