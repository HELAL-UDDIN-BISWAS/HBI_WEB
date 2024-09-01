import React from "react";
import HBI_BreadCrumb from "../components/base/breadcrumb/HBI_BreadCrumb";

export default {
  title: "Components/HBI_BreadCrumb",
  component: HBI_BreadCrumb,
  parameters: {
    docs: {
      description: {
        component:
          "A breadcrumb navigation component using raw CSS, designed to match a specific design. Utilizes `next/link` for navigation and `react-icons` for the separator icon.",
      },
    },
  },
  argTypes: {
    items: { control: "array" },
  },
};

const Template = (args) => <HBI_BreadCrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [{ label: "Members", href: "/" }, { label: "Add Member" }],
};
export const Members = Template.bind({});
Members.args = {
  pageName: "Members",
};

export const AddMembers = Template.bind({});
AddMembers.args = {
  pageName: "Add Members",
  items: [{ label: "Members", href: "/members" }, { label: "Add Member" }],
};
export const Patients = Template.bind({});
Patients.args = {
  pageName: "Patients",
};

export const EditPatient = Template.bind({});
EditPatient.args = {
  pageName: "Edit Patient",
  items: [{ label: "Patients", href: "/patients" }, { label: "Edit Patient" }],
};
export const Appointment = Template.bind({});
Appointment.args = {
  pageName: "Appointment",
};

export const AddNewAppointment = Template.bind({});
AddNewAppointment.args = {
  pageName: "Add New Appointment",
  items: [
    { label: "Appointment", href: "/appointment" },
    { label: "Add New Appointment" },
  ],
};

export const Doctors = Template.bind({});
Doctors.args = {
  pageName: "Doctors",
};

export const AddDoctor = Template.bind({});
AddDoctor.args = {
  pageName: "Add Doctor",
  items: [{ label: "Doctor", href: "/doctor" }, { label: "Add Doctor" }],
};
export const ClinicAdmin = Template.bind({});
ClinicAdmin.args = {
  pageName: "Clinic Admin",
};

export const AddClinicAdmin = Template.bind({});
AddClinicAdmin.args = {
  pageName: "Add Clinic Admin",
  items: [
    { label: "Clinic Admin", href: "/clinic-admin" },
    { label: "Add Clinic Admin" },
  ],
};
export const SystemUsers = Template.bind({});
SystemUsers.args = {
  pageName: "System Users",
};

export const AddSystemUser = Template.bind({});
AddSystemUser.args = {
  pageName: "Add System User",
  items: [
    { label: "System Users", href: "/system-users" },
    { label: "Add System User" },
  ],
};

export const EditSystemUser = Template.bind({});
EditSystemUser.args = {
  pageName: "Edit System User",
  items: [
    { label: "System Users", href: "/system-users" },
    { label: "Edit System User" },
  ],
};
export const Partners = Template.bind({});
Partners.args = {
  pageName: "Partners",
};

export const AddPartner = Template.bind({});
AddPartner.args = {
  pageName: "Add Partner",
  items: [{ label: "Partners", href: "/partners" }, { label: "Add Partner" }],
};

export const RewardSystem = Template.bind({});
RewardSystem.args = {
  pageName: "Reward System",
};
export const PromotionSetup = Template.bind({});
PromotionSetup.args = {
  pageName: "Promotion Setup",
};

export const AddPromotion = Template.bind({});
AddPromotion.args = {
  pageName: "Add Promotion",
  items: [
    { label: "Promotion Setup", href: "/promotion-setup" },
    { label: "Add Promotion" },
  ],
};

export const TierSetup = Template.bind({});
TierSetup.args = {
  pageName: "Tier Setup",
};

export const AddTier = Template.bind({});
AddTier.args = {
  pageName: "Add Tier",
  items: [{ label: "Tier Setup", href: "/tier-setup" }, { label: "Add Tier" }],
};
export const PointSetup = Template.bind({});
PointSetup.args = {
  pageName: "PointSetup",
};

export const HeadOfAgency = Template.bind({});
HeadOfAgency.args = {
  pageName: "Head of Agency",
};
export const AgencyDetails = Template.bind({});
AgencyDetails.args = {
  pageName: "Agency Details",
  items: [
    { label: "Head of Agency", href: "/tier-setup" },
    { label: "Agency Details" },
  ],
};
export const Clinics = Template.bind({});
Clinics.args = {
  pageName: "Clinics",
};
export const AddClinic = Template.bind({});
AddClinic.args = {
  pageName: "Add Clinic",
  items: [{ label: "Clinics", href: "/clinics" }, { label: "Add Clinic" }],
};
export const EditClinic = Template.bind({});
EditClinic.args = {
  pageName: "Edit Clinic",
  items: [{ label: "Clinics", href: "/clinics" }, { label: "Edit Clinic" }],
};
export const Specialization = Template.bind({});
Specialization.args = {
  pageName: "Specialization",
};
export const AddSpecialty = Template.bind({});
AddSpecialty.args = {
  pageName: "Add Specialty",
  items: [
    { label: "Specialization", href: "/specialization" },
    { label: "Add Specialty" },
  ],
};
export const EditSpecialty = Template.bind({});
EditSpecialty.args = {
  pageName: "Edit Specialty",
  items: [
    { label: "Specialization", href: "/specialization" },
    { label: "Edit Specialty" },
  ],
};
