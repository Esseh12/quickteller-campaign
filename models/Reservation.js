import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'First name is required'],
		trim: true,
	},
	lastname: {
		type: String,
		required: [true, 'Last name is required'],
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
		trim: true,
		validate: {
			validator: function (v) {
				return v.endsWith('@gmail.com');
			},
			message: 'Only Gmail addresses are allowed',
		},
	},
	phone: {
		type: String,
		required: [true, 'Phone number is required'],
		unique: true,
		trim: true,
		validate: {
			validator: function (v) {
				return /^[0-9]+$/.test(v);
			},
			message: 'Phone number should contain only numbers',
		},
	},
	country: {
		type: String,
		required: [true, 'Country is required'],
		enum: ['Nigeria', 'Ghana', 'Kenya', 'South Africa'],
	},
	photoUrl: {
		type: String,
		default: '',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Create indexes
reservationSchema.index({ email: 1 }, { unique: true });
reservationSchema.index({ phone: 1 }, { unique: true });
reservationSchema.index({ createdAt: -1 });

// Prevent duplicate model error in Next.js
const Reservation =
	mongoose.models.Reservation ||
	mongoose.model('Reservation', reservationSchema);

export default Reservation;
