'use client'

import React, { useState, useEffect } from 'react'
import { BiReset } from 'react-icons/bi'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/typo/tabs/index'

import History from './History'
import Request from './Request'
import Upcoming from './Upcoming'
import Link from 'next/link'
import useAppointmentStore from '@/store/appointmentsStore'
import PrimaryBtn from '@/components/base/button/hbi_btn'
import Loading from '@/components/ui/loading'
import ShowingEntires from '@/components/base/text/hbi_showing_entries'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import SearchBar from '@/components/ui/form/SearchBar'
import useSpecializationStore from '@/store/specializationStore'

const Appointments = () => {
    const {
        appointments,
        fetchAppointments,
        loading,
        error,
        paginationData,
        setFilters,
        resetFilters,
    } = useAppointmentStore()

    const { fetchSpecializationTitle, specializationTitle } =
        useSpecializationStore((state) => ({
            fetchSpecializationTitle: state.fetchSpecializationTitle,
            specializationTitle: state.specializationTitle,
        }))

    const [currentPage, setCurrentPage] = useState(1)
    const [selectedTab, setSelectedTabLocal] = useState('request')
    const [selectFilter, SetSelectFilter] = useState('')
    const [doctorName, setDoctorName] = useState('')

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }
    
    const handleSearchClick = () => {
        setFilters({
            specialization: selectFilter,
            doctorName,
        })

        fetchAppointments()
    }

    useEffect(() => {
        setFilters({ selectedTab })
        fetchAppointments(currentPage, 10)
    }, [fetchAppointments, currentPage, setFilters, selectedTab])

    useEffect(() => {
        fetchSpecializationTitle()
    }, [])

    const resetFilter = () => {
        SetSelectFilter('')
        resetFilters()
        setSelectedTabLocal('request')
        setDoctorName('')
    }

    const handleTabChange = (newTab) => {
        setSelectedTabLocal(newTab)
        setCurrentPage(1)
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

    const pages = [...Array(paginationData?.pageCount)].map((_, i) => i + 1)

    if (error) return <h2>{error.message}</h2>

    return (
        <div className="m-3 h-[85vh] overflow-hidden overflow-y-visible">
            <div className="flex justify-between mb-2">
                <div>
                    <h2 className="text-[#2F4858] text-[26px] font-semibold">
                        Appointments
                    </h2>
                </div>
                <div>
                    <Link href="/appointments/addAppointment">
                        <PrimaryBtn name="+ Add Appointment" width={166} />
                    </Link>
                </div>
            </div>

            {/* filter */}
            <div className="flex mb-3 gap-3">
                <SearchBar
                    placeholder="Filter By Doctor Name"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                />
                <Select
                    value={selectFilter}
                    onValueChange={SetSelectFilter}
                    className="w-96"
                >
                    <SelectTrigger
                        icon={DownIcon}
                        className="w-[210px] bg-white text-[#849098]"
                    >
                        <SelectValue placeholder="Filter By Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                        {specializationTitle.map((specialization) => (
                            <SelectItem
                                className="focus:bg-[#F2FFFE] focus:text-[#3FC9C1] hover:bg-[#F2FFFE]"
                                key={specialization.id}
                                value={specialization.title}
                            >
                                {specialization.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <PrimaryBtn
                    onClick={handleSearchClick}
                    name={'Search'}
                    color="#ffffff"
                />
                <button
                    className="underline text-[#386FFF] flex items-center"
                    onClick={resetFilter}
                >
                    <BiReset className="ml-1 w-[18px] h-[20px]" />
                    <span>Reset</span>
                </button>
            </div>

            {/* tabs */}
            <Tabs
                defaultValue="request"
                value={selectedTab}
                onValueChange={handleTabChange}
            >
                <TabsList>
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="request">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Request appointments={appointments} />
                    )}
                </TabsContent>
                <TabsContent value="upcoming">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Upcoming appointments={appointments} />
                    )}
                </TabsContent>
                <TabsContent value="history">
                    {loading ? (
                        <Loading />
                    ) : (
                        <History appointments={appointments} />
                    )}
                </TabsContent>
            </Tabs>

            {appointments.length !== 0 && (
                <div>
                    <p className="text-[#637480] text-sm my-4">
                        {<ShowingEntires paginationData={paginationData} />}
                    </p>

                    {/* handling pagination */}
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {/* Previous Page */}
                                <PaginationPrevious
                                    onClick={() =>
                                        handlePageChange(
                                            paginationData.page - 1
                                        )
                                    }
                                    disabled={paginationData?.page === 1}
                                />
                            </PaginationItem>
                            {pages.map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        className={
                                            paginationData?.page === page
                                                ? 'bg-[#3FC9C1] text-white'
                                                : ''
                                        }
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                {/* Next Page */}
                                <PaginationNext
                                    onClick={() =>
                                        handlePageChange(
                                            Math.min(
                                                paginationData.pageCount,
                                                paginationData.page + 1
                                            )
                                        )
                                    }
                                    disabled={
                                        paginationData?.page ===
                                        paginationData?.pageCount
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

export default Appointments
