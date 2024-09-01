import PrimaryBtn from '@/components/base/button/hbi_btn'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { userSchema } from '../add-user/validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { customStyles } from '../add-user/add-user-form'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSystemUsersStore from '@/store/systemUsersStore'
import { toast } from 'react-toastify'
import Loading from '@/components/ui/loading'
import dayjs from 'dayjs'

const EditSystemUserForm = ({ id }) => {
    const {
        systemUser,
        fetchSingleSystemUserById,
        updateSystemUser,
        fetchRoleId,
        loading,
        error,
        fetchUsers,
    } = useSystemUsersStore((state) => ({
        updateSystemUserProfile: state.updateSystemUserProfile,
        updateSystemUser: state.updateSystemUser,
        fetchSingleSystemUserById: state.fetchSingleSystemUserById,
        fetchRoleId: state.fetchRoleId,
        loading: state.loading,
        error: state.error,
        systemUser: state.systemUser,
    }))

    const [isDataFetched, setIsDataFetched] = useState(false)
    const router = useRouter()
    // const { push } = useRouter();
    const nationalityOptions = countryList().getData()
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {},
    })

    useEffect(() => {
        if (id) {
            fetchSingleSystemUserById(id).then(() => setIsDataFetched(true))
        }
    }, [fetchSingleSystemUserById, systemUser, id])

    useEffect(() => {
        if (systemUser) {
            const attributes = systemUser?.attributes
            const profile = attributes?.profile?.data
                ? attributes?.profile?.data?.attributes
                : {}
            const defaultValues = {
                email: attributes?.email,
                role: attributes.role.data.attributes.name,
                fullName: profile.name,
                dateOfBirth: profile.dateOfBirth,
                gender: profile?.gender || '',
                nationality: profile?.nationality || '',
                passport: profile?.passport || '',
                mobileNumber: profile?.phoneNo || '',
            }
            reset(defaultValues)
        }
    }, [systemUser, reset])

    const onSubmit = async (data) => {
        const profileId = systemUser?.attributes?.profile?.data.id
        const userId = id.id
        const roleId = await fetchRoleId(data.role)
        if (!profileId || !userId) {
            toast.error('User or Profile ID is missing.')
            return
        }
        if (roleId) {
            const profileInput = {
                gender: data.gender,
                name: data.fullName,
                phoneNo: data.mobileNumber,
                dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
                nationality: data.nationality,
                passport: data.passport,
            }

            const userInput = {
                username: data.fullName,
                email: data.email,
                password: 'defaultpassword',
                role: parseInt(roleId),
            }

            try {
                const res = await updateSystemUser(
                    userId,
                    profileId,
                    profileInput,
                    userInput
                )
                if (res.id) {
                    toast.success('User update successfully!')
                    reset()
                    router.push('/system-users')
                }
            } catch (error) {
                toast.error('Failed to update user.')
                console.log(error)
            }
        } else {
            toast.error('Role Not Found', {
                autoClose: 3000,
            })
        }
    }

    if (!isDataFetched || loading) {
        return <Loading />
    }

    return (
        <div className="bg-white p-3 relative">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="email">Email*</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-[#e52c2c] pl-4">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="fullName">Full Name*</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            id="fullName"
                            placeholder="Enter Full Name"
                            {...register('fullName')}
                        />
                        {errors.fullName && (
                            <p className="text-[#e52c2c] pl-4">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            {...register('gender')}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="flex-col w-full flex text-black">
                        <label>Mobile Number</label>
                        <div className="phone-input-wrapper relative">
                            <Controller
                                name="mobileNumber"
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
                            {errors.mobileNumber && (
                                <p className="error">
                                    {errors.mobileNumber.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="role">Role</label>
                        <select
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            id="role"
                            name="role"
                            {...register('role')}
                            placeholder="Select a role"
                        >
                            <option value="HBI Admin">HBI Admin</option>
                            <option value="HBI Super Admin">
                                HBI Super Admin
                            </option>
                            <option value="Doctor">Doctor</option>
                            <option value="Clinic Admin">Clinic Admin</option>
                        </select>
                    </div>

                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="nationality">Nationality</label>
                        <Controller
                            id="nationality"
                            name="nationality"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={nationalityOptions}
                                    styles={customStyles}
                                    classNamePrefix="react-select"
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
                </div>
                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label htmlFor='passport'>NRIC/ Passport *</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            id='passport'
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
                        <label htmlFor='dob'>Date of Birth*</label>
                        <input
                        id="dob"
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

                <div className="absolute left-0">
                    <div className="flex gap-3 py-3">
                        <PrimaryBtn
                            type="submit"
                            width={150}
                            color="white"
                            name="Edit System User"
                        ></PrimaryBtn>
                        <PrimaryBtn
                            width={110}
                            bgColor="#DFFFFD"
                            color="#3FC9C1"
                            name="Cancel"
                        ></PrimaryBtn>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditSystemUserForm
