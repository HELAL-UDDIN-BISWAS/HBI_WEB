import PrimaryBtn from "@/components/base/button/hbi_btn";
import useClinicStore from "@/store/clinicStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Select from "react-select";
import countryList from "react-select-country-list";
const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  address: yup.string().min(4).required(),
  city: yup.string().min(2).required(),
  postalCode: yup.string().min(2).required(),
  country: yup.string().optional(),
});

const ClinicForm = ({ id }) => {
  const router = useRouter();
  const countryOptions = countryList().getData();
  const { clinic, fetchClinicId, fetchClinics, updateClinicById } =
    useClinicStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if (id) {
      fetchClinicId(id);
    }
  }, [fetchClinicId, id]);

  useEffect(() => {
    if (clinic) {
      reset({
        name: clinic.attributes.name,
        address: clinic.attributes.address,
        city: clinic.attributes.city,
        postalCode: clinic.attributes.postalCode,
        country: clinic.attributes.country,
      });
    }
  }, [clinic, reset]);

  const onSubmit = async (data) => {
    console.log("clicked");
    const clinicInput = {
      name: data.name,
      address: data.address,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode,
    };

    const clinicId = clinic?.id;

    const res = await updateClinicById(clinicId, clinicInput);
    if (res.updateClinic.data.id) {
      toast.success("Clinic updated successfully!");
      await fetchClinics();
      router.push("/system-setup/clinic");
    }
  };

  return (
    <div>
      <div className='bg-white p-3'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex gap-4'>
            <div className='flex-col w-full flex text-black'>
              <label>Clinic Name*</label>
              <input
                className='outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg'
                type='text'
                {...register("name")}
                placeholder='Enter Name'
                required
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className='flex-col w-full flex text-black'>
              <label>Clinic Address 1*</label>
              <input
                className='outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg'
                type='text'
                {...register("address")}
                placeholder='Enter Address'
                required
              />
              {errors.address && <span>{errors.address.message}</span>}
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='flex-col w-full flex text-black'>
              <label>Clinic City*</label>
              <input
                className='outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg'
                type='text'
                {...register("city")}
                placeholder='Enter City'
              />
              {errors.city && <span>{errors.city.message}</span>}
            </div>
            <div className='flex-col w-full flex text-black'>
              <label>Clinic Postal Code*</label>
              <input
                className='outline-none py-3 bg-[#F3F3F5] px-3 rounded-lg'
                type='text'
                {...register("postalCode")}
                placeholder='Enter Postal Code'
              />
              {errors.postalCode && <span>{errors.postalCode.message}</span>}
            </div>
            <div className='flex-col w-full flex text-black'>
              <label>Clinic Country</label>
              <Controller
                {...register("country")}
                name='country'
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    // defaultValue={field.value}
                    placeholder='Select a Country'
                    styles={customStyles}
                    classNamePrefix='react-select'
                    onChange={(option) => field.onChange(option.value)}
                    value={countryOptions.find(
                      (option) => option.value === field.value
                    )}
                  />
                )}
              />
              {errors.country && (
                <p className='text-red-500'>{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className='absolute '>
            <div className='flex gap-3 py-3'>
              <PrimaryBtn
                width={130}
                type='submit'
                color='white'
                name='Save Changes'></PrimaryBtn>
              <PrimaryBtn
                onClick={() => router.back()}
                width={110}
                bgColor='#DFFFFD'
                color='#3FC9C1'
                name='Cancel'></PrimaryBtn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClinicForm;

export const customStyles = {
  control: (base) => ({
    ...base,
    padding: "0.375rem 0.75rem",
    borderRadius: "0.375rem",
    background: "#F3F3F5",
    border: "none",
    outline: "none",
    boxShadow: "none",
    color: "black",
    paddingTop: "0.75rem ",
    paddingBottom: "0.75rem",
  }),
};
