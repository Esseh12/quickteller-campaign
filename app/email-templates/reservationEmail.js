export function reservationEmailTemplate({
	firstname,
	lastname,
	email,
	phone,
	country,
}) {
	return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0; padding:0; background:#f2f5f8; font-family:Arial, sans-serif;">
    
    <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:6px; overflow:hidden; padding:0;">

      <!-- Banner -->
      <div style="text-align:center; padding:25px 0; background:#f2f5f8;">
        <img src="https://www.interswitchgroup.com/assets/images/home/qtb_isw.png" 
             alt="Banner" 
             style="max-width:200px; height:auto;" />
      </div>

      <!-- Title -->
      <div style="padding:20px 30px; text-align:center;">
        <h1 style="font-size:20px; margin:0; font-weight:600; color:#111111;">
          Your Reservation is Confirmed
        </h1>
      </div>

      <!-- Body -->
      <div style="padding:25px 30px; background:#ffffff;">
        <p style="font-size:15px; color:#333333; margin:0 0 14px;">
          Hi <strong>${firstname} ${lastname}</strong>,
        </p>

        <p style="font-size:15px; color:#333333; margin:0 0 18px;">
          We’re excited to let you know that your reservation has been 
          <strong>successfully confirmed</strong>. Here are the details:
        </p>

        <div style="font-size:15px; color:#333333; margin-bottom:20px;">
          <p style="margin:4px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin:4px 0;"><strong>Phone:</strong> ${phone}</p>
          <p style="margin:4px 0;"><strong>Country:</strong> ${country}</p>
          <p style="margin:4px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <p style="font-size:15px; color:#333333; margin:0 0 20px;">
          Thank you for choosing us. We’ll keep you updated with any further information.
        </p>

        <p style="font-size:15px; color:#333333; margin:0 0 20px;">
          Warm regards, <br />
          <strong>The Marketing Team</strong>
        </p>

        <!-- CTA Button -->
        <div style="text-align:left; margin-top:20px;">
          <a href="#"
            style="
              background:#00425f;
              color:#ffffff;
              text-decoration:none;
              padding:10px 20px;
              font-size:14px;
              font-weight:600;
              border-radius:20px;
              display:inline-block;
            ">
            View Your Reservation
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:25px 30px; background:#f2f5f8;">
        <p style="font-size:13px; color:#333333; margin:0 0 10px;">
          This email was sent to 
          <a href="mailto:${email}" style="color:#00425f; text-decoration:underline;">
            ${email}
          </a>.  
          If this wasn’t you, please ignore this message.
        </p>

        <p style="font-size:13px; color:#333333; margin:20px 0 0;">
          Quickteller HQ, Lagos Nigeria
        </p>
      </div>

    </div>
  </body>
</html>`;
}
