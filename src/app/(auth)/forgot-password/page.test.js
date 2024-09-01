import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ForgotPassword from './page'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'

// Mock the router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

// Mock the auth store
jest.mock('@/store/authStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe('ForgotPassword', () => {
    const requestPasswordMock = jest.fn()
    const pushMock = jest.fn()

    beforeEach(() => {
        useAuthStore.mockReturnValue({
            requestPassword: requestPasswordMock,
            forgetPasswordMessage: '',
            isLoading: false,
        })
        useRouter.mockReturnValue({
            push: pushMock,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders the ForgotPassword component', () => {
        render(<ForgotPassword />)
        expect(screen.getByText('Forgot Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    })

    it('navigates back to login on arrow back click', () => {
        render(<ForgotPassword />)
        fireEvent.click(screen.getByTestId('back-arrow'))
        expect(pushMock).toHaveBeenCalledWith('/login')
    })

    it('shows error message when email is not provided', async () => {
        render(<ForgotPassword />)
        fireEvent.click(screen.getByRole('button', { name: /continue/i }))
        await waitFor(() => {
            expect(
                screen.getByText('This field is required')
            ).toBeInTheDocument()
        })
    })

    it('calls requestPassword and navigates to OTP verification on form submission', async () => {
        requestPasswordMock.mockResolvedValue({ ok: true })

        render(<ForgotPassword />)
        fireEvent.input(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' },
        })
        fireEvent.submit(screen.getByRole('button', { name: /continue/i }))

        await waitFor(() => {
            expect(requestPasswordMock).toHaveBeenCalledWith({
                email: 'test@example.com',
            })
            expect(pushMock).toHaveBeenCalledWith('/otp-verification')
        })
    })

    it('displays error message from forgetPasswordMessage', async () => {
        useAuthStore.mockReturnValue({
            requestPassword: requestPasswordMock,
            forgetPasswordMessage: 'Error message',
            isLoading: false,
        })

        render(<ForgotPassword />)
        expect(screen.getByText('Error message')).toBeInTheDocument()
    })

    it('disables the submit button when loading', () => {
        useAuthStore.mockReturnValue({
            requestPassword: requestPasswordMock,
            forgetPasswordMessage: '',
            isLoading: true,
        })

        render(<ForgotPassword />)
        const submitButton = screen.getByRole('button', { name: /continue/i })
        expect(submitButton).toBeDisabled()
    })
})
