'use client';

import Link from 'next/link';

import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import ClinicTable from './ClinicTable';
import PrimaryBtn from '@/components/base/button/hbi_btn';

const Clinic = () => {
	return (
		<div>
			<div className="sticky min-h-screen bg-[#F7F7F9] px-4">
				<div className="btn-container pt-6 flex justify-between items-center">
					<h2 className="text-[#2F4858] text-2xl font-semibold ">Clinics</h2>

					<Link
						href="/system-setup/add-clinic"
						passHref>
						<PrimaryBtn
							color="white"
							name={'Add Clinics'}
							enableIcon={true}
							icon={() => <FaPlus color="white" />}
							width={124}
							height={40}
							bgColor="#3FC9C1"
							radius={4}
							direction="row"
							wrap={false}
							isIconleft={true}
							fontSize={14} />
					</Link>
				</div>

				<div className=" mt-4">
					<ClinicTable />
				</div>
			</div>
		</div>
	);
};

export default Clinic;
