import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditSystemUserForm from './EditSystemUserFrom';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the store
jest.mock('@/store/systemUsersStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock PrimaryBtn component
jest.mock('@/components/base/button/hbi_btn', () => {
  return function DummyPrimaryBtn(props) {
    return <button>{props.name}</button>;
  };
});

describe('EditSystemUserForm', () => {
  const mockFetchSingleSystemUserById = jest.fn().mockResolvedValue({});
  const mockUpdateSystemUser = jest.fn();
  const mockFetchRoleId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('@/store/systemUsersStore').default.mockReturnValue({
      systemUser: {
        attributes: {
          email: 'test@example.com',
          role: { data: { attributes: { name: 'HBI Admin' } } },
          profile: {
            data: {
              id: '1',
              attributes: {
                name: 'John Doe',
                dateOfBirth: '1990-01-01',
                gender: 'Male',
                nationality: 'US',
                passport: 'AB123456',
                phoneNo: '1234567890',
              },
            },
          },
        },
      },
      fetchSingleSystemUserById: mockFetchSingleSystemUserById,
      updateSystemUser: mockUpdateSystemUser,
      fetchRoleId: mockFetchRoleId,
      loading: false,
    });
  });

  it('renders the form with pre-filled data', async () => {
    render(<EditSystemUserForm id={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Email/i)).toHaveValue('test@example.com');
      expect(screen.getByLabelText(/Full Name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/Gender/i)).toHaveValue('Male');
      expect(screen.getByLabelText(/Role/i)).toHaveValue('HBI Admin');
      expect(screen.getByLabelText(/NRIC\/ Passport/i)).toHaveValue('AB123456');
      expect(screen.getByLabelText(/Date of Birth/i)).toHaveValue('1990-01-01');
    });
  });

  it('submits the form with updated data', async () => {
    mockFetchRoleId.mockResolvedValue('1');
    mockUpdateSystemUser.mockResolvedValue({ id: '1' });

    render(<EditSystemUserForm id={{ id: '1' }} />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'newemail@example.com' } });
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
      fireEvent.submit(screen.getByText('Edit System User').closest('form'));
    });

    await waitFor(() => {
      expect(mockUpdateSystemUser).toHaveBeenCalledWith(
        '1',
        '1',
        expect.objectContaining({
          name: 'Jane Doe',
        }),
        expect.objectContaining({
          email: 'newemail@example.com',
        })
      );
    });
  });

  it('displays an error message when update fails', async () => {
    mockFetchRoleId.mockResolvedValue('1');
    mockUpdateSystemUser.mockRejectedValue(new Error('Update failed'));

    render(<EditSystemUserForm id={{ id: '1' }} />);

    await waitFor(() => {
      fireEvent.submit(screen.getByText('Edit System User').closest('form'));
    });

    await waitFor(() => {
      expect(require('react-toastify').toast.error).toHaveBeenCalledWith('Failed to update user.');
    });
  });
});