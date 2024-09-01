import React from "react";

function AppointmentIcon({className}) {
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
				d="M12.333 7.693a4.672 4.672 0 00-4.666 4.666C7.667 14.918 9.76 17 12.333 17A4.672 4.672 0 0017 12.333c0-2.558-2.094-4.64-4.667-4.64zm0 7.974C10.495 15.667 9 14.183 9 12.359a3.337 3.337 0 013.333-3.333c1.838 0 3.334 1.484 3.334 3.307a3.337 3.337 0 01-3.334 3.334zm1.138-3.138a.666.666 0 11-.942.942l-.667-.666a.666.666 0 01-.195-.472V11A.666.666 0 1113 11v1.057l.471.472zM17 5.667V7a.666.666 0 11-1.333 0V5.667c0-1.103-.898-2-2-2H4.333c-1.102 0-2 .897-2 2v.666h6a.667.667 0 010 1.334h-6v6c0 1.102.898 2 2 2H7A.667.667 0 017 17H4.333A3.337 3.337 0 011 13.667v-8a3.337 3.337 0 013.333-3.334H5v-.666a.667.667 0 011.333 0v.666h5.334v-.666a.666.666 0 111.333 0v.666h.667A3.337 3.337 0 0117 5.667z"></path>
		</svg>
	);
}

export default AppointmentIcon;