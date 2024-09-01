
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useDoctorStore from '@/store/doctorStore';
import { useRouter } from 'next/navigation';
import Doctors from '../index';


jest.mock('@/store/doctorStore');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockFetchAllDoctor = jest.fn();
const mockDoctors = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Pending',
    speciality: 'Cardiology',
    clinic: { name: 'Clinic One' },
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    status: 'Accepted',
    speciality: 'Neurology',
    clinic: { name: 'Clinic Two' },
  },
];

useDoctorStore.mockReturnValue({
  doctors: mockDoctors,
  fetchAllDoctor: mockFetchAllDoctor,
});

describe('Doctors Component', () => {
  beforeEach(() => {
    mockFetchAllDoctor.mockClear();
  });

  test('renders Doctors component', () => {
    render(<Doctors />);

    expect(screen.getByText('Doctors')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter By Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter By Status')).toBeInTheDocument();
  });

  test('fetches and displays doctors data', async () => {
    render(<Doctors />);

    await waitFor(() => {
      expect(mockFetchAllDoctor).toHaveBeenCalled();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('handles search input', () => {
    render(<Doctors />);

    const searchInput = screen.getByPlaceholderText('Filter By Email');
    fireEvent.change(searchInput, { target: { value: 'john' } });

    expect(searchInput.value).toBe('john');
  });

  test('handles reset button', async () => {
    render(<Doctors />);

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockFetchAllDoctor).toHaveBeenCalledWith({
        searchText: '',
        filterStatus: '',
      });
    });
  });

  test('renders dropdown menu actions', () => {
    render(<Doctors />);

    const actionButton = screen.getAllByText('Edit')[0];
    expect(actionButton).toBeInTheDocument();
  });
});
