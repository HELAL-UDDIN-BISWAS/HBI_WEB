'use client'

import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/typo/tabs/index'
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb'
import PrimaryBtn from '@/components/base/button/hbi_btn'
import usePartnerStore from '@/store/partnerStore'
import { useRouter } from 'next/navigation'
import HbiFormInput from '@/components/ui/HbiFormInput'
import HBIErrorText from '@/components/base/text/hbi_error_text'
import { Country } from 'country-state-city'
import Link from 'next/link'
import HBI_PhoneInput from '@/components/ui/HBI_PhoneInput'
import PhoneInput from 'react-phone-input-2'
import dropdown from '@dropdowns/nationalities'
const AddPartners = () => {
    return (
        <div className="px-4 lg:px-8 2xl:px-10 h-[85vh] overflow-hidden overflow-y-visible">
            <div className="sticky top-0 z-50 bg-[#F7F7F9] pt-6">
                <HBI_BreadCrumb
                    pageName="Add Partner"
                    items={[
                        { label: 'Partners', href: 'agents/partners' },
                        { label: 'Add Partners' },
                    ]}
                >
                    {' '}
                </HBI_BreadCrumb>
            </div>

            <Tabs defaultValue="general" className="w-full mt-3 ">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <AddPartnerForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AddPartners

const AddPartnerForm = () => {
    const router = useRouter()
    const {
        createPartner,
        isSuccess,
        error,
        partnerRoleId,
        fetchPartnerRoleId,
    } = usePartnerStore()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()
    const nationalities = dropdown.getAllNationalities()
    const nationalityOptions = nationalities.map((nationality) => {
        return { value: nationality.name, label: nationality.name }
    })
    const onSubmit = async (data) => {
        const profileInput = {
            dateOfBirth: data.dateOfBirth,
            membershipID: data.membershipId,
            passport: data.passport,
            name: data.fullName,
            phoneNo: data.phoneNo,
            registeredDate: new Date().toISOString(),
            city: data.city,
            postalCode: data.postalCode,
            residentialAddressLine1: data.address1,
            residentialAddressLine2: data.residentialAddressLine2,
            nationality: data.nationality,
            country: data.country,
            jobTitle: data.jobTitle,
            companyName: data.companyName,
            UEN: data.UEN,
        }

        const userInput = {
            username: data.email.split('@')[0],
            email: data.email,
            password: 'defaultpassword',
            role: parseInt(partnerRoleId),
            isNotified: true,
            status: 'Active',
        }
        await createPartner(profileInput, userInput)
    }

    useEffect(() => {
        if (isSuccess) {
            reset()
            router.push('/agents/partners')
        }
    }, [isSuccess, reset, router])

    useEffect(() => {
        fetchPartnerRoleId()
    }, [])

    return (
        <div className="bg-white p-3 relative">
            <form
                className=" grid grid-cols-2 gap-4 "
                onSubmit={handleSubmit(onSubmit)}
            >
                <HbiFormInput
                    name="email"
                    type="text"
                    label="Email"
                    placeholder="Enter Email"
                    required={true}
                    register={register}
                    error={errors?.email}
                />

                <HbiFormInput
                    name="fullName"
                    type="text"
                    label="Full Name"
                    placeholder="Enter Full Name"
                    required={true}
                    register={register}
                    error={errors?.fullName}
                />

                <HbiFormInput
                    name="passport"
                    type="text"
                    label="NRIC/ Passport"
                    placeholder="Enter NRIC/ Passport"
                    required={true}
                    register={register}
                    error={errors?.passport}
                />

                <HBI_PhoneInput
                    control={control}
                    name="phoneNo"
                    label={'Phone Number'}
                    placeholder={'Enter Phone number'}
                    error={errors.phoneNo}
                />
                <HbiFormInput
                    name="address1"
                    type="text"
                    label="Address 1"
                    placeholder="Enter Address 1"
                    required={true}
                    register={register}
                    error={errors?.address1}
                />
                <HbiFormInput
                    name="residentialAddressLine2"
                    type="text"
                    label="Address 2"
                    placeholder="Enter Address 2"
                    required={false}
                    register={register}
                    error={errors?.residentialAddressLine2}
                />

                <div className="flex gap-4 w-full col-span-2">
                    <HbiFormInput
                        name="city"
                        type="text"
                        label="City"
                        placeholder="Enter City"
                        required={false}
                        register={register}
                        error={errors?.city}
                    />
                    <HbiFormInput
                        name="postalCode"
                        type="text"
                        label="Postal Code"
                        placeholder="Enter Postal Code"
                        required={false}
                        register={register}
                        error={errors?.postalCode}
                    />
                    <CountrySelect
                        control={control}
                        name="country"
                        label="Country"
                        error={errors?.country}
                    />
                </div>

                <HbiFormInput
                    name="companyName"
                    type="text"
                    label="Company Name"
                    placeholder="Enter Company Name"
                    required={true}
                    register={register}
                    error={errors?.companyName}
                />
                <HbiFormInput
                    name="jobTitle"
                    type="text"
                    label="Job Title"
                    placeholder="Enter Job Title"
                    required={false}
                    register={register}
                    error={errors?.jobTitle}
                />

                <HbiFormInput
                    name="UEN"
                    type="text"
                    label="UEN"
                    placeholder="Enter UEN"
                    required={true}
                    register={register}
                    error={errors?.UEN}
                />

                <HbiFormInput
                    name="dateOfBirth"
                    type="date"
                    label="Date Of Birth"
                    placeholder="Enter UEN"
                    required={true}
                    register={register}
                    error={errors?.dateOfBirth}
                />

                <div className="flex-col w-full flex text-black">
                    <label>Nationality</label>
                    <Controller
                        name="nationality"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={nationalityOptions}
                                styles={customStyles}
                                classNamePrefix="react-select"
                                placeholder="Select Nationality"
                                onChange={(option) =>
                                    field.onChange(option.value)
                                }
                                value={nationalityOptions.find(
                                    (option) => option.value === field.value
                                )}
                            />
                        )}
                    />
                    {errors.nationality && (
                        <p className="text-red-500">
                            {errors.nationality.message}
                        </p>
                    )}
                </div>

                <div className="flex gap-4 col-span-2">
                    <PrimaryBtn
                        width={150}
                        color="white"
                        name="Add Partner"
                        type="submit"
                    />
                    <Link href={'/agents/partners'}>
                        <PrimaryBtn
                            width={110}
                            bgColor="#DFFFFD"
                            color="#3FC9C1"
                            name="Cancel"
                        />
                    </Link>
                </div>
            </form>
        </div>
    )
}

//CountrySelect
const CountrySelect = ({ name, label, control, error }) => {
    const formatCountry = () => {
        return Country.getAllCountries().map((country) => ({
            label: country.name,
            value: country.name,
            code: country.countryCode,
        }))
    }

    return (
        <div className="flex-col w-full flex text-black">
            <label>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={formatCountry()}
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                background: '#FAFAFA',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                padding: '10px',
                                borderRadius: '0.375rem',
                            }),
                            menu: (base) => ({
                                ...base,
                                borderRadius: '0.375rem',
                            }),
                            option: (base) => ({
                                ...base,
                                backgroundColor: 'white',
                                color: 'black',
                            }),
                        }}
                        placeholder="Select Country"
                        onChange={(val) => field.onChange(val.value)}
                        value={formatCountry().find(
                            (option) => option.value === field.value
                        )}
                    />
                )}
            />
            {error && <HBIErrorText text={error.message} />}
        </div>
    )
}

export const customStyles = {
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
