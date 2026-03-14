import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Chip,
  Avatar,
  Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

function Sidebar({ setPage }) {

  const navigate = useNavigate();

  const username = localStorage.getItem("username") ?? "User";

  const [openExpenses, setOpenExpenses] = useState(true);
  const [openReports, setOpenReports] = useState(false);
  const [active, setActive] = useState("overview");

  const handlePageChange = (page) => {
    setActive(page);
    setPage(page);
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login", { replace: true });

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
        width:260,
        background:"#f5f5f5",
        height:"100vh",
        p:3,
        borderRight:"1px solid #eee",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between"
      }}
    >

      {/* TOP SECTION */}
      <Box>

        {/* USER PROFILE */}
        <Box
          sx={{
            display:"flex",
            alignItems:"center",
            mb:4,
            p:2,
            background:"#fff",
            borderRadius:3,
            boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
          }}
        >

          <Avatar sx={{mr:2,bgcolor:"#e0e0e0",color:"#555"}}>
            <PersonIcon/>
          </Avatar>

          <Box>
            <Typography fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="caption">
              Expense Tracker
            </Typography>
          </Box>

        </Box>

        {/* MENU */}
        <List>

          {/* Dashboard */}
          <ListItemButton
            sx={{
              ...hoverStyle,
              background: active==="overview" ? "#fff" : "transparent"
            }}
            onClick={() => handlePageChange("overview")}
          >
            <DashboardIcon sx={{mr:2}}/>
            <ListItemText primary="Dashboard"/>
          </ListItemButton>

          {/* Expenses */}
          <ListItemButton
            sx={hoverStyle}
            onClick={() => setOpenExpenses(!openExpenses)}
          >
            <ReceiptLongIcon sx={{mr:2}}/>
            <ListItemText primary="Expenses"/>
            {openExpenses ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>

          <Collapse in={openExpenses}>

            <Box sx={{ml:2,pl:2,borderLeft:"2px solid #ddd"}}>

              <ListItemButton
                sx={hoverStyle}
                onClick={() => handlePageChange("overview")}
              >
                <ListItemText primary="Overview"/>
              </ListItemButton>

              <ListItemButton
                sx={hoverStyle}
                onClick={() => handlePageChange("latest")}
              >
                <ListItemText primary="All Expenses"/>
                <Chip label="∞" size="small"/>
              </ListItemButton>

            </Box>

          </Collapse>

          {/* Reports */}
          <ListItemButton
            sx={hoverStyle}
            onClick={() => setOpenReports(!openReports)}
          >
            <BarChartIcon sx={{mr:2}}/>
            <ListItemText primary="Reports"/>
            {openReports ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>

          <Collapse in={openReports}>

            <Box sx={{ml:2,pl:2,borderLeft:"2px solid #ddd"}}>

              <ListItemButton
                sx={hoverStyle}
                onClick={() => handlePageChange("monthly")}
              >
                <ListItemText primary="Monthly"/>
              </ListItemButton>

              <ListItemButton
                sx={hoverStyle}
                onClick={() => handlePageChange("yearly")}
              >
                <ListItemText primary="Yearly"/>
              </ListItemButton>

            </Box>

          </Collapse>

        </List>

      </Box>

      {/* LOGOUT BUTTON */}
      <Box>

        <Divider sx={{mb:2}}/>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius:3,
            "&:hover":{
              background:"#ffeaea"
            }
          }}
        >

          <LogoutIcon sx={{mr:2,color:"#d32f2f"}}/>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{color:"#d32f2f"}}
          />

        </ListItemButton>

      </Box>

    </Box>

  );

}

export default Sidebar;