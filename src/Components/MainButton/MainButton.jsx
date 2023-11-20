import React from "react";
import { Button, CircularProgress } from "@mui/material";

const MainButton = ({
  fullWidth,
  text,
  disabled,
  icon,
  type,
  variant,
  onClick,
  sx,
  isClicked,
  isProfile,
  loading,
  ...restProps
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      startIcon={icon}
      fullWidth={fullWidth}
      variant={variant}
      onClick={onClick}
      sx={{
        ...sx,
        whiteSpace: "nowrap",
      }}
      {...restProps}
    >
      {loading ? (
        <CircularProgress
          disableShrink
          size="medium"
          sx={{ color: "#dfe3e5" }}
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default MainButton;
