// components/form/GeneralSection.js
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country } from 'country-state-city';
import styles from './styles.module.css';
import dropdown from "@dropdowns/nationalities";
import { Select as RadixSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export const formatCountry = () => {
  return Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.name,
    code: country.countryCode,
  }));
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#F3F3F5",
    padding: "10px",
    borderRadius: "8px",
    border: state.isFocused ? "1px solid #4A90E2" : "1px solid #f3f3f5",
    boxShadow: "none",
    outline: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const MemberForm = ({
  register,
  control,
  errors,
  state,
  dispatch,
  reset,
  loading,
}) => {

	const nationalities = dropdown.getAllNationalities()


	return (
		<div className="grid grid-cols-1 gap-4 p-4 rounded-r-xl rounded-s-xl rounded-ss-none bg-[#FFFFFF]">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-[#2A2A2A]">
						Email*
						<input
							type="email"
							{...register('email')}
							className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
							placeholder="Enter Email"
						/>
						{errors.email && (
							<p className="text-[#e52c2c] pl-4">{errors.email.message}</p>
						)}
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-[#2A2A2A]">
						Full Name*
						<input
							type="text"
							{...register('fullName')}
							className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
							placeholder="Enter Full Name"
						/>
						{errors.fullName && (
							<p className="text-[#e52c2c] pl-4">{errors.fullName.message}</p>
						)}
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-[#2A2A2A]">
						Membership ID
						<input
							type="text"
							{...register('membershipId')}
							className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
							placeholder="Enter Membership ID"
						/>
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-[#2A2A2A]">
						Date of Birth*
						<input
							type="date"
							{...register('dateOfBirth')}
							className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
							placeholder="Select Date"
						/>
						{errors.dateOfBirth && (
							<p className="text-[#e52c2c] pl-4">
								{errors.dateOfBirth.message}
							</p>
						)}
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-[#2A2A2A]">
						Gender
						<Controller
							name="gender"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									closeMenuOnSelect={true}
									styles={customStyles}
									placeholder={
										<div className="text-base font-normal">Gender</div>
									}
									options={[
										{ label: 'Male', value: 'Male' },
										{ label: 'Female', value: 'Female' },
										{ label: 'Other', value: 'Other' },
									]}
									value={state.gender}
									onChange={(e) => {
										field.onChange(e);
										dispatch({
											type: 'SELECT_INPUT',
											fieldName: 'gender',
											payload: e,
										});
									}}
								/>
							)}
						/>
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-[#2A2A2A]">
						Nationality*
							<Controller
							name="nationality"
							control={control}
							render={({ field }) => (
								<RadixSelect
									value={field.value}
									onValueChange={(value) => {
										field.onChange(value);
									}}
								>
									<SelectTrigger className="bg-[#FAFAFA] text-[#222222] font-normal rounded-lg p-3 h-14  placeholder:pl-3 z-50 placeholder:font-normal text-[16px]">
										<SelectValue placeholder="Select Nationality" />
									</SelectTrigger>
									<SelectContent>
										{nationalities.map((option) => (
											<SelectItem key={option.name} value={option.name}>
												{option.name}
											</SelectItem>
										))}
									</SelectContent>
								</RadixSelect>
							)}
						/>
						{errors.nationality && (
							<p className="text-[#e52c2c] pl-4">
								{errors.nationality.message}
							</p>
						)}
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-[#2A2A2A]">
						NRIC/Passport*
						<input
							type="text"
							{...register('nricPassport')}
							className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
							placeholder="Enter NRIC/Passport"
						/>
						{errors.nricPassport && (
							<p className="text-[#e52c2c] pl-4">
								{errors.nricPassport.message}
							</p>
						)}
					</label>
				</div>
				<div>
					<label className="block pb-1 text-sm font-medium text-[#2A2A2A]">
						Mobile Number*
						<Controller
							name="mobileNumber"
							control={control}
							render={({ field }) => (
								<PhoneInput
									{...field}
									country={'sg'}
									containerStyle={{
										padding: '5px',
										border: 'none',
										borderRadius: '10px',
										background: '#F3F4F8',
										outline: 'none',
									}}
									inputStyle={{
										background: '#F3F3F5',
										height: '50px',

                    width: "100%",
                    border: "1px solid #F3F3F5",
                    outline: "none",
                    boxShadow: "none",
                    fontSize: "14px",
                  }}
                  buttonStyle={{
                    border: "1px solid #F3F3F5",
                    outline: "none",
                    boxShadow: "none",
                    width: "0px",
                    height: "80%",
                    marginLeft: "5px",
                    marginTop: "5px",
                    backgroundColor: "#F3F3F5",
                  }}
                  placeholder='Enter Mobile Number'
                  enableSearch={false}
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4A90E2";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#F3F3F5";
                  }}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </label>
          {errors.mobileNumber && (
            <p className='text-[#e52c2c] pl-4'>{errors.mobileNumber.message}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-[#2A2A2A]'>
            Address Line 1
            <input
              type='text'
              {...register("address1")}
              className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
              placeholder='Enter Address Line 1'
            />
          </label>
        </div>
        <div>
          <label className='block text-sm font-medium text-[#2A2A2A]'>
            Address Line 2
            <input
              type='text'
              {...register("address2")}
              className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
              placeholder='Enter Address Line 2'
            />
          </label>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
          <label className='block text-sm font-medium text-[#2A2A2A]'>
            City
            <input
              type='text'
              {...register("city")}
              className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
              placeholder='Enter City'
            />
          </label>
        </div>
        <div>
          <label className='block text-sm font-medium text-[#2A2A2A]'>
            Postal Code
            <input
              type='text'
              {...register("postalCode")}
              className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
              placeholder='Enter Postal Code'
            />
          </label>
        </div>
        <div>
          <label className='block text-sm font-medium text-[#2A2A2A]'>
            Country
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={true}
                  styles={customStyles}
                  placeholder={
                    <div className='text-base font-normal'>Country</div>
                  }
                  options={formatCountry()}
                  value={state.country}
                  onChange={(e) => {
                    field.onChange(e);
                    dispatch({
                      type: "SELECT_INPUT",
                      fieldName: "country",
                      payload: e,
                    });
                  }}
                />
              )}
            />
            {errors.country && (
              <p className='text-[#e52c2c] pl-4'>{errors.country.message}</p>
            )}
          </label>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-[#2A2A2A]'>
            Drug Allergies
            <input
              type='text'
              {...register("drugAllergies")}
              className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
              placeholder='Enter Drug Allergies'
            />
          </label>
        </div>
        <div>
          <label className='block text-sm font-medium text-[#2A2A2A]'>
            Food Allergies
            <input
              type='text'
              {...register("foodAllergies")}
              className={`${styles.inputField}  mt-1 block w-full shadow-sm sm:text-sm outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg`}
              placeholder='Enter Food Allergies'
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
