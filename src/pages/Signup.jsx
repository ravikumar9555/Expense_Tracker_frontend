import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/   authService";
import { isTokenValid } from "../utils/authUtils";

const Signup = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [message,setMessage] = useState("");
  const [severity,setSeverity] = useState("success");
  const [open,setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
  if(isTokenValid()){
    navigate("/dashboard",{replace:true});
  }
},[navigate]);

  const handleSignup = async () => {

    if(!username || !password){

      setMessage("All fields are mandatory");
      setSeverity("error");
      setOpen(true);
      return;

    }

    try{

      await signupUser(username,password);

      setMessage("Signup successful");
      setSeverity("success");
      setOpen(true);

      // ✅ prevent back navigation
      setTimeout(()=>{
        navigate("/login",{replace:true});
      },1500);

    }
    catch(err){

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        "User already exists";

      setMessage(backendMessage);
      setSeverity("error");
      setOpen(true);

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

        {/* LEFT FORM */}

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
            Create Account
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Start tracking your expenses
          </Typography>

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{mt:3,height:45}}
            onClick={handleSignup}
          >
            Sign Up
          </Button>

          <Typography mt={3} textAlign="center">

            Already have an account?{" "}

            <span
              style={{color:"#1976d2",cursor:"pointer"}}
              onClick={()=>navigate("/login")}
            >
              Login
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
              Small expenses add up — control them before they control you.
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

export default Signup;