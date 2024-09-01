import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Request from './Request'
import useAppointmentStore from '@/store/appointmentsStore'

// Mock the next/link component
jest.mock('next/link', () => {
    return ({ children }) => {
        return children
    }
})

// Mock the useAppointmentStore
jest.mock('@/store/appointmentsStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

// Mock the notify function
jest.mock('../members/member-component/CustomToast.jsx', () => ({
    notify: jest.fn(),
}))

describe('Request Component', () => {
    const mockAppointments = [
        {
            id: '1',
            user: { profile: { name: 'John Doe' } },
            doctor: {
                name: 'Dr. Smith',
                specializations: [{ title: 'Cardiology' }],
            },
        },
        {
            id: '2',
            user: { profile: { name: 'Jane Doe' } },
            doctor: {
                name: 'Dr. Johnson',
                specializations: [{ title: 'Neurology' }],
            },
        },
    ]

    const mockUpdateAppointmentStatus = jest.fn()

    beforeEach(() => {
        useAppointmentStore.mockReturnValue({
            updateAppointmentStatus: mockUpdateAppointmentStatus,
        })
    })

    it('renders "No Record" when there are no appointments', () => {
        render(<Request appointments={[]} />)

        expect(screen.getByText('No Record')).toBeInTheDocument()
    })

    it('should render table headers correctly', () => {
        render(<Request appointments={mockAppointments} />)
        expect(screen.getByText('Patience Name')).toBeInTheDocument()
        expect(screen.getByText('Doctor')).toBeInTheDocument()
        expect(screen.getByText('Specialty')).toBeInTheDocument()
        expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('should render appointment rows correctly', () => {
        render(<Request appointments={mockAppointments} />)
        mockAppointments.forEach((appointment) => {
            expect(
                screen.getByText(appointment.user.profile.name)
            ).toBeInTheDocument()
            expect(
                screen.getByText(appointment.doctor.name)
            ).toBeInTheDocument()
            expect(
                screen.getByText(appointment.doctor.specializations[0].title)
            ).toBeInTheDocument()
        })
    })

    it('opens the action menu when the three dots are clicked', () => {
        render(<Request appointments={mockAppointments} />)

        const threeDotsBtns = screen.getAllByRole('button')
        fireEvent.click(threeDotsBtns[0])

        expect(screen.getByText('Schedule')).toBeInTheDocument()
        expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('open the cancel modal on cancel button click', () => {
        render(<Request appointments={mockAppointments} />)

        const threeDotsBtns = screen.getAllByRole('button')
        fireEvent.click(threeDotsBtns[0])

        const cancelBtn = screen.getByText('Cancel')
        fireEvent.click(cancelBtn)

        expect(screen.getByText('Cancel Appointment')).toBeInTheDocument()
        expect(
            screen.getByText(
                'Are you sure you want to cancel this appointment?'
            )
        ).toBeInTheDocument()
    })

    it('calls updateAppointmentStatus when confirming cancellation', async () => {
        render(<Request appointments={mockAppointments} />)

        const threeDotsBtns = screen.getAllByRole('button')
        fireEvent.click(threeDotsBtns[0])

        const cancelBtn = screen.getByText('Cancel')
        fireEvent.click(cancelBtn)

        const confirmBtn = screen.getByText('Confirm')
        fireEvent.click(confirmBtn)

        await waitFor(() => {
            expect(mockUpdateAppointmentStatus).toHaveBeenCalledWith(
                mockAppointments[0].id,
                'Cancelled'
            )
        })
    })
})
