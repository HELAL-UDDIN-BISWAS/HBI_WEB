"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/typo/tabs/index";

import PrimaryBtn from '@/components/base/button/hbi_btn';
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import dropdown from "@dropdowns/nationalities";
import 'react-phone-input-2/lib/style.css';
import MemberForm from '../member-component/MemberForm';


import { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useMemberStore from "@/store/memberStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const initialState = {
  gender: null,
  nationality: null,
  country: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_INPUT":
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    default:
      return state;
  }
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  fullName: yup.string().required("FullName is required field"),
  membershipId: yup.string().optional(),
  dateOfBirth: yup.string().required("Date of Birth is required field"),
  gender: yup.object().optional(),
  nationality: yup
    .string()
    .nullable()
    .required("Nationality is required field"),
  nricPassport: yup.string().required(`NRIC / Passport is required field`),
  mobileNumber: yup.string().required("Mobile Number is required field"),
  address1: yup.string().optional(),
  address2: yup.string().optional(),
  city: yup.string().optional(),
  postalCode: yup.string().optional(),
  country: yup.object().optional(),
  drugAllergies: yup.string().optional(),
  foodAllergies: yup.string().optional(),
});

const AddMemberForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { createMember, loading, error, fetchMemberRole, memberRoleId } =
    useMemberStore((state) => ({
      createMember: state.createMember,
      loading: state.loading,
      error: state.error,
      fetchMemberRole: state.fetchMemberRole,
      memberRoleId: state.memberRoleId,
    }));
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchMemberRole();
  }, []);

  const onSubmit = async (data) => {
    const profileInput = {
      dateOfBirth: data?.dateOfBirth,
      membershipID: data?.membershipId,
      passport: data?.nricPassport,
      name: data?.fullName,
      gender: data?.gender?.value,
      country: data?.country?.value,
      phoneNo: data?.mobileNumber,
      registeredDate: new Date().toISOString(),
      city: data?.city,
      postalCode: data?.postalCode,
      drugAllergy: data?.drugAllergies,
      foodAllergy: data?.foodAllergies,
      residentialAddressLine1: data?.address1,
      residentialAddressLine2: data?.address2,
      nationality: data?.nationality,
    };
    const userInput = {
      username: data.fullName,
      email: data.email,
      password: "defaultpassword",
      role: memberRoleId,
    };
    try {
      const res = await createMember(profileInput, userInput);
      console.log(res);
      if (res.id) {
        toast.success("Member created successfully");
        reset();
        router.push("/members");
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`, { autoClose: 5000 });
    }
  };

  const breadcrumb_arg = [
    {
      label: "Members",
      href: "members",
    },
    {
      label: "Add Member",
    },
  ];

  return (
    <div>
      <div className='p-4 rounded-lg '>
        <div className='ps-2'>
          <HBI_BreadCrumb pageName='Add Member' items={breadcrumb_arg} />
        </div>

        <Tabs
          defaultValue='general'
          className='w-full border-none h-[75vh] overflow-hidden p-2 overflow-y-visible'>
          <TabsList className='border-none '>
            <TabsTrigger value='general'>
              <div className='text-lg text-[#627AA4]'>General</div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='general'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <MemberForm
                register={register}
                control={control}
                errors={errors}
                state={state}
                dispatch={dispatch}
                reset={reset}
                loading={loading}
              />

              <div className='mt-6 flex space-x-4'>
                <PrimaryBtn
                  name='Add Member'
                  type='submit'
                  color='white'
                  width={133}
                  disable={loading}
                />
                <PrimaryBtn
                  name='Cancel'
                  color='#20C4F4'
                  bgColor='#DFFFFD'
                  width={133}
                  borderColor='#3FC9C1'
                  onClick={() => router.push("/members")}
                />
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddMemberForm;
