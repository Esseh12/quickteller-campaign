import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartan = Plus_Jakarta_Sans({
	subsets: ['latin'],
});

export const metadata = {
	title: 'Quickteller Business campaign',
	description: 'Quickteller Business campaign',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={plusJakartan.className}>{children}</body>
		</html>
	);
}
