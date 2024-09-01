// stories/TextInput.stories.js
import React from "react";
// import TextInput from "./TextInput";
import CalendarIcon from "../components/assets/icons/CalendarIcon";
import PrimaryInput from "../components/base/input/hbi_input";
import ClockIcon from "../components/assets/icons/ClockIcon";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default {
	title: "Form/HBI_Input",
	component: PrimaryInput,
};

const Template = (args) => <PrimaryInput {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: "Username",
	placeholder: "Enter your username",
	marginBottom: "5px",
};
export const HBI_input = Template.bind({});
HBI_input.args = {
	label: "Patient Email*",
	placeholder: "Enter Email",
	value: "",
	marginBottom: "5px",
};

export const WithValue = Template.bind({});
WithValue.args = {
	label: "Username",
	placeholder: "Enter your username",
	value: "JohnDoe",
	marginBottom: "5px",
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: "Username",
	placeholder: "Enter your username",
	value: "JohnDoe",
	disabled: true,
	marginBottom: "5px",
};

export const WithError = Template.bind({});
WithError.args = {
	label: "Username",
	placeholder: "Enter your username",
	value: "",
	error: true,
	errorMessage: "Username is required",
	marginBottom: "5px",
};

export const SelectDateInput = Template.bind({});
SelectDateInput.args = {
	label: "Date of Birth*",
	placeholder: "Select Date",
	isIconRight: true,
	icon: <CalendarIcon />,
	isDate: true,
	marginBottom: "5px",
};

export const SelectTimeInput = Template.bind({});
SelectTimeInput.args = {
	label: "End Time of Appointment*",
	placeholder: "Select Time",
	isIconRight: true,
	icon: <ClockIcon />,
	isTime: true,
	marginBottom: "5px",
};

export const SelectInput = Template.bind({});
SelectInput.args = {
	name: "SelectInput",
	label: "Select Input",
	placeholder: "Filter By Status",
	isSelect: true,
	options: [
		{ value: "option1", label: "All" },
		{ value: "option2", label: "Active" },
		{ value: "option3", label: "Inactive" },
	],
	marginBottom: "5px",
};
