import Image from 'next/image';
import { X } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
			<div className='bg-white p-8 rounded-xl max-w-[400px] md:max-w-md w-full text-center relative shadow-2xl'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors cursor-pointer'>
					<X size={20} />
				</button>

				<div className='mb-6 mt-4'>
					<Image
						src='/phone-in-hand.svg'
						alt='Phone in hand'
						width={150}
						height={150}
						className='mx-auto'
					/>
				</div>

				<h2 className='text-2xl font-bold mb-3 text-gray-900'>Success!</h2>
				<p className='text-gray-600 mb-6'>
					Your reservation has been submitted successfully.
				</p>

				<button
					onClick={onClose}
					className='bg-secondaryBlue text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors'>
					Close
				</button>
			</div>
		</div>
	);
}
