import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
	const authHeader = req.headers.get('Authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const client = await clientPromise;
		const db = client.db('reservations_db');
		const collection = db.collection('reservations');

		const totalReservations = await collection.countDocuments();

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
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error('Stats email error:', err);
		return new Response(
			JSON.stringify({ success: false, error: err.message }),
			{ status: 500 }
		);
	}
}
