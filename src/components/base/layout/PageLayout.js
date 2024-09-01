'use client';

import { useRouter } from 'next/navigation';
import SideBar from '@/app/SideBar';
import Header from '../header/Header';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

const PageLayout = ({ children }) => {
	const router = useRouter();
	const { token } = useAuthStore();

	useEffect(() => {
		if (!token) {
			router.push("/");
		}
	}, [token, router]);

	if (!token) {
		return <>{children}</>
	}

	return (
		<main className="flex h-full">
			<SideBar />
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 overflow-auto">{children}</div>
			</div>
		</main>
	);
};

export default PageLayout;
