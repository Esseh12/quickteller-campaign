import nodemailer from 'nodemailer';
import { otpEmailTemplate } from '@/app/email-templates/otpEmailTemplate';

// Store OTPs temporarily
const otpStore = new Map();

// Generate 6-digit OTP
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
	try {
		const { email, firstname, lastname } = await req.json();

		if (!email || !email.endsWith('@gmail.com')) {
			return Response.json(
				{ success: false, message: 'Valid Gmail address required' },
				{ status: 400 }
			);
		}

		// Generate OTP
		const otp = generateOTP();

		// Store OTP with expiration (5 minutes)
		otpStore.set(email, {
			otp,
			expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
		});

		// Send OTP via email
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USERNAME,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		// Use the external template
		const htmlTemplate = otpEmailTemplate({
			firstname,
			lastname,
			otp,
		});

		await transporter.sendMail({
			from: `"Reservation Team" <${process.env.GMAIL_USERNAME}>`,
			to: email,
			subject: 'Your Verification Code',
			html: htmlTemplate,
		});

		return Response.json(
			{ success: true, message: 'OTP sent successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('OTP Send Error:', error);
		return Response.json(
			{ success: false, message: 'Failed to send OTP' },
			{ status: 500 }
		);
	}
}

// Export the otpStore for verification
export { otpStore };
