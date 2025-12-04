import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
	if (isConnected) return;

	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error('Please add MONGODB_URI to .env');

	try {
		const conn = await mongoose.connect(uri, {
			dbName: 'reservation_db',
		});
		isConnected = conn.connections[0].readyState;
		console.log('MongoDB Connected');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw error;
	}
}
