'use client'
import React, { useEffect, useState } from 'react'
import DataTable from '../../base/table/DataTable'
import Action from './action'
import HBI_BreadCrumb from '../../base/breadcrumb/HBI_BreadCrumb'
import usePatientStore from '@/store/patientsStore'

const Patients = () => {
    const { patients, fetchPatients } = usePatientStore((state) => ({
        patients: state.patients,
        fetchPatients: state.fetchPatients,
    }))
    const [searchTarm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchPatients('')
    }, [])
    console.log(patients)

    const handleFilterSearch = () => {
        fetchPatients(searchTarm)
        // setSearchTerm("");
    }

    const handleReset = () => {
        fetchPatients('')
        setSearchTerm('')
    }

    const colums = [
        {
            dataField: 'attributes.profile.data.attributes.name',
            text: 'Full Name',
            formatter: (cell) => (
                <span style={{ color: '#20C4F4', fontWeight: '700' }}>
                    {cell}
                </span>
            ),
        },
        {
            dataField: 'attributes.profile.data.attributes.passport',
            text: 'Passport',
            formatter: (cell) => (
                <span style={{ color: '#667085', fontWeight: '700' }}>
                    {cell}
                </span>
            ),
        },
        {
            dataField: 'attributes.profile.data.attributes.country',
            text: 'Country',
            formatter: (cell) => (
                <span style={{ color: '#667085', fontWeight: '700' }}>
                    {cell}
                </span>
            ),
        },
        {
            dataField: 'attributes.profile.data.attributes.phoneNo',
            text: 'Mobile Number',
            formatter: (cell) => (
                <span style={{ color: '#667085', fontWeight: '700' }}>
                    {cell}
                </span>
            ),
        },
        {
            dataField: 'attributes.profile.data.attributes.dateOfBirth',
            text: 'Date Of Birth',
            formatter: (cell) => (
                <span style={{ color: '#667085', fontWeight: '700' }}>
                    {cell}
                </span>
            ),
        },
        {
            dataField: 'attributes.email',
            text: 'Email',
            formatter: (cell) => (
                <span style={{ color: '#667085', fontWeight: '700' }}>
                    {cell}
                </span>
            ),
        },
        {
            formatter: (cellContent, row) => <Action row={row}></Action>,
            text: 'Action',
            headerAlign: 'right',
        },
    ]

    return (
        <div className="p-4 flex flex-col">
            <div className="">
                <HBI_BreadCrumb pageName="Patients" />
            </div>
            <div className=" overflow-hidden overflow-y-visible">
                <DataTable
                    columns={colums}
                    data={patients}
                    enableSearch
                    searchTerm={searchTarm}
                    setSearchTerm={setSearchTerm}
                    searchPlaceholder="Filter By Name"
                    handleSearch={handleFilterSearch}
                    handleReset={handleReset}
                    enableSearchBtn
                    enableResetBtn
                ></DataTable>
            </div>
        </div>
    )
}

export default Patients
