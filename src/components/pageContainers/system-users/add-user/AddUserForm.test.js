import { render, screen, fireEvent, waitFor } from '@testing-library/react'
// import AddSystemUserForm from './AddSystemUserForm'
import { useRouter } from 'next/navigation'
import useSystemUsersStore from '@/store/systemUsersStore'
import { toast } from 'react-toastify'
import { AddSystemUserForm } from './add-user-form'
import { act } from 'react-dom/test-utils'

// Mock the router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

// Mock the system users store
jest.mock('@/store/systemUsersStore', () => ({
    __esModule: true,
    default: jest.fn(),
    default: jest.fn().mockReturnValue({
      createSystemUser: jest.fn(),
      fetchRoleId: jest.fn().mockResolvedValue(null),
      fetchUsers: jest.fn(),
      loading: false,
      error: false,
    }),
  }));
// Mock the toast
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}))
describe('AddSystemUserForm', () => {
    const createSystemUserMock = jest.fn()
    const fetchUsersMock = jest.fn()
    const fetchRoleIdMock = jest.fn()
    const pushMock = jest.fn()

    beforeEach(() => {
        useSystemUsersStore.mockReturnValue({
            createSystemUser: createSystemUserMock,
            fetchRoleId: fetchRoleIdMock,
            fetchUsers: fetchUsersMock,
            loading: false,
            error: null,
        })
        toast.error = jest.fn()
        useRouter.mockReturnValue({
            push: pushMock,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders the AddSystemUserForm component', () => {
        render(<AddSystemUserForm />)
        expect(screen.getByText('Email*')).toBeInTheDocument()
        expect(screen.getByText('Full Name*')).toBeInTheDocument()
    })

    it('navigates back to system users on cancel', () => {
        render(<AddSystemUserForm />)
        fireEvent.click(screen.getByText('Cancel'))
        expect(pushMock).toHaveBeenCalledWith('/system-users')
    })

    it('shows error message when required fields are not provided', async () => {
        render(<AddSystemUserForm />)
        fireEvent.submit(
            screen.getByRole('button', { name: /Add System User/i })
        )

        // Wait for validation to complete
        await waitFor(() => {
            const emailError = screen.getByText('email is a required field')
            const fullNameError = screen.getByText(
                'fullName is a required field'
            )
            expect(emailError).toBeInTheDocument()
            expect(fullNameError).toBeInTheDocument()
        })
    })

    it('cancels form submission and redirects', () => {
        render(<AddSystemUserForm />)

        fireEvent.click(screen.getByText(/Cancel/i))

        expect(pushMock).toHaveBeenCalledWith('/system-users')
    })
})
