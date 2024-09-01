'use client'
import HBIRegularText from '@/components/base/text/hbi_regular_text'
import useAuthStore from '@/store/authStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { IoIosArrowBack } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import Healthdoc from '../../../../public/images/HEALTHDOC.png'
import Logo from '../../../components/assets/icons/Logo'
import ForgotImage from '../../../components/assets/images/forgot.png'
import { useState } from 'react'

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const router = useRouter()
    const [errMsg, setErrMsg] = useState(null)
    const { requestPassword, isLoading, forgetPasswordMessage } = useAuthStore(
        (state) => ({
            requestPassword: state.requestPassword,
            forgetPasswordMessage: state.forgetPasswordMessage,
        })
    )
    const onSubmit = async (data) => {
        const response = await requestPassword(data)
        if (response?.ok) {
            router?.push('/otp-verification')
        } else {
            setErrMsg('Invalid email address.')
        }
    }

    return (
        <div className="w-full mx-auto lg:flex items-center h-screen">
            <div className="lg:w-2/6 w-full drop-shadow-2xl bg-[#FFFFFF] grid h-screen p-8 lg:p-12 2xl:p-20 items-center">
                <div className="relative">
                    <div
                        onClick={() => router?.push('/login')}
                        className="cursor-pointer absolute lg:-mt-7 2xl:-mt-20 "
                        data-testid="back-arrow"
                    >
                        <IoIosArrowBack className="h-6 w-6" />
                    </div>
                    <div className="flex justify-center mb-10">
                        <div className="flex h-[65px] gap-3 items-center">
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
                    <h1 className="text-xl font-semibold">Forgot Password</h1>
                    <div className="mt-3">
                        <HBIRegularText
                            text={
                                'Enter your email address and a verification code will be sent to the email you provide.'
                            }
                            fontSize={14}
                            color={222222}
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative text-[#6E7E7D] mt-10 ">
                            <div className="absolute top-[12px] left-2 2xl:left-4">
                                <MdEmail className="text-lg" />
                            </div>
                            <input
                                type="text"
                                className={`bg-[#F3F3F5] rounded-[8px] ${
                                    errors?.email
                                        ? 'focus:bg-[#FEF7F7] focus:ring-[#E94C40]'
                                        : 'focus:ring-[#3FC9C1] focus:bg-[#F2FFFE]'
                                } text-[#2F4858] placeholder-[#9E9E9E] font-normal text-sm w-full py-2.5 pl-8 2xl:pl-10 focus:outline-none focus:ring-[1px] `}
                                placeholder="Email"
                                {...register('email', {
                                    required: 'This field is required',
                                    message: 'This field is required',
                                })}
                            />
                            {errors.email && (
                                <span className=" text-xs text-[#E94C40] font-medium">
                                    {errors?.email?.message}
                                </span>
                            )}
                            {forgetPasswordMessage && (
                                <div className=" mt-3 text-[12px] text-primary">
                                    <p className="text-[#167F60]">
                                        {forgetPasswordMessage}
                                    </p>
                                </div>
                            )}
                            <span className="mt-10 text-xs text-[#E94C40] font-medium">
                                {errMsg}
                            </span>
                        </div>
                        <div className="w-full pb-3 mt-32">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`${isLoading ? 'bg-[#3FC9C1]/70' : 'bg-[#3FC9C1]'} py-2 w-full rounded-[10px] text-white text-base font-medium mt-4`}
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full lg:w-4/6 h-screen bg-[#F3F3F5] flex justify-center items-center">
                <Image
                    src={ForgotImage}
                    alt="Login Image"
                    width={600}
                    height={600}
                />
            </div>
        </div>
    )
}
export default ForgotPassword
