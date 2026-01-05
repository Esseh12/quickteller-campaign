import { otpStore } from '../send/route';

export async function POST(req) {
	try {
		const { email, otp } = await req.json();

		if (!email || !otp) {
			return Response.json(
				{ success: false, message: 'Email and OTP required' },
				{ status: 400 }
			);
		}

		// Get stored OTP
		const storedData = otpStore.get(email);

		if (!storedData) {
			return Response.json(
				{ success: false, message: 'OTP not found or expired' },
				{ status: 400 }
			);
		}

		// Check if OTP is expired
		if (Date.now() > storedData.expiresAt) {
			otpStore.delete(email);
			return Response.json(
				{ success: false, message: 'OTP has expired' },
				{ status: 400 }
			);
		}

		// Verify OTP
		if (storedData.otp !== otp) {
			return Response.json(
				{ success: false, message: 'Invalid OTP' },
				{ status: 400 }
			);
		}

		// OTP is valid - delete it
		otpStore.delete(email);

		return Response.json(
			{ success: true, message: 'OTP verified successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('OTP Verify Error:', error);
		return Response.json(
			{ success: false, message: 'Failed to verify OTP' },
			{ status: 500 }
		);
	}
}
