import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddAppointment from './AddAppointment'
import useAppointmentStore from '@/store/appointmentsStore'
import useDoctorStore from '@/store/doctorStore'
import useSpecializationStore from '@/store/specializationStore'
import useSystemUsersStore from '@/store/systemUsersStore'

// Mock the stores
jest.mock('@/store/appointmentsStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock('@/store/doctorStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock('@/store/specializationStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock('@/store/systemUsersStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

// Mock next/navigation
// jest.mock('next/navigation', () => ({
//   useRouter: () => ({
//     push: jest.fn(),
//   }),
// }));
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('AddAppointment Component', () => {
    const mockCreateAppointment = jest.fn()
    beforeEach(() => {
        // Setup mock return values for the stores
        useAppointmentStore.mockReturnValue({
            createAppointment: mockCreateAppointment,
            loading: false,
            error: null,
            appointment: { data: null },
        })

        useDoctorStore.mockReturnValue({
            fetchDoctorsNameSpecialization: jest.fn(),
            doctorsNameSpecialization: [
                {
                    id: 1,
                    name: 'Dr. Smith',
                    specializations: [{ title: 'Cardiology' }],
                },
            ],
            loading: false,
            setFilters: jest.fn(),
        })

        useSpecializationStore.mockReturnValue({
            fetchSpecializationTitle: jest.fn(),
            specializationTitle: [{ id: 1, title: 'Cardiology' }],
        })

        useSystemUsersStore.mockReturnValue({
            fetchUserByEmail: jest.fn().mockResolvedValue([{ id: 1 }]),
            loading: false,
        })
    })
    it('renders the component', () => {
        render(<AddAppointment />)
        screen.debug()
        const heading = screen.getByRole('heading', {
            name: /Add Appointment/i,
        })
        expect(heading).toBeInTheDocument()
    })

    it('submits the form with valid data', async () => {
        render(<AddAppointment />)

        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText('Enter Email'), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText('Start Time of Appointment'), {
            target: { value: '10:00' },
        })
        fireEvent.change(screen.getByLabelText('End Time of Appointment'), {
            target: { value: '11:00' },
        })
        fireEvent.change(screen.getByPlaceholderText('Enter amount'), {
            target: { value: '100' },
        })

        // Submit the form
        fireEvent.click(screen.getByText('Add Appointment'))

        // Wait for the form submission to complete
        await waitFor(() => {
            expect(mockCreateAppointment).toHaveBeenCalledWith(
                expect.objectContaining({
                    amount: 324,
                    bookingType: 'Online_Consultant',
                    date: '2024-08-08',
                    doctor: 6,
                    earliestAvailDate: true,
                    endTime: '20:43:00',
                    isConfirmed: true,
                    startTime: '17:43:00',
                    status: 'Pending',
                    user: 18,
                    earliestAvailDate: true,
                    isConfirmed: true,
                    status: 'Pending',
                })
            )
        })
    })

    it('displays error messages for invalid inputs', async () => {
        render(<AddAppointment />)

        // Submit the form without filling it
        fireEvent.click(screen.getByText('Add Appointment'))

        // Check for error messages
        await waitFor(() => {
            expect(
                screen.getByText('This field is required')
            ).toBeInTheDocument()
        })
    })

    it('populates doctor select when specialization is chosen', async () => {
        render(<AddAppointment />)

        // Select a specialization
        fireEvent.click(screen.getByText('Select specialist'))
        fireEvent.click(screen.getByText('Cardiology'))

        // Check if doctor select is populated
        await waitFor(() => {
            expect(screen.getByText('Dr. Smith')).toBeInTheDocument()
        })
    })

    it('cancels form submission and redirects', () => {
        const push = jest.fn() // Create a mock push function

        // Mock useRouter and its return value
        jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
            push,
        })

        render(<AddAppointment />)

        fireEvent.click(screen.getByText('Cancel'))

        expect(push).toHaveBeenCalledWith('/appointments')
    })
})
