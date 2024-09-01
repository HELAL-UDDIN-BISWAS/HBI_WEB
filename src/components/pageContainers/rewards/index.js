"use client";
import DataTable from "@/components/base/table/DataTable";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import Action from "./modal/modal";
import useRewardsStore from "@/store/rewardstore";

const RewardSystem = () => {
  const [emailSearch, setEmailSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const { rewardsSystemData, getRewardsSystemData } = useRewardsStore();
  const statusColors = {
    Active: "#5FA452", // Green for Active
    Inactive: "#E94C40", // Orange for Inactive
  };
  const columns = [
    {
      dataField: "attributes.user.data.attributes.username",
      text: "Full Name",
      headerStyle: { width: "20%" },
      headerClasses: "align-middle",
      formatter: (cell, row) => (
        <span style={{ color: "#20C4F4", fontWeight: "700" }}>{cell}</span>
      ),
    },
    {
      dataField: "attributes.user.data.attributes.email",
      text: "Email",
      headerStyle: { width: "25%" },
      headerClasses: "align-middle",
    },
    {
      dataField: "attributes.user.data.attributes.role.data.attributes.name",
      text: "Role",
      headerStyle: { width: "20%" },
      headerClasses: "align-middle",
    },
    {
      dataField: "attributes.points",
      text: "Points",
      formatter: (cell, row) => (
        <span className='text-point font-bold'>{cell}</span>
      ),
      headerStyle: { width: "20%" },
      headerClasses: "align-middle",
    },
    {
      dataField: "attributes.user.data.attributes.status",
      text: "Status",
      formatter: (cell) => (
        <span className={`font-semibold flex items-center gap-0.5 text-xs ${cell === "Active" ? "text-[#5FA452]" : "text-red"}`}>
          <GoDotFill style={{ marginLeft: "0px", cursor: "pointer" }} />
          {cell}
        </span>
      ),
      headerStyle: { width: "20%" },
      headerClasses: "align-start",
    },
    {
      text: "Action",
      formatter: (cellContent, row) => <Action row={row}></Action>,
      // headerStyle: { width: "10%" },
      headerClasses: "align-middle",
    },
  ];
  const statusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];
  const roleOptions = [
    { value: "HOA", label: "HOA" },
    { value: "Agent", label: "Agent" },
    { value: "Member", label: "Member" },
  ];

  const handleSearchButton = () => {
    getRewardsSystemData({ emailSearch, selectedRole, selectStatus });
  };

  const handleResetButton = () => {
    setEmailSearch("");
    setSelectedRole("");
    setSelectStatus("");
    getRewardsSystemData({
      emailSearch: "",
      selectedRole: "",
      selectStatus: "",
    });
  };
  useEffect(() => {
    getRewardsSystemData({ emailSearch, selectedRole, selectStatus });
  }, []);
  return (
    <div className='px-[30px] py-6'>
      <h2 className='font-semibold text-[26px] mb-[29px]'>Reward System</h2>
      <div className=''>
        <DataTable
          columns={columns}
          data={rewardsSystemData}
          handleSearch={handleSearchButton}
          handleReset={handleResetButton}
          enableSearchBtn
          enableResetBtn
          enablePagination
          enableSearch
          searchTerm={emailSearch}
          setSearchTerm={setEmailSearch}
          searchPlaceholder='Filter By Email'
          enableSelect
          selectOptions={roleOptions}
          selectColumn={selectedRole}
          setSelectColumn={setSelectedRole}
          selectPlaceholder='Filter By Role'
          enableSecondSelect
          secondSelectOptions={statusOptions}
          setSecondSelectColumn={setSelectStatus}
          secondSelectColumn={selectStatus}
          secondSelectPlaceholder='Filter by status'
        />
      </div>
    </div>
  );
};

export default RewardSystem;
