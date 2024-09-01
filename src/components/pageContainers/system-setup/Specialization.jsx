'use client';

import { FaPlus } from 'react-icons/fa6';
import { useEffect } from 'react';
import Link from 'next/link';
import SpecialiZationDataTable from './SpecialiZationDataTable';
import PrimaryBtn from '@/components/base/button/hbi_btn';
import HBIErrorText from '@/components/base/text/hbi_error_text';
import Loading from '@/components/ui/loading';
import HBIBoldText from '@/components/base/text/hbi_bold_text';
import useSpecializationStore from '@/store/specializationStore';

const Specialization = () => {
	const { specializations, fetchSpecializations, loading, error } =
		useSpecializationStore();

	useEffect(() => {
		fetchSpecializations();
	}, [fetchSpecializations]);

	if (error) return <HBIErrorText text={error.message} />;
	if (loading) return <Loading />;

	return (
		<div className="min-h-screen bg-[#F7F7F9] px-4">
			<div className="btn-container pt-6 flex justify-between items-center">
				<HBIBoldText
					text="Specialization"
					fontFamily="Inter"
					fontSize={26}
					color="#2F4858"
					fontWeight={600}
				/>

				<Link href="/system-setup/specialisation/add-speciality">
					<PrimaryBtn
						enableIcon={true}
						icon={<FaPlus className="text-white" />}
						name="Add Specialty"
						width={150}
						height={40}
						bgColor="#3FC9C1"
						color="white"
						radius={4}
						direction="row"
						wrap={false}
						borderColor="#3FC9C1"
						isIconleft={true}
						fontSize={14}
						letterSpacing={0}
						paddingTop={0}
						paddingRight={0}
						paddingBottom={0}
						paddingLeft={0}
						justifyContent="center"
						alignItems="center"
						opacity={1}
					/>
				</Link>
			</div>

			<div className="specialization-table mt-4">
				<SpecialiZationDataTable specializations={specializations || []} />
			</div>
		</div>
	);
};

export default Specialization;
