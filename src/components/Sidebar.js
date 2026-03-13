import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Chip,
  Avatar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";

function Sidebar({ setPage }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";

  const [openExpenses, setOpenExpenses] = useState(true);
  const [openReports, setOpenReports] = useState(false);
  const [active, setActive] = useState("overview");

  const handleClick = (page) => {
    setActive(page);
    setPage(page);
  };

  const hoverStyle = {
    borderRadius: 3,
    mb: 1,
    transition: "all 0.25s ease",
    "&:hover": {
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transform: "translateX(4px)"
    }
  };

  return (

    <Box
      sx={{
        width: 260,
        background: "#f5f5f5",
        height: "100vh",
        p: 3,
        borderRight: "1px solid #eee"
      }}
    >

      {/* USER PROFILE */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          p: 2,
          background: "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}
      >

       <Avatar
  sx={{
    mr: 2,
    bgcolor: "#e0e0e0",
    color: "#555"
  }}
>
  <PersonIcon />
</Avatar>

        <Box>

          <Typography fontWeight="bold">
            {username}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Lund !!!!
          </Typography>

        </Box>

      </Box>

      {/* MENU */}

      <List>

        {/* DASHBOARD */}

        <ListItemButton
          sx={{
            ...hoverStyle,
            background: active === "overview" ? "#fff" : "transparent",
            boxShadow:
              active === "overview"
                ? "0 4px 12px rgba(0,0,0,0.1)"
                : "none"
          }}
          onClick={() => handleClick("overview")}
        >

          <DashboardIcon sx={{ mr: 2 }} />

          <ListItemText primary="Dashboard" />

        </ListItemButton>

        {/* EXPENSE SECTION */}

        <ListItemButton
          sx={hoverStyle}
          onClick={() => setOpenExpenses(!openExpenses)}
        >

          <ReceiptLongIcon sx={{ mr: 2 }} />

          <ListItemText primary="Expenses" />

          {openExpenses ? <ExpandLess /> : <ExpandMore />}

        </ListItemButton>

        <Collapse in={openExpenses}>

          <Box
            sx={{
              borderLeft: "2px solid #ddd",
              ml: 2,
              pl: 2
            }}
          >

            {/* OVERVIEW */}

            <ListItemButton
              sx={{
                ...hoverStyle,
                background:
                  active === "overview" ? "#fff" : "transparent",
                boxShadow:
                  active === "overview"
                    ? "0 4px 12px rgba(0,0,0,0.1)"
                    : "none"
              }}
              onClick={() => handleClick("overview")}
            >

              <ListItemText primary="Overview" />

            </ListItemButton>

            {/* ADD EXPENSE */}

            <ListItemButton
              sx={{
                ...hoverStyle,
                background:
                  active === "add" ? "#fff" : "transparent",
                boxShadow:
                  active === "add"
                    ? "0 4px 12px rgba(0,0,0,0.1)"
                    : "none"
              }}
              onClick={() => handleClick("add")}
            >

              <ListItemText primary="Add Expense" />

            </ListItemButton>

            {/* LATEST */}

            <ListItemButton
              sx={{
                ...hoverStyle,
                background:
                  active === "latest" ? "#fff" : "transparent",
                boxShadow:
                  active === "latest"
                    ? "0 4px 12px rgba(0,0,0,0.1)"
                    : "none"
              }}
              onClick={() => handleClick("latest")}
            >

              <ListItemText primary="Latest Expenses" />

              <Chip
                label="5"
                size="small"
                sx={{
                  background: "#ffd6b8",
                  fontWeight: "bold"
                }}
              />

            </ListItemButton>

          </Box>

        </Collapse>

        {/* REPORTS */}

        <ListItemButton
          sx={hoverStyle}
          onClick={() => setOpenReports(!openReports)}
        >

          <BarChartIcon sx={{ mr: 2 }} />

          <ListItemText primary="Reports" />

          {openReports ? <ExpandLess /> : <ExpandMore />}

        </ListItemButton>

        <Collapse in={openReports}>

          <Box
            sx={{
              borderLeft: "2px solid #ddd",
              ml: 2,
              pl: 2
            }}
          >

            {/* MONTHLY */}

            <ListItemButton
              sx={{
                ...hoverStyle,
                background:
                  active === "monthly" ? "#fff" : "transparent",
                boxShadow:
                  active === "monthly"
                    ? "0 4px 12px rgba(0,0,0,0.1)"
                    : "none"
              }}
              onClick={() => handleClick("monthly")}
            >

              <ListItemText primary="Monthly" />

            </ListItemButton>

            {/* YEARLY */}

            <ListItemButton
              sx={{
                ...hoverStyle,
                background:
                  active === "yearly" ? "#fff" : "transparent",
                boxShadow:
                  active === "yearly"
                    ? "0 4px 12px rgba(0,0,0,0.1)"
                    : "none"
              }}
              onClick={() => handleClick("yearly")}
            >

              <ListItemText primary="Yearly" />

              <Chip
                label="12"
                size="small"
                sx={{
                  background: "#c8f2d6",
                  fontWeight: "bold"
                }}
              />

            </ListItemButton>

          </Box>

        </Collapse>

      </List>

    </Box>

  );

}

export default Sidebar;