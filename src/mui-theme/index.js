// https://mui.com/material-ui/customization/theming/

import { createTheme } from "@mui/material";
import { rem } from "utils/pxToRem";

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: "pointer !important",
          border: "none",
          textTransform: "none",
          boxShadow: "none !important",
          fontSize: `${rem(16)} !important`,
          lineHeight: `${rem(18)} !important`,
          fontWeight: "500 !important",
          padding: `${rem(12)} 0`,
          transition: "all 0.2s ease-in-out",
          height: `${rem(48)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          "@media (max-width: 768px)": {
            height: `${rem(40)}`,
            lineHeight: `${rem(16)} !important`,
          },
          "&:hover": {
            border: "none",
            boxShadow: "none !important",
          },
          svg: {
            maxWidth: "20px",
            minWidth: "20px",
            maxHeight: "20px",
            minHeight: "20px",
            marginRight: 0,
          },
        },
        outlined: {
          color: "#00acb5",
          background: "#EEF0F2",
          padding: `${rem(12)} ${rem(24)}`,
          "&:hover": {
            color: "#00acb5",
            background: "#EEF0F2",
          },
        },
        contained: {
          padding: `${rem(12)} ${rem(24)}`,
          color: "#fff",
          background: "#00acb5",

          "&:hover": {
            color: "#fff",
            background: "#00acb5",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: rem(16),
          paddingRight: rem(16),
          "@media (min-width:1440px)": {
            maxWidth: "1248px",
            width: "100%",
          },
          "@media (min-width:1200px)": {
            paddingLeft: rem(16),
            paddingRight: rem(16),
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
    h1: {
      fontSize: rem(56),
      fontWeight: 700,
      lineHeight: rem(64),
      color: "#fff",
      "@media (max-width: 768px)": {
        fontSize: rem(16),
        fontWeight: 400,
        lineHeight: rem(20),
        color: "#fff",
      },
    },
  },
});
