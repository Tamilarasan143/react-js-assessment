import { Box, Button } from "@mui/material";
import { FacebookIcon, GoogleIcon } from "./CustomIcons";

export const SocialAuth = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="secondary"
        startIcon={<FacebookIcon />}
        onClick={() => alert("Sign up with Facebook")}
        sx={{
          justifyContent: "center",
          "& .MuiButton-startIcon": {
            position: "absolute",
            left: 16,
          },
        }}
      >
        Login with Facebook
      </Button>

      <Button
        fullWidth
        size="large"
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={() => alert("Sign up with Google")}
        sx={{
          justifyContent: "center",
          "& .MuiButton-startIcon": {
            position: "absolute",
            left: 16,
          },
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
};
