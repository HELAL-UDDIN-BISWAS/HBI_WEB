// components/form/GeneralSection.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

// const customStyles = {
// 	control: (provided, state) => ({
// 		...provided,
// 		backgroundColor: '#F3F3F5',
// 		padding: '10px',
// 		borderRadius: '8px',
// 		border: state.isFocused ? '1px solid #4A90E2' : '1px solid #f3f3f5',
// 		boxShadow: 'none',
// 		outline: 'none',
// 	}),
// 	placeholder: (provided) => ({
// 		...provided,
// 		fontSize: '14px',
// 	}),
// };

const PromotionForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
      } = useForm();
	return (
		<div className="grid grid-cols-1 gap-4 p-4 rounded-r-xl rounded-s-xl rounded-ss-none bg-[#FFFFFF]">
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3.5">
                <div>
                        <label className="block text-sm font-medium text-[#2A2A2A]">
                            Select Product *
                            <Controller
                        name="product"
                        control={control}
                        render={({ field }) => (
                            <Select >
                            <SelectTrigger className=" bg-[#FAFAFA] rounded-lg  p-2  h-14 my-2 placeholder:pl-3 z-50 placeholder:font-normal text-[16px] ">
                                <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gynecologist">Vitamin C</SelectItem>
                                <SelectItem value="dentist">Reboot</SelectItem>
                                <SelectItem value="heart specialist">Reboot oo</SelectItem>
                            </SelectContent>
                            </Select>
                        )}
                        />
                        </label>
                </div>
                <div></div>

                <div className="flex flex-col w-full">
                    <label className="font-normal text-sm">Percent Off (%) </label>
                    <div className='flex'>
                      <p className='bg-[#F3F4F8] inline-flex items-center px-3 w-5/12 my-2 text-lg font-medium text-[#222222] bg-gray-200 justify-start rounded-s-md '>Gold Tier</p>
                    <input
                      name="text"
                      type="text"
                      className="bg-[#FAFAFA] w-full p-1 h-14 my-2 placeholder:bg-none placeholder:pl-3 placeholder:font-normal text-[16px]"
                      placeholder="Enter percent off"
                      
                    />
                    <div className='bg-[#F3F4F8] inline-flex items-center px-4 w-3/12 my-2 text-lg font-medium text-[#8E8E8E] bg-gray-200 justify-center  rounded-e-md '>%</div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="font-normal text-sm">Percent Off (%) </label>
                    <div className='flex'>
                      <p className='bg-[#F3F4F8] inline-flex items-center px-3 w-5/12 my-2 text-lg font-medium text-[#222222] bg-gray-200 justify-start rounded-s-md  '>Silver Tier</p>
                    <input
                      name="text"
                      type="text"
                      className="bg-[#FAFAFA] w-full p-1  h-14 my-2 placeholder:bg-none placeholder:pl-3 placeholder:font-normal text-[16px]"
                      placeholder="Enter percent off"
                      
                    />
                    <div className='bg-[#F3F4F8] inline-flex items-center px-4 w-3/12 my-2 text-lg font-medium text-[#8E8E8E] bg-gray-200   justify-center  rounded-e-md  '>%</div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="font-normal text-sm">Percent Off (%) </label>
                    <div className='flex'>
                      <p className='bg-[#F3F4F8] inline-flex items-center px-1 w-5/12 my-2 text-lg font-medium text-[#222222] bg-gray-200 justify-center rounded-s-md  '>Bronze Tier</p>
                    <input
                      name="text"
                      type="text"
                      className="bg-[#FAFAFA] w-full p-1  h-14 my-2 placeholder:bg-none placeholder:pl-3 placeholder:font-normal text-[16px]"
                      placeholder="Enter percent off"
                      
                    />
                    <div className='bg-[#F3F4F8] inline-flex items-center px-4 w-3/12 my-2 text-lg font-medium text-[#8E8E8E] bg-gray-200   justify-center  rounded-e-md  '>%</div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="font-normal text-sm">Percent Off (%) </label>
                    <div className='flex'>
                      <p className='bg-[#F3F4F8] inline-flex items-center px-3 w-5/12 my-2 text-lg font-medium text-[#222222] bg-gray-200 justify-start rounded-s-md  '>Beginner </p>
                    <input
                      name="text"
                      type="text"
                      className="bg-[#FAFAFA] w-full p-1  h-14 my-2 placeholder:bg-none placeholder:pl-3 placeholder:font-normal text-[16px]"
                      placeholder="Enter percent off"
                      
                    />
                    <div className='bg-[#F3F4F8] inline-flex items-center px-4 w-3/12 my-2 text-lg font-medium text-[#8E8E8E] bg-gray-200   justify-center  rounded-e-md  '>%</div>
                    </div>
                  </div>
                  
			</div>
		</div>
	);
};

export default PromotionForm;