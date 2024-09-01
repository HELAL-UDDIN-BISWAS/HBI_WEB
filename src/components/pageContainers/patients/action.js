import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';
import { BiEditAlt } from 'react-icons/bi';

const Action = ({ row }) => {
	let menuItems = [
		{
			key: 'edit',
			icon: <BiEditAlt />,
			text: 'Edit',
			url: `/patients/${row.id}`,
			bgColor: '#fff',
			textColor: '#000',
		},
	];

	const handleMenuItemClick = (url) => {
		window.location.href = url;
	};

	return (
		<Dropdown className="flex justify-end">
			<Dropdown.Toggle
				className="after:hidden text-[#674554]"
				variant="link"
				id="dropdown-basic">
				<HiDotsVertical className="text-xl" />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{menuItems.map((item) => (
					<Dropdown.Item
						key={item.key}
						
						style={{
							backgroundColor: item.bgColor,
							color: item.textColor,
							display: 'flex',
							alignItems: 'center',
						}}>
						<Link
							className="flex"
							href={item.url}>
							{item.icon}
							<span className="ml-1">{item.text}</span>
						</Link>
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default Action;
