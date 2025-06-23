import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Link,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContainer } from "../components/AuthContainer";
import { AuthCard } from "../components/CustomCard";
import { SocialAuth } from "../components/SocialAuthButton";

interface LoginFormData {
  email: string;
  password: string;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

const loginSchema: yup.ObjectSchema<LoginFormData> = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export default function LogInPage() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const stored = localStorage.getItem("users");
    const users: StoredUser[] = stored ? JSON.parse(stored) : [];

    const user = users.find((u) => u.email === data.email);

    if (!user) {
      setSnackbar({
        open: true,
        message: "Email is not registered",
        severity: "error",
      });
      return;
    }

    const decodedPassword = atob(user.password);

    if (decodedPassword !== data.password) {
      setSnackbar({
        open: true,
        message: "Incorrect password. Please try again.",
        severity: "error",
      });
      return;
    }
    sessionStorage.setItem(
      "loggedInUser",
      JSON.stringify({ email: data.email })
    );
    setSnackbar({
      open: true,
      message: "Login successful!",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleNavigateSignUp = () => {
    navigate(`/sign-up`);
  };

  return (
    <AuthContainer direction="column" justifyContent="center">
      <AuthCard variant="outlined">
        <Typography variant="h5" fontWeight={`bold`} textAlign="center">
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <TextField
              label="Email"
              fullWidth
              required
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              size="small"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FormControl>

          <Link sx={{ textAlign: "center", cursor: "pointer" }}>
            Forgot Password?
          </Link>

          <Button type="submit" fullWidth size="large" variant="contained">
            Login
          </Button>
        </Box>

        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link
            component="button"
            onClick={handleNavigateSignUp}
            variant="body1"
            sx={{ alignSelf: "center" }}
          >
            Signup
          </Link>
        </Typography>

        <Divider>or</Divider>

        <SocialAuth/>
      </AuthCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContainer>
  );
}
