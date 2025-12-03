import SideBar from './components/sidebar';
import ReservationForm from '@/app/components/Forms/ReservationForm';

export default function Home() {
	return (
		<main className='flex h-screen overflow-hidden'>
			<SideBar />
			<div className='flex-1 h-full overflow-y-auto py-6 px-4.5 sm:px-8 md:px-10 lg:px-12'>
				<div className='mt-2 space-y-1 sm:space-y-2'>
					<h1 className='text-xl md:text-3xl font-bold'>Reserve your spot</h1>
					<p className='text-sm sm:text-base font-medium'>
						Kindly enter your details below to join the list.
					</p>
				</div>
				<ReservationForm />
			</div>
		</main>
	);
}
