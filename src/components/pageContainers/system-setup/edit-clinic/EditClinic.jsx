'use client';

import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/typo/tabs/index';

import React from 'react';
import ClinicForm from '../ClinicForm';

const EditClinic = ({ id }) => {
	return (
		<div>
			<div className="h-[85vh] overflow-hidden p-4 overflow-y-visible">
				<HBI_BreadCrumb
					pageName="Edit Clinic"
					items={[
						{ label: 'Clinics', href: 'system-setup/clinic' },
						{ label: 'Edit Clinic' },
					]}></HBI_BreadCrumb>

				<Tabs
					defaultValue="General"
					className="w-full mt-3 ">
					<TabsList>
						<TabsTrigger value="General">General</TabsTrigger>
					</TabsList>
					<TabsContent value="General">
						{' '}
						<ClinicForm id={id}></ClinicForm>{' '}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default EditClinic;
