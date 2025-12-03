import Image from 'next/image';

const SideBar = () => {
	return (
		<>
			<aside className='py-4 px-6 bg-darkBlue h-full w-md shrink-0 hidden lg:block'>
				<div className='flex flex-col gap-8'>
					<div className='mt-8'>
						<Image
							src='/interswitch_logo.svg'
							alt='Interswitch logo'
							width={150}
							height={50}
						/>
					</div>
					<h1 className='text-white text-2xl leading-9.5 font-bold mt-12'>
						Reserve your mobile number to join the Quickteller Business growth
						campaign.
					</h1>
				</div>
			</aside>
		</>
	);
};
export default SideBar;
