'use client';

export default function TextInput({
	label,
	name,
	value,
	onChange,
	type = 'text',
	required,
}) {
	return (
		<div className='flex flex-col gap-1'>
			<label>{label}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				className='border border-gray-300 rounded-md p-2 w-sm'
			/>
		</div>
	);
}
