"use client"

import { Image } from "@/components/ui/images";
import Nodata from "../../assets/images/No data.png";
import PointModal from "./Modal";
import usePointStore from "@/store/pointStore";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const PointSetup = () => {
	const {
		deletePoint,
		loading: pointLoading,
		error: pointError,
	} = usePointStore((state) => ({
		loading: state.loading,
		error: state.error,
		deletePoint: state.deletePoint,
	}));

	const divref = useRef(null);
	const { getAllPoints, points } = usePointStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [dropdownRowId, setDropdownRowId] = useState(null);

	const [defaultValue, setDefaultValue] = useState({
		appointedAmount: null,
		earnedPoints: null,
		id: null,
	})

	const handleModalOpen = (data) => {
		setIsModalOpen(true)
		setEdit(true)
		setDefaultValue({
			appointedAmount: data?.appointedAmount,
			earnedPoints: data?.earnedPoints,
			id: data?.id,
		})
	}

	useEffect(() => {
		getAllPoints();
	}, [getAllPoints]);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = () => {
		setIsModalOpen(false);
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}

	const toggleDropdown = (itemId) => {
		if (dropdownRowId === itemId) {
			setDropdownRowId(null);
		} else {
			setDropdownRowId(itemId);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				divref.current &&
				!divref.current.contains(event.target)
			) {
				setDropdownRowId(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleDelete = async (id) => {
		try {
			await deletePoint(id);
			toast.success("Point Deleted Successfully");
		} catch (err) {
			console.error('Error deleting point:', err);
		}
	};


	return (
		<div className="px-5">
			<h1 className="py-3 text-2xl font-semibold">Point Setup</h1>
			{
				points.length === 0 ? (
					<div className="bg-[#FFFFFF] mt-3 w-full h-full py-10 text-center">
						<Image
							src={Nodata}
							alt="NoData Image"
							className="m-auto w-2/6"
						/>
						<h1 className="text-xl font-semibold">No data to display for point setup.</h1>
						<p className="text-lg capitalize mt-3">There is currently no data available for point setup. If you would like to set up data points,</p>
						<p className=" text-lg capitalize">please click here to begin.</p>
						<button onClick={toggleModal} className="mt-3 bg-[#3FC9C1] text-white px-6 py-2.5  rounded-md font-semibold">Point Setup</button>
					</div>
				) : (
						<div className="h-full rounded-lg overflow-auto relative">
							<table className="table-auto w-full text-left border-[2px] border-gray-200">
							<thead>
									<tr className="bg-[#E4E7EC]">
										<th className="py-3 px-4 border-b">Appointed Amount</th>
									<th className="py-3  border-b">Earned Points </th>
									<th className="py-3 border-b">Action</th>
								</tr>
							</thead>
							<tbody>
								{points.map((item, index) => (
									<tr
										key={item.id}
										className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
									>
										<td className="py-3 px-4 border-b font-semibold text-[#20C4F4]">${item.appointedAmount}</td>
										<td className="py-3 border-b font-semibold">{item.earnedPoints} points</td>
										<td className="py-3 px-2 border-b ">
											<div className="relative w-max">
												<button onClick={() => toggleDropdown(item.id)}
												>
													< BsThreeDotsVertical />
												</button>
												{dropdownRowId === item.id && (
													<div ref={divref} className="absolute left-5 -top-5 w-36 bg-white shadow-lg z-50 rounded-md"
														style={{ zIndex: 1000 }}>
														<button onClick={() => handleModalOpen({
															appointedAmount: item?.appointedAmount,
															earnedPoints: item?.earnedPoints,
															id: item?.id,
														})} className="w-full text-left px-4 py-2 text-sm text-white font-semibold bg-[#3FC9C1] flex justify-start items-center gap-2 rounded-t-md">
															<FiEdit3 />	Edit
														</button>
														<button onClick={() => handleDelete(item.id)} className="w-full text-left px-4 py-2 text-sm text-red font-semibold flex justify-start items-center gap-2">
															<MdOutlineDelete className="size-4" />	Delete
														</button>
													</div>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)
			}
			{isModalOpen && (
				<PointModal
					isAlertOpen={isModalOpen}
					handleCancel={handleCancel}
					handleSubmit={handleSubmit}
					defaultValue={defaultValue}
					editMode={edit}
					toggleModal={toggleModal}
				/>
			)}
		</div>
	);
};

export default PointSetup;
