'use client'

import { maskIdentifier } from '@/lib/utils'
import useAuthStore from '@/store/authStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { useEffect, useReducer, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import VerificationInput from 'react-verification-input'
import Healthdoc from '../../../../public/images/HEALTHDOC.png'
import Logo from '@/components/assets/icons/Logo'
import ForgotImage from '@/components/assets/images/forgot.png'

function reducer(state, action) {
    switch (action.type) {
        case 'FIELD': {
            return {
                ...state,
                codeError: null,
                errorMessage: null,
                message: null,
                [action.fieldName]: action.payload,
            }
        }
        case 'VERIFYOTP':
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                message: null,
            }
        case 'CODE_MISSING':
            return {
                ...state,
                isLoading: false,
                emailError: 'Please enter a valid code',
            }

        case 'SUCCESS':
            return {
                ...state,
                isLoading: false,
            }
        case 'RESENT':
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                message: action.payload,
            }
        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        default:
            return state
    }
}

const OtpVerification = ({ referer }) => {
    const router = useRouter()
    const [timer, setTimer] = useState(60)

    useEffect(() => {
        let intervalId

        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1)
            }, 1000)
        }

        return () => clearInterval(intervalId)
    }, [timer])

    const {
        verifyAuthOTP,
        resendOTP,
        otpMsg,
        resendMsg,
        resendForgotPasswordOTP,
        isLoading,
    } = useAuthStore((state) => ({
        verifyAuthOTP: state.verifyAuthOTP,
        resendOTP: state.resendOTP,
        isLoading: state.isLoading,
        resendMsg: state.resendMsg,
        otpMsg: state.otpMsg,
        resendForgotPasswordOTP: state.resendForgotPasswordOTP,
    }))

    const lastSegment = (referer || '').split('/').filter(Boolean).pop()
    const identifier =
        lastSegment === 'add-number'
            ? parseCookies()?.phone
            : parseCookies()?.email
    const [state, dispatch] = useReducer(reducer, {
        code: '',
        identifier,
        isLoading: false,
        codeError: null,
        errorMessage: null,
        message: null,
    })

    const handleClick = async () => {
        const response = await verifyAuthOTP(state)
        console.log(response, 'otp verification')
        if (response?.status === 200) {
            router?.push('/new-password')
        }
    }

    const handleResendOtp = async () => {
        dispatch({
            type: 'FIELD',
            fieldName: 'code',
            payload: '',
        })

        useAuthStore.setState({ otpMsg: null })
        await resendForgotPasswordOTP(identifier)
        setTimer(30)
    }

    const emailOrPhone = maskIdentifier(identifier)

    return (
        <div className="w-full mx-auto lg:flex items-center h-screen">
            <div className="lg:w-2/6 w-full drop-shadow-2xl bg-[#FFFFFF] grid h-screen p-8 lg:p-12 2xl:p-20 items-center">
                <div className="relative">
                    <div
                        onClick={() => router?.push('/forgot-password')}
                        className="cursor-pointer absolute lg:-mt-7 2xl:-mt-20"
                    >
                        <IoIosArrowBack className="h-6 w-6" />
                    </div>

                    <div className="">
                        <div className="flex justify-center ">
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
                        <p className="text-lg text-[#222222] mt-10">
                            OTP Code Verification
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center text-xs gap-2">
                            <p className="">Code has been sent to</p>
                            <p>{emailOrPhone}</p>
                        </div>
                        <div className="flex flex-col items-cente w-full h-full">
                            <VerificationInput
                                value={state.code}
                                length={6}
                                placeholder=""
                                classNames={{
                                    container: `${
                                        state?.errorMessage ||
                                        state?.message ||
                                        otpMsg ||
                                        resendMsg
                                            ? 'focus:bg-[#FEF7F7] focus:ring-[#E94C40] mb-3 mt-8 outline-none'
                                            : 'focus:ring-[#3FC9C1] focus:bg-[#F2FFFE] mt-8 mb-11'
                                    } grid lg:gap-16 2xl:lg:gap-16 grid-cols-6`,
                                    character: `bg-[#C4C4C433] rounded text-[#2F4858] ${
                                        state?.errorMessage ||
                                        state?.message ||
                                        otpMsg
                                            ? 'border-1 border-[#CE0000] bg-[#CE0000]/5 outline-none'
                                            : 'border-none'
                                    }  placeholder-[#9E9E9E] font-medium text-xl w-[48px] h-[58px] flex items-center justify-center`,

                                    characterInactive: 'bg-[#C4C4C433]',
                                    characterSelected: 'cursor-pointer',
                                    characterFilled: 'text-4xl',
                                }}
                                onChange={(value) =>
                                    dispatch({
                                        type: 'FIELD',
                                        fieldName: 'code',
                                        payload: value,
                                    })
                                }
                            />
                            {otpMsg && (
                                <div className="mb-4 text-[12px] text-primary">
                                    <p className="text-[#CE0000]">{otpMsg}</p>
                                </div>
                            )}
                            {resendMsg && (
                                <div className="mb-4 text-[12px] text-primary">
                                    <p className="text-[#167F60]">
                                        {resendMsg}
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleClick}
                            type="submit"
                            className="bg-[#3FC9C1] py-2 w-full rounded-[10px] text-white text-base font-medium mt-16"
                        >
                            Verify
                        </button>
                        <p className="text-base font-medium text-center pt-8 pb-2">
                            Didn’t receive any code?{' '}
                            <button
                                className={`text-[#20C4F4] font-medium disabled:cursor-wait`}
                                disabled={timer > 0}
                                onClick={handleResendOtp}
                            >
                                Resend Again
                            </button>
                        </p>
                        <span className="text-sm font-normal text-center">
                            Request a new code in 00:
                            {timer >= 0 && <span>{timer}s</span>}
                        </span>
                    </div>
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
export default OtpVerification
