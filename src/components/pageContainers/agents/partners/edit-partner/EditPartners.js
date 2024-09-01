'use client'

import React, { useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
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
import HbiFormInput from '@/components/ui/HbiFormInput'
import HBIErrorText from '@/components/base/text/hbi_error_text'
import { useParams, useRouter } from 'next/navigation'
import usePartnerStore from '@/store/partnerStore'
import { Country } from 'country-state-city'
import { toast } from 'react-toastify'
import Link from 'next/link'
import HBI_PhoneInput from '@/components/ui/HBI_PhoneInput'

const EditPartners = () => {
    const router = useRouter()
    const { id } = useParams()
    const { partner, fetchPartnersById, updatePartner, isSuccess } =
        usePartnerStore()

    useEffect(() => {
        if (id) {
            fetchPartnersById({ id })
        }
    }, [id, fetchPartnersById])

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm()

    useEffect(() => {
        if (partner) {
            setValue('email', partner?.email)
            setValue('name', partner?.profile?.name)
            setValue('passport', partner?.profile?.passport)
            setValue('phoneNo', partner?.profile?.phoneNo)
            setValue('city', partner?.profile?.city)
            setValue(
                'residentialAddressLine1',
                partner?.profile?.residentialAddressLine1
            )
            setValue(
                'residentialAddressLine2',
                partner?.profile?.residentialAddressLine2
            )

            setValue('postalCode', partner?.profile?.postalCode)
            setValue('jobTitle', partner?.profile?.jobTitle)
            setValue('companyName', partner?.profile?.companyName)
            setValue('UEN', partner?.profile?.UEN)
            setValue('country', partner?.profile?.country)
        }
    }, [partner, setValue])

    const onSubmit = async (data) => {
        console.log('data', data)
        const partnerId = partner?.id
        const profileId = partner?.profile.id
        const profileInput = { ...data, email: undefined }
        const userInput = {
            email: data?.email,
            isNotified: partner?.isNotified,
        }
        try {
            await updatePartner(partnerId, profileId, profileInput, userInput)
        } catch (error) {
            console.log('error', error.message)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            reset()
            router.push('/agents/partners')
        }
    }, [isSuccess, router])

    return (
        <div className="px-4 lg:px-8 2xl:px-10 h-[85vh] overflow-hidden overflow-y-visible ">
            <div className="sticky top-0 z-50 bg-[#F7F7F9] pt-6">
                <HBI_BreadCrumb
                    pageName="Edit Partner"
                    items={[
                        { label: 'Partners', href: 'agents/partners' },
                        { label: 'Edit Partner' },
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
                    <div className="bg-white p-3 relative">
                        <form
                            className=" grid grid-cols-2 gap-4"
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
                                name="name"
                                type="text"
                                label="Full Name"
                                placeholder="Enter Full Name"
                                required={true}
                                register={register}
                                error={errors?.name}
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
                                name="residentialAddressLine1"
                                type="text"
                                label="Address 1"
                                placeholder="Enter Address 1"
                                required={true}
                                register={register}
                                error={errors?.residentialAddressLine1}
                            />
                            <HbiFormInput
                                name="residentialAddressLine2"
                                type="text"
                                label="Address 2"
                                placeholder="Enter Address 2"
                                required={false}
                                register={register}
                                error={errors?.Address2}
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

                            <div className="flex gap-4 col-span-2">
                                <PrimaryBtn
                                    width={150}
                                    type="submit"
                                    color="white"
                                    name="Edit Partner"
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
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EditPartners

//CustomPhoneInput

// const CustomPhoneInput = ({ control, name, rules, error, label }) => {
// 	return (
// 		<Controller
// 			name={name}
// 			control={control}
// 			rules={rules}
// 			render={({ field: { onChange, value, ref } }) => (
// 				<div className="phone-input-wrapper relative">
// 					<label className="text-sm">{label}</label>
// 					<PhoneInput
// 						inputProps={{
// 							ref,
// 							name,
// 						}}
// 						country={"us"}
// 						value={value}
// 						onChange={onChange}
// 						containerClass="custom-phone-input"
// 						inputClass="custom-input"
// 						inputStyle={{
// 							background: "#FAFAFA",
// 							padding: "8px 50px",
// 							height: "50px",
// 							width: "100%",
// 							border: "none",
// 							outline: "none",
// 							boxShadow: "none",
// 							fontSize: "14px",
// 						}}
// 						buttonStyle={{
// 							background: "#FAFAFA",
// 							padding: "7px",
// 							border: "none",
// 							outline: "none",
// 							boxShadow: "none",
// 						}}
// 					/>
// 					{error && <HBIErrorText text={error.message} />}
// 				</div>
// 			)}
// 		/>
// 	);
// };

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
