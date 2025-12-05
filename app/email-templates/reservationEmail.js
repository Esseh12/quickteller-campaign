export function reservationEmailTemplate({
	firstname,
	lastname,
	email,
	phone,
	country,
}) {
	return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; border: 1px solid #eee;">
            <h2 style="color: #0A66C2;">Reservation Confirmed</h2>

            <p>Hello <strong>${firstname} ${lastname}</strong>,</p>

            <p>Your reservation has been <strong>successfully confirmed</strong>. Below are your reservation details:</p>

            <table style="width: 100%; margin-top: 15px;">
                <tr>
                    <td><strong>Email:</strong></td>
                    <td>${email}</td>
                </tr>
                <tr>
                    <td><strong>Phone:</strong></td>
                    <td>${phone}</td>
                </tr>
                <tr>
                    <td><strong>Country:</strong></td>
                    <td>${country}</td>
                </tr>
                <tr>
                    <td><strong>Date:</strong></td>
                    <td>${new Date().toLocaleString()}</td>
                </tr>
            </table>

            <p style="margin-top: 20px;">Thank you for reserving your spot with us.</p>
            <p style="font-size: 14px; color: #777;">If you did not make this reservation, please ignore this email.</p>
        </div>
    </div>
    `;
}
