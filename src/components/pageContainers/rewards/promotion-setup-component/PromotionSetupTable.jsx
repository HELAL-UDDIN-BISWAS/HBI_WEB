import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ThreeDots from "@/components/assets/icons/threeDots";
import EditIcon from "@/components/assets/icons/editIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import ShowingEntires from "@/components/base/text/hbi_showing_entries";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import usePromotionStore from "@/store/promotionStore";
import { toast } from "react-toastify";

const PromotionSetupTable = ({
	promotions,
	paginationData,
	handlePageChange,
}) => {
	const [openEdit, setOpenEdit] = useState(null);
	const editRef = useRef(null);

	const handleOpen = (index) => {
		setOpenEdit(index === openEdit ? null : index);
	};

	const { deletePromotion, getAllPromotion } = usePromotionStore((state) => ({
		deletePromotion: state.deletePromotion,
		getAllPromotion: state.getAllPromotion,
	}));

	useEffect(() => {
		function handleClickOutside(event) {
			if (editRef.current && !editRef.current.contains(event.target)) {
				setOpenEdit(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleDelete = async (id) => {
		try {
			const result = await deletePromotion({ id });
			if (result) {
				await getAllPromotion({});
				toast.success("Promotion Deleted successfully");
			} else {
				toast.error("Failed to delete promotion");
			}
		} catch (error) {
			toast.error("Error deleting promotion");
		}
	};

	return (
		<div>
			<div className="p-4 rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product Name</TableHead>
							<TableHead>Percent off (%)</TableHead>
							<TableHead>Tier</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					{promotions.length === 0 ? (
						<TableBody className="h-[300px]">
							<TableRow>
								<TableCell colSpan="7">
									<div className="flex justify-center">
										<p>No Record</p>
									</div>
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{promotions.map((row, index) => (
								<TableRow
									key={row.id}
									className={index % 2 === 0 ? "bg-[#FFFFFF]" : ""}>
									<TableCell className="text-[#20C4F4] font-bold">
										{row?.productName}
									</TableCell>
									<TableCell>{row?.percentOff}</TableCell>
									<TableCell>{row?.tier}</TableCell>
									<TableCell className="w-36 relative">
										<button
											onClick={() => handleOpen(index)}
											className="z-10">
											<ThreeDots />
										</button>
										{/* only open that which one clicked */}
										{openEdit === index && (
											<div
												ref={editRef}
												className="flex absolute z-50 top-0 right-28 flex-col text-center rounded-md bg-white">
												<button className="text-white font-semibold rounded-t-md bg-[#3FC9C1] ">
													<div className="flex items-center p-[7px]">
														<EditIcon />
														<Link
															href={`/rewards/promotion-setup/edit-promotion/${row.id}`}>
															<span className="ml-3">Edit</span>
														</Link>
													</div>
												</button>
												<button onClick={() => handleDelete(row.id)}>
													<div className="flex items-center rounded-b-md shadow-sm p-[7px] bg-white text-[#E94C40]">
														<DeleteIcon />
														<span className="ml-3">Delete</span>
													</div>
												</button>
											</div>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>
			</div>
			{promotions.length !== 0 && (
				<div className="pb-4">
					<p className="text-[#637480] text-sm my-4 px-4">
						<ShowingEntires paginationData={paginationData} />
					</p>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => handlePageChange(paginationData.page - 1)}
									disabled={paginationData?.page === 1}
								/>
							</PaginationItem>
							{[...Array(paginationData?.pageCount)].map((_, i) => (
								<PaginationItem key={i}>
									<PaginationLink
										className={
											paginationData?.page === i + 1
												? "bg-[#3FC9C1] text-white"
												: ""
										}
										onClick={() => handlePageChange(i + 1)}>
										{i + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationNext
									onClick={() =>
										handlePageChange(
											Math.min(
												paginationData.pageCount,
												paginationData.page + 1
											)
										)
									}
									disabled={paginationData?.page === paginationData?.pageCount}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	);
};

export default PromotionSetupTable;
