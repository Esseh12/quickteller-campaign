import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Reservation from '@/models/Reservation';
import nodemailer from 'nodemailer';

export async function POST(request) {
	console.log('Reservation API called');

	try {
		const formData = await request.formData();

		const firstname = formData.get('firstname');
		const lastname = formData.get('lastname');
		const email = formData.get('email');
		const phone = formData.get('phone');
		const country = formData.get('country');
		const photoUrl = formData.get('photoUrl');

		console.log('Processing reservation for:', email);

		// Connect to MongoDB using Mongoose
		await connectDB();
		console.log('Database connected');

		// Check for duplicates (Mongoose will also catch unique constraint errors)
		const existing = await Reservation.findOne({
			$or: [{ email }, { phone }],
		});

		if (existing) {
			console.log('Duplicate found');
			return NextResponse.json(
				{
					success: false,
					message:
						existing.email === email
							? 'A reservation with this email already exists.'
							: 'A reservation with this phone number already exists.',
				},
				{ status: 409 }
			);
		}

		// Create new reservation
		const reservation = new Reservation({
			firstname,
			lastname,
			email,
			phone,
			country,
			photoUrl: photoUrl || '',
		});

		// Save to database (Mongoose will validate automatically)
		await reservation.save();
		console.log('Reservation saved:', reservation._id);

		// Send email (optional)
		if (process.env.GMAIL_USERNAME && process.env.GMAIL_PASSWORD) {
			try {
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
            <p><strong>Reservation ID:</strong> ${reservation._id}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p>Thank you for choosing our service!</p>
          `,
				});
				console.log('Confirmation email sent');
			} catch (emailError) {
				console.log('Email sending failed (optional), but reservation saved');
			}
		}

		return NextResponse.json({
			success: true,
			message: 'Reservation complete! Confirmation email sent.',
			reservationId: reservation._id,
		});
	} catch (err) {
		console.error('Error:', err.message);

		// Handle Mongoose validation errors
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map((e) => e.message);
			return NextResponse.json(
				{ success: false, message: messages.join(', ') },
				{ status: 400 }
			);
		}

		// Handle duplicate key error
		if (err.code === 11000) {
			return NextResponse.json(
				{
					success: false,
					message: 'A reservation with this email or phone already exists.',
				},
				{ status: 409 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: 'An error occurred. Please try again.',
				error: process.env.NODE_ENV === 'development' ? err.message : undefined,
			},
			{ status: 500 }
		);
	}
}
