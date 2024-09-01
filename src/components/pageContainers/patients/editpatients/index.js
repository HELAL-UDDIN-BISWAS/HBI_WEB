'use client';
import React from 'react';

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/typo/tabs/index';
import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import EditPatientsForm from './EditPatientForm';
import Appointment from './AppointMentHistory';


const EditPatients = ({ id }) => {
	return (
		<div className="p-4">
			<HBI_BreadCrumb
				pageName="Patients"
				items={[
					{ label: 'Patients', href: 'patients' },
					{ label: 'EditPatients' },
				]}
			/>

			{/* ============used reusable tabs */}
			<div className="h-[65vh] overflow-hidden overflow-y-visible">
				<Tabs
					defaultValue="request"
					className="w-full mt-3 ">
					<TabsList>
						<TabsTrigger value="request">General</TabsTrigger>
						<TabsTrigger value="upcoming">Appointment</TabsTrigger>
					</TabsList>
					<TabsContent value="request">
						<EditPatientsForm id={id} />
					</TabsContent>
					<TabsContent value="upcoming">
						<Appointment id={id} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default EditPatients;
