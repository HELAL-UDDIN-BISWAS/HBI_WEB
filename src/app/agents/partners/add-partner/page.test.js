import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import AddPartners from '@/components/pageContainers/agents/partners/add-partner/AddPartners'

// Mock the Apollo Client to avoid network requests during testing
jest.mock('@apollo/client', () => {
    const originalModule = jest.requireActual('@apollo/client')
    return {
        ...originalModule,
        ApolloClient: jest.fn(() => ({
            query: jest.fn(),
            mutate: jest.fn(),
        })),
        createHttpLink: jest.fn(),
        setContext: jest.fn(),
    }
})

// Mock the environment variable used in the Apollo Client setup
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'

describe('AddPartners component', () => {
    it('renders correctly', () => {
        const { container } = render(<AddPartners />)
        expect(container).toMatchSnapshot()
    })

    it('renders breadcrumb', () => {
        const { getByText } = render(<AddPartners />)
        expect(getByText('Add Partners')).toBeInTheDocument()
    })

    it('renders tabs', () => {
        const { getAllByRole } = render(<AddPartners />)
        const tabs = getAllByRole('tab')
        expect(tabs.length).toBe(2)
    })

    it('renders form inputs', () => {
        const { getAllByPlaceholderText } = render(<AddPartners />)
        const inputs = getAllByPlaceholderText('Enter value')
        expect(inputs.length).toBe(5)
    })

    it('renders phone input', () => {
        const { getByPlaceholderText } = render(<AddPartners />)
        const phoneInput = getByPlaceholderText('Enter phone number')
        expect(phoneInput).toBeInTheDocument()
    })

    it('renders select input', () => {
        const { getByText } = render(<AddPartners />)
        const selectInput = getByText('Select value')
        expect(selectInput).toBeInTheDocument()
    })

    it('renders primary button', () => {
        const { getByText } = render(<AddPartners />)
        const button = getByText('Submit')
        expect(button).toBeInTheDocument()
    })

    it('renders error text', () => {
        const { getByText } = render(<AddPartners />)
        const errorText = getByText('Error message')
        expect(errorText).toBeInTheDocument()
    })

    it('submits form', async () => {
        const { getByText } = render(<AddPartners />)
        const button = getByText('Submit')
        fireEvent.click(button)
        await waitFor(() =>
            expect(getByText('Form submitted')).toBeInTheDocument()
        )
    })
})
