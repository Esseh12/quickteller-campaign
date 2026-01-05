import nodemailer from 'nodemailer';

// Store OTPs temporarily
const otpStore = new Map();

// Generate 6-digit OTP
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
	try {
		const { email } = await req.json();

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

		const htmlTemplate = `
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #0052CC; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
					.content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
					.otp-box { background-color: white; border: 2px dashed #0052CC; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
					.otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0052CC; }
					.footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Email Verification</h1>
					</div>
					<div class="content">
						<p>Hello,</p>
						<p>Thank you for making a reservation. Please use the following One-Time Password (OTP) to verify your email address:</p>
						
						<div class="otp-box">
							<div class="otp-code">${otp}</div>
						</div>
						
						<p><strong>This OTP will expire in 5 minutes.</strong></p>
						<p>If you didn't request this code, please ignore this email.</p>
					</div>
					<div class="footer">
						<p>This is an automated message, please do not reply.</p>
					</div>
				</div>
			</body>
			</html>
		`;

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
