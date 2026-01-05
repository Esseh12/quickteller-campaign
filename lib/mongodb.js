import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
	if (isConnected) return;

	// reads the mongoDB connection string from environment variabless
	const uri = process.env.MONGODB_URI;
	// throw error if uri is not defined
	if (!uri) throw new Error('Missing MONGODB_URI');

	try {
		// Connect to MongoDB using mongoose and waits until connection is established
		const conn = await mongoose.connect(uri);
		// update connection flag based on mongoose connection state
		isConnected = conn.connections[0].readyState;
		console.log('MongoDB Connected');
	} catch (error) {
		console.error('MongoDB Connection Error:', error.message);
		throw error;
	}
}
