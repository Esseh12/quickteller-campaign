import connectDB from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import nodemailer from 'nodemailer';

export async function GET(req) {
	// Check CRON_SECRET
	const authHeader = req.headers.get('Authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		await connectDB(); // connect to MongoDB
		console.log('DB connected for stats');

		// Get total reservations
		const totalReservations = await Reservation.countDocuments();

		// Send email
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USERNAME,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.GMAIL_USERNAME,
			to: 'primedevng@gmail.com',
			subject: 'Reservation Stats Update',
			html: `
        <h2>Quickteller Campaign Stats</h2>
        <p>Total reservations so far: <strong>${totalReservations}</strong></p>
        <p>Updated at: ${new Date().toLocaleString()}</p>
      `,
		});

		console.log('Stats email sent at:', new Date().toLocaleString());

		return new Response(JSON.stringify({ success: true, totalReservations }), {
			status: 200,
		});
	} catch (err) {
		console.error('Stats email error:', err);
		return new Response(
			JSON.stringify({ success: false, error: err.message }),
			{ status: 500 }
		);
	}
}
