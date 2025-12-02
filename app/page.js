import Image from 'next/image';
import ReservationForm from '@/app/components/Forms/ReservationForm';

export default function Home() {
	return (
		<main className='flex'>
			<aside className='py-4 px-6 bg-darkBlue h-screen w-md'>
				<div className='flex flex-col gap-8'>
					<div className='mt-8'>
						<Image
							src='/interswitch_logo.svg'
							alt='Interswitch logo'
							width={130}
							height={40}
						/>
					</div>

					<h1 className='text-white text-2xl leading-9.5 font-bold mt-12'>
						Reserve your mobile number to join the Quickteller Business growth
						campaign.
					</h1>
				</div>
			</aside>

			<div className='p-6 pl-12'>
				<div className='mt-2 space-y-2'>
					<h1 className='text-3xl font-bold'>Reserve your spot</h1>
					<p className='font-medium'>
						Kindly enter your details below to join the list.
					</p>
				</div>

				<ReservationForm />
			</div>
		</main>
	);
}
