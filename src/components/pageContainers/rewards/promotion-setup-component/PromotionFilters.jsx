"use client"
import React from "react";
import { FaSearch } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import PrimaryBtn from "@/components/base/button/hbi_btn";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"

const PromotionFilters = ({
	searchTerm,
	setSearchTerm,
	filter,
	setFilter,
	onSearchClick,
	onResetClick,
	setPercentTerm,
	percentTerm,
}) => {
	const DownIcon = () => (
		<svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
		  <path d="M6.5 6L0.870834 0L12.1292 0L6.5 6Z" fill="#8898AA" />
		</svg>
	  );
	return (
		<div className="flex items-center space-x-5 px-4">
			<div className="relative flex items-center  rounded px-3 py-2 shadow-sm bg-white w-[240px] h-[40px]">
				<FaSearch className="mr-2 text-[#849098]" />
				<input
					type="text"
					placeholder="Filter By Product Name"
					className="outline-none w-full"
					name="productName"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="relative">
		<Select
        value={filter}
		name="tier"
        onValueChange={setFilter}
        className="w-96"
      >
        <SelectTrigger icon={DownIcon} className="w-[210px]  bg-white ">
          <SelectValue placeholder="Filter By Tier" />
        </SelectTrigger>
        <SelectContent>
		<SelectItem className='hover:bg-[#F2FFFE] tier px-2' selected value="Beginner">Beginner</SelectItem>
            <SelectItem className='hover:bg-[#F2FFFE] px-2 tier' value="Bronze">Bronze Tier</SelectItem>
			<SelectItem className='hover:bg-[#F2FFFE] px-2 tier' value="Gold">Gold Tier</SelectItem>
			<SelectItem className='hover:bg-[#F2FFFE] px-2 tier'value="Silver">Silver Tier</SelectItem>
        </SelectContent>
      </Select>
				
			</div>
			<div className="relative">
				<div className="relative flex items-center border rounded px-3 py-2 shadow-sm bg-white w-[250px] h-[40px]">
					<FaSearch className="mr-2 text-[#849098]" />
					<input
						type="text"
						placeholder="Filter By Percent Off"
						className="outline-none w-full pr-6"
						name="percent"
						value={percentTerm}
						onChange={(e) => setPercentTerm(e.target.value)}
					/>
					<div className="absolute right-0 top-1/2 px-3 rounded-r-md py-2 transform -translate-y-1/2 bg-[#f0f0f0]">
						%
					</div>
				</div>
			</div>
			<PrimaryBtn
				name="Search"
				color="white"
				width={102}
				onClick={onSearchClick}
			/>
			<button
				className="flex items-center text-[#386FFF] underline"
				onClick={onResetClick}>
				Reset <BiReset className="ml-1 w-[18px] h-[20px]" />
			</button>
		</div>
	);
};

export default PromotionFilters;
