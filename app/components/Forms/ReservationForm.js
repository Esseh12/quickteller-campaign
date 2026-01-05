'use client';

import { useState } from 'react';
import TextInput from './TextInput';
import FileUpload from './FileUpload';
import SelectInput from './SelectInput';
import SuccessModal from '../Modal/SuccessModal';
import { uploadToCloudinary } from '@/app/utils/uploadCloudinary';

export default function ReservationForm() {
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		country: '',
		photo: null,
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleTextChange = (e) => {
		// Handle changes for text inputs
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		// Handles file input changes
		// acess the first file selected
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 1024 * 1024) {
			alert('Photo must be less than 1MB');
			return;
		}
		setFormData((prev) => ({ ...prev, photo: file }));
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

			let imageUrl = '';
			if (formData.photo) {
				imageUrl = await uploadToCloudinary(formData.photo);
			}

			const data = new FormData();
			data.append('firstname', formData.firstname.trim());
			data.append('lastname', formData.lastname.trim());
			data.append('email', formData.email.trim().toLowerCase());
			data.append('phone', formData.phone.trim());
			data.append('country', formData.country);
			data.append('photoUrl', imageUrl);

			// Call the API route instead of the server action
			const response = await fetch('/api/reservations', {
				method: 'POST',
				body: data,
			});

			const result = await response.json();

			if (!result.success) {
				alert(result.message);
				setLoading(false);
				return;
			}
			setSuccess(true);

			// Clear form data on success
			setFormData({
				firstname: '',
				lastname: '',
				email: '',
				phone: '',
				country: '',
				photo: null,
			});

			// Reset file input
			const fileInput = document.querySelector('input[type="file"]');
			if (fileInput) fileInput.value = '';
		} catch (error) {
			console.error('Submit Error:', error);
			alert('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
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
					file={formData.photo}
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
					disabled={loading}
					className='bg-secondaryBlue text-white px-4 py-2 rounded-md w-full font-semibold cursor-pointer'>
					{loading ? 'Submitting...' : 'Submit'}
				</button>
			</form>

			<SuccessModal
				isOpen={success}
				onClose={() => setSuccess(false)}
			/>
		</>
	);
}
