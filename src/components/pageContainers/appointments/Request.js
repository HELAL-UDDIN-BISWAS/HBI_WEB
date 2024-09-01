import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ThreeDots from '@/components/assets/icons/threeDots'

import CancelIcon from '@/components/assets/icons/cancelIcon'
import EditIcon from '@/components/assets/icons/editIcon'
import '@/components/assets/icons/cancel.css'
import HBI_Modal from '../members/member-component/Modal/HBI_Modal'
import { notify } from '../members/member-component/CustomToast'
import useAppointmentStore from '@/store/appointmentsStore'
const Request = ({ appointments }) => {
    // console.log(appointments)
    const [openIndex, setOpenIndex] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)
    const { updateAppointmentStatus } = useAppointmentStore((state) => ({
        updateAppointmentStatus: state.updateAppointmentStatus,
    }))
    const buttonsContainerRefs = useRef([])

    const handleClickOutside = (event) => {
        if (
            !buttonsContainerRefs.current.some(
                (ref) => ref && ref.contains(event.target)
            )
        ) {
            setOpenIndex(null)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const openModal = (id) => {
        setModalOpen(true)
        setSelectedAppointmentId(id)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleConfirm = async () => {
        await updateAppointmentStatus(selectedAppointmentId, 'Cancelled')
        setModalOpen(false)
        notify('This appointment has been cancelled successfully')
    }

    const handleButtonClick = (index) => {
        setOpenIndex(index)
    }

    return (
        <div>
            <div className="bg-white p-4 rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patience Name</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Specialty</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {appointments.length === 0 ? (
                        <TableBody className="h-[300px]">
                            <TableRow>
                                <TableCell colSpan="7">
                                    <div className="flex justify-center">
                                        <p>No Record</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {appointments.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    className={
                                        index % 2 === 0 ? 'bg-[#F7F7F9]' : ''
                                    }
                                >
                                    <TableCell>
                                        {row?.user?.profile?.name}
                                    </TableCell>
                                    <TableCell>{row?.doctor?.name}</TableCell>
                                    <TableCell>
                                        {row?.doctor?.specializations?.map(
                                            (s) => s.title
                                        )}
                                    </TableCell>
                                    <TableCell className="w-36 relative">
                                        <button
                                            onClick={() =>
                                                handleButtonClick(index)
                                            }
                                            className="z-10" 
                                        >
                                            <ThreeDots />
                                        </button>
                                        {/* only open that which one clicked */}
                                        {openIndex === index && (
                                            <div
                                                ref={(el) =>
                                                    (buttonsContainerRefs.current[
                                                        index
                                                    ] = el)
                                                }
                                                className="flex absolute z-50 top-0 right-28 flex-col text-center bg-white"
                                            >
                                                <button className="hover:text-white font-semibold hover:bg-[#3FC9C1] rounded-t-md border p-[7px]">
                                                    <div className="flex items-center p-1">
                                                        <EditIcon />
                                                        <Link
                                                            href={`/appointments/${row.id}`}
                                                        >
                                                            <span className="ml-3">
                                                                Schedule
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openModal(
                                                            row.id,
                                                            'cancel'
                                                        )
                                                    }
                                                    className="border hover-cancel-icon flex gap-3 hover:bg-[#3FC9C1] text-[#E94C40] hover:text-white font-normal  rounded-b-md p-2"
                                                >
                                                    <CancelIcon />{' '}
                                                    <span>Cancel</span>
                                                </button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
            <HBI_Modal
                isOpen={modalOpen}
                title="Cancel Appointment"
                content={`Are you sure you want to cancel this appointment?`}
                onConfirm={handleConfirm}
                onCancel={handleModalClose}
            />
        </div>
    )
}

export default Request
