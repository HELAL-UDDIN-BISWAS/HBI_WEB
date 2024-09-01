"use client"
import React, { useMemo, useState } from "react";
import DataTable from "../../../components/base/table/DataTable";
import { GoDotFill } from "react-icons/go";
import Action from "./model/model"
import Link from "next/link";
import useClinicAdminStore from "@/store/clinicAdminStore";
import HBI_BreadCrumb from "@/components/base/breadcrumb/HBI_BreadCrumb";
import Loading from "@/components/ui/loading";


const ClinicAdmin = () => {
  const { clinicAdmins, fetchClinicAdmin, loading, error } = useClinicAdminStore()
  const [emailSearch, setEmailSearch] = useState('');
  const [selectColumn, setSelectColumn] = useState(null);


  useMemo(() => {
    fetchClinicAdmin();
  }, [fetchClinicAdmin]);


  const handleSearchButton = () => {
    setEmailSearch();
    setSelectColumn();
    fetchClinicAdmin({ email: emailSearch, status: selectColumn });
  };

  const handleResetButton = () => {
    setEmailSearch('');
    setSelectColumn('')
    fetchClinicAdmin();
  };

  const statusColors = {
    Active: '#5FA452',  // Green for Active
    Pending: '#FFA800', // Orange for Pending
    Suspend: '#FF0000', // Red for Suspend
    Inactive: '#E94C40', // Red for Inactive
  };

  const selectOptions = [{
    value: "Active",
    label: "Active"
  },
  {
    value: "Inactive",
    label: "Inactive"
  },
  {
    value: "Suspend",
    label: "Suspend"
  },
  {
    value: "Pending",
    label: "Pending"
  },
  ]

  const columns = [
    {
      dataField: 'attributes.profile.data.attributes.name',
      text: 'Full Name',
      formatter: (cell, row) => (
        <span style={{ color: '#20C4F4', fontSize: '14px', fontWeight: '700' }}>{cell}</span>
      ),
    },
    {
      dataField: 'attributes.email',
      text: 'Email',
      formatter: (cell, row) => (
        <span style={{ color: '#667085', fontSize: '14px', fontWeight: '700' }}>{cell}</span>
      ),
    },
    {
      dataField: 'attributes.clinic.data.attributes.name',
      text: 'Clinic',
      formatter: (cell, row) => (
        <span style={{ color: '#667085', fontSize: '14px', fontWeight: '700' }}>{cell}</span>
      ),
    },
    {
      dataField: 'attributes.status',
      text: 'Status',
      formatter: (cell) => (
        <span style={{ display: 'flex', fontSize: '14px', alignItems: 'center', color: statusColors[cell] || '#000000' }}>
          <GoDotFill style={{ marginLeft: '60', cursor: 'pointer' }} />
          {cell}
        </span>
      ),
      headerAlign: 'center',
    },
    {
      formatter: (cellContent, row) => <Action row={row}></Action>,
      text: 'Action',
      headerAlign: 'right',
    },
  ];

  if (loading) {
    return <div data-testid="loading" className="h-screen w-full flex items-center justify-center">
      <div
        className="spinner-border w-16 h-16 text-moderateCyan"
        role="status"
      ></div>
    </div>;
  }
  // if (clinicAdmins.length === 0) {
  //   return <div>No clinic admins found</div>;
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return <div className="mx-3">
    <div className="flex items-center mt-4 justify-between">
      <HBI_BreadCrumb pageName="Clinic Admin" />
      <Link href='/clinic-admin/add-clinic-admin'> <button className="bg-[#3FC9C1] text-white rounded py-2 px-3">+ Add Clinic Admin</button></Link>
    </div>

    <div className="">
      <DataTable
        handleSearch={handleSearchButton}
        handleReset={handleResetButton}
        selectOptions={selectOptions}
        enableSearch
        enableSearchBtn
        enableResetBtn
        enableSelect
        data={clinicAdmins}
        enablePagination
        columns={columns}
        searchTerm={emailSearch}
        setSearchTerm={setEmailSearch}
        setSelectColumn={setSelectColumn}
        selectColumn={selectColumn}
        searchPlaceholder="Filter By Email"
      />
    </div>
  </div>;
};

export default ClinicAdmin;

