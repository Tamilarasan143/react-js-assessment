import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Box,
  Container,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ElevationScrollProps {
  window?: () => Window;
  children: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(true);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("loggedInUser");

    navigate("/");
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <ElevationScroll>
        <AppBar color="primary">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              Dashboard
            </Typography>
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="inherit"
              size="small"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Toolbar />

      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Hello! Welcome to your dashboard.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You have successfully signed in.
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Logged in successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
