import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Action from './action';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('Action Component', () => {
  const mockRow = {
    id: '1',
    attributes: {
      isNotified: false,
      status: 'Inactive',
    },
  };

  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renders the dropdown toggle', async () => {
    await act(async () => {
      render(<Action row={mockRow} />);
    });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows correct menu items for Inactive and not notified user', async () => {
    await act(async () => {
      render(<Action row={mockRow} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Activate')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Active Notify')).toBeInTheDocument();
  });

  it('shows correct menu items for Active and notified user', async () => {
    const activeNotifiedRow = {
      ...mockRow,
      attributes: { isNotified: true, status: 'Active' },
    };

    await act(async () => {
      render(<Action row={activeNotifiedRow} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Suspend')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Close Notify')).toBeInTheDocument();
  });

  it('calls router.push with correct URL when menu item is clicked', async () => {
    await act(async () => {
      render(<Action row={mockRow} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Edit'));
    });

    expect(pushMock).toHaveBeenCalledWith('/system-users/1');
  });
});