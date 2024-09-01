import React from "react";
import PropTypes from "prop-types";
import SizeBox from "../custom/sizebox";

const HBIBoldText = ({
	icon,
	text,
	color = "#6E7E7D",
	fontSize = 12,
	fontFamily = "Inter",
	isUpperCase = false,
	isParagraph = false,
	letterSpacing = 0,
	isTextCenter = false,
	fontWeight = 600,
	textDecoration = "none",
	isUnderline = false,
	lineHeight = 16,
	isIconLeft = false,
}) => {
	return (
		<>
			{isIconLeft && icon()}
			{isIconLeft && <SizeBox width={6} height={6} />}
			<span
				style={{
					fontFamily: `${fontFamily}`,
					textDecoration: isUnderline ? "underline" : "none",
					color: `${color}`,
					fontSize: `${fontSize}px`,
					fontWeight: `${fontWeight}`,
					lineHeight: `${lineHeight}px`,
					textTransform: `${isParagraph ? "" : isUpperCase ? "uppercase" : "capitalize"
						}`,
					letterSpacing: letterSpacing,
					textAlign: isTextCenter && "center",
				}}>
				{text}
			</span>
		</>
	);
};

HBIBoldText.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	lineHeight: PropTypes.number,
	fontSize: PropTypes.number,
	fontFamily: PropTypes.string,
	isUpperCase: PropTypes.bool,
	isParagraph: PropTypes.bool,
	letterSpacing: PropTypes.number,
	isTextCenter: PropTypes.bool,
	fontWeight: PropTypes.number,
};

export default HBIBoldText;
