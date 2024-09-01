'use client'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TabsList } from '@radix-ui/react-tabs'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useParams, useRouter } from 'next/navigation'
import useAppointmentStore from '@/store/appointmentsStore'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/typo/tabs'
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb'
import CustomDateInput from '@/components/base/custom/customDateInput'
import PrimaryBtn from '@/components/base/button/hbi_btn'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const scheduleAppointmentSchema = yup.object().shape({
    startTime: yup.string().required('Start time is required'),
    endTime: yup
        .string()
        .required('End time is required')
        .test(
            'is-greater',
            'End time must be later than start time',
            function (value) {
                const { startTime } = this.parent
                return (
                    new Date(`1970-01-01T${value}`) >
                    new Date(`1970-01-01T${startTime}`)
                )
            }
        ),
    amount: yup
        .number()
        .required('Amount is required')
        .typeError('Amount must be a number'),
})

const ScheduleAppointment = () => {
    const { push } = useRouter()
    const {
        appointment,
        updateAppointment,
        updatedAppointment,
        loading,
        error,
        fetchAppointmentById,
    } = useAppointmentStore((state) => ({
        appointment: state.appointment,
        loading: state.loading,
        error: state.error,
        updateAppointment: state.updateAppointment,
        fetchAppointmentById: state.fetchAppointmentById,
    }))

    const [startDate, setStartDate] = useState(new Date())

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        resolver: yupResolver(scheduleAppointmentSchema),
        defaultValues: {},
    })

    const breadcrumb_arg = [
        {
            label: 'Appointments',
            href: 'appointments',
        },
        {
            label: 'Schedule Appointment',
        },
    ]

    const { id } = useParams()

    useEffect(() => {
        if (appointment) {
            const defaultValue = {
                date: appointment.date || '',
                startTime: appointment.startTime || '',
                endTime: appointment.endTime || '',
                bookingType: appointment.bookingType || '',
                amount: appointment.amount || '',
                doctorName: appointment.doctor?.name || '',
                email: appointment.user?.email || '',
                patientName: appointment.user?.username || '',
            }

            Object.keys(defaultValue).forEach((key) => {
                setValue(key, defaultValue[key])
            })
        }
    }, [appointment, setValue])

    const onSubmit = async (data) => {
        const formatTImeForSubmission = (time) => {
            return `${time}:00.000`
        }

        let startTime =
            data.startTime !== appointment.startTime
                ? formatTImeForSubmission(data.startTime)
                : appointment.startTime
        let endTime =
            data.endTime !== appointment.endTime
                ? formatTImeForSubmission(data.endTime)
                : appointment.endTime

        try {
            const appointmentInput = {
                date: data.date,
                startTime: startTime,
                endTime: endTime,
                bookingType: appointment.bookingType,
                amount: parseFloat(data.amount),
                status: 'Upcoming',
            }
            // console.log(appointmentInput);
            await updateAppointment(id, appointmentInput)
            if (updatedAppointment !== null) {
                reset()
                push('/appointments')
            }
        } catch (error) {
            console.error(error)
        }
    }
    const [isDataFetched, setIsDataFetched] = useState(false)

    useEffect(() => {
        if (id) {
            fetchAppointmentById(id).then(() => setIsDataFetched(true))
        }
    }, [id, fetchAppointmentById])

    if (!isDataFetched || loading) {
        return loading
    }

    return (
        <div className="m-3 h-[85vh] overflow-hidden overflow-y-visible">
            <HBI_BreadCrumb
                pageName="Schedule Appointment"
                items={breadcrumb_arg}
            />
            {/* tabs */}
            <Tabs defaultValue="general" className=" mt-3">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="p-3 font-primary font-semibold text-base bg-white">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {/* first row */}
                                <div className="flex gap-4 md:flex-row flex-col">
                                    <div className="flex w-full flex-col">
                                        <label className="font-normal text-sm">
                                            Patient Email*
                                        </label>
                                        <input
                                            disabled
                                            name="email"
                                            className="bg-[#FAFAFA]  text-[#9E9E9E] cursor-not-allowed font-normal rounded-lg p-3 h-14 my-2 placeholder:pl-3 placeholder:font-normal text-[16px] "
                                            placeholder="Enter Email"
                                            {...register('email', {
                                                required:
                                                    'This field is required',
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message:
                                                        'Invalid email address',
                                                },
                                            })}
                                        />
                                        <p className="h-5 text-xs text-red">
                                            {errors.email && (
                                                <span>
                                                    {errors.email.message}
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex w-full flex-col">
                                        <label className="font-normal text-sm ">
                                            Patient Name*
                                        </label>
                                        <input
                                            disabled
                                            className="bg-[#FAFAFA]  text-[#9E9E9E] cursor-not-allowed  font-normal rounded-lg p-3 h-14 my-2  text-[16px]"
                                            type="text"
                                            {...register('patientName', {
                                                required:
                                                    'This field is required',
                                            })}
                                        />
                                        <p className="h-5 text-xs text-red">
                                            {errors.patientName && (
                                                <span>
                                                    {errors.patientName.message}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Second row */}
                                <div className="flex gap-4 md:flex-row flex-col">
                                    <div className="flex flex-col w-full">
                                        <label className="font-normal text-sm">
                                            Doctor Name*
                                        </label>
                                        <input
                                            disabled
                                            name="doctorName"
                                            className="bg-[#FAFAFA]  text-[#9E9E9E] cursor-not-allowed  font-normal rounded-lg p-3 h-14 my-2  text-[16px]"
                                            {...register('doctorName', {
                                                required:
                                                    'This field is required',
                                            })}
                                        />
                                        <p className="h-5 text-xs text-red">
                                            {errors.doctorName && (
                                                <span>
                                                    {errors.doctorName.message}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label className="font-normal text-sm">
                                            Type of Consultation
                                        </label>
                                        <Controller
                                            name="bookingType"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    disabled
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger className=" bg-[#FAFAFA]  text-[#9E9E9E] cursor-not-allowed  font-normal rounded-lg p-3 h-14 my-2  z-50 placeholder:font-normal text-[16px]">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent disabled>
                                                        <SelectItem
                                                            disabled
                                                            value="Online_Consultant"
                                                        >
                                                            Online
                                                        </SelectItem>
                                                        <SelectItem
                                                            disabled
                                                            value="In_Person"
                                                        >
                                                            In Person
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Third row */}
                                <div className="flex gap-4 md:flex-row flex-col">
                                    <div className="flex flex-col w-full">
                                        <label className="font-normal text-sm">
                                            Date of Appointment*
                                        </label>
                                        <Controller
                                            control={control}
                                            name="date"
                                            rules={{
                                                required:
                                                    'This field is required',
                                            }}
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <DatePicker
                                                    selected={value}
                                                    onChange={(date) => {
                                                        onChange(
                                                            format(
                                                                date,
                                                                'yyyy-MM-dd'
                                                            )
                                                        )
                                                        setStartDate(date)
                                                    }}
                                                    customInput={
                                                        <CustomDateInput />
                                                    }
                                                    dateFormat="yyyy/MM/dd"
                                                />
                                            )}
                                        />
                                        <p className="h-5 text-xs text-red">
                                            {errors.date && (
                                                <span>
                                                    {errors.date.message}
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    <div className=" w-full flex flex-col">
                                        <label className="font-normal text-sm ">
                                            Consultation fee*
                                        </label>
                                        <input
                                            className="bg-[#FAFAFA]  text-[#222222] font-normal rounded-lg p-3 h-14 my-2  text-[16px]"
                                            type="number"
                                            name="amount"
                                            {...register('amount', {
                                                required:
                                                    'This field is required',
                                            })}
                                        />
                                        <p className="h-5 text-xs text-red">
                                            {errors.amount && (
                                                <span>
                                                    {errors.amount.message}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Fourth row */}
                            <div className="flex gap-4 md:flex-row flex-col">
                                <div className="flex flex-col w-full">
                                    <label className="font-normal text-sm">
                                        Start Time of Appointment*
                                    </label>
                                    <input
                                        name="startTime"
                                        type="time"
                                        className="bg-[#FAFAFA]  text-[#222222] font-normal rounded-lg p-3 h-14 my-2  text-[16px]"
                                        {...register('startTime', {
                                            required: 'This field is required',
                                        })}
                                    />
                                    <p className="h-5 text-xs text-red">
                                        {' '}
                                        {errors.startTime && (
                                            <span>
                                                {errors.startTime.message}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="font-normal text-sm">
                                        End Time of Appointment*
                                    </label>
                                    <input
                                        className="bg-[#FAFAFA]  text-[#222222] font-normal rounded-lg p-3 h-14 my-2 placeholder:pl-3 placeholder:font-normal text-[16px]"
                                        type="time"
                                        name="endTime"
                                        placeholder="Select Time"
                                        {...register('endTime', {
                                            required: 'This field is required',
                                        })}
                                    />
                                    <p className="h-5 text-xs text-red">
                                        {errors.endTime && (
                                            <span>
                                                {errors.endTime.message}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* action */}
                            <div className="flex gap-2 mt-4">
                                <PrimaryBtn
                                    type="submit"
                                    name="Schedule Appointment"
                                    width={203}
                                />

                                <PrimaryBtn
                                    onClick={() => push('/appointments')}
                                    name="Cancel"
                                    color="#20C4F4"
                                    bgColor="#DFFFFD"
                                    width={133}
                                    borderColor="#3FC9C1"
                                />
                            </div>
                        </form>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ScheduleAppointment
