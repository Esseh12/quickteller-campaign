import { connectDB } from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import nodemailer from 'nodemailer';

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
					message: 'A user with this email or phone number already exists',
				},
				{ status: 400 }
			);
		}

		// Create reservation
		const reservation = await Reservation.create({
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

		await transporter.sendMail({
			from: `"Reservation Team" <${process.env.GMAIL_USERNAME}>`,
			to: email,
			subject: 'Your Reservation is Confirmed',
			html: `
                <div style="font-family: Arial; line-height: 1.6;">
                    <h2>Hello ${firstname} ${lastname},</h2>
                    <p>Your reservation has been <strong>successfully confirmed!</strong></p>

                    <h3>Reservation Details</h3>
                    <ul>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                        <li><strong>Country:</strong> ${country}</li>
                        <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
                    </ul>

                    <p>Thank you for reserving your spot with us</p>
                </div>
            `,
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
