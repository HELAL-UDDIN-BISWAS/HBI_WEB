import React from "react";

import HBIBoldText from "../app/components/base/text/hbi_bold_text";
import { FootprintsIcon } from "lucide-react";

export default {
	title: "Form/HBI_Text",
	component: HBIBoldText,
};

const Template = (args) => <HBIBoldText {...args} />;

export const Default = Template.bind({});
Default.args = {
	text: "Default",
	fontSize: 16,
	fontWeight: 500,
};

export const Title = Template.bind({});
Title.args = {
	text: "Members",
	fontSize: 26,
	fontWeight: 600,
	lineHeight: 35.41,
	fontFamily: "Open Sans",
	color: "#2F4858",
};

export const MenuText = Template.bind({});
MenuText.args = {
	text: "Menu Text",
	fontSize: 16,
	fontWeight: 500,
};

export const RenderActionText = Template.bind({});
RenderActionText.args = {
	text: "Edit",
	color: "#222222",
	fontSize: 14,
	fontWeight: 600,
	fontFamily: "Open Sans",
	lineHeight: 19.07,
};
export const LoginUserName = Template.bind({});
LoginUserName.args = {
	text: "John Doe",
	color: "#3FC9C1",
	fontSize: 16,
	fontWeight: 600,
	fontFamily: "Open Sans",
	lineHeight: 21.79,
};

export const RouteFrontSteps = Template.bind({});
RouteFrontSteps.args = {
	text: "Clinics",
	color: "#3FC9C1",
	fontSize: 16,
	fontWeight: 600,
	fontFamily: "Open Sans",
	lineHeight: 21.79,
};

export const RouteStepActive = Template.bind({});
RouteStepActive.args = {
	text: "Add Clinic",
	color: "#2F4858",
	fontSize: 16,
	fontWeight: 600,
	fontFamily: "Open Sans",
	lineHeight: 21.79,
};

export const SpecialityImage = Template.bind({});
SpecialityImage.args = {
	text: "Click to add an asset or drag and drop one in this area",
	color: "#2F4858",
	fontSize: 16,
	fontWeight: 600,
	fontFamily: "Open Sans",
	lineHeight: 20,
	isTextCenter: true,
};

export const Reset = Template.bind({});
Reset.args = {
	text: "Reset",
	color: "#386FFF",
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 19.36,
	isUnderline: true,
};

export const DropDownChosenText = Template.bind({});
DropDownChosenText.args = {
	text: "Cambodian",
	color: "#222222",
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 24,
};

export const DropDownText = Template.bind({});
DropDownText.args = {
	text: "Kenya (+254)",
	color: "#222222",
	fontSize: 14,
	fontWeight: 400,
	lineHeight: 24,
};

export const Showing_Pagination = Template.bind({});
Showing_Pagination.args = {
	text: "Showing 4 of 4 Entries",
	color: "#637480",
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 21.79,
};

export const Button_Text = Template.bind({});
Button_Text.args = {
	text: "Add Appointment",

	fontSize: 16,
	fontWeight: 500,
	lineHeight: 24,
	isTextCenter: true,
};
export const PlaceHolderInDateInput = Template.bind({});
PlaceHolderInDateInput.args = {
	text: "Select Date",
	color: "#9E9E9E",
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 24,
};

export const PlaceHolderInPhone = Template.bind({});
PlaceHolderInPhone.args = {
	text: "+234 5686",
	color: "#222222",
	fontSize: 16,
	fontWeight: 400,
	lineHeight: 19.36,
};

export const PlaceHolderInTextInput = Template.bind({});
PlaceHolderInTextInput.args = {
	text: "Filter by doctor",
	color: "#849098",
	fontSize: 14,
	fontWeight: 400,
	fontFamily: "Roboto",
	lineHeight: 21,
};

export const Tab_Text = Template.bind({});
Tab_Text.args = {
	text: "Request",
	color: "#627AA4",
	fontSize: 18,
	fontWeight: 600,
	fontFamily: "Open Sans",
	lineHeight: 24.51,
};

export const TableHeaderText = Template.bind({});
TableHeaderText.args = {
	text: "Header In Table",
	fontSize: 14,
	fontWeight: 700,
	color: "#344054",
};

export const TableFirstColumnText = Template.bind({});
TableFirstColumnText.args = {
	text: "First Column In Table",
	fontSize: 14,
	fontWeight: 700,
	color: "#20C4F4",
};

export const TableOtherColumnText = Template.bind({});
TableOtherColumnText.args = {
	text: "Other Column In Table",
	fontSize: 14,
	fontWeight: 700,
	color: "#667085",
};

export const StatusText = Template.bind({});
StatusText.args = {
	text: "Active",
	fontFamily: "Inter",
	fontSize: 14,
	fontWeight: 700,
	color: "#5FA452",
	isIconLeft: true,
	icon: () => (
		<svg
			width="6"
			height="6"
			viewBox="0 0 6 6"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<circle cx="3" cy="3" r="3" fill="#5FA452" />
		</svg>
	),
};
