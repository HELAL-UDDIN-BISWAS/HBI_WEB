'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Healthdoc from '../../../../public/images/HEALTHDOC.png'
import Logo from '@/components/assets/icons/Logo'
import LoginImage from '../../../components/assets/images/login.png'
import { Redirect } from '@/lib/Redirect'
import useAuthStore from '@/store/authStore'
import HBIBoldText from '@/components/base/text/hbi_bold_text'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [isChecked1, setIsChecked1] = useState(false)

    const handleCheckboxChange1 = () => {
        setIsChecked1(!isChecked1)
    }
    const { login, isLoading, setCurrentPath, currentPath, user, token } =
        useAuthStore((state) => ({
            login: state.login,
            setStep: state.setStep,
            isLoading: state.isLoading,
            setCurrentPath: state.setCurrentPath,
            user: state.user,
            token: state.token,
            currentPath: state.currentPath,
        }))

    const onSubmit = async (data) => {
        const response = await login({
            email: data?.email,
            password: data?.password,
            rememberMe: isChecked1,
        })

        if (response?.status === 200) {
            setCurrentPath('/members')
            router?.push('/members')
        } else {
            if (response === 'Your account email is not confirmed') {
                router?.push('/')
            } else {
                setErrMsg(response)
            }
        }
    }

    if (!!user && !!token) {
        if (!!currentPath) {
            return <Redirect to={currentPath} />
        } else {
            return <Redirect to={`/members`} />
        }
    }

    return (
        <div className="w-full mx-auto lg:flex items-center h-screen">
            <div className="lg:w-2/6 w-full drop-shadow-2xl bg-[#FFFFFF] grid h-screen p-8 lg:p-12 2xl:p-20 items-center ">
                <div className="flex justify-center -mb-20 lg:-mb-24 2xl:-mb-10">
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

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${
                        errors?.password ||
                        errors?.email ||
                        (errMsg && !errors?.password)
                            ? 'gap-0'
                            : 'gap-[50px]'
                    }`}
                >
                    <h1 className="text-lg font-semibold">
                        Login to your account
                    </h1>
                    <div className="relative text-[#6E7E7D] my-3 ">
                        <div className="absolute top-[12px] left-2 2xl:left-4">
                            <MdEmail className="text-lg" />
                        </div>
                        <input
                            type="text"
                            className={`bg-[#F3F3F5] rounded-lg 2xl:rounded-[8px] ${
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
                            <span className=" text-xs text-[#E94C40] font-medium   ">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>

                    <div className="relative my-4 text-[#6E7E7D]">
                        <div className="absolute top-[11px] left-2 2xl:left-4">
                            <RiLockPasswordFill className="text-[#3FC9C1] text-lg" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`bg-[#F3F3F5] rounded-[8px] ${
                                errors?.password
                                    ? 'focus:bg-[#FEF7F7] focus:ring-[#E94C40]'
                                    : 'focus:ring-[#3FC9C1] focus:bg-[#F2FFFE]'
                            } text-[#2F4858] placeholder-[#9E9E9E] font-normal text-sm w-full py-2.5 pl-8 2xl:pl-10 pr-12 focus:outline-none focus:ring-[1px] `}
                            placeholder="Password"
                            {...register('password', {
                                required: 'This field is required',
                                message: 'This field is required',
                            })}
                        />
                        {errors?.password && (
                            <span className=" text-xs text-[#E94C40] font-medium   ">
                                {errors?.password?.message}
                            </span>
                        )}
                        {errMsg && !errors?.password && (
                            <span className=" text-xs text-[#E94C40] font-medium   ">
                                {errMsg}
                            </span>
                        )}
                        <div className="absolute top-[20px] right-2 transform -translate-y-1/2 z-10 l-[514px]">
                            {showPassword ? (
                                <AiOutlineEye
                                    size={20}
                                    color="#20C4F4"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    size={20}
                                    color="#20C4F4"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="border-[1px] border-[#3FC9C1] rounded h-4 w-4"
                                checked={isChecked1}
                                onChange={handleCheckboxChange1}
                            />
                            <HBIBoldText text={' Remember me'} fontSize={14} />{' '}
                        </div>
                        <div>
                            <span
                                onClick={() => router?.push('/forgot-password')}
                                className="text-[#20C4F4] cursor-pointer font-medium text-base"
                            >
                                Forgot Password?
                            </span>
                        </div>
                    </div>

                    <div className="w-full pb-3">
                        <button
                            type="submit"
                            className={`${
                                isLoading ? 'bg-[#3FC9C1]/70' : 'bg-[#3FC9C1]'
                            } py-2 w-full rounded-[10px] text-white text-base font-medium mt-12`}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-full lg:w-4/6 h-screen bg-[#F3F3F5] flex justify-center items-center">
                <Image
                    src={LoginImage}
                    alt="Login Image"
                    width={600}
                    height={600}
                />
            </div>
        </div>
    )
}

export default Login
