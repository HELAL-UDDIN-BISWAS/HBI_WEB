"use client";

import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/typo/tabs";
import PrimaryBtn from "@/components/base/button/hbi_btn";
import HBI_BreadCrumb from "@/components/base/breadcrumb/HBI_BreadCrumb";
import useMemberStore from "@/store/memberStore";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";

import EditMemberForm from "../member-component/EditMemberForm";

import "react-phone-input-2/lib/style.css";
import { Country } from "country-state-city";

export const formatCountry = () => {
  return Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.name,
    code: country.countryCode,
  }));
};

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
  gender: yup.object().nullable().optional(),
  nationality: yup.object().required("Nationality is required field"),
  nricPassport: yup.string().required("Nric/Passport is required field"),
  mobileNumber: yup.string().required("Mobile Number is required field"),
  address1: yup.string().optional(),
  address2: yup.string().optional(),
  city: yup.string().optional(),
  postalCode: yup.string().optional(),
  country: yup.object().nullable().optional(),
  drugAllergies: yup.string().optional(),
  foodAllergies: yup.string().optional(),
});

const EditMember = ({ id }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    fetchMemberById,
    selectedMember,
    updateMember,
    loading,
    error,
    fetchMemberRole,
    memberRoleId,
  } = useMemberStore((state) => ({
    selectedMember: state.selectedMember,
    fetchMemberById: state.fetchMemberById,
    loading: state.loading,
    error: state.error,
    updateMember: state.updateMember,
    fetchMemberRole: state.fetchMemberRole,
    memberRoleId: state.memberRoleId,
  }));
  const [isDataFetched, setIsDataFetched] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: null,
      nationality: null,
      country: null,
    },
  });

  useEffect(() => {
    if (id) {
      fetchMemberById(id).then(() => setIsDataFetched(true));
    }
  }, [id, fetchMemberById]);
  useEffect(() => {
    if (selectedMember) {
      const attributes = selectedMember?.attributes;
      const profile = attributes?.profile?.data
        ? attributes?.profile?.data?.attributes
        : {};
      const defaultValues = {
        email: attributes?.email,
        fullName: attributes?.username,
        membershipId: profile?.membershipID,
        dateOfBirth: profile.dateOfBirth,
        gender: profile?.gender
          ? { label: profile.gender, value: profile.gender }
          : null,
        nationality: profile?.nationality
          ? { label: profile.nationality, value: profile.nationality }
          : null,
        nricPassport: profile?.passport || "",
        mobileNumber: profile?.phoneNo || "",
        address1: profile?.residentialAddressLine1 || "",
        address2: profile?.residentialAddressLine2 || "",
        city: profile?.city || "",
        postalCode: profile?.postalCode || "",
        country: profile?.country
          ? { label: profile.country, value: profile.country }
          : null,
        drugAllergies: profile?.drugAllergy || "",
        foodAllergies: profile?.foodAllergy || "",
      };
      console.log(defaultValues);
      reset(defaultValues);
      dispatch({
        type: "SELECT_INPUT",
        fieldName: "gender",
        payload: defaultValues.gender,
      });
      dispatch({
        type: "SELECT_INPUT",
        fieldName: "nationality",
        payload: defaultValues.nationality,
      });
      dispatch({
        type: "SELECT_INPUT",
        fieldName: "country",
        payload: defaultValues.country,
      });
    }
  }, [selectedMember, reset]);
  useEffect(() => {
    fetchMemberRole();
  }, []);
  const onSubmit = async (data) => {
    const profileInput = {
      dateOfBirth: data.dateOfBirth,
      membershipID: data?.membershipId,
      passport: data.nricPassport,
      name: data.fullName,
      gender: data?.gender?.value,
      country: data?.country?.value,
      phoneNo: data.mobileNumber,
      registeredDate: new Date().toISOString(),
      city: data?.city,
      postalCode: data?.postalCode,
      drugAllergy: data?.drugAllergies,
      foodAllergy: data?.foodAllergies,
      residentialAddressLine1: data?.address1,
      residentialAddressLine2: data?.address2,
      nationality: data.nationality?.value,
    };
    const userInput = {
      username: data.fullName,
      email: data.email,
      password: "defaultpassword",
      role: memberRoleId,
    };

    const memberId = id;
    const profileId = selectedMember?.attributes?.profile?.data.id;
    try {
      const res = await updateMember(
        memberId,
        profileId,
        profileInput,
        userInput
      );
      if (res.id) {
        toast.success("Member updated successfully!");
        reset();
        router.push("/members");
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  if (!isDataFetched || loading) {
    return <Loading />;
  }

  const breadcrumb_arg = [
    {
      label: "Members",
      href: "members",
    },
    {
      label: "Edit Member",
    },
  ];
  const handleCancel =  () => {
	reset()
	router.back();
  }
  return (
    <div className='p-2'>
      <div className='p-6 rounded-lg'>
        <HBI_BreadCrumb pageName='Edit Member' items={breadcrumb_arg} />

        <Tabs
          defaultValue='general'
          className='w-full border-none h-[75vh] overflow-hidden p-2 overflow-y-visible'>
          <TabsList className='border-none'>
            <TabsTrigger value='general'>
              <div className='text-lg text-[#627AA4]'>General</div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='general'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <EditMemberForm
                control={control}
                dispatch={dispatch}
                errors={errors}
                loading={loading}
                register={register}
                reset={reset}
                state={state}
              />

              <div className='mt-6 flex space-x-4'>
                <PrimaryBtn
                  name='Update Member'
                  color='white'
                  type='submit'
                  width={133}
                  disable={loading}
                />
                <PrimaryBtn
                  name='Cancel'
                  color='#20C4F4'
                  bgColor='#DFFFFD'
                  width={133}
                  borderColor='#3FC9C1'
                  onClick={handleCancel}
                />
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditMember;
