'use client';
import Link from 'next/link';
import { useState } from 'react';
import Logo from '../components/assets/icons/Logo';
import { ChevronDown } from 'lucide-react';
import MemberIcon from '../components/assets/icons/MemberIcon';
import PatientIcon from '../components/assets/icons/PatientIcon';
import AppointmentIcon from '../components/assets/icons/AppointmentIcon';
import DoctorIcon from '../components/assets/icons/DoctorIcon';
import ClinicAdminIcon from '../components/assets/icons/ClinicAdminIcon';
import SystemUserIcon from '../components/assets/icons/SystemUserIcon';
import RewardIcon from '../components/assets/icons/RewardIcon';
import AgentIcon from '../components/assets/icons/AgentIcon';
import SystemSetupIcon from '../components/assets/icons/SystemSetupIcon';
import { usePathname } from 'next/navigation';

const navLinks = [
	{ name: 'Members', href: '/members', icon: MemberIcon },
	{ name: 'Patients', href: '/patients', icon: PatientIcon },
	{ name: 'Appointments', href: '/appointments', icon: AppointmentIcon },
	{ name: 'Doctors', href: '/doctors', icon: DoctorIcon },
	{ name: 'Clinic Admin', href: '/clinic-admin', icon: ClinicAdminIcon },
	{ name: 'System Users', href: '/system-users', icon: SystemUserIcon },
];

const rewardLinks = [
	{ name: 'Reward System', href: '/rewards/reward-system' },
	{ name: 'Promotion Setup', href: '/rewards/promotion-setup' },
	{ name: 'Tier Setup', href: '/rewards/tier-setup' },
	{ name: 'Point Setup', href: '/rewards/point-setup' },
];

const agentLinks = [
	{ name: 'Head of Agency', href: '/agents/head-of-agency' },
	{ name: 'Agents', href: '/agents/agents' },
	{ name: 'Partners', href: '/agents/partners' },
];

const systemSetupLinks = [
	{ name: 'Clinic', href: '/system-setup/clinic' },
	{ name: 'Specialisation', href: '/system-setup/specialisation' },
];

const SideBar = () => {
	const [isRewardsOpen, setIsRewardsOpen] = useState(false);
	const [isAgentsOpen, setIsAgentsOpen] = useState(false);
	const [isSystemSetupOpen, setIsSystemSetupOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility on mobile
	const pathname = usePathname();

	return (
		<>
			{/* Toggle button for mobile view */}
			<button
				className={`md:hidden fixed top-4 ${isSidebarOpen ? 'left-48' : 'left-4'} z-50 p-2 bg-white rounded-full shadow-md flex justify-end`}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
				<svg
					className="w-6 h-6 text-gray-800"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d={
							isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'
						}></path>
				</svg>
			</button>

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-40 h-screen bg-white transition-transform duration-300 ease-in-out transform ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} md:translate-x-0 md:static md:block w-[240px] md:w-auto`}
				style={{ boxShadow: '16px 0px 48px -28px rgba(16, 24, 40, 0.2)' }}>
				<div className="flex flex-col gap-2 mb-4 h-full text-[#6E7E7D]">
					<div className="px-2 sticky top-0 bg-white">
						<div className="flex h-[65px] gap-2 items-center">
							<Logo />
							<svg
								width="122"
								height="26"
								viewBox="0 0 122 26"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.23171 1.7794C9.23171 1.509 9.40071 1.34 9.70491 1.34H11.8343C12.1047 1.34 12.2737 1.509 12.2737 1.7794V24.5268C12.2737 24.831 12.1047 25 11.8343 25H9.70491C9.40071 25 9.23171 24.831 9.23171 24.5268V14.4206H4.02651V24.5268C4.02651 24.831 3.85751 25 3.58711 25H1.45771C1.15351 25 0.984512 24.831 0.984512 24.5268V1.7794C0.984512 1.509 1.15351 1.34 1.45771 1.34H3.58711C3.85751 1.34 4.02651 1.509 4.02651 1.7794V11.6152H9.23171V1.7794ZM21.5383 25.1014C18.1245 25.1014 15.7585 22.5326 15.7585 19.0512V7.2888C15.7585 3.8074 18.1245 1.2386 21.5383 1.2386H25.0873C25.3577 1.2386 25.5267 1.4076 25.5267 1.678V3.6046C25.5267 3.9088 25.3577 4.0778 25.0873 4.0778H21.7749C20.0173 4.0778 18.8343 5.4298 18.8343 7.3564V11.649H24.2423C24.5465 11.649 24.7155 11.818 24.7155 12.1222V13.9474C24.7155 14.2516 24.5465 14.4206 24.2423 14.4206H18.8343V18.9836C18.8343 20.9102 20.0173 22.2622 21.7749 22.2622H25.0873C25.3577 22.2622 25.5267 22.4312 25.5267 22.7354V24.662C25.5267 24.9324 25.3577 25.1014 25.0873 25.1014H21.5383ZM28.7826 25C28.5122 25 28.3432 24.831 28.3432 24.5268V7.2212C28.3432 3.5032 30.6416 1.002 34.123 1.002C37.6044 1.002 39.9366 3.5032 39.9366 7.2212V24.5268C39.9366 24.831 39.7676 25 39.4634 25H37.334C37.0636 25 36.8608 24.831 36.8608 24.5268V17.0232H31.3852V24.5268C31.3852 24.831 31.2162 25 30.9458 25H28.7826ZM31.3852 14.2178H36.8608V7.086C36.8608 5.058 35.8806 3.875 34.123 3.875C32.3992 3.875 31.3852 5.058 31.3852 7.086V14.2178ZM49.3388 22.2622H52.5836C52.8878 22.2622 53.0568 22.4312 53.0568 22.7354V24.662C53.0568 24.9324 52.8878 25.1014 52.5836 25.1014H49.1698C45.7222 25.1014 43.5928 22.5326 43.5928 19.1526V1.7794C43.5928 1.509 43.7618 1.34 44.0322 1.34H46.1954C46.4996 1.34 46.6686 1.509 46.6686 1.7794V19.0512C46.6686 20.9778 47.784 22.2622 49.3388 22.2622ZM62.3973 1.34C62.7015 1.34 62.8705 1.509 62.8705 1.7794V3.706C62.8705 4.0102 62.7015 4.1792 62.3973 4.1792H58.7469V24.5268C58.7469 24.831 58.5779 25 58.2737 25H56.1443C55.8739 25 55.7049 24.831 55.7049 24.5268V4.1792H52.0207C51.7503 4.1792 51.5813 4.0102 51.5813 3.706V1.7794C51.5813 1.509 51.7503 1.34 52.0207 1.34H62.3973ZM73.4649 1.7794C73.4649 1.509 73.6339 1.34 73.9381 1.34H76.0675C76.3379 1.34 76.5069 1.509 76.5069 1.7794V24.5268C76.5069 24.831 76.3379 25 76.0675 25H73.9381C73.6339 25 73.4649 24.831 73.4649 24.5268V14.4206H68.2597V24.5268C68.2597 24.831 68.0907 25 67.8203 25H65.6909C65.3867 25 65.2177 24.831 65.2177 24.5268V1.7794C65.2177 1.509 65.3867 1.34 65.6909 1.34H67.8203C68.0907 1.34 68.2597 1.509 68.2597 1.7794V11.6152H73.4649V1.7794ZM81.9521 25.1014C81.0733 25.1014 80.5663 24.6282 80.5663 23.7494V2.5906C80.5663 1.7118 81.0733 1.2386 81.9521 1.2386H86.3123C89.8613 1.2386 92.0921 3.8074 92.0921 7.3564V18.9836C92.0921 22.5326 89.8275 25.1014 86.3123 25.1014H81.9521ZM83.6421 22.2622H86.2109C87.9685 22.2622 89.0163 20.9778 89.0163 19.0512V7.2888C89.0163 5.3622 88.0023 4.0778 86.2109 4.0778H83.6421V22.2622ZM101.026 25.338C97.5107 25.338 95.0433 22.7692 95.0433 18.9836V7.3564C95.0433 3.5708 97.5107 1.002 101.026 1.002C104.541 1.002 106.975 3.5708 106.975 7.1198V19.2202C106.975 22.7692 104.541 25.338 101.026 25.338ZM101.026 22.4988C102.75 22.4988 103.899 21.2144 103.899 19.3554V6.9846C103.899 5.1256 102.75 3.8412 101.026 3.8412C99.3021 3.8412 98.1191 5.1256 98.1191 7.2212V19.1188C98.1191 21.2144 99.3021 22.4988 101.026 22.4988ZM115.677 25.3718C112.229 25.3718 109.897 22.9382 109.897 19.2878V7.0522C109.897 3.4018 112.229 0.9682 115.677 0.9682C118.989 0.9682 121.254 3.5032 121.355 7.4578C121.355 7.7282 121.22 7.8972 120.916 7.8972H118.752C118.482 7.8972 118.313 7.762 118.313 7.4578C118.245 5.0918 117.198 3.8412 115.643 3.8412C113.953 3.8412 112.973 4.9904 112.973 6.8832V19.4568C112.973 21.3496 113.953 22.4988 115.643 22.4988C117.367 22.4988 118.414 21.113 118.482 18.6456C118.482 18.3414 118.651 18.2062 118.921 18.2062H121.085C121.355 18.2062 121.524 18.3752 121.524 18.6794C121.389 22.7692 119.124 25.3718 115.677 25.3718Z"
									fill="#3FC9C1"
								/>
							</svg>
						</div>
					</div>

					<div className="flex flex-col gap-4 px-3 my-2">
						{navLinks?.map((link) => {
							const LinkIcon = link.icon;
							return (
								<Link
									key={link.name}
									href={link.href}
									className={`flex items-center gap-3 ${
										pathname === link.href ? 'text-[#3FC9C1] font-medium' : ''
									}`}>
									<LinkIcon
										className={pathname === link.href ? 'stroke-[#3FC9C1]' : ''}
									/>
									<span className="">{link.name}</span>
								</Link>
							);
						})}

						<div
							className="cursor-pointer flex justify-between items-center"
							onClick={() => setIsRewardsOpen(!isRewardsOpen)}>
							<div
								className={`flex items-center gap-3 ${
									pathname.startsWith('/rewards') && !isRewardsOpen
										? 'text-[#3FC9C1] font-medium'
										: ''
								}`}>
								<RewardIcon
									className={
										pathname.startsWith('/rewards') && !isRewardsOpen
											? 'stroke-[#3FC9C1]'
											: ''
									}
								/>
								<span className="">Rewards</span>
							</div>
							<ChevronDown
								className={`w-4 h-4 transition-all duration-300 ease-in-out ${
									isRewardsOpen ? 'rotate-180' : ''
								}`}
							/>
						</div>
						{isRewardsOpen && (
							<div className="pl-[30px] flex flex-col gap-3">
								{rewardLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className={`flex items-center gap-3 ${
											pathname === link.href ? 'text-[#3FC9C1] font-medium' : ''
										}`}>
										<span className="">{link.name}</span>
									</Link>
								))}
							</div>
						)}

						<div
							className="cursor-pointer flex justify-between items-center"
							onClick={() => setIsAgentsOpen(!isAgentsOpen)}>
							<div
								className={`flex items-center gap-3 ${
									pathname.startsWith('/agents') && !isAgentsOpen
										? 'text-[#3FC9C1] font-medium'
										: ''
								}`}>
								<AgentIcon />
								<span className="">Agents</span>
							</div>
							<ChevronDown
								className={`w-4 h-4 transition-all duration-300 ease-in-out ${
									isAgentsOpen ? 'rotate-180' : ''
								}`}
							/>
						</div>
						{isAgentsOpen && (
							<div className="pl-[30px] flex flex-col gap-3">
								{agentLinks?.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className={`flex items-center gap-3 ${
											pathname === link.href ? 'text-[#3FC9C1] font-medium' : ''
										}`}>
										<span className="">{link.name}</span>
									</Link>
								))}
							</div>
						)}

						<div
							className="cursor-pointer flex justify-between items-center"
							onClick={() => setIsSystemSetupOpen(!isSystemSetupOpen)}>
							<div
								className={`flex items-center gap-3 ${
									pathname.startsWith('/system-setup') && !isSystemSetupOpen
										? 'text-[#3FC9C1] font-medium'
										: ''
								}`}>
								<SystemSetupIcon />
								<span className="">System Setup</span>
							</div>
							<ChevronDown
								className={`w-4 h-4 transition-all duration-300 ease-in-out ${isSystemSetupOpen ? 'rotate-180' : ''}`}
							/>
						</div>
						{isSystemSetupOpen && (
							<div className="pl-[30px] flex flex-col gap-3">
								{systemSetupLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className={`flex items-center gap-3 ${
											pathname === link.href ? 'text-[#3FC9C1] font-medium' : ''
										}`}>
										<span className="">{link.name}</span>
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SideBar;
