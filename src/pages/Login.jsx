import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/   authService";

const Login = () => {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try{

      console.log("Username:", username);
      console.log("Password:", password);

      const data = await loginUser(username,password);

      console.log("API Response:", data);

      // save token
      localStorage.setItem("token", data.token);

      // save user data
      localStorage.setItem("user", JSON.stringify(data));

      console.log("Token saved:", data.token);

      navigate("/dashboard");

    }
    catch(err){

      alert("Invalid login");

    }

  };

  return (

    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">

      <Card sx={{width:350,p:2}}>

        <CardContent>

          <Typography variant="h5" align="center">Login</Typography>

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
            sx={{mt:2}}
            onClick={handleLogin}
          >
            Login
          </Button>

        </CardContent>

      </Card>

    </Box>

  );

};

export default Login;