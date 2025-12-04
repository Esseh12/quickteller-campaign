import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true, unique: true },
		country: { type: String, required: true },
		photoUrl: { type: String },
	},
	{ timestamps: true }
);

// Prevent model overwrite error in Next.js hot reload
export default mongoose.models.Reservation ||
	mongoose.model('Reservation', ReservationSchema);
