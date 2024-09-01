// AddSystemUser.test.jsx

import { render, screen } from '@testing-library/react';
import AddSystemUser from './index';

// Mock the imports used in the AddSystemUser component
jest.mock('@/components/ui/typo/tabs/index', () => ({
	Tabs: ({ children }) => <div role="tablist">{children}</div>,
	TabsContent: ({ value, children }) => <div data-value={value}>{children}</div>,
	TabsList: ({ children }) => <div>{children}</div>,
	TabsTrigger: ({ value, children }) => (
		<button role="tab" data-value={value}>
			{children}
		</button>
	),
}));

jest.mock('@/components/base/breadcrumb/HBI_BreadCrumb', () => () => (
	<nav data-testid="breadcrumb">Breadcrumb Mock</nav>
));

jest.mock('./add-user-form', () => ({
	AddSystemUserForm: () => <form data-testid="add-system-user-form">Form Mock</form>,
}));

describe('AddSystemUser', () => {
	it('renders the breadcrumb', () => {
		render(<AddSystemUser />);
		expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
	});

	it('renders the Tabs component with the General tab', () => {
		render(<AddSystemUser />);
		expect(screen.getByRole('tablist')).toBeInTheDocument();
		expect(screen.getByRole('tab', { name: /General/i })).toBeInTheDocument();
	});

	it('renders the AddSystemUserForm component within TabsContent', () => {
		render(<AddSystemUser />);
		expect(screen.getByTestId('add-system-user-form')).toBeInTheDocument();
	});
});
