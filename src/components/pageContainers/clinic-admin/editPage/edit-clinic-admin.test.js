import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import useClinicAdminStore from '@/store/clinicAdminStore';
import { useRouter } from 'next/navigation';
import EditClinicAdmin from './edit-clinic-admin';
import userEvent from '@testing-library/user-event';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('./../../../../store/clinicAdminStore');

jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    ApolloClient: jest.fn(() => ({
      query: jest.fn(),
      mutate: jest.fn(),
    })),
    InMemoryCache: jest.fn(),
    createHttpLink: jest.fn().mockReturnValue({
      concat: jest.fn().mockReturnValue({}),
    }),
    setContext: jest.fn(() => ({
      concat: jest.fn().mockReturnValue({}),
    })),
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    gql: jest.fn((strings) => strings[0]),
  };
});

jest.mock('./../../../../lib/apolloClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
    mutate: jest.fn(),
  },
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render }) => render({ field: { value: '', onChange: jest.fn() } }),
}));

jest.mock('react-select-country-list', () => ({
  __esModule: true,
  default: () => ({
    getData: () => [
      { value: 'US', label: 'United States' },
      { value: 'GB', label: 'United Kingdom' },
    ],
  }),
}));

jest.mock('react-select', () => ({ options, value, onChange }) => (

  <select
    data-testid="nationality-select"
    value={value || ''}
    onChange={(e) => onChange({ value: e.target.value, label: e.target.options[e.target.selectedIndex].text })}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
));

jest.mock('react-phone-input-2', () => ({ value, onChange }) => (
  <input
    data-testid="mock-phone-input"
    value={'1234567890'}
    onChange={e => onChange(e.target.value)}
  />
));

describe('EditClinicAdmin', () => {
  const mockClinicAdmin = {
    attributes: {
      email: 'test@example.com',
      clinic: {
        data: {
          id: '1',
          attributes: {
            name: 'Test Clinic',
          },
        },
      },
      profile: {
        data: {
          id: '1',
          attributes: {
            name: 'John Doe',
            gender: 'Male',
            phoneNo: '1234567890',
            nationality: 'US',
            passport: 'AB123456',
            dateOfBirth: '1990-01-01',
          },
        },
      },
    },
  };
  const mockFetchClinicAdminById = jest.fn(mockClinicAdmin);
  const mockUpdateClinicAdmin = jest.fn().mockImplementation(() => {
    return Promise.resolve({ id: '1' });
  });
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    useClinicAdminStore.mockReturnValue({
      fetchClinicAdminById: mockFetchClinicAdminById,
      updateClinicAdmin: mockUpdateClinicAdmin,
      clinicAdmin: mockClinicAdmin,
      loading: false,
    });

    useRouter.mockReturnValue({
      push: mockPush,
    });

    mockFetchClinicAdminById.mockResolvedValue();
  });

  it('renders EditClinicAdmin component', async () => {
    render(<EditClinicAdmin id="1" />);
    
    await waitFor(() => {
      const elements = screen.getAllByText('Edit Clinic Admin');
      expect(elements[0]).toBeInTheDocument();
      expect(screen.getByLabelText('Email*')).toBeInTheDocument();
      expect(screen.getByLabelText('Full Name*')).toBeInTheDocument();
    });
  });

  it('handles form cancellation', async () => {
    render(<EditClinicAdmin id="1" />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Cancel'));
      expect(mockPush).toHaveBeenCalledWith('/clinic-admin');
    });
  });

  it('displays validation errors for required fields', async () => {
    render(<EditClinicAdmin id="1" />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Email*'), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText('Full Name*'), { target: { value: '' } });
    });

    const submitButton = screen.getByRole('button', { name: /Edit Clinic Admin/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    });
  });

  it('updates the full name, email, and clinic input fields', async () => {
    const user = userEvent.setup();
    
    render(<EditClinicAdmin id="1" />);
  
    await waitFor(async () => {
      // Full Name field
      const fullNameInput = screen.getByLabelText('Full Name*');
      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Jane Doe');
      expect(fullNameInput).toHaveValue('Jane Doe');
    
      // Email field
      const emailInput = screen.getByLabelText('Email*');
      await user.clear(emailInput);
      await user.type(emailInput, 'newemail@example.com');
      expect(emailInput).toHaveValue('newemail@example.com');
    
      // Clinic field
      const clinicSelect = screen.getByLabelText('Clinic*');
      await user.selectOptions(clinicSelect, 'SOG Health Group');
      expect(clinicSelect).toHaveValue('SOG Health Group');
    });
  });

  it('submits form with updated data', async () => {
    render(<EditClinicAdmin id="1" />);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Email*')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Email*'), { target: { value: 'newemail@example.com' } });
    fireEvent.change(screen.getByLabelText('Full Name*'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText('Gender*'), { target: { value: 'Female' } });
    fireEvent.change(screen.getByTestId('mock-phone-input'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText('Clinic*'), { target: { value: 'SOG Health Group' } });
    fireEvent.change(screen.getByLabelText('passport*'), { target: { value: 'CD789012' } });
    fireEvent.change(screen.getByTestId('nationality-select'), { target: { value: 'GB' } });
    fireEvent.change(screen.getByPlaceholderText('Enter dateOfBirth'), { target: { value: '1995-05-05' } });

    const submitButton = screen.getByRole('button', { name: /Edit Clinic Admin/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateClinicAdmin).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/clinic-admin');
    }, { timeout: 3000 });
  });
});