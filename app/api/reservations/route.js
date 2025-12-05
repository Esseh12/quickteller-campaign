import { connectDB } from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import nodemailer from 'nodemailer';
import { reservationEmailTemplate } from '@/app/email-templates/reservationEmail';

export async function POST(req) {
	try {
		await connectDB();
		const data = await req.formData();

		const firstname = data.get('firstname');
		const lastname = data.get('lastname');
		const email = data.get('email');
		const phone = data.get('phone');
		const country = data.get('country');
		const photoUrl = data.get('photoUrl') || '';

		// Check duplicates
		const existing = await Reservation.findOne({
			$or: [{ email }],
		});

		if (existing) {
			return Response.json(
				{
					success: false,
					message: 'Email already exists',
				},
				{ status: 400 }
			);
		}

		// Create reservation
		await Reservation.create({
			firstname,
			lastname,
			email,
			phone,
			country,
			photoUrl,
		});

		// --- SEND EMAIL ---
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USERNAME,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		// Use the external template here
		const htmlTemplate = reservationEmailTemplate({
			firstname,
			lastname,
			email,
			phone,
			country,
		});

		await transporter.sendMail({
			from: `"Reservation Team" <${process.env.GMAIL_USERNAME}>`,
			to: email,
			subject: 'Your Reservation is Confirmed',
			html: htmlTemplate,
		});

		// Return success
		return Response.json(
			{
				success: true,
				message: 'Reservation successful! Email sent.',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('API ERROR:', error);

		return Response.json(
			{
				success: false,
				message: error.message || 'Server error',
			},
			{ status: 500 }
		);
	}
}
