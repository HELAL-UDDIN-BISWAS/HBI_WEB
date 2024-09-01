'use client';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.css';
import HBI_Modal from './Modal/HBI_Modal';
import useMemberStore from '@/store/memberStore';

import MemberRow from './MemberRow';

import { MdOutlineContentPasteOff } from 'react-icons/md';
import dayjs from 'dayjs';
import MemberPagination from './MemberPagination';
import { notify } from './CustomToast';
import Loading from '@/components/ui/loading';
import useAuthStore from '@/store/authStore';

const MemberTable = () => {
	const [sortConfig, setSortConfig] = useState(null);
	const [dropdownOpen, setDropdownOpen] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [statusType, setStatusType] = useState(null);
	const [selectedMemberId, setSelectedMemberId] = useState(null);

	const dropdownRefs = useRef([]);

	const { user } = useAuthStore((state) => ({user: state.user}));

	const {
		members,
		pagination,
		fetchMembers,
		setPage,
		updateMemberStatus,
		loading,
		error,
	} = useMemberStore((state) => ({
		members: state.members,
		fetchMembers: state.fetchMembers,
		loading: state.loading,
		error: state.error,
		updateMemberStatus: state.updateMemberStatus,
		pagination: state.pagination,
		setPage: state.setPage,
	}));
	const { pageSize, page: current, total } = pagination;

	useEffect(() => {
		try {
			fetchMembers();
		} catch (err) {
			console.error('Failed to fetch members:', err);
		}
	}, [pagination.page, pagination.pageSize, user]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
			) {
				setDropdownOpen(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleDropdown = (index) => {
		setDropdownOpen((prevIndex) => (prevIndex === index ? null : index));
	};

	const formattedMembersData = members.map((item) => {
		const { attributes } = item;
		const profile = attributes.profile.data
			? attributes.profile.data.attributes
			: {};

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
				dayjs(profile.registeredDate).format('MMM D, YYYY h:mm:ss A') || 'N/A',
		};
	});

	const sortedMembers = [...formattedMembersData].sort((a, b) => {
		if (sortConfig !== null) {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? -1 : 1;
			}
			if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === 'ascending' ? 1 : -1;
			}
		}
		return 0;
	});

	const requestSort = (key) => {
		let direction = 'ascending';
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const getSortIconColor = (direction) => {
		return sortConfig && sortConfig.direction === direction ? '#000' : '#ccc';
	};

	const openModal = (id, type) => {
		setSelectedMemberId(id);
		setStatusType(type);
		setModalOpen(true);
		setDropdownOpen(null);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleConfirm = async () => {
		try {
			switch (statusType) {
				case 'suspend':
					console.log(`Suspending member: ${selectedMemberId}`);
					await updateMemberStatus(selectedMemberId, 'Inactive');
					setModalOpen(false);
					notify(
						'Account successfully suspended!',
						'The account has been successfully suspended. The user will no longer have access until reactivated.'
					);
					break;
				case 'activate':
					console.log(`Activating member: ${selectedMemberId}`);
					await updateMemberStatus(selectedMemberId, 'Active');
					notify(
						'Account successfully activated!',
						'The account has been successfully activated. The user now has access.'
					);
					break;
				default:
					break;
			}
			if (!loading && !error) {
				setModalOpen(false);
			}
		} catch (err) {
			console.error('Failed to update member status:', err);
			setModalOpen(false);
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className={`${styles['table-container']} mt-4 h-[75vh] flex flex-col`}>
			<div
				className={`${styles['flex-grow']} overflow-hidden overflow-y-visible`}>
				<table className={`${styles['custom-table']}`}>
					<thead>
						<tr>
							<th>Full Name</th>
							<th>Country</th>
							<th>NRIC/ Passport</th>
							<th>Mobile Number</th>
							<th>Date Of Birth</th>
							<th>Email</th>
							<th>Status</th>
							<th>
								<button
									onClick={() => requestSort('registerDate')}
									className={styles['sort-button']}>
									Register Date
									<div className={styles['sort-icons']}>
										<svg
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={styles['sort-icon']}
											style={{ color: getSortIconColor('ascending') }}>
											<path
												d="M7 14L12 9L17 14H7Z"
												fill="currentColor"
											/>
										</svg>
										<svg
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={styles['sort-icon']}
											style={{ color: getSortIconColor('descending') }}>
											<path
												d="M7 10L12 15L17 10H7Z"
												fill="currentColor"
											/>
										</svg>
									</div>
								</button>
							</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody style={{ backgroundColor: 'white' }}>
						{sortedMembers.length ? (
							sortedMembers.map((member, index) => (
								<MemberRow
									key={index}
									member={member}
									index={index}
									dropdownOpen={dropdownOpen}
									toggleDropdown={toggleDropdown}
									dropdownRefs={dropdownRefs}
									openModal={openModal}
								/>
							))
						) : (
							<tr>
								<td
									colSpan="9"
									style={{
										height: '65vh',
										textAlign: 'center',
										verticalAlign: 'middle',
									}}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											paddingTop: '30px',
											paddingBottom: '30px',
											color: 'grey',
										}}>
										<MdOutlineContentPasteOff
											style={{ fontSize: '120px', color: 'red' }}
										/>
										<span>No Results Found</span>
										<span>
											There is no data related to your account or your filters
										</span>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{sortedMembers.length > 0 && (
				<>
					<div className={`${styles.entriesInfo} pt-2 pl-2`}>
						Showing {Math.min(current * pageSize, total)} of {total} entries
					</div>
					<MemberPagination
						current={current}
						pageSize={pageSize}
						total={total}
						setPage={setPage}
					/>
				</>
			)}

			<HBI_Modal
				isOpen={modalOpen}
				title={
					statusType === 'edit'
						? 'Edit Member'
						: statusType === 'suspend'
							? 'Suspend Account'
							: 'Activate Account'
				}
				content={`Are you sure you want to ${statusType} this member?`}
				onConfirm={handleConfirm}
				onCancel={handleModalClose}
			/>
		</div>
	);
};

export default MemberTable;
