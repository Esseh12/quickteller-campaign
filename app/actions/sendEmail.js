import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb.js';

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

		const client = await clientPromise;
		const db = client.db('reservations_db');
		const collection = db.collection('reservations');

		// Check for existing reservation
		const exists = await collection.findOne({
			$or: [{ email }, { phone }],
		});

		if (exists) {
			return {
				success: false,
				message: 'A reservation with this email or phone already exists.',
			};
		}

		// Insert into MongoDB
		const result = await collection.insertOne({
			firstname,
			lastname,
			email,
			phone,
			country,
			photoUrl: photoUrl || '',
			createdAt: new Date(),
		});

		console.log('Inserted document ID:', result.insertedId);

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

		// Handle specific MongoDB errors
		if (err.code === 11000) {
			return {
				success: false,
				message: 'Duplicate entry found. Email or phone already exists.',
			};
		}

		if (err.message.includes('ECONNREFUSED')) {
			return {
				success: false,
				message: 'Database connection failed. Please try again later.',
			};
		}

		return {
			success: false,
			message: 'An unexpected error occurred. Please try again.',
		};
	}
}
