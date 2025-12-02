'use client';

export default function SelectInput({
	label,
	name,
	value,
	onChange,
	options,
	required,
}) {
	return (
		<div className='flex flex-col gap-1'>
			<label>{label}</label>
			<select
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				className='border border-gray-300 rounded-md p-2 w-full'>
				<option value=''>Select country</option>
				{options.map((item) => (
					<option
						key={item}
						value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
}
