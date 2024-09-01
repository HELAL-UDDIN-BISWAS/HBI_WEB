import React from "react";
import { BsInboxes } from "react-icons/bs";

const EmptyData = () => {
	return (
		<div className="w-full min-h-[60dvh] flex flex-col text-center items-center justify-center">
			<div className="flex items-center justify-center gap-3 flex-col">
				<BsInboxes className="text-7xl lg:text-8xl text-gray" />
				<span className="text-xl lg:text-2xl font-medium text-zinc-400"> No Results Found</span>
			</div>
			<span className="pt-2 text-lg lg:text-xl text-zinc-400">There is no data related with your account or your filters</span>
		</div>
	);
};

export default EmptyData;
