import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SystemUsers from './index';
import useSystemUsersStore from '@/store/systemUsersStore';

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the store
jest.mock('@/store/systemUsersStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockFetchUsers = jest.fn();
const mockUpdateSystemUsersStatus = jest.fn();

describe('SystemUsers Component', () => {
  beforeEach(() => {
    useSystemUsersStore.mockImplementation(() => ({
      systemUsersData: [
        {
          id: '1',
          profile: { name: 'John Doe' },
          email: 'john@example.com',
          role: { name: 'HBI Admin' },
          isNotified: true,
          status: 'Active',
        },
      ],
      loading: false,
      error: null,
      fetchUsers: mockFetchUsers,
      updateSystemUsersStatus: mockUpdateSystemUsersStatus,
    }));
  });

  it('renders the component and fetches users', () => {
    render(<SystemUsers />);
    expect(screen.getByText('System Users')).toBeInTheDocument();
    expect(mockFetchUsers).toHaveBeenCalled();
  });

  it('renders the data table with correct columns', () => {
    render(<SystemUsers />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders user data correctly', () => {
    render(<SystemUsers />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('HBI Admin')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    render(<SystemUsers />);
    const searchInput = screen.getByPlaceholderText('Search By Email');
    fireEvent.change(searchInput, { target: { value: 'john@example.com' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalledWith({ email: 'john@example.com' });
    });
  });

  it('handles role filter', async () => {
    render(<SystemUsers />);
    
    // Open th`e` dropdown
    const roleSelect = screen.getByText('Filter By Role');
    fireEvent.click(roleSelect);
  
    // Select an option
    const option = await screen.findByText('HBI Admin');
    fireEvent.click(option);
  
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
  
    await waitFor(() => {
      console.log('mockFetchUsers calls:', mockFetchUsers.mock.calls);
      expect(mockFetchUsers).toHaveBeenCalled();
    });
  });

  it('handles reset functionality', async () => {
    render(<SystemUsers />);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalled();
    });
  });
});
