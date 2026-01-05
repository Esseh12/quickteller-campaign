import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function OTPModal({
	isOpen,
	onClose,
	onVerify,
	email,
	loading,
}) {
	const [otp, setOtp] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');

		if (otp.length !== 6) {
			setError('Please enter a valid 6-digit OTP');
			return;
		}

		onVerify(otp);
	};

	const handleChange = (e) => {
		const value = e.target.value.replace(/\D/g, ''); // Only numbers
		if (value.length <= 6) {
			setOtp(value);
			setError('');
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
			<div className='bg-white p-8 rounded-xl max-w-[400px] md:max-w-md w-full relative shadow-2xl'>
				<button
					onClick={onClose}
					disabled={loading}
					className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'>
					<X size={20} />
				</button>

				<div className='mb-6 mt-4'>
					<div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto'>
						<Image
							src='/otp-icon.svg'
							alt='Phone in hand'
							width={150}
							height={150}
							className='mx-auto'
						/>
					</div>
				</div>

				<h2 className='text-2xl font-bold mb-3 text-gray-900 text-center'>
					Verify Your Email
				</h2>
				<p className='text-gray-600 mb-6 text-center text-sm'>
					We&apos;ve sent a 6-digit code to <br />
					<span className='font-semibold text-gray-900'>{email}</span>
				</p>

				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2 text-center'>
							Enter OTP
						</label>
						<input
							type='text'
							value={otp}
							onChange={handleChange}
							placeholder='000000'
							maxLength={6}
							inputMode='numeric'
							pattern='[0-9]*'
							disabled={loading}
							className='w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondaryBlue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'
						/>
						{error && (
							<p className='text-red-500 text-sm mt-2 text-center'>{error}</p>
						)}
					</div>

					<button
						type='submit'
						disabled={loading || otp.length !== 6}
						className='w-full bg-secondaryBlue text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
						{loading ? 'Verifying...' : 'Verify & Submit'}
					</button>
				</form>

				<p className='text-gray-500 text-xs mt-4 text-center'>
					Didn&apos;t receive the code? Check your spam folder or close and try
					again.
				</p>
			</div>
		</div>
	);
}
