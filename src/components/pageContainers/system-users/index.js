'use client'
import React, { useEffect, useState } from 'react'
import PrimaryBtn from '../../base/button/hbi_btn'
import DataTable from '../../base/table/DataTable'
import { GoDotFill } from 'react-icons/go'
import Link from 'next/link'
import useSystemUsersStore from '@/store/systemUsersStore'
import Action from './action'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import { MdDoDisturb } from 'react-icons/md'
import { IoNotificationsOffOutline } from 'react-icons/io5'
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { FaKey } from 'react-icons/fa'
import { toast } from 'react-toastify'

const SystemUsers = () => {
    const { systemUsersData, loading, error, fetchUsers } =
        useSystemUsersStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')

    useEffect(() => {
        fetchUsers({
            email: '',
            role: '',
            status: '',
        })
    }, [fetchUsers])

    if (loading) return <div>Loading...</div>
    // if (error){
    //     toast.error(error.message)
    // }

    const handleFilterSearch = () => {
        fetchUsers({
            email: searchTerm,
            role: selectedRole,
            status: selectedStatus,
        })
    }

    const handleReset = () => {
        setSearchTerm('')
        setSelectedRole('')
        setSelectedStatus('')
        fetchUsers({
            email: '',
            role: '',
            status: '',
        })
    }

    const roleOptions = [
        { value: 'HBI Admin', label: 'HBI Admin' },
        { value: 'HBI Super Admin', label: 'HBI Super Admin' },
        { value: 'Doctor', label: 'Doctor' },
        { value: 'Clinic Admin', label: 'Clinic Admin' },
    ]

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ]

    const columns = [
        {
            dataField: 'profile.name',
            text: 'Full Name',
            formatter: (cell) => (
                <span style={{ color: '#20C4F4' }}>{cell}</span>
            ),
            headerStyle: { width: '20%' },
        },
        {
            dataField: 'email',
            text: 'Email',
            headerStyle: { width: '22%' },
        },
        {
            dataField: 'role.name',
            text: 'Role',
            headerStyle: { width: '20%' },
        },
        {
            dataField: 'isNotified',
            text: 'Notification',
            formatter: (cell) => (
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: cell ? 'green' : 'red',
                    }}
                >
                    <GoDotFill style={{ marginRight: '5px' }} />
                    {cell ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            dataField: 'status',
            text: 'Status',
            formatter: (cell) => (
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: cell === 'Active' ? 'green' : 'red',
                    }}
                >
                    <GoDotFill style={{ marginRight: '5px' }} />
                    {cell}
                </span>
            ),
        },
        {
            dataField: '',
            text: 'Action',
            formatter: (cell, row) => {
                return <ActionFormatter row={row} />
            },
        },
    ]

    return (
        <div className="p-4">
            <div className="flex justify-between align-items-center ">
                <h4 className="text-[#2F4858] text-2xl font-semibold">
                    System Users
                </h4>
                <Link href={'/system-users/add-user'}>
                    <PrimaryBtn
                        width={150}
                        color="white"
                        name={'+ Add System user'}
                    />
                </Link>
            </div>

            <DataTable
                keyField="id"
                columns={columns}
                data={systemUsersData}
                enablePagination
                enableSearch
                enableSelect
                enableSearchBtn
                enableResetBtn
                enableReset
                searchPlaceholder="Search By Email"
                searchTerm={searchTerm || ''}
                setSearchTerm={setSearchTerm}
                selectPlaceholder="Filter By Role"
                selectOptions={roleOptions}
                secondSelectOptions={statusOptions}
                selectColumn={selectedRole || ''}
                setSelectColumn={setSelectedRole}
                secondSelectColumn={selectedStatus || ''}
                setSecondSelectColumn={setSelectedStatus}
                handleSearch={handleFilterSearch}
                handleReset={handleReset}
                enableSecondSelect
                secondSelectPlaceholder="Filter by status"
            />
        </div>
    )
}

export default SystemUsers

const ActionFormatter = ({ row }) => {
    const { updateSystemUsersStatus } = useSystemUsersStore()
    const [show, setShow] = useState(false)

    const handleCloseNotify = async () => {
        const id = row?.id
        const isNotified = !row?.isNotified
        const status = row?.status
        const data = await updateSystemUsersStatus(id, isNotified, status)
        console.log(data)
    }

    const handleSuspend = async (value) => {
        const id = row?.id
        const isNotified = row?.isNotified
        const status = value
        const data = await updateSystemUsersStatus(id, isNotified, status)
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
                        href={`/system-users/${row.id}`}
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
