// EditSystemUser.test.jsx

import { render, screen } from '@testing-library/react';
import EditSystemUser from './index';

// Mock the imports used in the EditSystemUser component
jest.mock('@/components/ui/typo/tabs/index', () => ({
    Tabs: ({ children }) => <div>{children}</div>,
    TabsContent: ({ value, children }) => <div data-value={value}>{children}</div>,
    TabsList: ({ children }) => <div>{children}</div>,
    TabsTrigger: ({ value, children }) => <button>{children}</button>,
}));

jest.mock('@/components/base/breadcrumb/HBI_BreadCrumb', () => () => (
    <nav data-testid="breadcrumb">Breadcrumb Mock</nav>
));

jest.mock('./EditSystemUserFrom', () => () => (
    <form data-testid="edit-system-user-form">Form Mock</form>
));

describe('EditSystemUser', () => {
    it('renders the breadcrumb', () => {
        render(<EditSystemUser />);
        expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    });

    it('renders the Tabs component with the General tab', () => {
        render(<EditSystemUser />);
        expect(screen.getByRole('button', { name: /General/i })).toBeInTheDocument();
    });

    it('renders the EditSystemUserFrom component within TabsContent', () => {
        render(<EditSystemUser />);
        expect(screen.getByTestId('edit-system-user-form')).toBeInTheDocument();
    });
});
