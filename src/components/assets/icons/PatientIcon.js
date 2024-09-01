import React from "react";

function PatientIcon({className}) {
	return (
		<svg
		className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 18 18">
			<path
				fill="#6E7E7D"
				d="M12.375 10.5h-6.75a3.38 3.38 0 00-3.375 3.375v1.875C2.25 16.99 3.26 18 4.5 18h6.75v-1.5H9.585L8.46 12h3.915c1.034 0 1.875.84 1.875 1.875V18h1.5v-4.125a3.38 3.38 0 00-3.375-3.375zm-4.335 6H4.5a.75.75 0 01-.75-.75v-1.875c0-1.034.84-1.875 1.875-1.875h1.29l1.125 4.5zM4.5 4.5C4.5 2.018 6.518 0 9 0a4.47 4.47 0 012.462.738L6 4.5a3 3 0 006 0H8.524l4.048-2.727c.58.758.928 1.701.928 2.727C13.5 6.982 11.482 9 9 9a4.505 4.505 0 01-4.5-4.5z"></path>
		</svg>
	);
}

export default PatientIcon;
