'use client';

import HBI_BreadCrumb from '@/components/base/breadcrumb/HBI_BreadCrumb';
import PrimaryBtn from '@/components/base/button/hbi_btn';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import * as XLSX from 'xlsx';
import MemberTable from './member-component/MemberTable';
import { useRouter } from 'next/navigation';
import useMemberStore from '@/store/memberStore';
import dayjs from 'dayjs';
import MemberFilters from './member-component/MemberFilters';

const Members = () => {
	const tableRef = useRef();
	const router = useRouter();
	const { getAllMembers, getFilteredMembers, filters } = useMemberStore();
	

	const bread_arg = { pageName: 'Members' };

	const exportToExcel = async () => {
		try {
			let members;
			if (Object.keys(filters).length === 0) {
				members = await getAllMembers();
			} else {
				members = await getFilteredMembers();
			}

			if (members.length === 0) {
				toast.error('No members to export', { autoClose: 3000 });
				return;
			}

			const worksheet = XLSX.utils.json_to_sheet(
				members.map((item) => {
					const attributes = item.attributes;
					const profile = attributes.profile?.data?.attributes || {};

					return {
						id: item.id,
						username: `${attributes.username.charAt(0).toUpperCase() + attributes.username.slice(1)}`,
						dateOfBirth: dayjs(profile.dateOfBirth).format('MMMM D, YYYY'),
						email: attributes.email,
						passport: profile.passport || null,
						country: profile.country || null,
						phoneNo: profile.phoneNo || null,
						status: attributes.status,
						registerDate:
							dayjs(profile.registeredDate).format('MMM D, YYYY h:mm:ss A') ||
							'N/A',
					};
				})
			);

			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
			XLSX.writeFile(workbook, 'members_data.xlsx');
		} catch (error) {
			toast.error(`Error exporting members: ${error.message}`, {
				autoClose: 3000,
			});
		}
	};

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<HBI_BreadCrumb {...bread_arg} />
				<div className="space-x-2 flex">
					<PrimaryBtn
						onClick={() => router.push('/members/add-member')}
						name="+ Add Member"
						color="white"
						width={133}
					/>
					<PrimaryBtn
						onClick={exportToExcel}
						name="+ Export Excel"
						color="white"
						width={133}
						bgColor="#4cb6d7"
					/>
				</div>
			</div>
			<MemberFilters />
			<div
				className="w-full  mx-auto"
				ref={tableRef}>
				<MemberTable />
			</div>
		</>
	);
};

export default Members;
