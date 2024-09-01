'use client'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
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
import useAppointmentStore from '@/store/appointmentsStore'
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb'
import CustomDateInput from '@/components/base/custom/customDateInput'
import PrimaryBtn from '@/components/base/button/hbi_btn'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/typo/tabs'
import useDoctorStore from '@/store/doctorStore'
import { useEffect } from 'react'
import useSpecializationStore from '@/store/specializationStore'
import useSystemUsersStore from '@/store/systemUsersStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'

const addAppointmentSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address')
        .required('This field is required'),
    date: yup.string().required('This field is required'),
    startTime: yup.string().required('This field is required'),
    endTime: yup
        .string()
        .required('This field is required')
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
    fee: yup.number().required('This field is required'),
    specialist: yup.string().optional(),
    doctor: yup.string().optional(),
    bookingType: yup.string().optional(),
})

const AddAppointment = () => {
    const { createAppointment, loading, error, appointment } =
        useAppointmentStore((state) => ({
            createAppointment: state.createAppointment,
            loading: state.loading,
            error: state.error,
            doctors: state.doctors,
            appointment: state.appointment,
        }))

    const consultType = [
        { value: 'Online_Consultant', label: 'Online' },
        { value: 'In_Person', label: 'In Person' },
    ]

    const {
        fetchDoctorsNameSpecialization,
        doctorsNameSpecialization,
        loading: doctorLoading,
        setFilters,
    } = useDoctorStore((state) => ({
        fetchDoctorsNameSpecialization: state.fetchDoctorsNameSpecialization,
        doctorsNameSpecialization: state.doctorsNameSpecialization,
        loading: state.loading,
        setFilters: state.setFilters,
    }))

    const { fetchSpecializationTitle, specializationTitle } =
        useSpecializationStore((state) => ({
            fetchSpecializationTitle: state.fetchSpecializationTitle,
            specializationTitle: state.specializationTitle,
        }))

    const { fetchUserByEmail, loading: userLoading } = useSystemUsersStore(
        (state) => ({
            fetchUserByEmail: state.fetchUserByEmail,
        })
    )

    useEffect(() => {
        fetchDoctorsNameSpecialization()
        fetchSpecializationTitle()
    }, [fetchDoctorsNameSpecialization, fetchSpecializationTitle])
    const router = useRouter()

    const onSpecializationChange = (value) => {
        onDoctorChange('')
        setFilters({
            specialization: value,
        })
        if (doctorsNameSpecialization.length === 0) {
            setValue('doctor', 'No Doctor')
        }
        fetchDoctorsNameSpecialization()
    }

    const onDoctorChange = (value) => {
        setFilters({ doctorName: value })
        const selectedDoctor = doctorsNameSpecialization?.find(
            (doctor) => doctor.name === value
        )

        if (selectedDoctor) {
            const specialization = selectedDoctor.specializations[0]?.title
            setValue('specialist', specialization)
        }
        fetchDoctorsNameSpecialization()
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue,
    } = useForm({ resolver: yupResolver(addAppointmentSchema) })

    const onCancel = () => {
        router.push('/appointments')
    }

    const breadcrumb_arg = [
        { label: 'Appointments', href: 'appointments' },
        { label: 'Add Appointment' },
    ]
    const onSubmit = async (data) => {
        const doctorId = doctorsNameSpecialization
            ?.map((doctor) => doctor.id)
            .join(', ')
        const fetchUser = await fetchUserByEmail(data.email)
        const userId = fetchUser?.map((user) => user.id).join(',')

        if (!userLoading) {
            const appointmentInput = {
                user: parseInt(userId),
                date: data.date,
                startTime: `${data.startTime}:00`,
                endTime: `${data.endTime}:00`,
                bookingType: data.bookingType,
                doctor: parseInt(doctorId),
                amount: parseFloat(data.fee),
                earliestAvailDate: true,
                isConfirmed: true,
                status: 'Pending',
            }


            try {
                await createAppointment(appointmentInput)
                if (appointment.data !== null) {
                    reset()
                    push('/appointments')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="m-3 h-[90vh] overflow-hidden overflow-y-visible">
            <div>
                <HBI_BreadCrumb
                    pageName="Add Appointment"
                    items={breadcrumb_arg}
                />
            </div>

            <Tabs defaultValue="general" className="mt-3">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="p-3 font-primary font-semibold text-base bg-white">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                {/* first row */}
                                <div className="flex md:flex-row flex-col gap-4 ">
                                    <div className="flex w-full flex-col">
                                        <label className="font-normal text-sm">
                                            Patient Email*
                                        </label>
                                        <input
                                            name="email"
                                            className="bg-[#FAFAFA] text-[#222222] font-normal  rounded-lg p-3   h-14 my-2 placeholder:pl-3 placeholder:font-normal text-[16px]"
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
                                    <div className="flex w-full  flex-col">
                                        <label className="font-normal text-sm ">
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
                                </div>

                                {/* second row */}
                                <div className="flex md:flex-row flex-col gap-4">
                                    <div className="flex flex-col w-full">
                                        <label className="font-normal text-sm">
                                            Start Time of Appointment*
                                        </label>
                                        <input
                                            name="time"
                                            type="time"
                                            aria-label="Start Time of Appointment"
                                            className="bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3  h-14 my-2 placeholder:bg-none placeholder:pl-3 placeholder:font-normal text-[16px]"
                                            placeholder="Select Time"
                                            {...register('startTime', {
                                                required:
                                                    'This field is required',
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
                                        <label className="font-normal text-sm ">
                                            End Time of Appointment*
                                        </label>
                                        <input
                                            className="bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3   h-14 my-2 placeholder:pl-3 placeholder:font-normal text-[16px]"
                                            type="time"
                                            name="endTime"
                                            aria-label="End Time of Appointment"
                                            placeholder="Select Time"
                                            {...register('endTime', {
                                                required:
                                                    'This field is required',
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

                                {/* third row */}
                                <div className="flex md:flex-row flex-col gap-4">
                                    <div className="w-full">
                                        <label className="font-normal text-sm">
                                            Choice of Specialist
                                        </label>
                                        <Controller
                                            name="specialist"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                        onSpecializationChange(
                                                            value
                                                        )
                                                    }}
                                                >
                                                    <SelectTrigger className=" bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3  h-14 my-2 placeholder:pl-3 z-50 placeholder:font-normal text-[16px] ">
                                                        <SelectValue placeholder="Select specialist" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {specializationTitle.map(
                                                            (
                                                                specialization
                                                            ) => (
                                                                <SelectItem
                                                                    className="focus:bg-[#DEEBFF] hover:bg-[#DEEBFF]"
                                                                    key={
                                                                        specialization.id
                                                                    }
                                                                    value={
                                                                        specialization.title
                                                                    }
                                                                >
                                                                    {
                                                                        specialization.title
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label className="font-normal text-sm">
                                            Choice of Doctor
                                        </label>
                                        <Controller
                                            name="doctor"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                        onDoctorChange(value)
                                                    }}
                                                >
                                                    <SelectTrigger className="  bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3  h-14 my-2 placeholder:pl-3 z-50 placeholder:font-normal text-[16px] ">
                                                        <SelectValue placeholder="Select doctor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {doctorsNameSpecialization.length ===
                                                        0 ? (
                                                            <SelectItem
                                                                disabled={true}
                                                                value="No Doctor"
                                                            >
                                                                No Doctor Found
                                                            </SelectItem>
                                                        ) : (
                                                            doctorsNameSpecialization?.map(
                                                                (doctor) => (
                                                                    <SelectItem
                                                                        className="focus:bg-[#DEEBFF] hover:bg-[#DEEBFF]"
                                                                        key={
                                                                            doctor.id
                                                                        }
                                                                        value={
                                                                            doctor.name
                                                                        }
                                                                    >
                                                                        {
                                                                            doctor.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* fourth row */}
                                <div className="flex md:flex-row flex-col gap-4 mt-3">
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
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger className=" bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3  h-14 my-2 placeholder:pl-3 z-50 placeholder:font-normal text-[16px] ">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="">
                                                        {consultType.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    className="focus:bg-[#DEEBFF] hover:bg-[#DEEBFF]"
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className=" w-full flex flex-col">
                                        <label className="font-normal text-sm ">
                                            Consultation fee*
                                        </label>
                                        <input
                                            className="bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3   h-14 my-2 placeholder:pl-3  placeholder:font-normal text-[16px]"
                                            type="number"
                                            name="fee"
                                            placeholder="Enter amount"
                                            {...register('fee', {
                                                required:
                                                    'This field is required',
                                            })}
                                        />
                                        <p className="h-5 text-xs text-red">
                                            {errors.fee && (
                                                <span>
                                                    {errors.fee.message}
                                                </span>
                                            )}
                                        </p>
                                    </div>  
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <PrimaryBtn
                                    type="submit"
                                    name="Add Appointment"
                                    width={144}
                                    
                                />

                                <PrimaryBtn
                                    onClick={onCancel}
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

export default AddAppointment
