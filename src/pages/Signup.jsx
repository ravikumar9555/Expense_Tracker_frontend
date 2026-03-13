import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/   authService";

const Signup = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {

    try {

      setLoading(true);

      const data = await signupUser(username, password);

      console.log("Signup success:", data);

      alert("Signup Successful");

      navigate("/login");

    } catch (error) {

      console.error(error);
      alert("Signup Failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >

      <Card sx={{ width: 350, p: 2, boxShadow: 5 }}>

        <CardContent>

          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>

        </CardContent>

      </Card>

    </Box>
  );
};

export default Signup;