'use client';
import useClinicStore from '@/store/clinicStore';

import React, { useEffect} from 'react';
import DataTable from '../../base/table/DataTable';

import ActionButton from './ActionButton';

const ClinicTable = () => {
	


	

	const { clinics, fetchClinics , loading, error } = useClinicStore();

	useEffect(() => {
		fetchClinics();
	}, [fetchClinics]);



	if (loading) {
		return <div>Loading Data...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const columns = [
		{
			dataField: 'attributes.name',
			text: 'Clinic Name',
			formatter: (cell, row) => (
				<span style={{ color: '#20C4F4', fontWeight: '700', fontSize: '14px' }}>
					{cell}
				</span>
			),
		},
		{
			dataField: 'attributes.country',
			text: 'Clinic Country',
			formatter: (cell, row) => (
				<span
					style={{
						color: 'rgba(102, 112, 133, 1)',
						fontWeight: '700',
						fontSize: '14px',
					}}>
					{cell}
				</span>
			),
		},

		{
			dataField: 'action',
			text: 'Action',
			formatter: (cellContent, row) => <ActionButton row={row}></ActionButton>,
		},
	];

	return (
		<div>
			<DataTable
				style={{
					
					
					overflow: 'hidden',
				}}
				columns={columns}
				data={clinics}
				
				></DataTable>
		</div>
	);
};

export default ClinicTable;
