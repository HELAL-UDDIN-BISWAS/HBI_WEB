'use client'
import React from 'react'
import DataTable from '../components/base/table/DataTable'
import { BsThreeDotsVertical } from 'react-icons/bs'

const data = [
    {
        id: 1,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 2,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 3,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 4,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 5,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 6,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 7,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 8,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 9,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 10,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 11,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
    {
        id: 12,
        fullName: 'Marvin McKinney',
        country: 'Singapore',
        passport: 'HB 2234543',
        mobile: '+61 1234 5678',
        dob: 'May 29, 2017',
        email: 'CompanyA@gmail.com',
    },
]
const columns = [
    {
        dataField: 'fullName',
        text: 'Full Name',
        headerStyle: { width: '20%' },
        headerClasses: 'align-middle',
    },
    {
        dataField: 'country',
        text: 'Country',
        headerStyle: { width: '20%' },
        headerClasses: 'align-middle',
    },
    {
        dataField: 'passport',
        text: 'NRIC/ Passport',
        headerStyle: { width: '20%' },
        headerClasses: 'align-middle',
    },
    {
        dataField: 'mobile',
        text: 'Mobile Number',
        headerStyle: { width: '20%' },
        headerClasses: 'align-middle',
    },
    {
        dataField: 'dob',
        text: 'Date Of Birth',
        headerStyle: { width: '20%' },
        headerClasses: 'align-middle',
    },
    {
        dataField: 'email',
        text: 'Email',
        headerStyle: { width: '20%' },
        headerClasses: 'align-middle',
    },
    {
        dataField: 'action',
        text: 'Action',
        formatter: () => {
            return (
                <span style={{ cursor: 'pointer' }}>
                    <BsThreeDotsVertical size={20} />
                </span>
            )
        },
        headerStyle: { width: '20%' },
        headerClasses: 'align-middle',
    },
]

const Example = () => {
    return (
        <div className="container w-full max-h-[90vh] p-4 overflow-hidden overflow-y-auto">
            <DataTable
                columns={columns}
                data={data}
                enableSearch={true}
                enableFilter={true}
                enableSelect={true}
                enableSearchBtn={true}
                enableResetBtn={true}
                enablePagination={true}
            />
        </div>
    )
}

export default Example
