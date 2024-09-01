import React from 'react'
import { render, screen } from '@testing-library/react'
import SideBar from './SideBar' // Replace './SideBar' with the path to your SideBar component

jest.mock('next/navigation', () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe('SideBar component', () => {
    it('should render the logo', () => {
        render(<SideBar />)
        const logo = screen.getByRole('img', { name: /logo/i })
        expect(logo).toBeInTheDocument()
    })

    it('should render navigation links', () => {
        const navLinks = [
            { name: 'Members', href: '/members' },
            { name: 'Patients', href: '/patients' },
        ]
        render(<SideBar navLinks={navLinks} />)

        navLinks.forEach((link) => {
            const linkElement = screen.getByText(link.name)
            expect(linkElement).toBeInTheDocument()
        })
    })

    it('should render active link with different styles', () => {
        const navLinks = [
            { name: 'Members', href: '/members' },
            { name: 'Patients', href: '/patients' },
        ]
        render(<SideBar navLinks={navLinks} pathname="/members" />)

        const activeLink = screen.getByText('Members')
        expect(activeLink).toHaveClass('text-[#3FC9C1] font-medium')
    })

    it('should toggle rewards menu on click', () => {
        render(<SideBar />)
        const rewardsButton = screen.getByText('Rewards')
        expect(screen.queryByText(/Reward System/i)).not.toBeInTheDocument()

        rewardsButton.click()
        expect(screen.getByText(/Reward System/i)).toBeInTheDocument()
    })

    it('should render reward sublinks when open', () => {
        const rewardLinks = [
            { name: 'Reward System', href: '/rewards/reward-system' },
            { name: 'Promotion Setup', href: '/rewards/promotion-setup' },
        ]
        render(
            <SideBar navLinks={[]} rewardLinks={rewardLinks} isRewardsOpen />
        )

        rewardLinks.forEach((link) => {
            const linkElement = screen.getByText(link.name)
            expect(linkElement).toBeInTheDocument()
        })
    })
})