import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';

import EditIcon from '../../../components/assets/icons/editIcon';




const CustomToggle = React.forwardRef(({ onClick }, ref) => (
	<a
		href=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		className="text-dark">
		<HiDotsVertical className="hover:cursor-pointer" />
	</a>
));

CustomToggle.displayName = 'CustomToggle';

const ActionButton = ({ row }) => {
	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle} />

				<Dropdown.Menu className="p-0 border-0 shadow">
					<div className="absolute w-[150px] -left-15 bg-white shadow-md -top-3 rounded-md">
						<Link
							className="d-flex gap-2 py-2 rounded-t-lg px-4"
							href={`/system-setup/clinic/${row.id}`}>
							<EditIcon></EditIcon>
							<span>Edit</span>
						</Link>
					</div>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default ActionButton;
