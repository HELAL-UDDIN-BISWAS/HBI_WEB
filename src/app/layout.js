import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { Inter } from 'next/font/google';
import { cn } from '@/utils/cn';
import PageLayout from '@/components/base/layout/PageLayout';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	manifest: '/manifest.json',
	title: 'HBI Web',
	description: 'HBI Web',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={cn('h-screen bg-[#f7f7f9]', inter.className)}>
				<PageLayout>
					<div className="flex flex-col flex-1 w-full ">
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							style={{ marginRight: '20px' }}
						/>
						{children}
					</div>
				</PageLayout>
			</body>
		</html>
	);
}
