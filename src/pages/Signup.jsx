import React, { useState } from "react";
import { Box, Card, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/   authService";

const Signup = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    try{

      await signupUser(username,password);

      alert("Signup successful");

      navigate("/login");

    }
    catch(err){

      alert("Signup failed");

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
            Kar Mcccccccc!!!!!
          </Typography>

          <Typography color="text.secondary" mb={4}>
             See your Gaand Masti!!!!!
          </Typography>

          <TextField
            label="Email"
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

  {/* Quote Content */}
  <Box
    sx={{
      position: "relative",
      textAlign: "center",
      px: 4
    }}
  >

    <Typography variant="h4" fontWeight="bold" mb={2}>
     Lund Khaye Mera Veg .....
    </Typography>

    <Typography variant="h6">
      "Beware of Non Vegetarian........"
    </Typography>

  </Box>

</Box>

      </Card>

    </Box>

  );

};

export default Signup;