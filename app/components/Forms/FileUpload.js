import { User, X } from 'lucide-react';
import Image from 'next/image';

export default function FileUpload({ label, name, onChange, file }) {
	const handleRemove = () => {
		const event = {
			target: {
				name: name,
				files: null,
			},
		};
		onChange(event);
	};

	return (
		<div className='space-y-2'>
			<label className='block text-sm font-medium text-gray-700'>{label}</label>

			{!file ? (
				<label className='flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition'>
					<User className='w-12 h-12 text-gray-400' />
					<span className='mt-2 text-xs text-gray-500'>Upload Photo</span>
					<input
						type='file'
						name={name}
						accept='image/*'
						onChange={onChange}
						className='hidden'
					/>
				</label>
			) : (
				<div className='relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden'>
					<Image
						src={URL.createObjectURL(file)}
						alt='Preview'
						width={0}
						height={0}
						className='w-full h-full object-cover'
					/>
					<button
						type='button'
						onClick={handleRemove}
						className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'>
						<X className='w-4 h-4' />
					</button>
				</div>
			)}
		</div>
	);
}
