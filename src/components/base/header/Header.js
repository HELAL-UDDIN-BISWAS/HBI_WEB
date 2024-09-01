"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaRegUser } from "react-icons/fa";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import { TbLogout } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { logout, user } = useAuthStore();

	const handleLogOut = () => {
		logout();
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<header className="flex justify-end px-4 py-3 bg-[#fff] ">
			<div
				className="relative"
				ref={dropdownRef}>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center space-x-2 focus:outline-none">
					<img
						src={
							user?.profile?.profilePicture?.url
								? `${process.env.NEXT_PUBLIC_API_URL}${user?.profile?.profilePicture?.url}`
								: "/images/avatar.png"
						}
						alt="Profile"
						className="size-8 rounded-full"
					/>
					<span className="text-[#3FC9C1]">{user?.profile?.name}</span>
					<FaChevronDown className="w-4 h-4 text-[#3FC9C1]" />
				</button>

				{isOpen && (
					<div className="z-50 absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-lg overflow-hidden shadow-lg">
						<Link
							href="/members"
							className="flex items-center gap-2 px-4 py-2 text-sm lg:text-base text-zinc-800 font-medium hover:bg-primary hover:text-white">
							<FaRegUser />
							Profile
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 px-4 py-2 text-sm lg:text-base text-zinc-800 font-medium hover:text-white hover:bg-primary ">
							<IoSettingsOutline className="text-lg" />
							Settings
						</Link>
						<Link
							onClick={handleLogOut}
							href="#"
							className="hover:text-white flex items-center gap-2 px-4 py-2 text-sm lg:text-base text-zinc-800 font-medium hover:bg-primary">
							<TbLogout className="text-lg" />
							Logout
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}
