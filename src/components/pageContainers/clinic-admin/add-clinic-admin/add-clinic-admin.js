"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/typo/tabs';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm, Controller } from 'react-hook-form';
import { userSchema } from './validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import useClinicAdminStore from '@/store/clinicAdminStore';
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useRouter } from 'next/navigation'
import PrimaryBtn from '@/components/base/button/hbi_btn';


const AddClinicAdmin = () => {
    const { register, handleSubmit, control, formState: { errors }, setFocus, reset, setValue } = useForm(yupResolver(userSchema),);
    const { createClinicAdmin } = useClinicAdminStore((state) => ({
        createClinicAdmin: state.createClinicAdmin,
    }));
    const nationalityOptions = countryList().getData();
    const router = useRouter()

    const onSubmit = async (data) => {
        const profileInput = {
            name: data?.fullName,
            phoneNo: data?.phoneNo,
            gender: data?.gender,
            dateOfBirth: data?.dateofbirth,
            passport: data?.passport,
            nationality: data?.nationality,
        };
        const clinicInput = {
            name: data?.name
        };

        const userInput = {
            email: data?.email,
            username: data?.fullName,
            password: "defaultpassword",
            role: "6"
        };
        // Simulate an error by passing invalid data or creating an error condition
        const res = await createClinicAdmin(profileInput, clinicInput, userInput);
        console.log(res)

        if (res?.id) {
            router.push('/clinic-admin')
        }

    };

    const handlePhoneNumberChange = (value) => {
        setValue("phoneNo", value, { shouldValidate: true });
        setValue(value);

    };

    const handleCancel = () => {
        reset()
        router.push('/clinic-admin')
    }
    return (
        <div className='mx-3 mt-4'>
            <div>
                <HBI_BreadCrumb
                    pageName="Add Clinic Admin"
                    items={[
                        { label: 'Clinic Admin', href: 'clinic-admin' },
                        { label: 'Add Clinic Admin' },
                    ]}>
                    {' '}
                </HBI_BreadCrumb>
            </div>

            <Tabs defaultValue="request" className="w-full mt-10">
                <TabsList>
                    <TabsTrigger value="request">Request</TabsTrigger>
                </TabsList>
                <TabsContent value="request">
                    <div className=''>
                        <form onSubmit={handleSubmit(onSubmit)} className=''>
                            <div className='grid grid-cols-2 w-full py-3 px-3 rounded-b-lg border-l-2 border-r-2 border-b-2 border-t-0 border-[#E0E0E0] bg-white gap-4'>
                                <div className='flex-col w-full flex text-black'>
                                    <div>
                                        <label htmlFor='email'>Email*</label>
                                    </div>
                                    <input id='email'
                                        className=" w-full py-3 bg-[#F3F3F5] px-3 rounded-lg"
                                        type='email'
                                        placeholder='Enter Email'
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    {errors.email && <p className='text-red'>{errors.email.message}</p>}
                                </div>

                                <div>
                                    <div>
                                        <label htmlFor='Full Name'>Full Name*</label>
                                    </div>
                                    <input
                                        id='Full Name'
                                        className=" w-full py-3 bg-[#F3F3F5] px-3 rounded-lg"
                                        type='text'
                                        placeholder='Enter Full Name'
                                        {...register('fullName', { required: 'Full Name is required' })}
                                    />
                                    {errors.fullName && <p className='text-red'>{errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <div>
                                        <label for htmlFor='Gender'>Gender*</label>
                                    </div>
                                    <select
                                        id='Gender'
                                        className=" w-full py-3 bg-[#F3F3F5] px-3 rounded-lg"
                                        {...register('gender', { required: 'Gender is required' })}
                                    >
                                        <option value="" disabled selected>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && <p className='text-red'>{errors.gender.message}</p>}
                                </div>
                                {/* =-=-=-=-=-=-= */}

                                <div>
                                    <label htmlFor='phoneNo'>Mobile Number*</label>
                                    <Controller
                                        name="phoneNo"
                                        control={control}
                                        rules={{
                                            required: 'Phone number is required',
                                            validate: {
                                                minLength: value => value.replace(/\D/g, '').length >= 10 || 'Phone number must be at least 10 digits',
                                                maxLength: value => value.replace(/\D/g, '').length <= 15 || 'Phone number must be at most 15 digits'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <PhoneInput
                                                country={'us'}
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    handlePhoneNumberChange(value);
                                                }}
                                                inputStyle={{
                                                    background: "#F3F3F5",
                                                    padding: "8px 60px",
                                                    height: "50px",
                                                    width: "100%",
                                                    border: "none",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                    fontSize: "14px"
                                                }}
                                                buttonStyle={{
                                                    background: "#E0E0E0",
                                                    padding: "8px",
                                                    border: "none",
                                                    outline: "none",
                                                    boxShadow: "none"
                                                }}
                                                onFocus={() => setFocus("phoneNo")}
                                                inputProps={{
                                                    id: 'phoneNo',
                                                    'aria-label': 'Mobile Number',
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.phoneNo && <p className='text-red'>{errors.phoneNo.message}</p>}
                                </div>

                                <div>
                                    <div>
                                        <label htmlFor='Clinic'>Clinic*</label>
                                    </div>
                                    <select
                                        id='Clinic'
                                        className=" w-full py-3 bg-[#F3F3F5] px-3 rounded-lg"
                                        {...register('name', { required: 'Clinic is required' })}
                                    >
                                        <option className='text-[#3FC9C1]' value="SOG Health Group">SOG Health Group</option>
                                        <option className='text-[#3FC9C1]' value="Ascent ENT Group">Ascent ENT Group</option>
                                        <option className='text-[#3FC9C1]' value="Icon Cancer Centre">Icon Cancer Centre</option>
                                        <option className='text-[#3FC9C1]' value="GI Endoscopy and Liver Centre">GI Endoscopy and Liver Centre</option>
                                        <option className='text-[#3FC9C1]' value="Atman Counselling and Training Consultancy">Atman Counselling and Training Consultancy</option>
                                    </select>
                                    {errors.name && <p className='text-red'>{errors.name.message}</p>}
                                </div>

                                {/* =-=-=-=-=-=- */}
                                <div className='flex-col w-full flex text-black'>
                                    <div>
                                        <label htmlFor='Enter passport'>passport*</label>
                                    </div>
                                    <input
                                        id='Enter passport'
                                        className=" w-full py-3 bg-[#F3F3F5] px-3 rounded-lg"
                                        type='text'
                                        placeholder='Enter passport'
                                        {...register('passport', { required: 'passport is required' })}
                                    />
                                    {errors.passport && <p className='text-red'>{errors.passport.message}</p>}
                                </div>

                                <div className='flex-col w-full flex text-black'>
                                    <div>
                                        <label htmlFor='nationality'>nationality*</label>

                                    </div>
                                    <Controller
                                        name="nationality"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                id='nationality'
                                                {...field}
                                                options={nationalityOptions}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        padding: '0.375rem 0.75rem',
                                                        borderRadius: '0.375rem',
                                                        background: '#F3F3F5',
                                                        border: 'none',
                                                        outline: 'none',
                                                        boxShadow: 'none',
                                                        color: 'black',
                                                        paddingTop: '0.70rem ',
                                                        paddingBottom: '0.70rem',
                                                    }),
                                                }}
                                                classNamePrefix="react-select"
                                                onChange={(option) => field.onChange(option.value)}
                                                value={nationalityOptions.find(
                                                    (option) => option.value === field.value
                                                )}
                                                data-testid="nationality-select"
                                                inputProps={{ 'data-testid': 'nationality-select' }}
                                            />
                                        )}
                                    />
                                    {errors.nationality && <p className='text-red'>{errors.nationality.message}</p>}
                                </div>

                                <div className='flex-col w-full flex text-black'>
                                    <div>
                                        <label>dateOfBirth*</label>
                                    </div>
                                    <input
                                        className=" w-full py-3 bg-[#F3F3F5] px-3 rounded-lg"
                                        type='date'
                                        placeholder='Enter dateOfBirth'
                                        {...register('dateofbirth', { required: 'dateofbirth is required' })}
                                    />
                                    {errors.dateOfBirth && <p className='text-red'>{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="flex gap-3 py-3">
                                <PrimaryBtn type='submit' width={130} color="white" name="Add Clinic Admin" data-testid="submit-button" />

                                <PrimaryBtn onClick={handleCancel} width={110} color='#3FC9C1' bgColor="#DFFFFD" name="Cancel"></PrimaryBtn>
                            </div>
                        </form>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AddClinicAdmin;
