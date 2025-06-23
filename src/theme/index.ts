import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#006ed2",
    },
    secondary: {
      main: "#4164af",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
     button: {
      textTransform: "capitalize",
    },
  },
  shape: {
    borderRadius: 8,
  },
    components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d32f2f",
        },
      },
    },
  },
});

export default theme;
