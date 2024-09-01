import { render, screen } from '@testing-library/react'
import Upcoming from './Upcoming'

describe('Upcoming Component', () => {
    const mockAppointments = [
        {
            id: '1',
            paymentHistories: [{ id: '123', status: 'Paid' }],
            date: '2024-08-01',
            startTime: '09:00',
            endTime: '10:00',
            user: { username: 'John Doe' },
            doctor: {
                name: 'Dr. Smith',
                specializations: [{ title: 'Cardiology' }],
            },
        },
        {
            id: '2',
            paymentHistories: [{ id: '124', status: 'Pending' }],
            date: '2024-08-02',
            startTime: '11:00',
            endTime: '12:00',
            user: { username: 'Jane Doe' },
            doctor: {
                name: 'Dr. Jones',
                specializations: [{ title: 'Neurology' }],
            },
        },
    ]

    it('should render table headers correctly', () => {
        render(<Upcoming appointments={mockAppointments} />)
        expect(screen.getByText('Order No.')).toBeInTheDocument()
        expect(screen.getByText('Payment')).toBeInTheDocument()
        expect(screen.getByText('Date of Appointment')).toBeInTheDocument()
        expect(screen.getByText('Time of Appointment')).toBeInTheDocument()
        expect(screen.getByText('Patient Name')).toBeInTheDocument()
        expect(screen.getByText('Doctor')).toBeInTheDocument()
        expect(screen.getByText('Speciality')).toBeInTheDocument()
    })

    it('should render appointment rows correctly', () => {
        render(<Upcoming appointments={mockAppointments} />)

        mockAppointments.forEach((appointment) => {
            expect(
                screen.getByText(appointment.paymentHistories[0].id)
            ).toBeInTheDocument()
            expect(
                screen.getByText(appointment.paymentHistories[0].status)
            ).toBeInTheDocument()
            expect(screen.getByText(appointment.date)).toBeInTheDocument()
            const timeRangeMatcher = (content, element) => {
                const hasText = (text) => element.textContent === text
                return hasText(
                    `${appointment.startTime} - ${appointment.endTime}`
                )
            }
            expect(
                screen.getByText(appointment.user.username)
            ).toBeInTheDocument()
            expect(
                screen.getByText(appointment.doctor.name)
            ).toBeInTheDocument()
            expect(
                screen.getByText(appointment.doctor.specializations[0].title)
            ).toBeInTheDocument()
        })
    })

    it('should handle empty mockAppointments array', () => {
        render(<Upcoming appointments={[]} />)
        expect(screen.getByText('No Record')).toBeInTheDocument()
    })

    it('should alternate row background colors', () => {
        render(<Upcoming appointments={mockAppointments} />)
        const rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveClass('bg-[#F7F7F9]')
        expect(rows[2]).not.toHaveClass('bg-[#F7F7F9]')
    })
})
