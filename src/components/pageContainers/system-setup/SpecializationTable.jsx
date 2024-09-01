// Specialization page Action button

import { BsThreeDotsVertical } from "react-icons/bs";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Action = ({ row }) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			const modal = document.getElementById('action-modal');
			if (modal && !modal.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative flex justify-center items-center">
			<button
				onClick={() => setOpen(!open)}
			>
				<BsThreeDotsVertical />
			</button>

			{open && (
				<div id="action-modal" className="bg-white h-8 w-32 px-4 shadow-md absolute right-[6rem] rounded-md text-[#222] hover:bg-[#7791c4]">
					<Link
						className="flex gap-2 justify-start items-center rounded-lg py-1"
						href={"/system-setup/specialisation/edit-speciality/" + row?.id}
					>
						<svg className='hover:text-blue-900' xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
							<path d="M10.4562 16.0346H16.5" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
							<path fill-rule="evenodd" clip-rule="evenodd" d="M9.65001 2.16233C10.2964 1.38982 11.4583 1.27655 12.2469 1.90978C12.2905 1.94413 13.6912 3.03232 13.6912 3.03232C14.5575 3.55599 14.8266 4.66925 14.2912 5.51882C14.2627 5.56432 6.34329 15.4704 6.34329 15.4704C6.07981 15.7991 5.67986 15.9931 5.25242 15.9978L2.21961 16.0358L1.53628 13.1436C1.44055 12.7369 1.53628 12.3098 1.79975 11.9811L9.65001 2.16233Z" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M8.18408 4L12.7276 7.48927" stroke="#222222" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
						</svg>

						<p>Edit</p>
					</Link>
				</div>
			)}
		</div>
	);
};