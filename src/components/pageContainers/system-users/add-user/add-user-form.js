import PrimaryBtn from '@/components/base/button/hbi_btn'
import { userSchema } from './validation-schema'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useSystemUsersStore from '@/store/systemUsersStore'
import PhoneInput from 'react-phone-input-2'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dayjs from 'dayjs'
import countryList from 'react-select-country-list'
export const AddSystemUserForm = () => {
    const { createSystemUser, loading, error, fetchUsers, fetchRoleId } =
        useSystemUsersStore((state) => ({
            createSystemUser: state.createSystemUser,
            fetchRoleId: state.fetchRoleId,
            fetchUsers: state.fetchUsers,
            loading: state.loading,
            error: state.error,
        }))

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            nationality: 'American',
        },
    })
    const nationalityOptions = countryList().getData()
    const roleOptions = [
        {label:"HBI Admin",value: "HBI Admin"},
        {label:"HBI Super Admin",value: "HBI Super Admin"},
        {label:"Doctor",value: "Doctor"},
        {label:"Clinic Admin",value: "Clinic Admin"}
    ]

    // console.log(nationalityOptions);
    const route = useRouter()
    const handleCancel = () => {
        reset()
        route.push('/system-users')
    }
    const onSubmit = async (data) => {
        if (data.role) {
            const roleId = await fetchRoleId(data.role)
            if (data.mobileNumber) {
                const profileInput = {
                    gender: data.gender,
                    name: data.fullName,
                    dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
                    nationality: data.nationality,
                    passport: data.passport,
                    phoneNo: data.mobileNumber,
                }
                const userInput = {
                    username: data.fullName,
                    email: data.email,
                    password: 'defaultpassword',
                    role: roleId || null,
                }
                if (roleId) {
                    const res = await createSystemUser(profileInput, userInput)
                    console.log(res)
                    if (res?.id) {
                        toast.success('System user created successfully!', {
                            autoClose: 3000,
                        })
                        await fetchUsers()
                        reset()
                        route.push('/system-users')
                    }
                }
                //  else {
                //     toast.error('Role Not Found', {
                //         autoClose: 3000,
                //     })
                // }
            }
        } else {
            toast.error('Role Not Found', {
                autoClose: 3000,
            })
        }
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
                            name="email"
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
                            name="fullName"
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
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            id="gender"
                            name="gender"
                            {...register('gender')}
                            placeholder="Select a gender"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <div className="phone-input-wrapper relative">
                            <Controller
                                name="mobileNumber"
                                id="mobileNumber"
                                control={control}
                                render={({ field }) => (
                                    <PhoneInput
                                        {...field}
                                        country={'us'}
                                        containerClass="custom-phone-input"
                                        inputClass="custom-input"
                                        placeholder="Enter phone number"
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
                                <p className="text-red">
                                    {errors.mobileNumber.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="Role">Role</label>
                        <Controller
                            id="Role"
                            name="role"
                            {...register('role')}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={roleOptions}
                                    styles={customStyles}
                                    classNamePrefix="react-select"
                                    placeholder="Select a role"
                                    onChange={(option) =>
                                        field.onChange(option.value)
                                    }
                                    value={roleOptions.find(
                                        (option) => option.value === field.value
                                    )}
                                />
                            )}
                        />
                        {errors.role && (
                            <p className="text-red">
                                {errors.role.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="nationality">Nationality</label>
                        <Controller
                            id="nationality"
                            name="nationality"
                            {...register('nationality')}
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
                            <p className="text-red">
                                {errors.nationality.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-col w-full flex text-black">
                        <label htmlFor="passport">NRIC/ Passport *</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="text"
                            id="passport"
                            name="passport"
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
                        <label htmlFor="dateOfBirth">Date of Birth*</label>
                        <input
                            className="outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg"
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
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
                            width={150}
                            type="submit"
                            color="white"
                            name="Add System User"
                        ></PrimaryBtn>
                        <PrimaryBtn
                            onClick={handleCancel}
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