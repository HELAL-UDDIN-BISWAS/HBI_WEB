'use client';
import useMemberStore from '@/store/memberStore';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { BiReset } from 'react-icons/bi';
import PrimaryBtn from '@/components/base/button/hbi_btn';

const MemberFilters = () => {
	const { setFilters, fetchMembers, resetFilters, filters } = useMemberStore();

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters({ [name]: value });
	};

	const handleSearchClick = () => {
		fetchMembers(true);
	};

	const handleResetClick = () => {
		resetFilters();
		fetchMembers(true);
	};

	return (
		<div className="flex items-center space-x-5">
			<div className="relative flex items-center border rounded px-3 py-2 shadow-sm bg-white w-[240px] h-[40px]">
				<FaSearch className="mr-2 text-[#849098]" />
				<input
					type="text"
					placeholder="Filter By Email"
					className="outline-none w-full"
					name="email"
					value={filters.email}
					onChange={handleFilterChange}
				/>
			</div>
			<div className="relative flex items-center border rounded px-3 py-2 shadow-sm bg-white w-[240px] h-[40px]">
				<FaSearch className="mr-2 text-[#849098]" />
				<input
					type="text"
					placeholder="Filter By NRIC/Passport"
					className="outline-none w-full"
					name="passport"
					value={filters.passport}
					onChange={handleFilterChange}
				/>
			</div>
			<div className="relative">
				<select
					name="status"
					onChange={handleFilterChange}
					value={filters.status}
					className="appearance-none border rounded w-[200px] h-[40px] outline-none pl-3 pr-8 bg-white text-[#849098] cursor-pointer">
					<option value="">Filter By Status</option>
					<option value="all">All</option>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
				<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
					<svg
						className="w-4 h-4 fill-current text-gray-400"
						viewBox="0 0 20 20">
						<path d="M5.5 7.5L10 12.5L14.5 7.5H5.5Z" />
					</svg>
				</div>
			</div>
			<PrimaryBtn
				name="Search"
				color="white"
				width={102}
				onClick={handleSearchClick}
			/>
			<button
				className="flex items-center text-[#386FFF] hover:underline"
				onClick={handleResetClick}>
				Reset <BiReset className="ml-1 w-[18px] h-[20px]" />
			</button>
		</div>
	);
};

export default MemberFilters;
