'use client'

import React, { useMemo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Link from 'next/link'
import { BiEditAlt } from 'react-icons/bi'
import { MdDoDisturb } from 'react-icons/md'
import { FaKey } from 'react-icons/fa6'
import { IoNotificationsOffOutline } from 'react-icons/io5'
import usePartnerStore from '@/store/partnerStore'
import Loading from '@/components/ui/loading'
import PrimaryBtn from '@/components/base/button/hbi_btn'
import DataTable from '@/components/base/table/DataTable'
import { GoDotFill } from 'react-icons/go'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

const Partners = () => {
    const [nameSearch, setNameSearch] = useState('')
    const { partners, fetchPartners, loading, error } = usePartnerStore()

    useMemo(() => {
        fetchPartners()
    }, [fetchPartners])

    const handleSearchButton = () => {
        fetchPartners({ name: nameSearch })
    }

    const handleResetButton = () => {
        setNameSearch('')
        fetchPartners()
    }

    if (loading) {
        return <Loading />
    }
    //data columns
    const columns = [
        {
            dataField: 'profile.name',
            text: 'Full Name',
            sort: false,
            formatter: (cell, row) => (
                <p className="font-semibold text-[#20C4F4] text-sm">{cell}</p>
            ),
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: false,
        },
        {
            dataField: 'profile.passport',
            text: 'NRIC/Passport',
            sort: false,
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: false,
            formatter: (cell, row) => (
                <p
                    className={`font-semibold flex items-center gap-0.5 text-xs ${cell === 'Active' ? 'text-[#5FA452]' : 'text-red'}`}
                >
                    <GoDotFill />
                    {cell}
                </p>
            ),
        },
        {
            dataField: 'profile.companyName',
            text: 'Company Name',
            sort: false,
        },
        {
            dataField: 'profile.phoneNo',
            text: 'Mobile',
            sort: false,
        },
        {
            dataField: 'profile.residentialAddressLine1',
            text: 'Address',
            sort: false,
        },
        {
            dataField: 'profile.jobTitle',
            text: 'Job Title',
            sort: false,
        },
        {
            dataField: 'profile.UEN',
            text: 'UEN',
            sort: false,
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cell, row) => <ActionFormatter row={row} />,
        },
    ]

    return (
        <div className="p-4 lg:p-8">
            {/* Title and add user */}

            <div className="flex justify-between align-items-center">
                <h4 className="text-[#2F4858] text-2xl font-semibold ">
                    Partner
                </h4>
                <Link href="/agents/partners/add-partner">
                    <PrimaryBtn
                        width={150}
                        color="white"
                        name={'+ Add Partner'}
                    />
                </Link>
            </div>

            {/* Partner table */}
            <div className="w-full max-h-[90vh] pt-6 overflow-hidden overflow-y-auto">
                <DataTable
                    columns={columns}
                    data={partners}
                    enableSearch
                    searchTerm={nameSearch}
                    setSearchTerm={setNameSearch}
                    searchPlaceholder="Filter By Name"
                    // enableSelect
                    // selectOptions={roleOptions}
                    // selectColumn={selectColumn}
                    // setSelectColumn={setSelectColumn}
                    // selectPlaceholder='Filter By Role'

                    // enableSecondSelect

                    // secondSelectPlaceholder='Filter by status'

                    enableSearchBtn
                    handleSearch={handleSearchButton}
                    enableResetBtn
                    handleReset={handleResetButton}
                />
            </div>
        </div>
    )
}

export default Partners

//Action dropdown by clicking three dot
//Action dropdown by clicking three dot
const ActionFormatter = ({ row }) => {
    const { updatePartnerStatus } = usePartnerStore()
    const [show, setShow] = useState(false)

    const handleCloseNotify = async () => {
        const id = row?.id
        const isNotified = !row?.isNotified
        const status = row?.status
        const data = await updatePartnerStatus(id, isNotified, status)
        console.log(data)
    }

    const handleSuspend = async (value) => {
        const id = row?.id
        const isNotified = row?.isNotified
        const status = value
        const data = await updatePartnerStatus(id, isNotified, status)
        console.log(data)
    }

    return (
        <div className="relative">
            <button
                onBlur={() => setTimeout(() => setShow(false), 150)}
                onClick={() => setShow((currentVal) => !currentVal)}
            >
                <BsThreeDotsVertical />
            </button>
            {show && (
                <div className="text-[14px] transition-all bg-white rounded-xl absolute top-4 right-20 w-48 z-[999999]">
                    <Link
                        href={`/agents/partners/${row.id}`}
                        className="text-lg text-white py-2 bg-[#3fc9c1] hover:bg-inherit/80 rounded-t-xl flex gap-2  items-center pl-4"
                    >
                        <BiEditAlt />
                        Edit
                    </Link>

                    {row?.status === 'Active' ? (
                        <button
                            onClick={() => handleSuspend('Inactive')}
                            className="text-lg w-full flex gap-2 py-2 text-[#e94c40] border-b border-[#DADBDE] hover:bg-slate-50 items-center pl-4"
                        >
                            <MdDoDisturb /> Suspend
                        </button>
                    ) : (
                        <button
                            onClick={() => handleSuspend('Active')}
                            className="text-lg w-full flex gap-2 py-2 text-[#5FA452] border-b border-[#DADBDE] hover:bg-slate-50 items-center pl-4"
                        >
                            <IoIosCheckmarkCircleOutline /> Activate
                        </button>
                    )}

                    <Link
                        href={'/forgot-password'}
                        className={`text-lg py-2 text-[#ffa800] flex gap-2  border-[#DADBDE] hover:bg-slate-50 items-center pl-4 ${row?.isNotified && 'border-b'}`}
                    >
                        <FaKey />
                        Reset Password
                    </Link>
                    {row?.isNotified ? (
                        <button
                            onClick={handleCloseNotify}
                            className="w-full text-lg py-2 flex gap-2 text-[#e94c40] hover:bg-slate-50 items-center pl-4"
                        >
                            <IoNotificationsOffOutline />
                            Close Notify
                        </button>
                    ) : (
                        <button
                            onClick={handleCloseNotify}
                            className="w-full text-lg py-2 flex gap-2 text-[#5FA452] hover:bg-slate-50 items-center pl-4"
                        >
                            <HiOutlineBellAlert />
                            Active Notify
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
