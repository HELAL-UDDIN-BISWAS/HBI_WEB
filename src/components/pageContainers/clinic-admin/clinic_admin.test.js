import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useClinicAdminStore from '@/store/clinicAdminStore';
import ClinicAdmin from '.';

// Mock the next/link component
jest.mock('next/link', () => {
    return ({ children }) => children;
});

// Mock the useClinicAdminStore hook
jest.mock('./../../../store/clinicAdminStore', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock the DataTable component
jest.mock('../../../components/base/table/DataTable', () => {
    return jest.fn(({ handleSearch, handleReset, data, columns, searchTerm, setSearchTerm, selectColumn, setSelectColumn }) => (
        <div data-testid="data-table">
            <input
                type="text"
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-input"
            />
            <select
                value={selectColumn || ''}
                onChange={(e) => setSelectColumn(e.target.value)}
                data-testid="status-select"
            >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
            </select>

            <button onClick={handleSearch} data-testid="search-btn">Search</button>
            <button onClick={handleReset} data-testid="reset-btn">Reset</button>
            <table>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.attributes.profile.data.attributes.name}</td>
                            <td>{row.attributes.email}</td>
                            <td>{row.attributes.clinic.data.attributes.name}</td>
                            <td data-testid={`status-${row.attributes.status}`}>{row.attributes.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ));
});


describe('ClinicAdmin Component', () => {
    const mockFetchClinicAdmin = jest.fn();

    const mockClinicAdmins = [
        {
            attributes: {
                profile: {
                    data: {
                        attributes: {
                            name: 'MD Helal Uddin BISWAS'
                        }
                    }
                },
                email: 'mdhelal6775@gmail.com',
                clinic: {
                    data: {
                        attributes: {
                            name: 'GI Endoscopy and Liver Centre'
                        }
                    }
                },
                status: 'Active'
            }
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        useClinicAdminStore.mockReturnValue({
            clinicAdmins: mockClinicAdmins,
            fetchClinicAdmin: mockFetchClinicAdmin,
            loading: false,
            searchTerm: '',
            selectColumn: '',
            error: null,
        });
    });

    test('renders ClinicAdmin component', () => {
        render(<ClinicAdmin />);
        expect(screen.getByText('Clinic Admin')).toBeInTheDocument();
        expect(screen.getByText('+ Add Clinic Admin')).toBeInTheDocument();
    });

    test('fetches clinic admin data on mount', () => {
        render(<ClinicAdmin />);
        expect(mockFetchClinicAdmin).toHaveBeenCalledTimes(1);
    });

    test('handles search button click', async () => {
        render(<ClinicAdmin />);
        const searchButton = screen.getByTestId('search-btn');
        fireEvent.click(searchButton);
        await waitFor(() => {
            expect(mockFetchClinicAdmin).toHaveBeenCalledWith({ email: '', status: null });
        });
        
    });

    test('handles reset button click', async () => {
        render(<ClinicAdmin />);
        const resetButton = screen.getByTestId('reset-btn');
        const initialCallCount = mockFetchClinicAdmin.mock.calls.length;
        fireEvent.click(resetButton);
        await waitFor(() => {
            expect(mockFetchClinicAdmin).toHaveBeenCalledTimes(initialCallCount + 1);
        });
    });

    test('renders clinic admin data in the table', () => {
        render(<ClinicAdmin />);
        expect(screen.getByText('MD Helal Uddin BISWAS')).toBeInTheDocument();
        expect(screen.getByText('mdhelal6775@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('GI Endoscopy and Liver Centre')).toBeInTheDocument();
        expect(screen.getAllByText('Active')[0]).toBeInTheDocument();
    });

    test('renders loading state', () => {
        useClinicAdminStore.mockReturnValue({
          ...useClinicAdminStore(),
          loading: true,
        });
        render(<ClinicAdmin />);
        expect(screen.getByTestId('loading')).toBeInTheDocument();
      });
      
      test('renders empty state', () => {
        useClinicAdminStore.mockReturnValue({
          ...useClinicAdminStore(),
          clinicAdmins: [],
        });
        render(<ClinicAdmin />);
        expect(screen.getByText('No clinic admins found')).toBeInTheDocument();
      });
      
      test('renders different status colors', () => {
        const statuses = ['Active', 'Pending', 'Suspend', 'Inactive', 'Unknown'];
        statuses.forEach(status => {
          useClinicAdminStore.mockReturnValue({
            ...useClinicAdminStore(),
            clinicAdmins: [{
              attributes: {
                ...mockClinicAdmins[0].attributes,
                status: status
              }
            }],
          });
          render(<ClinicAdmin />);
          const statusElement = screen.getByTestId(`status-${status}`);
          expect(statusElement).toBeInTheDocument();
          expect(statusElement).toHaveTextContent(status);
        });
      });
      
      test('handles search with email and status', async () => {
        render(<ClinicAdmin />);
        fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByTestId('status-select'), { target: { value: 'Active' } });
        fireEvent.click(screen.getByTestId('search-btn'));
        await waitFor(() => {
          expect(mockFetchClinicAdmin).toHaveBeenCalledWith({ email: 'test@example.com', status: 'Active' });
        });
      });
      

    test('handles error state', async () => {
        const mockError = new Error('Failed to fetch');
        useClinicAdminStore.mockReturnValue({
          clinicAdmins: [],
          fetchClinicAdmin: jest.fn().mockRejectedValue(mockError),
          loading: false,
          error: mockError
        });
      
        render(<ClinicAdmin />);
      
        // Add a small delay
        await new Promise(resolve => setTimeout(resolve, 0));
      
        expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
      });
});