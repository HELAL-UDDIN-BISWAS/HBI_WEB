import { Dropdown } from 'react-bootstrap';
import { HiDotsVertical } from 'react-icons/hi';
import { FaBan, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from './index.module.css';
import { FaRegCircleCheck } from 'react-icons/fa6';
const MemberRow = ({
	member,
	index,
	dropdownOpen,
	toggleDropdown,
	dropdownRefs,
	openModal,
}) => {
	const router = useRouter();
	console.log(member.status);
	return (
		<tr>
			<td className="text-[#20C4F4]">{member.username}</td>
			<td className="text-[#667085]">{member.country}</td>
			<td className="text-[#667085]">{member.passport}</td>
			<td className="text-[#667085]">{member.phoneNo}</td>
			<td className="text-[#667085]">{member.dateOfBirth}</td>
			<td className="text-[#667085]">{member.email}</td>
			<td
				className={
					member.status === 'Active'
						? styles['status-active']
						: member.status === 'Inactive'
							? styles['status-inactive']
							: styles['status-pending']
				}>
				<span style={{ width: 6, height: 6 }}>● </span>
				{member.status}
			</td>
			<td className="text-[#667085]">{member.registerDate}</td>
			<td
				className="text-[#667085]"
				ref={(el) => (dropdownRefs.current[index] = el)}>
				<div className="relative">
					<button
						className={`${member.status === 'Suspend' ? 'cursor-not-allowed' : ''}`}
						disabled={member.status === 'Suspend'}
						onClick={() => toggleDropdown(index)}>
						<HiDotsVertical />
					</button>
					{dropdownOpen === index && (
						<Dropdown.Menu
							style={{ width: '150px' }}
							show
							className="absolute right-0 mt-2 p-0">
							{member.status === 'Active' ? (
								<>
									<Dropdown.Item
										className={`${styles.dropdownItem} ${styles.editItem}`}
										onClick={() => router.push(`/members/${member.id}`)}>
										<FaEdit style={{ marginRight: '5px', fontSize: '15px' }} />
										Edit
									</Dropdown.Item>
									<Dropdown.Item
										className={`${styles.dropdownItem} ${styles.suspendItem}`}
										onClick={() => openModal(member.id, 'suspend')}>
										<FaBan style={{ marginRight: '5px' }} />
										Suspend
									</Dropdown.Item>
								</>
							) : member.status === 'Inactive' ? (
								<>
									<Dropdown.Item
										className={`${styles.dropdownItem} ${styles.editItem}`}
										onClick={() => router.push(`/members/${member.id}`)}>
										<FaEdit style={{ marginRight: '5px', fontSize: '15px' }} />
										Edit
									</Dropdown.Item>
									<Dropdown.Item
										className={`${styles.dropdownItem} ${styles.activateItem}`}
										onClick={() => openModal(member.id, 'activate')}>
										<FaRegCircleCheck style={{ marginRight: '5px' }} />
										Activate
									</Dropdown.Item>
								</>
							) : (
								<>
									<Dropdown.Item
										className={`${styles.dropdownItem} ${styles.editItem}`}
										onClick={() => router.push(`/members/${member.id}`)}>
										<FaEdit style={{ marginRight: '5px', fontSize: '15px' }} />
										Edit
									</Dropdown.Item>
								</>
							)}
						</Dropdown.Menu>
					)}
				</div>
			</td>
		</tr>
	);
};

export default MemberRow;
