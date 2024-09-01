import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import '@testing-library/jest-dom'
import Login from '@/components/pageContainers/auth/Login'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('Login Component', () => {
    const mockPush = jest.fn()
    const mockUseRouter = useRouter
    mockUseRouter.mockReturnValue({ push: mockPush })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the login form', () => {
        render(<Login />)

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
        expect(screen.getByText(/login to your account/i)).toBeInTheDocument()
        expect(screen.getByText(/remember me/i)).toBeInTheDocument()
        expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument()
    })

    it('shows error messages when fields are empty and form is submitted', async () => {
        render(<Login />)

        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument()
            expect(
                screen.getByText(/password is required/i)
            ).toBeInTheDocument()
        })
    })

    it('navigates to /members on successful form submission', async () => {
        render(<Login />)

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'password' },
        })

        fireEvent.click(screen.getByRole('button', { name: /login/i }))

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/members')
        })
    })

    it('toggles password visibility', () => {
        render(<Login />)

        const passwordInput = screen.getByPlaceholderText(/password/i)

        // Password should be hidden by default
        expect(passwordInput).toHaveAttribute('type', 'password')

        // Click the eye icon to show the password
        fireEvent.click(screen.getByLabelText('eye'))

        // Password should now be visible
        expect(passwordInput).toHaveAttribute('type', 'text')

        // Click the eye icon to hide the password again
        fireEvent.click(screen.getByLabelText('eye'))

        // Password should be hidden again
        expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('navigates to forgot password page on link click', () => {
        render(<Login />)

        fireEvent.click(screen.getByText(/forgot password\?/i))

        expect(mockPush).toHaveBeenCalledWith('/auth/forgotPassword')
    })

    it('toggles remember me checkbox', () => {
        render(<Login />)

        const checkbox = screen.getByRole('checkbox', { name: /remember me/i })

        // Checkbox should be unchecked by default
        expect(checkbox).not.toBeChecked()

        // Click the checkbox to check it
        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()

        // Click the checkbox again to uncheck it
        fireEvent.click(checkbox)
        expect(checkbox).not.toBeChecked()
    })
})
