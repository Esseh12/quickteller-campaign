export function otpEmailTemplate({ firstname, lastname, otp }) {
	return `
<!DOCTYPE html>
<html lang="en">
<head><style>
.otp-box { background-color: white; border: 2px dashed #0052CC; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
					.otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0052CC; }</style></head>
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
          Verify Your Email Address
        </h1>
      </div>

      <!-- Body -->
      <div style="padding:25px 30px; background:#ffffff;">
        <p style="font-size:15px; color:#333333; margin:0 0 14px;">
          Hi <strong>${firstname} ${lastname}</strong>,
        </p>

        <p style="font-size:15px; color:#333333; margin:0 0 18px;">
          Thank you for making a reservation with us! To complete your registration 
          and verify your email address, please use the verification code below:
        </p>

        <!-- OTP Box -->
       <div class="otp-box">
							<div class="otp-code">${otp}</div>
				</div>
 

        <!-- Security Tips -->
        <div style="
          background-color: #d1ecf1;
          border: 2px solid #0c5460;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
          color: #0c5460;
          font-size: 14px;
        ">
          <p style="margin: 0 0 10px;"><strong>Security Tips:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li style="margin: 5px 0;">Never share this code with anyone</li>
            <li style="margin: 5px 0;">We will never ask for this code via phone or email</li>
            <li style="margin: 5px 0;">If you didn't request this code, please ignore this email</li>
          </ul>
        </div>

        <p style="font-size:15px; color:#333333; margin:20px 0 0;">
          Warm regards, <br />
          <strong>The Reservation Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="padding:25px 30px; background:#f2f5f8;">
        <p style="font-size:13px; color:#333333; margin:0 0 10px;">
          This is an automated security email. Please do not reply to this message.
        </p>

        <p style="font-size:13px; color:#333333; margin:10px 0;">
          <strong>Need help?</strong> If you're having trouble with verification, 
          please contact our support team.
        </p>

        <p style="font-size:13px; color:#333333; margin:20px 0 0;">
          Quickteller HQ, Lagos Nigeria
        </p>

        <p style="font-size:12px; color:#6c757d; margin:15px 0 0;">
          © ${new Date().getFullYear()} Reservation Team. All rights reserved.
        </p>
      </div>

    </div>
  </body>
</html>`;
}
