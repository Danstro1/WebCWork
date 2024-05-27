import mongoose from 'mongoose';

const dbName = 'ParkingDB';
const url = `mongodb://localhost:27017/${dbName}`;

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(url);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;