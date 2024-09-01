'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import ButtonPrimary from '@/components/base/button/hbi_btn';
import Link from 'next/link';
import HBIBoldText from '@/components/base/text/hbi_bold_text';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/typo/tabs';
import { useParams } from 'next/navigation';
import useSpecializationStore from '@/store/specializationStore';
import Loading from '@/components/ui/loading';
import HBIErrorText from '@/components/base/text/hbi_error_text';
import { toast } from 'react-toastify';
import Image from 'next/image';
import HbiFormInput from '@/components/ui/HbiFormInput';
import { useForm } from 'react-hook-form';

const EditSpeciality = () => {
	const [updatedImageId, setUpdatedImageId] = useState(null); // [1]
	const [updatedImageUrl, setUpdatedImageUrl] = useState(null); // [1a]
	const { id } = useParams();
	const {
		fetchSpecializationById,
		specialization,
		updateSpecialization,
		loading,
		error,
	} = useSpecializationStore();
	const [refetch, setRefetch] = useState(false);
	const [specialityName, setSpecialityName] = useState(
		specialization?.title || ''
	);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	useEffect(() => {
		fetchSpecializationById(id);
	}, [fetchSpecializationById, id, refetch]);

	useEffect(() => {
		if (specialization) {
			setValue('title', specialization?.title);
		}
	}, [setValue, specialization]);

	const onDrop = useCallback(async (acceptedFiles) => {
		if (!acceptedFiles || acceptedFiles.length === 0) {
			return;
		}

		const file = acceptedFiles[0];

		// Upload an image using REST API first
		const formData = new FormData();
		formData.append('files', file);

		const uploadResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
			{
				method: 'POST',
				body: formData,
			}
		);

		const uploadData = await uploadResponse.json();
		const uploadedImageId = uploadData[0].id; // uploaded image id
		const uploadedImageUrl = uploadData[0].url; // uploaded image id
		setUpdatedImageId(uploadedImageId); // [1]
		setUpdatedImageUrl(uploadedImageUrl); // [1a]
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <HBIErrorText text={error.message} />;
	}

	// Destructure specialization object
	const { title, image } = specialization || {};
	const { id: imgId, url } = image || {}; // the image url can be used to display the existing image

	// Handle form submission for the one input field here title
	const onSubmit = async (data) => {
		setSpecialityName(data.title);
	};

	// Handle save changes
	const handleSaveChanges = async () => {
		// Prepare data for update
		const data = {
			title: specialityName,
			image: updatedImageId ? updatedImageId : imgId,
		};

		// Handle form submission here
		try {
			const response = await updateSpecialization(id, data);
			toast.success('Specialization updated successfully');
		} catch (error) {
			toast.error('Error updating specialization');

			console.error('Error updating specialization:', error);
		}
	};

	const handleDeleteImage = async (id) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/upload/files/${id}`,
			{
				method: 'DELETE',
			}
		);

		if (response.ok) {
			setUpdatedImageUrl(null);
			setUpdatedImageId(null);
			setRefetch(true);
			window.location.reload();
			toast.success('Image deleted successfully');
		} else {
			toast.error('Error deleting image');
		}
	};

	return (
		<div className="px-4 mt-6">
			{/* page heading here */}
			<HBIBoldText
				text="Edit Specialty"
				fontFamily="Inter"
				fontSize={26}
				color="#2F4858"
				fontWeight={600}
			/>

			{/* bread ums here */}
			<HBI_BreadCrumb
				items={[
					{ label: 'Specialization', href: 'system-setup/specialisation/' },
					{ label: 'Edit Specialty' },
				]}
			/>

			<div className="file-input mt-8">
				<Tabs defaultValue="general">
					<TabsList>
						<TabsTrigger value="general">General</TabsTrigger>
					</TabsList>

					<TabsContent value="general">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="mt-4">
							<div className="p-4 bg-white min-h-[50vh] w-full rounded-md">
								<label className="text-[#2A2A2A] text-sm leading-5 mb-1">
									Specialty Image *
								</label>

								{/* uploaded image shower and remover here */}
								{url && (
									<div className="w-fit">
										<div className="uploaded-image-preview border-2 border-dashed w-fit p-2">
											<Image
												src={`${process.env.NEXT_PUBLIC_API_URL}` + url}
												alt="Uploaded Image"
												width={100}
												height={100}
												className="aspect-square"
											/>
										</div>
										<button
											onClick={() => handleDeleteImage(imgId)}
											className="text-[#8E8E8E] block mt-2 w-fit mx-auto">
											Remove Image
										</button>
									</div>
								)}

								{/* uploaded image shower and remover here */}
								{updatedImageUrl && (
									<div className="w-fit">
										<div className="uploaded-image-preview border-2 border-dashed w-fit p-2">
											<Image
												src={
													`${process.env.NEXT_PUBLIC_API_URL}` + updatedImageUrl
												}
												alt="Uploaded Image"
												width={100}
												height={100}
												className="aspect-square"
											/>
										</div>
										<button
											onClick={() => handleDeleteImage(updatedImageId)}
											className="text-[#8E8E8E] block mt-2 w-fit mx-auto">
											Remove Image
										</button>
									</div>
								)}

								{/* click, draggable  and droppable file picker here*/}
								{!url && !updatedImageUrl && (
									<div
										{...getRootProps()}
										className="border-1 border-[#D9D9D9] bg-[#F2FFFE] py-6 rounded-md w-full">
										<input
											required
											{...getInputProps()}
										/>

										{isDragActive && (
											<p className="flex justify-center items-center">
												Drop the files here...
											</p>
										)}

										{!isDragActive && (
											<div className="text-center w-fit mx-auto">
												<svg
													className="w-fit mx-auto"
													xmlns="http://www.w3.org/2000/svg"
													width="60"
													height="60"
													viewBox="0 0 60 60"
													fill="none">
													<g clipPath="url(#clip0_5026_17547)">
														<path
															d="M40 17.5C40 20.2625 37.7625 22.5 35 22.5C32.2375 22.5 30 20.2625 30 17.5C30 14.7375 32.2375 12.5 35 12.5C37.7625 12.5 40 14.7375 40 17.5ZM56.25 45H52.5V41.25C52.5 39.18 50.8225 37.5 48.75 37.5C46.6775 37.5 45 39.18 45 41.25V45H41.25C39.1775 45 37.5 46.68 37.5 48.75C37.5 50.82 39.1775 52.5 41.25 52.5H45V56.25C45 58.32 46.6775 60 48.75 60C50.8225 60 52.5 58.32 52.5 56.25V52.5H56.25C58.3225 52.5 60 50.82 60 48.75C60 46.68 58.3225 45 56.25 45ZM40 37.5L27.6925 25.1925C24.135 21.635 18.365 21.635 14.8075 25.1925L7.5 32.5V13.75C7.5 10.3025 10.305 7.5 13.75 7.5H38.75C42.195 7.5 45 10.3025 45 13.75V28.75C45 30.82 46.6775 32.5 48.75 32.5C50.8225 32.5 52.5 30.82 52.5 28.75V13.75C52.5 6.17 46.3325 0 38.75 0H13.75C6.1675 0 0 6.17 0 13.75V38.75C0 46.33 6.1675 52.5 13.75 52.5H28.75C30.8225 52.5 32.5 50.82 32.5 48.75V47.5C32.5 43.3575 35.8575 40 40 40V37.5Z"
															fill="#3FC9C1"
														/>
													</g>
													<defs>
														<clipPath id="clip0_5026_17547">
															<rect
																width="60"
																height="60"
																fill="white"
															/>
														</clipPath>
													</defs>
												</svg>
												<p className="text-[#2F4858] text-sm font-semibold mt-2">
													Click to add an asset or drag and drop one
													<br />
													in this area
												</p>
											</div>
										)}
									</div>
								)}

								{/* complex primary input field here */}
								<div className="mt-4">
									<HbiFormInput
										name="title"
										type="text"
										label={'Specialty Name'}
										placeholder="Enter Name"
										required={true}
										register={register}
										error={errors?.name}
										onchange={(e) => setSpecialityName(e.target.value)}
									/>
								</div>
							</div>

							<div className="buttons mt-4 flex gap-4 items-center">
								<ButtonPrimary
									name="Save Changes"
									width={150}
									height={40}
									bgColor="#3FC9C1"
									color="white"
									radius={4}
									direction="row"
									wrap={false}
									borderColor="#3FC9C1"
									isIconleft={true}
									fontSize={14}
									letterSpacing={0}
									paddingTop={0}
									paddingRight={0}
									paddingBottom={0}
									paddingLeft={0}
									justifyContent="center"
									alignItems="center"
									opacity={1}
									type={'submit'}
									onClick={async () => await handleSaveChanges()}
								/>

								<Link href={'/system-setup/specialisation/'}>
									<ButtonPrimary
										name="Cancel"
										width={150}
										height={40}
										bgColor="#F7F7F9"
										color="#2F4858"
										radius={4}
										direction="row"
										wrap={false}
										borderColor="#3FC9C1"
										isIconleft={true}
										fontSize={14}
										letterSpacing={0}
										paddingTop={0}
										paddingRight={0}
										paddingBottom={0}
										paddingLeft={0}
										justifyContent="center"
										alignItems="center"
										opacity={1}
									/>
								</Link>
							</div>
						</form>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default EditSpeciality;
