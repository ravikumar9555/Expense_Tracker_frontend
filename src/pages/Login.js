import React from "react";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {

  return (

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f6f8"
    >

      <Card sx={{ width: 350, p: 2, boxShadow: 5 }}>

        <CardContent>

          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>

        </CardContent>

      </Card>

    </Box>

  );
};

export default Login;