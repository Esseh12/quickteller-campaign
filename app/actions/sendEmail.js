'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData) {
	const firstname = formData.get('firstname');
	const lastname = formData.get('lastname');
	const email = formData.get('email');
	const phone = formData.get('phone');
	const country = formData.get('country');

	const photoUrl = formData.get('photoUrl');

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USERNAME,
			pass: process.env.GMAIL_PASSWORD,
		},
	});

	const message = `
		New Reservation:
		Name: ${firstname} ${lastname}
		Email: ${email}
		Phone: ${phone}
		Country: ${country}
		Photo: ${photoUrl}
	`;

	try {
		await transporter.sendMail({
			from: process.env.GMAIL_USERNAME,
			to: email,
			subject: 'Reservation Successful',
			text: message,
		});

		return { success: true, message: 'Reservation complete! Email sent.' };
	} catch (err) {
		console.error(err);
		return { success: false, message: 'Email failed to send.' };
	}
}
