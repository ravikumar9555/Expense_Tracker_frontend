import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/   authService";
import { isTokenValid } from "../utils/authUtils";

const Login = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [open,setOpen] = useState(false);
  const [message,setMessage] = useState("");
  const [severity,setSeverity] = useState("success");

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ If token already valid → go dashboard
  useEffect(()=>{

    if(isTokenValid()){
      navigate("/dashboard",{replace:true});
    }

  },[]);

  const handleLogin = async () => {

    if(!username || !password){

      setMessage("All fields are mandatory");
      setSeverity("error");
      setOpen(true);
      return;

    }

    try {

      setLoading(true);

      const response = await loginUser(username, password);

      console.log(response);

      // ✅ store token
      localStorage.setItem("token", response.token);

      // ✅ store username
      localStorage.setItem("username", response.username);

      setMessage("Login successful");
      setSeverity("success");
      setOpen(true);

      // ✅ replace prevents back navigation
      setTimeout(()=>{
        navigate("/dashboard",{replace:true});
      },1000);

    } catch (err) {

      setMessage("Invalid username or password");
      setSeverity("error");
      setOpen(true);

    } finally {

      setLoading(false);

    }

  };

  return (

    <Box
      sx={{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        background:"#f5f5f7"
      }}
    >

      <Card
        sx={{
          width:900,
          height:500,
          display:"flex",
          borderRadius:4,
          overflow:"hidden"
        }}
      >

        {/* LEFT LOGIN FORM */}

        <Box
          sx={{
            flex:1,
            p:6,
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
          }}
        >

          <Typography variant="h4" fontWeight="bold" mb={1}>
            Welcome Back
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Login to manage your expenses.
          </Typography>

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            onChange={(e)=>setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{mt:3,height:45}}
            onClick={handleLogin}
            disabled={loading}
          >

            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Log In"
            )}

          </Button>

          <Typography mt={3} textAlign="center">

            Don't have an account?{" "}

            <span
              style={{color:"#1976d2",cursor:"pointer"}}
              onClick={()=>navigate("/signup")}
            >
              Sign up
            </span>

          </Typography>

        </Box>

        {/* RIGHT IMAGE */}

        <Box
          sx={{
            flex:1,
            position:"relative",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1534447677768-be436bb09401)",
            backgroundSize:"cover",
            backgroundPosition:"center",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color:"white"
          }}
        >

          <Box
            sx={{
              position:"absolute",
              inset:0,
              background:"rgba(0,0,0,0.45)"
            }}
          />

          <Box
            sx={{
              position:"relative",
              textAlign:"center",
              px:4
            }}
          >

            <Typography variant="h4" fontWeight="bold" mb={2}>
              Track Smarter
            </Typography>

            <Typography variant="h6">
              "Small expenses add up — control them before they control you."
            </Typography>

          </Box>

        </Box>

      </Card>

      {/* SNACKBAR */}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=>setOpen(false)}
        anchorOrigin={{vertical:"top",horizontal:"center"}}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>

    </Box>

  );

};

export default Login;