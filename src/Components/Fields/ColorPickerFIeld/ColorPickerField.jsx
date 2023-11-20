import React from "react";

const ColorPickerField = ({ rgb }) => {
  return (
    <div
      style={{
        backgroundColor: rgb,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "1px solid #BBCBCC",
      }}
    />
  );
};

export default ColorPickerField;
