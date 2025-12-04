import { connectDB } from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

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

		// Check duplicate email or phone
		const existing = await Reservation.findOne({
			$or: [{ email }, { phone }],
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

		await Reservation.create({
			firstname,
			lastname,
			email,
			phone,
			country,
			photoUrl,
		});

		return Response.json({ success: true, message: 'Success' });
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
