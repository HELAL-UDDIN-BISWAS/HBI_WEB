import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AddClinicAdmin from './add-clinic-admin';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Apollo Client
jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

// Mock clinicAdminStore
jest.mock('./../../../../store/clinicAdminStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock react-select-country-list
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
    value={value}
    onChange={e => onChange({ value: e.target.value })}
  >
    {options.map(({ value, label }) => (
      <option key={value} value={value}>{label}</option>
    ))}
  </select>
));

describe('AddClinicAdmin', () => {
  let mockCreateClinicAdmin;
  let mockPush;

  beforeEach(() => {
    mockCreateClinicAdmin = jest.fn().mockImplementation(() => {
      return Promise.resolve({ id: '123' });
    });
    const useClinicAdminStore = jest.requireMock('./../../../../store/clinicAdminStore').default;
    useClinicAdminStore.mockReturnValue({ createClinicAdmin: mockCreateClinicAdmin });

    mockPush = jest.fn();
    const useRouter = jest.requireMock('next/navigation').useRouter;
    useRouter.mockReturnValue({ push: mockPush });
  });

  it('renders the form correctly', async() => {
    await act(async () => {
      render(<AddClinicAdmin />);
    });
    screen.debug(); // For debugging the rendered HTML

    // Ensure you are targeting unique text elements
    const elements = screen.getAllByText('Add Clinic Admin');
    expect(elements[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Email*')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name*')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender*')).toBeInTheDocument();

    const mobileLabel = screen.getByText('Mobile Number*');
    expect(mobileLabel).toBeInTheDocument();
    expect(mobileLabel.closest('div').querySelector('input')).toBeInTheDocument();

    expect(screen.getByLabelText('Clinic*')).toBeInTheDocument();
  });


  it('submits the form with valid data', async () => {
    await act(async () => {
      render(<AddClinicAdmin />);
    });
    await act(async () => {
      await userEvent.type(screen.getByLabelText('Email*'), 'test@example.com');
      await userEvent.type(screen.getByLabelText('Full Name*'), 'John Doe');
      await userEvent.selectOptions(screen.getByLabelText('Gender*'), 'Male');
      const mobileLabel = screen.getByText('Mobile Number*');
      const mobileInput = mobileLabel.closest('div').querySelector('input');
      await userEvent.type(mobileInput, '1234567890');
      await userEvent.selectOptions(screen.getByLabelText('Clinic*'), 'SOG Health Group');
      await userEvent.type(screen.getByLabelText('passport*'), 'A12345678');

      // Select Nationality
      const nationalitySelect = screen.getByTestId('nationality-select');
      await userEvent.selectOptions(nationalitySelect, 'US');

      await userEvent.type(screen.getByPlaceholderText('Enter dateOfBirth'), '1990-01-01');
      const submitButton = screen.getByRole('button', { name: /Add Clinic Admin/i });
      await userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockCreateClinicAdmin).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/clinic-admin');
    }, { timeout: 3000 });

    // Verify the mock was called with the correct data
// Verify the mock was called with the correct data
expect(mockCreateClinicAdmin).toHaveBeenCalledWith(
  // First argument: profileInput
  expect.objectContaining({
    name: 'John Doe',
    phoneNo: '11234567890',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    passport: 'A12345678',
    nationality: 'US',
  }),
  // Second argument: clinicInput
  expect.objectContaining({
    name: 'SOG Health Group',
  }),
  // Third argument: userInput
  expect.objectContaining({
    email: 'test@example.com',
    username: 'John Doe',
    password: 'defaultpassword',
    role: '6',
  })
);
  });

  it('shows validation errors for empty fields', async () => {
    render(<AddClinicAdmin />);

    const submitButton = screen.getByRole('button', { name: /Add Clinic Admin/i });
    await act(async () => {
      userEvent.click(submitButton);
     });

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Full Name is required')).toBeInTheDocument();
      expect(screen.getByText('Gender is required')).toBeInTheDocument();
    });
  });

 it('resets form and navigates on cancel', async () => {
  render(<AddClinicAdmin />);

  await userEvent.type(screen.getByLabelText('Email*'), 'test@example.com');
  await userEvent.click(screen.getByText('Cancel'));

  expect(mockPush).toHaveBeenCalledWith('/clinic-admin');
});
});

