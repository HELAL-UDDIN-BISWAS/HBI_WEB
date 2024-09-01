import React from "react";

const HBIRegularText = ({
  text,
  color = "#6E7E7D",
  fontSize = 12,
  isUpperCase = false,
  isParagraph = false,
  letterSpacing = 0,
  isTextCenter = false,
}) => {
  return (
    <span
      style={{
        color: `${color}`,
        fontSize: `${fontSize}px`,
        fontWeight: 400,
        textTransform: `${
          isParagraph ? "" : isUpperCase ? "uppercase" : "capitalize"
        }`,
        letterSpacing: letterSpacing,
        textAlign: "justify",
        textAlign: isTextCenter && "center",
      }}
    >
      {text}
    </span>
  );
};

export default HBIRegularText;
