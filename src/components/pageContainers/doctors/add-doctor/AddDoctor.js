'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import 'react-tabs/style/react-tabs.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import useSpecializationStore from '@/store/specializationStore';
import useClinicStore from '@/store/clinicStore';
import Loading from '@/components/ui/loading';
import useUploadStore from '@/store/uploadStore';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { RxCrossCircled } from 'react-icons/rx';
import { useDoctorStore } from '@/store/doctorStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const AddDoctorPage = () => {
	const router = useRouter();
	const {
		image,
		loading: imageLoading,
		error: imagError,
		uploadImage,
		resetImage,
		fileId,
		deleteImage,
	} = useUploadStore((state) => ({
		image: state.image,
		loading: state.loading,
		error: state.error,
		uploadImage: state.uploadImage,
		deleteImage: state.deleteImage,
		resetImage: state.resetImage,
		fileId: state.fileId,
	}));

	const {
		createDoctor,
		loading: doctorLoading,
		error: doctorError,
	} = useDoctorStore((state) => ({
		loading: state.loading,
		error: state.error,
		createDoctor: state.createDoctor,
	}));

	const onDrop = async (acceptedFiles) => {
		const file = acceptedFiles[0];

		await uploadImage(file);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: 'image/jpeg, image/png, image/jpg',
	});

	const { specializations, fetchSpecializations, loading, error } =
		useSpecializationStore();

	useEffect(() => {
		fetchSpecializations();
	}, [fetchSpecializations]);
	const specializationFormattedData = specializations.map((specialization) => {
		return {
			id: specialization.id,
			title: specialization.title,
		};
	});

	const { clinics, fetchClinics } = useClinicStore();

	useEffect(() => {
		fetchClinics();
	}, [fetchClinics]);
	const clinicsFormattedData = clinics.map((clinic) => {
		return {
			id: clinic.id,
			name: clinic.attributes.name,
		};
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	const onSubmit = async (data) => {
		const doctorData = {
			...data,
			specializations: [data.specializations],
			profilePicture: fileId.toString(),
		};
		try {
			await createDoctor(doctorData);

			if (!doctorError) {
				toast.success('Doctor created successfully');
			} else {
				toast.error(doctorError.message);
			}
			reset();
			router.push('/doctors');
		} catch (error) {
			console.log(error);
		}
	};
	if (loading) {
		return <Loading />;
	}
	const breadcrumb_arg = [
		{
			label: 'Add Doctor',
			href: 'doctors',
		},
		{
			label: 'Add Doctor',
		},
	];

	return (
		<div className="p-4">
			<div className="ps-2">
				<HBI_BreadCrumb
					pageName="Add Doctor"
					items={breadcrumb_arg}
				/>
			</div>
			<Tabs
				defaultValue="general"
				className="w-full border-none h-[75vh] overflow-hidden p-2 overflow-y-visible">
				<TabsList className="border-none ">
					<TabsTrigger value="general">
						<div className="text-lg text-[#627AA4]">General</div>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="grid grid-cols-2 gap-x-5 gap-y-4 mx-auto border-b-2 p-4 rounded-b-md shadow-md bg-white">
						<div className="flex flex-col col-span-2">
							{imageLoading ? (
								<>
									<Loading />
								</>
							) : (
								<>
									<label className="text-md">Upload Image*</label>
									<div className="relative">
										{image ? (
											<div>
												<div
													className="w-[100px] h-[100px]"
													style={{
														border: '3px dashed #3FC9C1',
														marginTop: '5px',
													}}>
													<Image
														src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
														alt="Uploaded"
														width={80}
														height={53}
														style={{
															borderRadius: '2px',
															margin: '7px auto',
															textAlign: 'center',
														}}
													/>
												</div>
												<button
													onClick={deleteImage}
													className="mt-2  py-2 bg-white text-[#8E8E8E]  ">
													Remove Image
												</button>
											</div>
										) : (
											<div
												{...getRootProps()}
												className="cursor-pointer border-1 border-[#D9D9D9] bg-[#F2FFFE] py-6 rounded-md w-full">
												<input
													required
													{...getInputProps()}
												/>
												{isDragActive ? (
													<p className="flex justify-center items-center">
														Drop the files here...
													</p>
												) : (
													<div className="text-center w-fit mx-auto">
														<svg
															className="w-fit mx-auto"
															xmlns="http://www.w3.org/2000/svg"
															width="60"
															height="60"
															viewBox="0 0 60 60"
															fill="none">
															<g clip-path="url(#clip0_5026_17547)">
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
										{loading && <p>Loading...</p>}
										{error && <p className="text-red-500">{error}</p>}
									</div>
								</>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Doctor Name</label>
							<input
								{...register('name', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Doctor Name"
							/>
							{errors.name && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Doctor Email</label>
							<input
								type="email"
								{...register('email', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Email"
							/>
							{errors.email && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Mobile Number</label>
							<PhoneInput
								country={'us'}
								inputProps={{
									name: 'phoneNo',
									required: true,
									className:
										'border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200 w-full',
								}}
								containerClass="w-full m-1"
								inputClass="w-full"
								buttonClass="border rounded bg-gray-100 outline-none"
								onChange={(value) => setValue('phoneNo', value)}
							/>
							{errors.phoneNo && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Gender</label>
							<select
								{...register('gender', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200">
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
							{errors.gender && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Language</label>
							<input
								{...register('languageSpoken', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Language"
							/>
							{errors.languageSpoken && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>
						<div className="flex flex-col">
							<label className="text-md">Clinic</label>
							<select
								{...register('clinic', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200">
								<option value="">Select Clinic</option>
								{clinicsFormattedData.map((clinic) => (
									<option
										key={clinic.id}
										value={clinic.id}>
										{clinic.name}
									</option>
								))}
							</select>
							{errors.clinic && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>
						<div className="flex flex-col">
							<label className="text-md">Education</label>
							<input
								{...register('education', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Education"
							/>
							{errors.education && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Specialization</label>
							<select
								{...register('specializations', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200">
								<option value="">Select Specialization</option>
								{specializationFormattedData.map((specialization) => (
									<option
										key={specialization.id}
										value={specialization.id}>
										{specialization.title}
									</option>
								))}
							</select>
							{errors.specializations && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Specialty</label>
							<input
								{...register('speciality', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Speciality"
							/>
							{errors.speciality && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>
						<div className="flex flex-col">
							<label className="text-md">Sub Specialty</label>
							<input
								{...register('subSpecialty', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Sub Specialty"
							/>
							{errors.subSpecialty && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Affiliated Hospital</label>
							<input
								{...register('affiliateHospital', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Affiliated Hospital"
							/>
							{errors.affiliateHospital && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col">
							<label className="text-md">Keyword</label>
							<input
								{...register('keyword', { required: true })}
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
								placeholder="Keyword"
							/>
							{errors.keyword && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex flex-col col-span-2">
							<label className="text-md">Professional Profile</label>
							<textarea
								{...register('professionalProfile', { required: true })}
								placeholder="Enter professional profile"
								className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"></textarea>
							{errors.professionalProfile && (
								<span className="text-red-600">This field is required</span>
							)}
						</div>

						<div className="flex gap-3 col-span-2 mt-3">
							<button
								type="submit"
								className="bg-[#3fc9c1] text-white py-2 px-4 rounded">
								Add Doctor
							</button>
							<button
								type="button"
								onClick={() => router.push('/doctors')}
								className="bg-[#dffffd] text-[#3FC9C1] border-1 border-[#3FC9C1] py-2 px-4 rounded ">
								Cancel
							</button>
						</div>
					</form>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AddDoctorPage;

