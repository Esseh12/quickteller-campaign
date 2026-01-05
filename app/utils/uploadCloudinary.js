export async function uploadToCloudinary(file) {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

	// use form data to send file
	const formData = new FormData();
	// attach the file the user selected and upload preset
	formData.append('file', file);
	formData.append('upload_preset', uploadPreset);

	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
		{
			method: 'POST',
			body: formData,
		}
	);

	const data = await res.json();
	return data.secure_url;
}
