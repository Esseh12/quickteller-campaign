import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
	if (isConnected) return;

	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error('Missing MONGODB_URI');

	try {
		const conn = await mongoose.connect(uri);
		isConnected = conn.connections[0].readyState;
		console.log('MongoDB Connected');
	} catch (error) {
		console.error('MongoDB Connection Error:', error.message);
		throw error;
	}
}
