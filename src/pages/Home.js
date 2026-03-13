import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fb",
        display: "flex",
        alignItems: "center"
      }}
    >

      <Container maxWidth="md" sx={{ textAlign: "center" }}>

        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Manage your <span style={{ color: "#ff6b6b" }}>Expenses Easily</span>
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Track spending, visualize your expenses, and manage your finances
          with a clean and simple dashboard.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

        </Box>

        <Box
          sx={{
            mt: 6,
            borderRadius: 3,
            boxShadow: 4,
            overflow: "hidden"
          }}
        >

          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
            alt="dashboard preview"
            style={{ width: "100%" }}
          />

        </Box>

      </Container>

    </Box>

  );

};

export default HomePage;