'use client'

import React, { useState, useEffect } from 'react'
import DataTable from '../../base/table/DataTable'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoMailOutline } from 'react-icons/io5'
import PrimaryBtn from '../../base/button/hbi_btn'
import Link from 'next/link'
import { BiReset } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import useDoctorStore from '@/store/doctorStore'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BiEditAlt } from 'react-icons/bi'
import { HiDotsVertical } from 'react-icons/hi'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const Doctors = () => {
    const [filter, setFilter] = useState('')

    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setStatusFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState([])
    const [sortOrder, setSortOrder] = useState('asc')
    const itemsPerPage = 10
    const router = useRouter()

    const { doctors, fetchAllDoctor } = useDoctorStore()

    const handleEditPage = () => {
        console.log('edit click')
        router.push('/doctor/edit-page')
    }
    const DownIcon = () => (
        <svg
            width="13"
            height="6"
            viewBox="0 0 13 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6.5 6L0.870834 0L12.1292 0L6.5 6Z" fill="#8898AA" />
        </svg>
    )
    useEffect(() => {
        fetchAllDoctor()
    }, [fetchAllDoctor])

    const totalItems = data.length
    const pageCount = Math.ceil(totalItems / itemsPerPage)

    const handleSort = (field, order) => {
        const sortedData = [...data].sort((a, b) => {
            if (order === 'asc') {
                return a[field].localeCompare(b[field])
            } else {
                return b[field].localeCompare(a[field])
            }
        })
        setData(sortedData)
        setSortOrder(order === 'asc' ? 'desc' : 'asc')
    }

    const columns = [
        { dataField: 'name', text: 'Full Name' },
        { dataField: 'email', text: 'Email' },
        { dataField: 'speciality', text: 'Speciality' },
        { dataField: 'clinic.name', text: 'Clinic' },
        {
            text: 'Status',
            formatter: (cell, row) => {
                const statusColor =
                    row.status === 'Pending' ? '#FFA800' : 'green'
                return <span style={{ color: statusColor }}>{row.status}</span>
            },
        },
        {
            dataField: 'action',
            text: 'Action',
            sort: false,
            formatter: (cell, row) => {
                return (
                    <DropdownMenu className="relative">
                        <DropdownMenuTrigger className="ml-4">
                            <HiDotsVertical className="text-xl mr-2" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[180px] m-0 p-0 absolute right-4">
                            <DropdownMenuItem
                                style={{
                                    backgroundColor: '#3FC9C1',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderBottom: '1px solid #e0e0e0',
                                    fontSize: '16px',
                                }}
                            >
                                <Link
                                    className="flex gap-2 items-center"
                                    href={`doctors/${row?.id}`}
                                >
                                    <BiEditAlt></BiEditAlt> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                style={{
                                    fontSize: '16px',
                                    color: '#20C4F4',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderBottom: '1px solid #e0e0e0',
                                }}
                            >
                                <Link
                                    className="flex gap-2 items-center"
                                    href={`doctors/${row?.id}`}
                                >
                                    <IoMailOutline /> Invite
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const handleSearch = (event) => {
        event.preventDefault()
        fetchAllDoctor({ searchText: searchTerm, filterStatus })

        setCurrentPage(1)
    }

    const handleReset = () => {
        setSearchTerm('')
        setStatusFilter('')
        setCurrentPage(1)
        fetchAllDoctor({
            searchText: '',
            filterStatus: '',
        })
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleActionClick = (id) => {
        setData(
            data.map((doctor) =>
                doctor.id === id
                    ? { ...doctor, isOpen: !doctor.isOpen }
                    : doctor
            )
        )
    }

    return (
        <div>
            <section className="flex justify-between px-2 mt-4">
                <h1>Doctors</h1>
                <button className="text-white px-3 bg-[#3fc9c1] p-2 rounded">
                    <Link
                        className="flex items-center justify-between"
                        href="/doctors/add-doctor"
                    >
                        <FaPlus /> <span className="ps-2">Add Doctor</span>
                    </Link>
                </button>
            </section>

            <section>
                {/* <form className="flex gap-2 " onSubmit={handleSearch}> */}
                <div className="flex items-center my-3  px-2 gap-x-3">
                    <div>
                        <input
                            type="text"
                            id="search"
                            name="query"
                            placeholder="Filter By Email"
                            className="p-2 border border-gray-300 rounded outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select
                        value={filterStatus}
                        name="status"
                        onValueChange={setStatusFilter}
                        className="w-96"
                    >
                        <SelectTrigger
                            icon={DownIcon}
                            className="w-[210px]  bg-white "
                        >
                            <SelectValue placeholder="Filter By Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                className="hover:bg-[#F2FFFE] tier px-2"
                                selected
                                value="Pending"
                            >
                                Pending
                            </SelectItem>
                            <SelectItem
                                className="hover:bg-[#F2FFFE] px-2 tier"
                                value="Accepted"
                            >
                                Accepted
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <div>
                        <PrimaryBtn
                            onClick={handleSearch}
                            width={100}
                            color="white"
                            name="Search"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="border-b-2 flex gap-x-1 items-center border-blue-600 text-blue-600"
                        >
                            Reset <BiReset />
                        </button>
                    </div>
                </div>
                {/* </form> */}
            </section>

            <section className="ps-2">
                <DataTable data={doctors} columns={columns} />
            </section>
        </div>
    )
}

export default Doctors
