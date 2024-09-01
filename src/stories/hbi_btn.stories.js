import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiOutlineRefresh } from "react-icons/hi";
import PrimaryBtn from "../components/base/button/hbi_btn";

export default {
	title: "Form/HBI_Button",
	component: PrimaryBtn,
};

const Template = (args) => <PrimaryBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
	name: "Search",
	enableIcon: false,
	color: "#ffffff",
	letterSpacing: "0.03em",
};

export const SaveChanges = Template.bind({});
SaveChanges.args = {
	name: "Save Changes",
	enableIcon: false,
	color: "#ffffff",
	width: "130",
	height: "44",
	letterSpacing: "0.03em",
};

export const DiscardChanges = Template.bind({});
DiscardChanges.args = {
	name: "Discard Changes",
	enableIcon: false,
	bgColor: "#DFFFFD",
	width: "173",
	height: "46",
	radius: "10px",
	letterSpacing: "0.03em",
};

export const Cancel = Template.bind({});
Cancel.args = {
	name: "Cancel",
	enableIcon: false,
	bgColor: "#DFFFFD",
	width: "130",
	height: "44",
	letterSpacing: "0.03em",
};

export const Reset = Template.bind({});
Reset.args = {
	name: "Reset",
	enableIcon: true,
	bgColor: "#ffffff",
	width: 131,
	icon: <HiOutlineRefresh size={18} color={"#386FFF"} />,
	color: "#386FFF",
	borderColor: "#ffffff",
	isIconleft: false,
	fontSize: 16,
	isUnderline: true,
	letterSpacing: "0.03em",
};

export const ExportExcel = Template.bind({});
ExportExcel.args = {
	name: "Export Excel",
	enableIcon: true,
	width: 131,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
	borderColor: "#20C4F4",
	letterSpacing: "0.03em",
};
export const AddSpeciality = Template.bind({});
AddSpeciality.args = {
	name: "Add Speciality",
	enableIcon: false,
	color: "#ffffff",
	width: 120,
	letterSpacing: "0.03em",
};

export const AddMember = Template.bind({});
AddMember.args = {
	name: "Add Member",
	enableIcon: false,
	color: "#ffffff",
};

export const AddDoctor = Template.bind({});
AddDoctor.args = {
	name: "Add Doctor",
	enableIcon: false,
	color: "#ffffff",
};

export const AddSystemUser = Template.bind({});
AddSystemUser.args = {
	name: "Add System User",
	enableIcon: false,
	color: "#ffffff",
	width: 135,
};

export const AddPartner = Template.bind({});
AddPartner.args = {
	name: "Add Partner",
	enableIcon: false,
	color: "#ffffff",
};

export const AddTier = Template.bind({});
AddTier.args = {
	name: "Add Tier",
	enableIcon: false,
	color: "#ffffff",
};

export const AddHeadOfAgency = Template.bind({});
AddHeadOfAgency.args = {
	name: "Add Head Of Agency",
	enableIcon: false,
	color: "#ffffff",
	width: 150,
};

export const AddClinics = Template.bind({});
AddClinics.args = {
	name: "Add Clinics",
	enableIcon: false,
	color: "#ffffff",
};

export const AddAgent = Template.bind({});
AddAgent.args = {
	name: "Add Agent",
	enableIcon: false,
	color: "#ffffff",
};

export const AddClinicAdmin = Template.bind({});
AddClinicAdmin.args = {
	name: "Add Clinic Admin",
	enableIcon: false,
	color: "#ffffff",
	width: 133,
};

export const AddSpecialityIcon = Template.bind({});
AddSpecialityIcon.args = {
	name: "Add Speciality",
	enableIcon: true,
	width: 142,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
	letterSpacing: "0.03em",
};

export const AddMemberIcon = Template.bind({});
AddMemberIcon.args = {
	name: "Add Member",
	enableIcon: true,
	width: 131,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddDoctorIcon = Template.bind({});
AddDoctorIcon.args = {
	name: "Add Doctor",
	enableIcon: true,
	width: 131,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddSystemUserIcon = Template.bind({});
AddSystemUserIcon.args = {
	name: "Add System User",
	enableIcon: true,
	width: 165,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddPartnerIcon = Template.bind({});
AddPartnerIcon.args = {
	name: "Add Partner",
	enableIcon: true,
	width: 131,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddTierIcon = Template.bind({});
AddTierIcon.args = {
	name: "Add Tier",
	enableIcon: true,
	width: 131,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddHeadOfAgencyIcon = Template.bind({});
AddHeadOfAgencyIcon.args = {
	name: "Add Head Of Agency",
	enableIcon: true,
	width: 188,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddClinicsIcon = Template.bind({});
AddClinicsIcon.args = {
	name: "Add Clinics",
	enableIcon: true,
	width: 131,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddAgentIcon = Template.bind({});
AddAgentIcon.args = {
	name: "Add Agent",
	enableIcon: true,
	width: 131,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};

export const AddClinicAdminIcon = Template.bind({});
AddClinicAdminIcon.args = {
	name: "Add Clinic Admin",
	enableIcon: true,
	width: 163,
	icon: (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.85156 11.892V0.369318H7.14418V11.892H4.85156ZM0.240767 7.27273V4.98011H11.7635V7.27273H0.240767Z"
				fill="white"
			/>
		</svg>
	),
	color: "#ffffff",
};
