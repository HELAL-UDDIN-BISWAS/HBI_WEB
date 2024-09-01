import React from "react";
import "./cancel.css"
function RewardIcon({className}) {
	return (
		<svg
		className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 18 18">
			<g clipPath="url(#clip0_5340_12804)">
				<path
					fill="#6E7E7D"
					d="M11.3 11.998c4.942-.018 6.7-2.632 6.7-4.873a2.628 2.628 0 00-2.07-2.564c.233-.661.41-1.298.526-1.866a2.221 2.221 0 00-.46-1.857A2.268 2.268 0 0014.234 0H3.767c-.687 0-1.33.305-1.764.838a2.22 2.22 0 00-.46 1.857c.118.569.294 1.205.527 1.866A2.628 2.628 0 000 7.125c0 2.241 1.758 4.855 6.7 4.873.022.159.05.316.05.48V15c0 1.37-1.152 1.494-1.5 1.5h-1.5V18h10.5v-1.5h-1.494c-.354-.006-1.506-.13-1.506-1.5v-2.522c0-.164.028-.321.05-.48zM15.375 6c.62 0 1.125.505 1.125 1.125 0 1.536-1.223 3.169-4.593 3.356a2.73 2.73 0 01.457-.47C13.652 8.983 14.632 7.5 15.333 6h.042zM1.5 7.125C1.5 6.505 2.005 6 2.625 6h.043c.701 1.498 1.68 2.982 2.968 4.012.17.136.323.294.457.47C2.723 10.293 1.5 8.66 1.5 7.124zm8.25 5.353V15c0 .604.143 1.094.365 1.5h-2.23c.222-.406.366-.896.366-1.5v-2.522c0-1.46-.61-2.786-1.677-3.639-1.848-1.476-3.12-4.3-3.56-6.447a.725.725 0 01.153-.607.775.775 0 01.602-.286h10.464c.234 0 .454.104.602.286a.723.723 0 01.153.608c-.44 2.144-1.711 4.969-3.56 6.446-1.065.852-1.677 2.178-1.677 3.639H9.75zM9.393 3l.489 1.504h1.582l.225.688-1.28.93.49 1.505-.586.425-1.28-.927-1.282.928-.586-.426.49-1.504-1.28-.93.225-.688h1.58l.49-1.5L9.392 3z"></path>
			</g>
			<defs>
				<clipPath id="clip0_5340_12804">
					<path className="stroke-[#3FC9C1]" fill="#fff" d="M0 0H18V18H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default RewardIcon;