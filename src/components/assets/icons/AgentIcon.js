import React from "react";

function AgentIcon({className}) {
	return (
		<svg
		className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 18 18">
			<g clipPath="url(#clip0_5340_12815)">
				<path
					fill="#6E7E7D"
					d="M6.375 7.125c0 .413.096.805.267 1.153a2.976 2.976 0 00-.627 1.692 4.113 4.113 0 01-1.14-2.844A4.133 4.133 0 019.869 3.09 4.117 4.117 0 0113.097 7.6a.747.747 0 01-.747.65h-.034c-.444 0-.756-.396-.708-.837a2.615 2.615 0 00-1.991-2.843 2.63 2.63 0 00-3.243 2.555l.001-.001zm-2.917-.971A5.57 5.57 0 015.152 3.02a5.605 5.605 0 014.223-1.508c2.965.192 5.283 2.79 5.248 5.899-.014 1.302-1.104 2.338-2.406 2.338h-1.804a1.496 1.496 0 00-2.933.42 1.5 1.5 0 002.538 1.08h2.2c2.114 0 3.875-1.684 3.905-3.797C16.18 3.536 13.238.259 9.473.016a7.057 7.057 0 00-5.345 1.91 7.155 7.155 0 00-2.141 3.95.75.75 0 00.741.875c.354 0 .67-.247.73-.597zM9 12.75c-2.771 0-5.169 1.719-5.966 4.276a.75.75 0 00.493.94.754.754 0 00.938-.493C5.057 15.576 6.921 14.25 9 14.25c2.079 0 3.943 1.326 4.534 3.223a.75.75 0 001.433-.447c-.798-2.557-3.195-4.276-5.967-4.276H9z"></path>
			</g>
			<defs>
				<clipPath id="clip0_5340_12815">
					<path fill="#fff" d="M0 0H18V18H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default AgentIcon;