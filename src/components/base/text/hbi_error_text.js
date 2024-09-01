import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import SizeBox from "../custom/sizebox";
import HBIRegularText from "./hbi_regular_text";

const HBIErrorText = ({ text = "" }) => {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<AiFillExclamationCircle size={20} color={"#f7302b"} />
			<SizeBox width={6} />
			<HBIRegularText text={text} isParagraph={true} color={"#f7302b"} />
		</div>
	);
};

export default HBIErrorText;
