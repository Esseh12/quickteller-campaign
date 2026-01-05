import nodemailer from 'nodemailer';
import { connectDB } from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function sendEmail(formData) {
	const firstname = formData.get('firstname');
	const lastname = formData.get('lastname');
	const email = formData.get('email');
	const phone = formData.get('phone');
	const country = formData.get('country');
	const photoUrl = formData.get('photoUrl');

	try {
		// Validate required fields
		if (!firstname || !lastname || !email || !phone || !country) {
			return {
				success: false,
				message: 'All fields are required except photo.',
			};
		}

		// Connect to MongoDB
		await connectDB();

		// Check for existing reservation
		const exists = await Reservation.findOne({
			$or: [{ email }, { phone }],
		});

		if (exists) {
			return {
				success: false,
				message: 'A reservation with this email or phone already exists.',
			};
		}

		// Create new reservation
		const reservation = await Reservation.create({
			firstname,
			lastname,
			email,
			phone,
			country,
			photoUrl: photoUrl || '',
		});

		console.log('Reservation created:', reservation._id);

		// Send email notification
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USERNAME,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.GMAIL_USERNAME,
			to: email,
			subject: 'Reservation Successful',
			html: `
				<h2>Hello ${firstname} ${lastname}!</h2>
				<p>Your reservation has been confirmed successfully.</p>
				<p><strong>Details:</strong></p>
				<ul>
					<li><strong>Email:</strong> ${email}</li>
					<li><strong>Phone:</strong> ${phone}</li>
					<li><strong>Country:</strong> ${country}</li>
					<li><strong>Reservation Date:</strong> ${new Date().toLocaleDateString()}</li>
				</ul>
				<p>Thank you for choosing our service!</p>
			`,
		});

		return {
			success: true,
			message: 'Reservation complete! Confirmation email sent.',
		};
	} catch (err) {
		console.error('Reservation Error:', err);

		// Handle Mongoose validation errors
		if (err.name === 'ValidationError') {
			return {
				success: false,
				message: 'Invalid data provided.',
			};
		}

		// Handle duplicate key errors
		if (err.code === 11000) {
			return {
				success: false,
				message: 'Duplicate entry found. Email or phone already exists.',
			};
		}

		return {
			success: false,
			message: 'An unexpected error occurred. Please try again.',
		};
	}
}
