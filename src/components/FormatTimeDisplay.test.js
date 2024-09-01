import React from 'react'
import { render } from '@testing-library/react'

import FormatTimeDisplay from './FormatTimeDisplay'

describe('FormatTimeDisplay', () => {
    it('should return an empty string if no time is provided', () => {
        const { container } = render(<FormatTimeDisplay />)
        expect(container.textContent).toBe('')
    })

    it('should correctly format the time in 12-hour format', () => {
        const { getByText } = render(<FormatTimeDisplay time="14:30" />)
        expect(getByText('02:30 PM')).toBeInTheDocument()
    })

    it('should correctly format the time in 12-hour format with AM', () => {
        const { getByText } = render(<FormatTimeDisplay time="02:30" />)
        expect(getByText('02:30 AM')).toBeInTheDocument()
    })

    it('should handle invalid time formats gracefully', () => {
        const { container } = render(<FormatTimeDisplay time="invalid" />)
        expect(container.textContent).toBe('')
    })
})
