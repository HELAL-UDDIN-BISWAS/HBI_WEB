import React from "react";
import PropTypes from "prop-types";
import SizeBox from "../custom/sizebox";
import HBIBoldText from "../text/hbi_bold_text";

const PrimaryBtn = ({
	enableIcon = false,
	icon,
	name,
	onClick = () => { },
	disable = false,
	minWidth = 100,
	width = 102,
	height = 40,
	type = "button",
	bgColor = "#3fc9c1",
	color = "#fff",
	radius = "4px",
	direction = "row",
	wrap = false,
	borderColor = "#3FC9C1",
	isIconleft = true,
	fontSize = 14,
	isUnderline = false,
	letterSpacing = 0,
	paddingTop = 0,
	paddingRight = 0,
	paddingBottom = 0,
	paddingLeft = 0,
	justifyContent = "center",
	alignItems = "center",
	opacity = 1,
	boxShadow = "",
}) => {
	return (
		<button
			style={{
				display: "flex",
				flexWrap: wrap ? "wrap" : "nowrap",
				flexDirection: direction,
				justifyContent: justifyContent,
				alignItems: alignItems,
				opacity: disable ? 0.4 : opacity,
				borderRadius: radius,
				width: `${width}px`,
				height: `${height}px`,
				minWidth: `${minWidth}px`,
				backgroundColor: bgColor,
				border: `1px solid ${borderColor}`,
				paddingTop: paddingTop,
				paddingRight: paddingRight,
				paddingBottom: paddingBottom,
				paddingLeft: paddingLeft,
				boxShadow: boxShadow,
			}}
			type={type}
			onClick={onClick}
			disabled={disable}>
			{isIconleft && enableIcon && icon}
			{isIconleft && enableIcon && <SizeBox width={6} />}
			<HBIBoldText
				text={name}
				color={color}
				type={type}
				isUnderline={isUnderline}
				fontSize={fontSize}
				letterSpacing={letterSpacing}
			/>
			{!isIconleft && enableIcon && <SizeBox width={2} />}
			{!isIconleft && enableIcon && icon}
		</button>
	);
};

PrimaryBtn.propTypes = {
	isIconleft: PropTypes.bool,
	enableIcon: PropTypes.bool,
	isUnderline: PropTypes.bool,
	icon: PropTypes.node,
	name: PropTypes.string,
	onClick: PropTypes.func,
	disable: PropTypes.bool,
	isBlock: PropTypes.bool,
	fontSize: PropTypes.number,
	minWidth: PropTypes.number,
	width: PropTypes.number,
	type: PropTypes.string,
	bgColor: PropTypes.string,
	color: PropTypes.string,
	borderColor: PropTypes.string,
	radius: PropTypes.string,
	wrap: PropTypes.bool,
	direction: PropTypes.oneOf(["row", "column"]),
	letterSpacing: PropTypes.string,
};

export default PrimaryBtn;
