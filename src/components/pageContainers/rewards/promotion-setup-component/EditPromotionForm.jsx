"use client";
import React, { useEffect } from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/typo/tabs/index";
import PrimaryBtn from "@/components/base/button/hbi_btn";
import HBI_BreadCrumb from "@/components/base/breadcrumb/HBI_BreadCrumb";
import usePromotionStore from "@/store/promotionStore";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

const EditPromotionForm = () => {
	const router = useRouter();
	const {
		formState: { errors },
		control,
		setValue,
		handleSubmit,
	} = useForm();
	const { id } = useParams();
	const { getSinglePromotion, updatePromotion, promotion, isLoading } =
		usePromotionStore((state) => ({
			getSinglePromotion: state.getSinglePromotion,
			updatePromotion: state.updatePromotion,
			promotion: state.promotion,
			isLoading: state.isLoading,
		}));

	useEffect(() => {
		if (id) {
			console.log("Fetching promotion with ID:", id);
			getSinglePromotion(id);
		}
	}, [id, getSinglePromotion]);

	useEffect(() => {
		// Populate form fields with promotion data when it's available
		if (promotion) {
			setValue("product", promotion.attributes.productName);
			setValue(
				"percent_gold",
				promotion.attributes.tier === "Gold"
					? promotion.attributes.percentOff
					: ""
			);
			setValue(
				"percent_silver",
				promotion.attributes.tier === "Silver"
					? promotion.attributes.percentOff
					: ""
			);
			setValue(
				"percent_bronze",
				promotion.attributes.tier === "Bronze"
					? promotion.attributes.percentOff
					: ""
			);
			setValue(
				"percent_beginner",
				promotion.attributes.tier === "Beginner"
					? promotion.attributes.percentOff
					: ""
			);
		}
	}, [promotion, setValue]);

	const onSubmit = async (data) => {
		try {
			const {
				product,
				percent_gold,
				percent_silver,
				percent_bronze,
				percent_beginner,
			} = data;
			const tier = ["Gold", "Silver", "Bronze", "Beginner"].find(
				(t) => data[`percent_${t.toLowerCase()}`] !== ""
			);
			const percentOff = data[`percent_${tier.toLowerCase()}`];

			const updatedPromotion = await updatePromotion({
				id,
				productName: product,
				percentOff: parseFloat(percentOff),
				tier,
			});

			if (updatedPromotion) {
				toast.success("Promotion updated successfully!");
				router.push("/rewards/promotion-setup");
			}
		} catch (error) {
			toast.error("Failed to update promotion. Please try again.");
			console.error("Failed to update promotion:", error);
		}
	};

	const breadcrumb_arg = [
		{
			label: "Promotion Setup",
			href: "rewards/promotion-setup",
		},
		{
			label: "Edit Promotion",
		},
	];

	return (
		<div>
			<div className="p-4 rounded-lg">
				<div className="ps-2">
					<HBI_BreadCrumb
						pageName="Edit Promotion"
						items={breadcrumb_arg}
					/>
				</div>
				<div className="ps-2"></div>

				{/* Tabs and form */}
				<Tabs
					defaultValue="general"
					className="w-full border-none p-2">
					<TabsList className="border-none">
						<TabsTrigger value="general">
							<div className="text-lg  text-[#627AA4]">Edit Promotion</div>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="general">
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* Product select */}
							<div className="grid grid-cols-1 gap-4 p-4 rounded-r-xl rounded-s-xl rounded-ss-none bg-[#FFFFFF]">
								<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3.5">
									<div>
										<label className="block text-sm font-medium text-[#2A2A2A]">
											Select Product *
											<Controller
												name="product"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<Select {...field}>
														<SelectTrigger className="bg-[#FAFAFA] rounded-lg p-2 h-14 my-2 placeholder:pl-3 z-50 placeholder:font-normal text-[16px]">
															<SelectValue placeholder="Select product" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="Vitamin C">
																Vitamin C
															</SelectItem>
															<SelectItem value="Reboot Vivo">
																Reboot Vivo
															</SelectItem>
															<SelectItem value="Reboot Lavida ">
																Reboot Lavida
															</SelectItem>
														</SelectContent>
													</Select>
												)}
											/>
											{errors.product && <span>This field is required.</span>}
										</label>
									</div>
									<div></div>
								</div>
								{/* Tier and percent inputs */}
								<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3.5">
									{["Gold", "Silver", "Bronze", "Beginner"].map((tier) => (
										<div
											key={tier}
											className="w-full">
											<label className="font-normal text-sm">
												{tier} Percent Off %
											</label>
											<div className="flex">
												<p className="bg-[#F3F4F8] inline-flex items-center px-3 w-6/12 my-2 text-lg font-medium text-[#222222] bg-gray-200 justify-start rounded-s-md">
													{tier === "Beginner" ? tier : `${tier} Tier`}
												</p>
												<Controller
													name={`percent_${tier.toLowerCase()}`}
													control={control}
													render={({ field }) => (
														<input
															{...field}
															type="number"
															className="bg-[#FAFAFA] w-full p-1 h-14 my-2 placeholder:bg-none placeholder:pl-3 placeholder:font-normal text-[16px]"
															placeholder="Enter percent off"
														/>
													)}
												/>
												<div className="bg-[#F3F4F8] inline-flex items-center px-4 w-3/12 my-2 text-lg font-medium text-[#8E8E8E] bg-gray-200 justify-center rounded-e-md">
													%
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Submit and cancel buttons */}
							<div className="mt-6 flex space-x-4">
								<PrimaryBtn
									type="submit"
									name={isLoading ? "Saving..." : "Save Changes"}
									color="white"
									width={133}
									disabled={isLoading}
								/>
								<PrimaryBtn
									type="button"
									name="Cancel"
									color="#3FC9C1"
									bgColor="#DFFFFD"
									width={133}
									borderColor="#3FC9C1"
									onClick={() => router.push("/rewards/promotion-setup")}
								/>
							</div>
						</form>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default EditPromotionForm;
