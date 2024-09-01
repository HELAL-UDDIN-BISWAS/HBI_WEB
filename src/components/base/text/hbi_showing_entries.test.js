import React from 'react'
import { render } from '@testing-library/react'
import ShowingEntires from './hbi_showing_entries'

describe('ShowingEntries Component', () => {
    it('should render correct text when current page entries are less than total', () => {
        const paginationData = {
            page: 1,
            pageSize: 10,
            total: 50,
        }
        const { getByText } = render(
            <ShowingEntires paginationData={paginationData} />
        )
        expect(getByText('Showing 10 out of 50 Entires')).toBeInTheDocument()
    })

    it('should render correct text when current page entries reach total', () => {
        const paginationData = {
            page: 5,
            pageSize: 10,
            total: 50,
        }
        const { getByText } = render(
            <ShowingEntires paginationData={paginationData} />
        )
        expect(getByText('Showing 50 out of 50 Entires')).toBeInTheDocument()
    })

    it('should handle cases where total is less than pageSize', () => {
        const paginationData = {
            page: 1,
            pageSize: 10,
            total: 5,
        }
        const { getByText } = render(
            <ShowingEntires paginationData={paginationData} />
        )
        expect(getByText('Showing 5 out of 5 Entires')).toBeInTheDocument()
    })

    it('should handle cases where page, pageSize, or total is missing', () => {
        const paginationData = {}
        const { getByText } = render(
            <ShowingEntires paginationData={paginationData} />
        )
        expect(getByText('Showing 0 out of 0 Entires')).toBeInTheDocument()
    })

    it('should handle cases where pageSize is 0', () => {
        const paginationData = {
            page: 1,
            pageSize: 0,
            total: 50,
        }
        const { getByText } = render(
            <ShowingEntires paginationData={paginationData} />
        )
        expect(getByText('Showing 0 out of 50 Entires')).toBeInTheDocument()
    })
})
