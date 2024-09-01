import { render, screen } from '@testing-library/react'
import History from './History'

const mockAppointments = [
    {
        id: 1,
        paymentHistories: [{ id: 'PH1', status: 'Paid' }],
        date: '2023-08-01',
        startTime: '10:00',
        endTime: '11:00',
        doctor: {
            name: 'Dr. Smith',
            specializations: [{ title: 'Cardiology' }],
        },
        status: 'Completed',
    },
    {
        id: 2,
        paymentHistories: [{ id: 'PH2', status: 'Unpaid' }],
        date: '2023-08-02',
        startTime: '12:00',
        endTime: '13:00',
        doctor: {
            name: 'Dr. Johnson',
            specializations: [{ title: 'Dermatology' }],
        },
        status: 'Cancelled',
    },
]

describe('History Component', () => {
    it('should render table headers correctly', () => {
        render(<History appointments={mockAppointments} />)
        expect(screen.getByText('Order No.')).toBeInTheDocument()
        expect(screen.getByText('Payment')).toBeInTheDocument()
        expect(screen.getByText('Date of Appointment')).toBeInTheDocument()
        expect(screen.getByText('Time of Appointment')).toBeInTheDocument()
        expect(screen.getByText('Doctor')).toBeInTheDocument()
        expect(screen.getByText('Speciality')).toBeInTheDocument()
        expect(screen.getByText('Status')).toBeInTheDocument()
    })

    const matchText = (content, text) => content.textContent.includes(text)

    it('should render appointment rows correctly', () => {
        render(<History appointments={mockAppointments} />)
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
                screen.getByText(appointment.doctor.name)
            ).toBeInTheDocument()
            appointment.doctor.specializations.forEach((specialization) => {
                expect(
                    screen.getByText(specialization.title)
                ).toBeInTheDocument()
            })
            expect(
                screen.getByText(`● ${appointment.status}`)
            ).toBeInTheDocument()
        })
    })

    it('should handle empty appointments array', () => {
        render(<History appointments={[]} />)
        expect(screen.getByText('No Record')).toBeInTheDocument()
    })

    it('should apply correct class for status', () => {
        render(<History appointments={mockAppointments} />)
        mockAppointments.forEach((appointment) => {
            const statusElement = screen.getByText(`● ${appointment.status}`)
            if (appointment.status === 'Cancelled') {
                expect(statusElement).toHaveClass('text-[#E94C40]')
            } else if (appointment.status === 'Completed') {
                expect(statusElement).toHaveClass('text-[#5FA452]')
            }
        })
    })

    it('should alternate row background colors', () => {
        render(<History appointments={mockAppointments} />)
        const rows = screen.getAllByRole('row')
        expect(rows[1]).toHaveClass('bg-[#F7F7F9]')
        expect(rows[2]).not.toHaveClass('bg-[#F7F7F9]')
    })
})
