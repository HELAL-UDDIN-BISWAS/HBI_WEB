'use client'
import PrimaryBtn from '@/components/base/button/hbi_btn'
import usePatientStore from '@/store/patientsStore'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import PhoneInput from 'react-phone-input-2'
import countryList from 'react-select-country-list'
import dropdown from '@dropdowns/nationalities'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

//=========== form input validation with yup
const schema = yup.object().shape({
    email: yup.string().email().required(),
    fullName: yup.string().min(5).required(),
    membershipId: yup.string().optional(),
    dateOfBirth: yup.string().min(1).required(),
    gender: yup.string().optional(),
    nationality: yup.string().optional(),
    passport: yup.string().min(1).required(),
    phoneNo: yup.string().optional(),
    address1: yup.string().optional(),
    address2: yup.string().optional(),
    city: yup.string().optional(),
    postalCode: yup.string().optional(),
    country: yup.string().optional(),
    drugAllergies: yup.string().optional(),
    foodAllergies: yup.string().optional(),
    race: yup.string().optional(),
})

const EditPatientsForm = ({ id }) => {
    const router = useRouter()
    const { patient, fetchPatientById, updatedPatient, updatePatientById } =
        usePatientStore((state) => ({
            patient: state.patient,
            fetchPatientById: state.fetchPatientById,
            updatedPatient: state.updatedPatient,
            updatePatientById: state.updatePatientById,
        }))

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Others', label: 'Others' },
    ]

    const nationalities = dropdown.getAllNationalities()
    const countriesOptions = useMemo(() => countryList().getData(), [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {},
    })
    useEffect(() => {
        if (id) {
            fetchPatientById(id)
        }
    }, [fetchPatientById, id])

    //==========update Patient function
    const onSubmit = async (data) => {
        const userInput = {
            email: data.email,
        }
        const profileInput = {
            name: data.fullName,
            dateOfBirth: data.dateOfBirth,
            membershipID: data.membershipId,
            passport: data.passport,
            country: data.country,
            city: data.city,
            phoneNo: data.phoneNo,
            postalCode: data.postalCode,
            drugAllergy: data.drugAllergies,
            foodAllergy: data.foodAllergies,
            residentialAddressLine1: data.address1,
            residentialAddressLine2: data.address2,
            nationality: data.nationality,
            race: data.race,
        }
        const profileId = patient?.attributes?.profile?.data?.id

        await updatePatientById(profileId, profileInput, userInput, id)
        if (updatedPatient !== null) {
            reset()
            router.back()
        }
    }

    useEffect(() => {
        const profileAttributes = patient?.attributes?.profile?.data?.attributes
        if (patient) {
            const defaultValue = {
                email: patient?.attributes?.email || '',
                gender: profileAttributes?.gender || '',
                fullName: profileAttributes?.name || '',
                membershipId: profileAttributes?.membershipID || '',
                dateOfBirth: profileAttributes?.dateOfBirth || '',
                passport: profileAttributes?.passport || '',
                phoneNo: profileAttributes?.phoneNo || '',
                nationality:
                    nationalities.find(
                        (option) =>
                            option.name === profileAttributes?.nationality
                    )?.name || '',
                country:
                    countriesOptions.find(
                        (option) => option.label === profileAttributes?.country
                    )?.label || '',
                address1: profileAttributes?.residentialAddressLine1 || '',
                address2: profileAttributes?.residentialAddressLine2 || '',
                city: profileAttributes?.city || '',
                postalCode: profileAttributes?.postalCode || '',
                foodAllergies: profileAttributes?.foodAllergy || '',
                drugAllergies: profileAttributes?.drugAllergy || '',
                race:
                    nationalities.find(
                        (option) => option.name === profileAttributes?.race
                    )?.name || '',
            }

            Object.keys(defaultValue).forEach((key) => {
                setValue(key, defaultValue[key])
            })
        }
    }, [patient, setValue])

    //===============form design
    return (
        <div className="relative bg-white p-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label>Email*</label>
                        <input
                            className="outline-red py-3  bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('email')}
                            placeholder="Enter Email"
                        />
                        {errors.email && (
                            <p className="text-[#e52c2c]">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-col w-full flex text-black">
                        <label>Full Name*</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('fullName')}
                            placeholder="Enter Full Name"
                        />
                        {errors.fullName && (
                            <p className="text-[#e52c2c]">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label>Membership ID</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            defaultValue={
                                patient?.attributes?.profile?.data?.attributes
                                    ?.membershipID
                            }
                            {...register('membershipId')}
                            placeholder="Enter Membership ID"
                        />
                        {errors.membershipId && (
                            <p className="text-[#e52c2c]">
                                {errors.membershipId.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-col w-full flex text-black">
                        <label>Date of Birth*</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="date"
                            {...register('dateOfBirth')}
                            placeholder="Enter Date of Birth"
                        />
                        {errors.dateOfBirth && (
                            <p className="text-[#e52c2c]">
                                {errors.dateOfBirth.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label>Gender</label>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                >
                                    <SelectTrigger className=" bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3  h-14  placeholder:pl-3 z-50 placeholder:font-normal text-[16px] ">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectContent>
                                            {genderOptions.map(
                                                (option, index) => (
                                                    <SelectItem
                                                        className="focus:bg-[#DEEBFF] hover:bg-[#DEEBFF]"
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* countriesOptions hint here */}
                    <div className="flex-col w-full flex text-black">
                        <label>Nationality</label>
                        <Controller
                            name="nationality"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                >
                                    <SelectTrigger className="bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3 h-14  placeholder:pl-3 z-50 placeholder:font-normal text-[16px]">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nationalities.map((option) => (
                                            <SelectItem
                                                className="focus:bg-[#DEEBFF] hover:bg-[#DEEBFF]"
                                                key={option.name}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label>NRIC/ Passport *</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('passport')}
                            placeholder="Enter NRIC/ Passport"
                        />
                        {errors.passport && (
                            <p className="text-[#e52c2c]">
                                {errors.passport.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-col w-full flex text-black">
                        <label>Mobile Number</label>
                        <div className="phone-input-wrapper relative">
                            <Controller
                                name="phoneNo"
                                control={control}
                                render={({ field }) => (
                                    <PhoneInput
                                        {...field}
                                        country={'us'}
                                        containerClass="custom-phone-input"
                                        inputClass="custom-input"
                                        inputStyle={{
                                            background: '#F3F3F5',
                                            padding: '8px 50px',
                                            margin: '0 0 0 4px',
                                            height: '50px',
                                            width: '100%',
                                            border: 'none',
                                            outline: 'none',
                                            boxShadow: 'none',
                                            fontSize: '14px',
                                        }}
                                        buttonStyle={{
                                            background: '#E0E0E0',
                                            padding: '8px',
                                            border: 'none',
                                            outline: 'none',
                                            boxShadow: 'none',
                                        }}
                                    />
                                )}
                            />
                            {errors.phoneNo && (
                                <p className="error">
                                    {errors.phoneNo.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label>Address 1</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('address1')}
                            placeholder="Enter Address 1"
                        />
                        {errors.address1 && (
                            <p className="text-[#e52c2c]">
                                {errors.address1.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-col w-full flex text-black">
                        <label>Address 2</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            defaultValue={
                                patient?.attributes?.profile?.data?.attributes
                                    ?.residentialAddressLine2
                            }
                            {...register('address2')}
                            placeholder="Enter Address 2"
                        />
                        {errors.address2 && (
                            <p className="text-[#e52c2c]">
                                {errors.address2.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label>City</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('city')}
                            placeholder="Enter City"
                        />
                        {errors.city && (
                            <p className="text-[#e52c2c]">
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-col w-full flex text-black">
                        <label>Postal Code</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('postalCode')}
                            placeholder="Enter Postal Code"
                        />
                        {errors.postalCode && (
                            <p className="text-[#e52c2c]">
                                {errors.postalCode.message}
                            </p>
                        )}
                    </div>
                    {/* TODO: You should work here */}
                    {/* TODO: You should work here */}
                    <div className="flex-col w-full flex text-black">
                        <label>Country</label>
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                >
                                    <SelectTrigger className="bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3 h-14  placeholder:pl-3 z-50 placeholder:font-normal text-[16px]">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countriesOptions.map((option) => (
                                            <SelectItem
                                                className="focus:bg-[#DEEBFF] hover:bg-[#DEEBFF]"
                                                key={option.value}
                                                value={option.label}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.country && (
                            <p className="text-[#e52c2c]">
                                {errors.country.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label>Drug Allergies</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('drugAllergies')}
                            placeholder="Enter Drag Allergies"
                        />
                    </div>
                    <div className="flex-col w-full flex text-black">
                        <label>Food Allergies</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            {...register('foodAllergies')}
                            placeholder="Enter Food Allergies"
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-col w-1/2 flex text-black">
                        <label>Race</label>
                        <Controller
                            name="race"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                >
                                    <SelectTrigger className="bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3 h-14  placeholder:pl-3 z-50 placeholder:font-normal text-[16px]">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nationalities.map((option) => (
                                            <SelectItem
                                                className="focus:bg-[#DEEBFF] hover:bg-[#DEEBFF]"
                                                key={option.name}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </div>
                <div className="absolute left-0">
                    <div className="flex gap-3 py-3">
                        <PrimaryBtn
                            width={130}
                            type="submit	"
                            color="white"
                            name="Save Changes"
                        />
                        <PrimaryBtn
                            width={110}
                            onClick={() => push('/appointments')}
                            bgColor="#DFFFFD"
                            color="#3FC9C1"
                            name="Cancel"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditPatientsForm

//==========coustomStyle for input
const customStyles = {
    control: (base) => ({
        ...base,
        padding: '0.375rem 0.75rem',
        borderRadius: '0.375rem',
        background: '#F3F3F5',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        color: 'black',
        paddingTop: '0.75rem ',
        paddingBottom: '0.75rem',
    }),
}
