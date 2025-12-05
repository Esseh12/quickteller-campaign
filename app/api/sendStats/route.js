import { connectDB } from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import nodemailer from 'nodemailer';

import { teamStatsEmailTemplate } from '@/app/email-templates/statsEmail';

export async function GET(req) {
	try {
		await connectDB();

		const totalReservations = await Reservation.countDocuments();

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USERNAME,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: `"Quickteller Stats" <${process.env.GMAIL_USERNAME}>`,
			to: ['primedevng@gmail.com', 'iswdesignteam@gmail.com'],
			subject: 'Quickteller Campaign — Latest Stats Update',
			html: teamStatsEmailTemplate({ totalReservations }),
		});

		return new Response(JSON.stringify({ success: true, totalReservations }), {
			status: 200,
		});
	} catch (err) {
		return new Response(
			JSON.stringify({ success: false, error: err.message }),
			{ status: 500 }
		);
	}
}
