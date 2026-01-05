'use client';

import { useState } from 'react';
import TextInput from './TextInput';
import FileUpload from './FileUpload';
import SelectInput from './SelectInput';
import SuccessModal from '../Modal/SuccessModal';
import OTPModal from '../Modal/OTPmodal';
import { uploadToCloudinary } from '@/app/utils/uploadCloudinary';

export default function ReservationForm() {
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		country: '',
		photourl: '',
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [photoUploading, setPhotoUploading] = useState(false);
	const [showOTPModal, setShowOTPModal] = useState(false);
	const [otpLoading, setOtpLoading] = useState(false);

	const handleTextChange = (e) => {
		// Handle changes for text inputs
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = async (e) => {
		// Handles file input changes
		// acess the first file selected
		const file = e.target.files?.[0];
		if (!file) {
			setFormData((prev) => ({ ...prev, photoUrl: '' }));
			return;
		}
		if (file.size > 1024 * 1024) {
			alert('Photo must be less than 1MB');
			return;
		}
		// setFormData((prev) => ({ ...prev, photo: file }));
		try {
			setPhotoUploading(true);

			const imageUrl = await uploadToCloudinary(file);

			setFormData((prev) => ({
				...prev,
				photoUrl: imageUrl,
			}));
		} catch (err) {
			console.error(err);
			alert('Image upload failed. Try again.');
		} finally {
			setPhotoUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Validation
			if (
				!formData.firstname ||
				!formData.lastname ||
				!formData.email ||
				!formData.phone ||
				!formData.country
			) {
				alert('Please fill all required fields');
				setLoading(false);
				return;
			}

			if (!formData.photoUrl) {
				alert('Please upload a photo');
				setLoading(false);
				return;
			}

			if (!formData.email.endsWith('@gmail.com')) {
				alert('Only Gmail addresses are allowed');
				setLoading(false);
				return;
			}

			// Phone validation - only numbers
			const phoneRegex = /^[0-9]+$/;
			if (!phoneRegex.test(formData.phone)) {
				alert('Phone number should contain only numbers');
				setLoading(false);
				return;
			}

			// Send OTP
			const otpResponse = await fetch('/api/otp/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email.trim().toLowerCase(),
					firstname: formData.firstname.trim(),
					lastname: formData.lastname.trim(),
				}),
			});

			const otpResult = await otpResponse.json();

			if (!otpResult.success) {
				alert(otpResult.message);
				setLoading(false);
				return;
			}

			// Show OTP modal
			setShowOTPModal(true);
			setLoading(false);
		} catch (error) {
			console.error('Submit Error:', error);
			alert('Something went wrong. Please try again.');
			setLoading(false);
		}
	};

	const handleOTPVerify = async (otp) => {
		setOtpLoading(true);

		try {
			// Verify OTP
			const verifyResponse = await fetch('/api/otp/verify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email.trim().toLowerCase(),
					otp,
				}),
			});

			const verifyResult = await verifyResponse.json();

			if (!verifyResult.success) {
				alert(verifyResult.message);
				setOtpLoading(false);
				return;
			}

			// OTP verified - now submit the reservation
			const data = new FormData();
			data.append('firstname', formData.firstname.trim());
			data.append('lastname', formData.lastname.trim());
			data.append('email', formData.email.trim().toLowerCase());
			data.append('phone', formData.phone.trim());
			data.append('country', formData.country);
			data.append('photoUrl', formData.photoUrl);

			const response = await fetch('/api/reservations', {
				method: 'POST',
				body: data,
			});

			const result = await response.json();

			if (!result.success) {
				alert(result.message);
				setOtpLoading(false);
				return;
			}

			// Success!
			setShowOTPModal(false);
			setSuccess(true);

			// Clear form data
			setFormData({
				firstname: '',
				lastname: '',
				email: '',
				phone: '',
				country: '',
				photoUrl: '',
			});

			// Reset file input
			const fileInput = document.querySelector('input[type="file"]');
			if (fileInput) fileInput.value = '';
		} catch (error) {
			console.error('OTP Verify Error:', error);
			alert('Something went wrong. Please try again.');
		} finally {
			setOtpLoading(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='space-y-6 md:space-y-8 mt-10 w-full'>
				<FileUpload
					label='Upload Photo (max 1MB)'
					name='photo'
					onChange={handleFileChange}
					photoUrl={formData.photoUrl}
					uploading={photoUploading}
				/>

				<div className='grid md:grid-cols-2 gap-4'>
					<TextInput
						label='First Name'
						name='firstname'
						value={formData.firstname}
						onChange={handleTextChange}
						required
					/>
					<TextInput
						label='Last Name'
						name='lastname'
						value={formData.lastname}
						onChange={handleTextChange}
						required
					/>
				</div>

				<div className='grid md:grid-cols-2 gap-4'>
					<TextInput
						label='Email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleTextChange}
						required
					/>
					<TextInput
						label='Phone Number'
						name='phone'
						type='tel'
						value={formData.phone}
						onChange={handleTextChange}
						required
						inputMode='numeric'
						pattern='[0-9]+'
						title='Only numbers are allowed'
					/>
				</div>

				<SelectInput
					label='Country'
					name='country'
					value={formData.country}
					onChange={handleTextChange}
					options={['Nigeria', 'Ghana', 'Kenya', 'South Africa']}
					required
				/>

				<button
					type='submit'
					disabled={loading || photoUploading}
					className='bg-secondaryBlue text-white px-4 py-2 rounded-md w-full font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
					{loading ? 'Sending OTP...' : 'Submit'}
				</button>
			</form>

			<OTPModal
				isOpen={showOTPModal}
				onClose={() => setShowOTPModal(false)}
				onVerify={handleOTPVerify}
				email={formData.email}
				loading={otpLoading}
			/>

			<SuccessModal
				isOpen={success}
				onClose={() => setSuccess(false)}
			/>
		</>
	);
}
