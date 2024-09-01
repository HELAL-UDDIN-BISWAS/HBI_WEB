"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';



const AddDoctorPage = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="p-4">
            <div>
                <h1 className='text-2xl font-semibold mb-4'>Add Doctor</h1>
            </div>
            <Tabs>
                <TabList className="flex bg-white rounded-ss-md rounded-se-md w-fit shadow-md border-x-2 border-t-2">
                    <Tab className="px-[10px] py-[5px] cursor-pointer" selectedClassName="">
                        <span className='border-b-2 pb-[1px] border-[#3FC9C1]'>General</span>
                    </Tab>
                </TabList>

                <TabPanel>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-5 gap-y-4 mx-auto border-x-2 border-b-2 p-4 rounded-b-md rounded-se-md shadow-md bg-white">
                        <div className="flex flex-col col-span-2">
                            <label className="text-md">Upload Image</label>
                            <div className="relative">
                                <div className='h-40 border-2  rounded-md bg-[#f2fffe] flex items-center justify-center space-x-4'>
                                    <input
                                        type="file"
                                        {...register('image', { required: false })}
                                        className="hidden"
                                        id="file-upload"
                                        multiple
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer text-center flex flex-col items-center">
                                        <div className="flex items-center justify-center">
                                            <img src={'imageIcons'} alt="logo" />
                                        </div>
                                        <br />
                                        <span className="text-gray-600">Click to add an asset or drag and drop one in this area</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Doctor Name</label>
                            <input {...register('doctorName', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
                                placeholder="Doctor Name"
                            />
                            {errors.doctorName && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Doctor Email</label>
                            <input type="email" {...register('doctorEmail', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
                                placeholder="Email"
                            />
                            {errors.doctorEmail && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Number</label>
                            <PhoneInput
                                country={'us'}
                                inputProps={{
                                    name: 'number',
                                    required: true,
                                    className: 'border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200 w-full'
                                }}
                                containerClass="w-full m-1"
                                inputClass="w-full"
                                buttonClass="border rounded bg-gray-100 outline-none"
                                onChange={(value) => setValue('number', value)}
                            />
                            {errors.number && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Gender</label>
                            <select {...register('gender', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className="text-red-600">This field is required</span>}
                        </div>


                        <div className="flex flex-col">
                            <label className="text-md">Gender</label>
                            <select {...register('gender', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Education</label>
                            <input {...register('education', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
                                placeholder="Education"
                            />
                            {errors.education && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Clinic</label>
                            <select {...register('clinic', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200">
                                <option value="">Clinic</option>
                                <option value="cardiology">Cardiology</option>
                                <option value="neurology">Neurology</option>
                                <option value="orthopedics">Orthopedics</option>
                                <option value="pediatrics">Pediatrics</option>
                                <option value="general">General</option>
                            </select>
                            {errors.clinic && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Speciality</label>
                            <input {...register('speciality', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
                                placeholder="Speciality"
                            />
                            {errors.speciality && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Sub Speciality</label>
                            <input {...register('subSpeciality', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
                                placeholder="Sub Speciality"
                            />
                            {errors.subSpeciality && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Affiliated Hospital</label>
                            <input {...register('affiliatedHospital', { required: true })} className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
                                placeholder="Affiliated Hospital"
                            />
                            {errors.affiliatedHospital && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md">Keyword</label>
                            <input {...register('keyword', { required: true })}
                                className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"
                                placeholder="Keyword"
                            />
                            {errors.keyword && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex flex-col col-span-2">
                            <label className="text-md">Professional Profile</label>
                            <textarea {...register('professionalProfile', { required: true })}
                                placeholder="Enter professional profile"
                                className="border rounded p-2 bg-gray-100 outline-none focus:ring focus:ring-red-200"></textarea>
                            {errors.professionalProfile && <span className="text-red-600">This field is required</span>}
                        </div>

                        <div className="flex gap-3 col-span-2 mt-3">
                            <button type="submit" className="bg-[#3fc9c1] text-white py-2 px-4 rounded">Add Doctor</button>
                            <button type="button" onClick={() => console.log('Cancel')} className="bg-[#dffffd]
                             text-[#3FC9C1] border-1 border-[#3FC9C1] py-2 px-4 rounded ">Cancel</button>
                        </div>
                    </form>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AddDoctorPage;
