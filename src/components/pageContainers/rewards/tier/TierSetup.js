'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/ui/loading'
import PrimaryBtn from '@/components/base/button/hbi_btn'
import DataTable from '@/components/base/table/DataTable'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import useTierStore from '@/store/tierStore'
import { AiOutlineDelete } from 'react-icons/ai'

const TierSetup = () => {
    const [nameSearch, setNameSearch] = useState('')
    const { tiers, fetchTiers, loading, deleteTier } = useTierStore()

    useMemo(() => {
        fetchTiers()
    }, [fetchTiers])

    const handleSearchButton = () => {
        fetchTiers({ name: nameSearch })
    }

    const handleResetButton = () => {
        setNameSearch('')
        fetchTiers()
    }

    if (loading) {
        return <Loading />
    }

    //data columns
    const columns = [
        {
            dataField: 'name',
            text: 'Tier Name',
            sort: false,
            formatter: (cell, row) => (
                <p className="text-[#20C4F4] text-sm font-bold">{cell}</p>
            ),
        },
        {
            dataField: 'pointRangeFrom',
            text: 'Points',
            sort: false,
            formatter: (cell, row) => (
                <p className="text-[#FFA800] text-sm font-bold">
                    {row.pointRangeFrom}-{row.pointRangeTo}
                </p>
            ),
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cell, row) => (
                <ActionFormatter deleteTier={deleteTier} row={row} />
            ),
        },
    ]

    return (
        <div className="p-4 lg:p-8">
            {/* Title and add user */}

            <div className="flex justify-between align-items-center">
                <h4 className="text-[#2F4858] text-2xl font-semibold ">
                    Tier Setup
                </h4>
                <Link href="/rewards/tier-setup/add-tier">
                    <PrimaryBtn width={150} color="white" name={'+ Add Tier'} />
                </Link>
            </div>

            {/* Partner table */}
            <div className="w-full max-h-[90vh] pt-6 overflow-hidden overflow-y-auto">
                <DataTable
                    columns={columns}
                    data={tiers}
                    enableSearch
                    searchTerm={nameSearch}
                    setSearchTerm={setNameSearch}
                    searchPlaceholder="Filter By Tier Name"
                    enableSearchBtn
                    handleSearch={handleSearchButton}
                    enableResetBtn
                    handleReset={handleResetButton}
                />
            </div>
        </div>
    )
}

export default TierSetup

//Action dropdown by clicking three dot
const ActionFormatter = ({ row, deleteTier }) => {
    const [show, setShow] = useState(false)
    const handleDelete = async (id) => {
        await deleteTier(id)
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
                        href={`/rewards/tier-setup/edit-tier/${row.id}`}
                        className="text-lg text-white py-2 bg-[#3fc9c1] hover:bg-inherit/80 flex gap-2 rounded-t-xl items-center pl-4"
                    >
                        <BiEditAlt />
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="w-full text-lg py-2 flex gap-2 text-[#e94c40] hover:bg-slate-50 items-center pl-4"
                    >
                        <AiOutlineDelete />
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}
