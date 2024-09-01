'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import PrimaryInput from '@/components/base/input/hbi_input';
import ButtonPrimary from '@/components/base/button/hbi_btn';
import Link from 'next/link';
import HBIBoldText from '@/components/base/text/hbi_bold_text';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/typo/tabs';
import useSpecializationStore from '@/store/specializationStore';
import { toast } from 'react-toastify';
import Image from 'next/image';

const AddSpeciality = () => {
	const [uploadedImageId, setUploadedImageId] = useState(null); // [1]
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // [1a]
	const [specialityName, setSpecialityName] = useState('');
	const { createSpecialization, loading, error } = useSpecializationStore();

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
		const uploadedImageUrl = uploadData[0].url; // uploaded image url
		setUploadedImageId(uploadedImageId); // [1]
		setUploadedImageUrl(uploadedImageUrl); // [1a]
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragAccept } =
		useDropzone({
			onDrop,
			multiple: false,
			accept: 'image/jpeg, image/png, image/jpg',
		});

	// Handle save changes
	const handleSaveChanges = async () => {
		if (!specialityName || !uploadedImageId) {
			alert('Please fill in all fields (name and image)');
			return;
		}

		// Create a new specialization
		const data = {
			title: specialityName,
			description: 'Updated Specialization Description',
			image: uploadedImageId, // The ID of the uploaded image
		};

		// Call the createSpecialization mutation
		try {
			const response = await createSpecialization(data);
			toast.success('Specialization created successfully');

			// clear the form
			setSpecialityName('');
			setUploadedImageId(null);
			setUploadedImageUrl(null);
		} catch (error) {
			toast.error('Error creating specialization');
			console.error('Error creating specialization:', error);
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
			setUploadedImageUrl(null);
			setUploadedImageId(null);
			toast.success('Image removed successfully');
		} else {
			toast.error('Error removing image');
		}
	};

	return (
		<div className="px-4 mt-6">
			{/* page heading here */}
			<HBIBoldText
				text="Add Speciality"
				fontFamily="Inter"
				fontSize={26}
				color="#2F4858"
				fontWeight={600}
			/>

			{/* bread ums here */}
			<HBI_BreadCrumb
				items={[
					{ label: 'Specialization', href: 'system-setup/specialisation/' },
					{ label: 'Add Speciality' },
				]}
			/>

			<div className="file-input mt-8">
				<Tabs defaultValue="general">
					<TabsList>
						<TabsTrigger value="general">General</TabsTrigger>
					</TabsList>

					<TabsContent value="general">
						<div className="p-4 bg-white min-h-[50vh] w-full rounded-md">
							<label className="text-[#2A2A2A] text-sm leading-5 mb-1">
								Specialty Image *
							</label>

							{/* uploaded image shower and remover here */}
							{uploadedImageUrl && (
								<div className="w-fit">
									<div className="uploaded-image-preview border-2 border-dashed w-fit p-2">
										<Image
											src={
												`${process.env.NEXT_PUBLIC_API_URL}` + uploadedImageUrl
											}
											alt="Uploaded Image"
											width={100}
											height={100}
											className="aspect-square"
										/>
									</div>
									<button
										onClick={() => handleDeleteImage(uploadedImageId)}
										className="text-[#8E8E8E] block mt-2 w-fit mx-auto">
										Remove Image
									</button>
								</div>
							)}

							{/* click, draggable  and droppable file picker here*/}
							{!uploadedImageUrl && (
								<div
									{...getRootProps()}
									className="cursor-pointer border-1 border-[#D9D9D9] bg-[#F2FFFE] py-6 rounded-md w-full">
									<input
										required
										{...getInputProps()}
									/>

									{isDragActive && !uploadedImageUrl && (
										<p className="flex justify-center items-center">
											Drop the files here...
										</p>
									)}

									{!isDragActive && !uploadedImageUrl && (
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

							<label className="text-[#2A2A2A] text-sm leading-5 mt-4">
								Specialty Name *
							</label>

							<PrimaryInput
								width={'100%'}
								height={60}
								bgColor="#FAFAFA"
								color="#ffffff"
								type="text"
								radius={8}
								borderColor="none"
								isIconleft={false}
								isIconRight={false}
								placeholder="Enter Name"
								fontSize={16}
								fontWeight={400}
								letterSpacing="0.03em"
								paddingTop={0}
								paddingRight={0}
								paddingBottom={0}
								paddingLeft={16}
								inputTextColor="#222"
								// isRequired={true}
								name={'specialtyName'}
								id={'specialtyName'}
								value={specialityName}
								onChange={(e) => setSpecialityName(e.target.value)}
							/>
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
								onClick={handleSaveChanges}
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
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default AddSpeciality;
