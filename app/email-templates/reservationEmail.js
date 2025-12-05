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

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Reservation is Confirmed</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet">
  <style>
    body {
      font-family: "Inter", sans-serif;
    }
  </style>
</head>

<body class="bg-white p-5">
  <div class="max-w-[600px] mx-auto bg-[#f2f5f8] rounded-sm overflow-hidden px-4">

    <!-- Logo -->
    <div class="py-10 px-10 pb-6 text-center sm:px-5">
      <img src="https://www.interswitchgroup.com/assets/images/home/interswitch_logo.svg" alt="Logo" class="inline-block w-[137px] h-8" />
    </div>

    <!-- Banner -->
    <div>
      <img src="https://www.interswitchgroup.com/assets/images/home/qtb_isw.png" alt="banner" />
    </div>

    <!-- Main Title -->
    <div class="px-10 py-6 text-center sm:px-5">
      <h1 class="text-lg md:text-2xl font-medium text-[#111111] leading-6 text-center">
        Your Reservation is Confirmed 
      </h1>
    </div>

    <!-- Content -->
    <div class="p-6 sm:p-8 bg-white mx-2 rounded-sm">
      <p class="text-sm sm:text-base text-[#333333] mb-4">Hi ${firstname} ${lastname},</p>

      <p class="text-sm sm:text-base text-[#333333] mb-4">
        We're excited to let you know that your reservation has been
        <strong>successfully confirmed</strong>. Below are the details you provided:
      </p>

      <ul class="ml-5 mb-6 text-sm sm:text-base text-[#333333] list-disc">
        <li class="mb-1"><strong>Email:</strong> ${email}</li>
        <li class="mb-1"><strong>Phone:</strong> ${phone}</li>
        <li class="mb-1"><strong>Country:</strong> ${country}</li>
        <li class="mb-1"><strong>Date:</strong> ${new Date().toLocaleString()}</li>
      </ul>

      <p class="text-sm sm:text-base text-[#333333] mb-4">
        Thank you for choosing us. We’ll keep you updated with any further information.
      </p>

      <div class="text-[15px] leading-relaxed text-[#333333]">
        <p>Warm regards,</p>
        <p class="mb-1 text-sm md:text-base">The Marketing Team</p>
      </div>

      <!-- CTA Button -->
      <div class="text-start my-5">
        <a href="#"
          class="inline-block bg-[#00425f] text-white no-underline px-4 py-2 rounded-full md:text-[15px] font-semibold transition-colors max-w-max text-[13px]">
          View Your Reservation
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="pt-6 pb-8 px-3">
      <p class="text-sm md:text-base leading-normal text-[#333333] mb-2">
        This email was sent to <a href="mailto:${email}" class="text-[#00425f] underline">${email}</a>.
        If this wasn’t you, please ignore this email.
      </p>

      <p class="text-sm md:text-base text-[#333333] mt-6 mb-8 md:mb-14">
        Quickteller HQ, Lagos Nigeria
      </p>

      <div class="flex justify-between items-center mb-6">
        <img src="https://www.interswitchgroup.com/assets/images/home/interswitch_logo.svg" alt="Logo" class="inline-block w-[98px]" />

        <div class="flex gap-3">
          <a href="#" aria-label="Twitter" class="inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#2563EB" d="M22.46 6c-.77..."/></svg>
          </a>
          <a href="#" aria-label="Facebook" class="inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#2563EB" d="M20.9 2H3.1..."/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#2563EB" d="M19 3a2 2..."/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
`;
}
