import React, { useState } from "react";
import { Box, Card, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/   authService";

const Login = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try{

      const data = await loginUser(username,password);

      // store token
      localStorage.setItem("token", data.token);

      // store user data (optional)
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");

    }
    catch(err){

      alert("Invalid login");
      console.log(err)

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

        {/* LEFT SIDE LOGIN FORM */}

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
          >
            Log In
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

        {/* RIGHT SIDE IMAGE */}

        <Box
          sx={{
            flex: 1,
            position: "relative",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1534447677768-be436bb09401)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}
        >

          {/* Overlay */}

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)"
            }}
          />

          {/* Quote */}

          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              px: 4
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

    </Box>

  );

};

export default Login;