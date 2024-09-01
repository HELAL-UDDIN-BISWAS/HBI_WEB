"use client";
import React, { useRef, useState, useEffect } from "react";
import HBI_BreadCrumb from "@/components/base/breadcrumb/HBI_BreadCrumb";
import PrimaryBtn from "@/components/base/button/hbi_btn";
import PromotionSetupTable from "./promotion-setup-component/PromotionSetupTable";
import PromotionFilters from "./promotion-setup-component/PromotionFilters";
import usePromotionStore from "@/store/promotionStore";
import { useRouter } from "next/navigation";

const PromotionSetup = () => {
	const tableRef = useRef();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [percentTerm, setPercentTerm] = useState("");
	const { getAllPromotion, promotions, paginationData, loading } =
		usePromotionStore();

	useEffect(() => {
		getAllPromotion({ page: currentPage, pageSize: 5 });
	}, [getAllPromotion, currentPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handleSearchClick = () => {
		setCurrentPage(1);
		getAllPromotion({
			searchText: searchTerm,
			percent: parseFloat(percentTerm) || "",
			filter,
			page: 1,
			pageSize: 5,
		});
	};

	const handleResetClick = () => {
		setSearchTerm("");
		setFilter("");
		setCurrentPage(1);
		getAllPromotion({
			searchText: "",
			percent: "",
			filter: "",
			page: 1,
			pageSize: 5,
		});
	};

	return (
		<>
			<div className="flex items-center justify-between mb-4 p-4">
				<HBI_BreadCrumb pageName="Promotion Setup" />
				<div className="space-x-2 flex">
					<PrimaryBtn
						onClick={() =>
							router.push("/rewards/promotion-setup/add-promotion")
						}
						name="+ Add Promotion"
						color="white"
						width={133}
					/>
				</div>
			</div>
			<PromotionFilters
				searchTerm={searchTerm}
				filter={filter}
				setSearchTerm={setSearchTerm}
				setFilter={setFilter}
				onSearchClick={handleSearchClick}
				onResetClick={handleResetClick}
				percentTerm={percentTerm}
				setPercentTerm={setPercentTerm}
			/>
			<div
				className="w-full mx-auto"
				ref={tableRef}>
				{loading ? (
					<p>Loading promotions...</p>
				) : (
					<PromotionSetupTable
						promotions={promotions}
						paginationData={paginationData}
						handlePageChange={handlePageChange}
					/>
				)}
			</div>
		</>
	);
};

export default PromotionSetup;
