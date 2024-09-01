'use client';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/typo/tabs/index';
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import 'react-phone-input-2/lib/style.css';
import { AddSystemUserForm } from './add-user-form';

const AddSystemUser = () => {
	return (
		<div className="h-[85vh] overflow-hidden p-4 overflow-y-visible">
			<HBI_BreadCrumb
				pageName="SystemUsers"
				items={[
					{ label: 'SystemUsers', href: 'system-users' },
					{ label: 'AddSystemUser' },
				]}>
				{' '}
			</HBI_BreadCrumb>

			<Tabs
				defaultValue="general"
				className="w-full mt-3 ">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<AddSystemUserForm></AddSystemUserForm>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AddSystemUser;
