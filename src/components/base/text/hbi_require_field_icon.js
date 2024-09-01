import React from "react";
import SizeBox from "../custom/sizebox";
import HBIRegularText from "./hbi_regular_text";

const HBIRequireFieldIcon = () => {
	return (
		<div className="flex items-center">
			<SizeBox width={5} />
			<HBIRegularText text={"*"} color={"#f7302b"} fontSize={13} />
		</div>
	);
};

export default HBIRequireFieldIcon;
