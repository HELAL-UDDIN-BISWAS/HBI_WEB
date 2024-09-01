'use client';

import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';


import React from 'react';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs';


import AddClinicForm from './AddClinicForm';

const AddClinic = () => {
	return (
		<div>
			<div className="h-[85vh] overflow-hidden p-4 overflow-y-visible">
				<HBI_BreadCrumb
					pageName="Add Clinic"
					items={[
						{ label: 'Clinics', href: 'system-setup/clinic' },
						{ label: 'Add Clinic' },
					]}></HBI_BreadCrumb>

				<Tabs
					defaultValue="General"
					className="w-full mt-3 ">
					<TabsList>
						<TabsTrigger value="General">General</TabsTrigger>
					</TabsList>
					<TabsContent value="General">
						{' '}
						<AddClinicForm></AddClinicForm>{' '}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default AddClinic;
