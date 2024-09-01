'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextInput from '@/stories/TextInput';
import PrimaryBtn from '@/components/base/button/hbi_btn';
// import CancelBtn from "@/app/components/base/button/hbi_cancel_btn";
import HBIBoldText from './base/text/hbi_bold_text';
// import HBISemiBoldText from "./base/text/hbi_semibold_text";
// import HBIStatusText from "./base/text/hbi_status_text";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const [isChecked1, setIsChecked1] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const role = 'user';
	const router = useRouter();

	const handleCancel = () => {
		console.log('cancel');
	};
	const onSubmit = async (data) => {
		console.log('data', data);
	};

	const handleCheckboxChange1 = () => {
		setIsChecked1(!isChecked1);
	};

	return (
		<div className="container h-screen flex flex-col overflow-auto font-primary font-semibold text-base bg-white">
			<div className="flex flex-col justify-center items-center pt-[50px] gap-[20px] pb-[60px] ">
				<div className="flex items-center gap-2">
					{/* <Image src={logo} alt="" />
          <Image src={healthdoc} alt="health doc" /> */}
				</div>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={`flex flex-col ${errors?.password || errors?.email || (errMsg && !errors?.password)
						? 'gap-0'
						: 'gap-[50px]'
					}`}>
				<div>
					<p className="py-4">
						{' '}
						<HBIBoldText
							text={'Login to your account'}
							fontSize={16}
						/>
					</p>
					<div className="relative mb-5 ">
						<div className="absolute top-4 left-2">{/* <LoginIcon /> */}</div>
						<TextInput
							isRequired={true}
							label="Email"
							name="email"
							errorMessage={errors?.email ? errors.email.message : ''}
							error={!!errors?.email}
							placeholder="Email"
							register={register('email', {
								required: 'This field is required',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Invalid email address',
								},
							})}
						/>
					</div>

					<div className="relative mb-2">
						<div className="absolute top-1/2 transform -translate-y-1/2 left-2">
							{/* <UserMailIcon /> */}
						</div>
						<TextInput
							isRequired={true}
							label="Password"
							type={showPassword ? 'text' : 'password'}
							name="password"
							errorMessage={errors?.password ? errors.password.message : ''}
							error={!!errors?.password}
							placeholder="Password"
							register={register('password', {
								required: 'This field is required',
								message: 'This field is required',
							})}
						/>

						<div className="absolute top-[58px] transform -translate-y-1/2 z-10 l-[514px]">
							{showPassword ? (
								<AiOutlineEye
									size={20}
									color="#9E9E9E"
									style={{ cursor: 'pointer' }}
									onClick={() => setShowPassword(!showPassword)}
								/>
							) : (
								<AiOutlineEyeInvisible
									size={20}
									color="#9E9E9E"
									style={{ cursor: 'pointer' }}
									onClick={() => setShowPassword(!showPassword)}
								/>
							)}
						</div>
					</div>

					<div className="flex justify-between items-center pb-4 mt-4">
						<div>
							<label className="checkbox-label font-semibold text-sm text-gray-700">
								<input
									type="checkbox"
									className="checkbox-input"
									checked={isChecked1}
									onChange={handleCheckboxChange1}
								/>
								<span className="checkbox-custom"></span>
								<span className="flex justify-center items-center pt-[2px] pl-1">
									<HBIBoldText
										text={' Remember me'}
										fontSize={14}
									/>{' '}
								</span>
							</label>
						</div>
						<div
							className="cursor-pointer text-base "
						// onClick={() => router?.push("/forgot-pass")}
						>
							<HBIBoldText
								text={' Forgot Password?'}
								fontSize={14}
								color={'#20C4F4'}
							/>
						</div>
						{/* <HBIStatusText text={"Pending"} color={"#FFA800"} /> */}
					</div>
				</div>
				<div className="w-full pb-3 ">
					<PrimaryBtn
						name={'Login'}
						type="submit"
						color="#ffffff"
					/>
					{/* <CancelBtn name={"Cancel"} onClick={() => handleCancel()} /> */}
				</div>
			</form>
			<button
				type="button"
				// onClick={() => goToDashboard()}
				className={`${isLoading
						? ' text-[#3FC9C1] border-[1px] border-[#3FC9C1]'
						: 'text-[#3FC9C1]  border-[1px] border-[#3FC9C1]'
					} py-2 w-full rounded-[10px] text-[#3FC9C1] text-base font-medium `}>
				Login as guest
			</button>
			<p className="mt-2 self-center z-2 text-center p-2 text-base font-medium">
				<span className="text-[#000]">Don’t have an account?</span>
				<span
					className=" cursor-pointer ms-2 text-[#3FC9C1]"
				// onClick={() => router?.push("/signup")}
				>
					Sign up
				</span>
			</p>
		</div>
	);
};

export default Login;
