import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f0f0f",
      paper: "#1a1a1a",
    },
    primary: {
      main: "#fff149",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          height: "60px",
          fontSize: "1.2rem",
        },
      },
    },
  },
});

export default theme;