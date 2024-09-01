
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { act } from 'react-dom/test-utils';

// import useClinicAdminStore from '@/store/clinicAdminStore';
// import axios from 'axios';
// import Link from 'next/link';
// import { toast } from 'react-toastify';
// import Action from './model';
// import userEvent from '@testing-library/user-event';

// // Mock the dependencies
// jest.mock('./../../../../store/clinicAdminStore');
// jest.mock('axios');

// jest.mock('@apollo/client', () => {
//   const actualApolloClient = jest.requireActual('@apollo/client');
//   return {
//     ...actualApolloClient,
//     ApolloClient: jest.fn(() => ({
//       query: jest.fn(),
//       mutate: jest.fn(),
//     })),
//     InMemoryCache: jest.fn(),
//     createHttpLink: jest.fn().mockReturnValue({
//       concat: jest.fn().mockReturnValue({}),
//     }),
//     setContext: jest.fn(() => ({
//       concat: jest.fn().mockReturnValue({}),
//     })),
//     useQuery: jest.fn(),
//     useMutation: jest.fn(),
//     gql: jest.fn((strings) => strings[0]),
//   };
// });

// jest.mock('./../../../../lib/apolloClient', () => ({
//   __esModule: true,
//   default: {
//     query: jest.fn(),
//     mutate: jest.fn(),
//   },
// }));

// jest.mock('@radix-ui/react-dropdown-menu', () => ({
//   ...jest.requireActual('@radix-ui/react-dropdown-menu'),
//   DropdownMenuContent: ({ children }) => <div data-testid="action-dropdown-menu">{children}</div>,
// }));

// jest.mock('@/components/ui/dropdown-menu', () => ({
//   DropdownMenu: ({ children }) => <div>{children}</div>,
//   DropdownMenuTrigger: ({ children, ...props }) => <button {...props}>{children}</button>,
//   DropdownMenuContent: ({ children, ...props }) => <div {...props}>{children}</div>,
//   DropdownMenuItem: ({ children, ...props }) => <div {...props}>{children}</div>,
// }));

// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// //Mock Next.js Link component
// jest.mock('next/link', () => {
//   return ({ children, href }) => <a href={href}>{children}</a>;
// });

// describe('Action Component', () => {
//   const mockRow = {
//     id: '1',
//     attributes: {
//       status: 'Active',
//       username: 'testuser',
//       email: 'test@example.com',
//     },
//   };

//   const mockUpdateUserStatus = jest.fn();
//   const mockUpdateUserPassword = jest.fn();

//   beforeEach(() => {
//     useClinicAdminStore.mockReturnValue({
//       updateUserStatus: mockUpdateUserStatus,
//       updateUserPassword: mockUpdateUserPassword,
//       clinicAdmin: {},
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });



//   it('renders the action dropdown', async () => {
//     render(<Action row={mockRow} />);

//     // Wait for the dropdown trigger to be available
//     await waitFor(() => {
//       expect(screen.getByTestId('action-dropdown-trigger')).toBeInTheDocument();
//     });

//     // Click the dropdown trigger
//     const user = userEvent.setup();
//     await user.click(screen.getByTestId('action-dropdown-trigger'));

//     // Wait for the dropdown menu to appear
//     await waitFor(() => {
//       expect(screen.getByTestId('action-dropdown-menu')).toBeInTheDocument();
//     });
//   });


//   it('opens the dropdown menu and handles suspend action', async () => {
//     const { debug } = render(<Action row={mockRow} />);
//     const user = userEvent.setup();

//     await user.click(screen.getByTestId('action-dropdown-trigger'));

//     await waitFor(() => {
//       expect(screen.getByTestId('action-dropdown-menu')).toBeInTheDocument();
//     }, { timeout: 7000 });


//     // Wait for the 'Suspend' option to appear
//     const suspendOption = await screen.findByText('Suspend', {}, { timeout: 10000 });
//     expect(suspendOption).toBeInTheDocument();
//     console.log('Suspend option found');

//     debug(); // Log state after dropdown opens

//     // Click the 'Suspend' item
//     fireEvent.click(suspendOption);
//     console.log('Suspend option clicked');

//     // Wait for and click the confirmation dialog
//     const confirmButton = await screen.findByRole('button', { name: 'Confirm' }, { timeout: 5000 });
//     fireEvent.click(confirmButton);
//     console.log('Confirm button clicked');

//     // Check if updateUserStatus was called
//     await waitFor(() => {
//       expect(mockUpdateUserStatus).toHaveBeenCalledWith('1', 'Inactive');
//     }, { timeout: 5000 });
//     console.log('updateUserStatus called');
//   }, 30000);


//   it('handles activate action', async () => {
//     const inactiveRow = { ...mockRow, attributes: { status: 'Inactive' } };
//     render(<Action row={inactiveRow} />);
//     const trigger = screen.getByTestId('action-dropdown-trigger');
//     fireEvent.click(trigger);
//     const activateButton = screen.getByTestId('action-activate');
//     fireEvent.click(activateButton);

//     const confirmButton = await screen.findByRole('button', { name: 'Confirm' });
//     fireEvent.click(confirmButton);

//     await waitFor(() => {
//       expect(mockUpdateUserStatus).toHaveBeenCalledWith('1', 'Active');
//     });
//   });

//   // it('handles reset password action', async () => {
//   //   const user = userEvent.setup();
//   //   render(<Action row={mockRow} />);

//   //   await user.click(screen.getByTestId('action-dropdown-trigger'));
//   //   await screen.findByTestId('action-dropdown-menu');

//   //   await user.click(screen.getByText('Reset Password'));
//   //   const resetPasswordInput = await screen.findByPlaceholderText('Reset Password');

//   //   // Enter a new password
//   //   await user.type(resetPasswordInput, 'newpassword');

//   //   const confirmButton = await screen.findByRole('button', { name: 'Confirm' });
//   //   await user.click(confirmButton);

//   //   // Check if updateUserPassword was called
//   //   await waitFor(() => {
//   //     expect(mockUpdateUserPassword).toHaveBeenCalledWith('1', 'newpassword');
//   //     expect(mockUpdateUserPassword).toHaveBeenCalledTimes(1);
//   //   });

//   //   // Mock the axios post call
//   //   axios.post.mockResolvedValueOnce({}); // Ensure it returns a resolved promise

//   //   expect.extend({
//   //     toBeValidApiUrl(received) {
//   //       const pass = received.includes('/api/auth/password-send-email');
//   //       if (pass) {
//   //         return {
//   //           message: () => `expected ${received} to be a valid API URL`,
//   //           pass: true,
//   //         };
//   //       } else {
//   //         return {
//   //           message: () => `expected ${received} to be a valid API URL`,
//   //           pass: false,
//   //         };
//   //       }
//   //     },
//   //   });
//   //   // Check if the email was sent and toast was shown
//   //   await waitFor(() => {
//   //     expect(axios.post).toHaveBeenCalledWith(
//   //       expect.stringContaining("http://example.com/api/auth/password-send-email"),
//   //       expect.objectContaining({
//   //         fromUser: 'testuser',
//   //         useremail: 'test@example.com',
//   //         Password: 'newpassword',
//   //       })
//   //     );
//   //     expect(toast.success).toHaveBeenCalledWith(
//   //       expect.stringContaining('Send Email: test@example.com'),
//   //       expect.anything()
//   //     );
//   //   });
//   // }, 30000);

//   test('handles reset password action', async () => {
//     const { getByTestId, getByText, getByPlaceholderText } = render(<Action row={mockRow} />);
    
//     fireEvent.click(getByTestId('action-dropdown-trigger'));
//     fireEvent.click(getByTestId('action-reset-password'));
    
//     expect(getByTestId('reset-password')).toBeInTheDocument();
    
//     const passwordInput = getByPlaceholderText('Reset Password');
//     fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
    
//     mockUpdateUserPassword.mockResolvedValue({
//       id: '1',
//       attributes: {
//         username: 'testuser',
//         email: 'test@example.com',
//       },
//     });
  
//     fireEvent.submit(getByTestId('reset-password-form'));
    
//     await waitFor(() => {
//       expect(mockUpdateUserPassword).toHaveBeenCalledWith('1', 'newpassword123');
//       expect(axios.post).toHaveBeenCalledWith(
//         expect.stringContaining('/api/auth/password-send-email'),
//         expect.objectContaining({
//           fromUser: 'testuser',
//           useremail: 'test@example.com',
//           Password: 'newpassword123',
//         })
//       );
//     });
//   });

//   it('renders different options for Inactive status', async () => {
//     const inactiveRow = { ...mockRow, attributes: { ...mockRow.attributes, status: 'Inactive' } };
//     render(<Action row={inactiveRow} />);
//     fireEvent.click(screen.getByTestId('action-dropdown-trigger'));
//     expect(await screen.queryByTestId('action-dropdown-item-activate'));
//   });

//   it('handles error during status change', async () => {
//     mockUpdateUserStatus.mockRejectedValue(new Error('Update failed'));

//     render(<Action row={mockRow} />);
//     const trigger = screen.getByTestId('action-dropdown-trigger');
//     fireEvent.click(trigger);
//     const suspendButton = screen.getByTestId('action-suspend');
//     fireEvent.click(suspendButton);

//     const confirmButton = await screen.findByRole('button', { name: 'Confirm' });
//     fireEvent.click(confirmButton);

//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith('Failed to change status: Update failed');
//     });
//   })
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Action from './model';
import useClinicAdminStore from '@/store/clinicAdminStore';
import axios from 'axios';
import { toast } from 'react-toastify';

// Existing mocks remain the same
jest.mock('@/store/clinicAdminStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }) => <a href={href}>{children}</a>;
});

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

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('next/link', () => {
  return ({ children, href }) => <a href={href}>{children}</a>;
});

describe('Action Component', () => {
  const mockRow = {
    id: '1',
    attributes: {
      status: 'Active',
      username: 'testuser',
      email: 'test@example.com',
    },
  };

  const mockUpdateUserStatus = jest.fn();
  const mockUpdateUserPassword = jest.fn();
  const mockUseClinicAdminStore = {
    updateUserStatus: mockUpdateUserStatus,
    updateUserPassword: mockUpdateUserPassword,
    clinicAdmin: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    require('@/store/clinicAdminStore').default.mockReturnValue(mockUseClinicAdminStore);
  });

  it('renders the action dropdown', async () => {
    render(<Action row={mockRow} />);
    const dropdownTrigger = screen.getByTestId('action-dropdown-trigger');
    expect(dropdownTrigger).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(dropdownTrigger);

    expect(screen.getByTestId('action-dropdown-menu')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Suspend')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('handles suspend action', async () => {
    render(<Action row={mockRow} />);
    
    const user = userEvent.setup();
    await user.click(screen.getByTestId('action-dropdown-trigger'));
    await user.click(screen.getByText('Suspend'));

    expect(screen.getByText('Suspend Account')).toBeInTheDocument();
    
    await user.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(mockUpdateUserStatus).toHaveBeenCalledWith('1', 'Inactive');
    });
  });

  it('handles activate action for inactive user', async () => {
    const inactiveRow = { ...mockRow, attributes: { ...mockRow.attributes, status: 'Inactive' } };
    render(<Action row={inactiveRow} />);
    
    const user = userEvent.setup();
    await user.click(screen.getByTestId('action-dropdown-trigger'));
    await user.click(screen.getByText('Activate'));

    expect(screen.getByText('Activate Account')).toBeInTheDocument();
    
    await user.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(mockUpdateUserStatus).toHaveBeenCalledWith('1', 'Active');
    });
  });

  it('handles reset password action', async () => {
    mockUpdateUserPassword.mockResolvedValue({
      id: '1',
      attributes: { username: 'testuser', email: 'test@example.com' }
    });
    axios.post.mockResolvedValue({});

    render(<Action row={mockRow} />);
    
    const user = userEvent.setup();
    await user.click(screen.getByTestId('action-dropdown-trigger'));
    await user.click(screen.getByText('Reset Password'));

    expect(screen.getByTestId('reset-password')).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Reset Password'), 'newpassword123');
    await user.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(mockUpdateUserPassword).toHaveBeenCalledWith('1', 'newpassword123');
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/auth/password-send-email'),
        expect.objectContaining({
          fromUser: 'testuser',
          useremail: 'test@example.com',
          Password: 'newpassword123',
        })
      );
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Send Email: test@example.com'), expect.anything());
    });
  });

  it('displays error toast on network failure during status update', async () => {
    mockUpdateUserStatus.mockRejectedValue(new Error('Network error'));
    render(<Action row={mockRow} />);
    
    const user = userEvent.setup();
    await user.click(screen.getByTestId('action-dropdown-trigger'));
    await user.click(screen.getByText('Suspend'));
    await user.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to change status: Network error');
    });
  });

  it('cancels suspend action when Cancel is clicked', async () => {
    render(<Action row={mockRow} />);
    
    const user = userEvent.setup();
    await user.click(screen.getByTestId('action-dropdown-trigger'));
    await user.click(screen.getByText('Suspend'));

    expect(screen.getByText('Suspend Account')).toBeInTheDocument();
    
    await user.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Suspend Account')).not.toBeInTheDocument();
    expect(mockUpdateUserStatus).not.toHaveBeenCalled();
  });

  it('renders different options for Inactive status', async () => {
    const inactiveRow = { ...mockRow, attributes: { ...mockRow.attributes, status: 'Inactive' } };
    render(<Action row={inactiveRow} />);
    
    const user = userEvent.setup();
    await user.click(screen.getByTestId('action-dropdown-trigger'));

    expect(screen.getByText('Activate')).toBeInTheDocument();
    expect(screen.queryByText('Suspend')).not.toBeInTheDocument();
  });

  it('renders Edit link with correct href', async () => {
    render(<Action row={mockRow} />);
    
    const user = userEvent.setup();
    await user.click(screen.getByTestId('action-dropdown-trigger'));

    const editLink = screen.getByText('Edit').closest('a');
    expect(editLink).toHaveAttribute('href', '/clinic-admin/1');
  });
});