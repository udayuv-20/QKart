// src/components/Register.js
import { Button, TextField, Stack, CircularProgress, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import config from "../App";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const validation = validateInput({ username, password, confirmPassword });
    if (!validation) return;

    setLoading(true);
    try {
      const response = await axios.post(`${config.endpoint}/auth/register`, {
        username,
        password
      });
      setLoading(false);
      enqueueSnackbar("Registered successfully", { variant: "success" });
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "warning" });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <Box className="content">
      <Stack spacing={2} className="form">
        <Typography variant="h5">Register</Typography>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={25} />
          </Box>
        ) : (
          <Button className="button" variant="contained" onClick={handleRegister}>
            Register Now
          </Button>
        )}
        <Typography className="secondary-action" onClick={() => navigate("/login")}>Already have an account? Login here</Typography>
      </Stack>
    </Box>
  );
};

export default Register;
