import React from "react";

const SizeBox = ({ width = 10, height = 0 }) => {
	return (
		<span
			style={{
				display: "inline-block",
				width: `${width}px`,
				height: `${height}px`,
			}}
		/>
	);
};

export default SizeBox;
