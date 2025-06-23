import React from "react";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SocialAuth } from "../components/SocialAuthButton";
import { AuthContainer } from "../components/AuthContainer";
import { AuthCard } from "../components/CustomCard";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface EncodedUser {
  name: string;
  email: string;
  password: string;
}

const validationSchema: yup.ObjectSchema<SignUpFormData> = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUpPage() {
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
  } = useForm<SignUpFormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleSignUp = (data: SignUpFormData) => {
    const storedUsers = localStorage.getItem("users");
    const users: EncodedUser[] = storedUsers ? JSON.parse(storedUsers) : [];

    const emailExists = users.some((user) => user.email === data.email);
    if (emailExists) {
      setSnackbar({
        open: true,
        message: "Email is already registered",
        severity: "error",
      });
      return;
    }

    const newUser: EncodedUser = {
      name: data.name,
      email: data.email,
      password: btoa(data.password),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem(
      "loggedInUser",
      JSON.stringify({ email: data.email })
    );

    setSnackbar({
      open: true,
      message: "Sign-up successful! Redirecting to Dashboard...",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuthContainer direction="column" justifyContent="center">
      <AuthCard variant="outlined">
        <Typography variant="h5" fontWeight={`bold`} textAlign="center">
          Signup
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleSignUp)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <TextField
              label="Name"
              fullWidth
              required
              size="small"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </FormControl>

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

          <FormControl>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              size="small"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained" size="large">
            Signup
          </Button>
        </Box>

        <Typography textAlign="center">
          Already have an account?{" "}
          <Link
            component="button"
            onClick={() => navigate("/")}
            variant="body1"
          >
            Login
          </Link>
        </Typography>

        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>

        <SocialAuth />
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
