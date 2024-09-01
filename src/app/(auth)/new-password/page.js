'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'
import Healthdoc from '../../../../public/images/HEALTHDOC.png'
import Logo from '@/components/assets/icons/Logo'
import PasswordImage from '../../../components/assets/images/new-password.png'
import useAuthStore from '@/store/authStore'
import HBIBoldText from '@/components/base/text/hbi_bold_text'

const NewPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [isChecked1, setIsChecked1] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { updateUserPassword, isLoading } = useAuthStore((state) => ({
        updateUserPassword: state.updateUserPassword,
        isLoading: state.isLoading,
    }))
    const router = useRouter()

    const handleCheckboxChange1 = () => {
        setIsChecked1(!isChecked1)
    }

    const onSubmit = async (data) => {
        const response = await updateUserPassword(data)
        if (response) {
            router?.push('/login')
        } else {
            setErrMsg(
                'New password should not be the same as the old password.'
            )
        }
    }

    return (
        <div className="w-full mx-auto lg:flex items-center h-screen">
            <div className="lg:w-2/6 w-full drop-shadow-2xl bg-[#FFFFFF] grid h-screen p-8 lg:p-12 2xl:p-20 items-center ">
                <div className="relative">
                    <div
                        onClick={() => router?.push('/otp-verification')}
                        className="cursor-pointer absolute lg:-mt-7 2xl:-mt-20"
                    >
                        <IoIosArrowBack className="h-6 w-6" />
                    </div>
                    <div className="flex justify-center lg:mb-10 mb-5">
                        <div className="flex gap-3 items-center">
                            <Logo />
                            <Image
                                src={Healthdoc}
                                alt="Healthdoc"
                                width={120}
                                height={120}
                                draggable="false"
                            />
                        </div>
                    </div>
                    <h1 className="text-lg font-semibold">
                        Create Your New Password
                    </h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col justify-between h-full mt-6"
                    >
                        <div>
                            <div className="relative mb-2">
                                <div className="relative">
                                    <div className="absolute top-[12px] left-2 2xl:left-4">
                                        <RiLockPasswordFill className="text-lg" />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        className={`bg-[#FAFAFA] rounded-[8px] ${
                                            errors?.password
                                                ? 'focus:bg-[#FEF7F7] focus:ring-[#E94C40]'
                                                : 'focus:ring-[#3FC9C1] focus:bg-[#F2FFFE]'
                                        } text-[#2F4858] placeholder-[#9E9E9E] font-normal text-sm w-full py-2.5 pl-8 2xl:pl-10 focus:outline-none focus:ring focus:ring-[1px]`}
                                        placeholder="New Password"
                                        {...register('password', {
                                            required: 'This field is required',
                                            minLength: {
                                                value: 8,
                                                message:
                                                    'Password must be at least 8 characters!',
                                            },
                                        })}
                                    />
                                    <div className="absolute top-1/2 transform -translate-y-1/2 right-3 z-10">
                                        {showPassword ? (
                                            <AiOutlineEye
                                                size={20}
                                                color="#9E9E9E"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            />
                                        ) : (
                                            <AiOutlineEyeInvisible
                                                size={20}
                                                color="#9E9E9E"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                {errors?.password && (
                                    <span className=" text-xs text-[#E94C40] font-normal left-0 ">
                                        {errors?.password?.message}
                                    </span>
                                )}
                            </div>

                            <div className="relative mt-6 mb-3">
                                <div className="relative">
                                    <div className="absolute top-[12px] left-2 2xl:left-4">
                                        <RiLockPasswordFill className="text-lg" />
                                    </div>
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        className={`bg-[#FAFAFA] rounded-[8px] ${
                                            errors?.newPassword
                                                ? 'focus:bg-[#FEF7F7] focus:ring-[#E94C40]'
                                                : 'focus:ring-[#3FC9C1] focus:bg-[#F2FFFE]'
                                        } text-[#2F4858] placeholder-[#9E9E9E] font-normal text-sm w-full py-2.5 pl-8 2xl:pl-10 focus:outline-none focus:ring focus:ring-[1px]`}
                                        placeholder="Confirm New Password"
                                        {...register('newPassword', {
                                            required:
                                                'Confirmation password is required',

                                            validate: (value) =>
                                                watch('password') === value ||
                                                'Passwords do not match',
                                        })}
                                    />
                                    <div className="absolute top-1/2 transform -translate-y-1/2 right-3 z-10">
                                        {showConfirmPassword ? (
                                            <AiOutlineEye
                                                size={20}
                                                color="#9E9E9E"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            />
                                        ) : (
                                            <AiOutlineEyeInvisible
                                                size={20}
                                                color="#9E9E9E"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                {errors?.newPassword && (
                                    <span className=" text-xs text-[#E94C40] font-normal">
                                        {errors?.newPassword?.message}
                                    </span>
                                )}
                                <span className="mt-10 text-xs text-[#E94C40] font-medium">
                                    {errMsg}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <input
                                    type="checkbox"
                                    className="border-[1px] border-[#3FC9C1] rounded h-4 w-4"
                                    checked={isChecked1}
                                    onChange={handleCheckboxChange1}
                                />
                                <HBIBoldText
                                    text={' Remember me'}
                                    fontSize={14}
                                />{' '}
                            </div>
                        </div>
                        <div className="w-full mt-20">
                            <button
                                type="submit"
                                className="bg-[#3FC9C1] py-2 w-full rounded-[10px] text-white text-base font-medium mt-12"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="w-full lg:w-4/6 h-screen bg-[#F3F3F5] flex justify-center items-center">
                <Image
                    src={PasswordImage}
                    alt="Login Image"
                    width={600}
                    height={600}
                />
            </div>
        </div>
    )
}
export default NewPassword
