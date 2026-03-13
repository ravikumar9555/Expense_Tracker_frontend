import React from "react";
import { Box, Typography, Chip, Divider } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function OverviewCard({ expenses }) {

  const total = expenses.reduce((sum,e)=>sum+Number(e.amount),0);
  const transactions = expenses.length;

  const data = {
    labels:["1","2","3","4","5"],
    datasets:[
      {
        data:[10,30,20,40,35],
        borderColor:"#4CAF50",
        tension:0.4,
        borderWidth:3,
        pointRadius:0
      }
    ]
  };

  const options = {
    plugins:{legend:false},
    scales:{
      x:{display:false},
      y:{display:false}
    }
  };

  return (

    <Box
      sx={{
        background:"#f9fafb",
        borderRadius:4,
        p:4,
        boxShadow:"0 6px 20px rgba(0,0,0,0.08)"
      }}
    >

      <Typography variant="h6" mb={3}>
        Expense Overview
      </Typography>

      <Box sx={{display:"flex",alignItems:"center"}}>

        {/* LEFT SECTION */}

        <Box sx={{flex:1}}>

          <Box sx={{display:"flex",alignItems:"center",mb:2}}>

            <Box
              sx={{
                width:45,
                height:45,
                borderRadius:"50%",
                background:"#f0f0f0",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                mr:2
              }}
            >
              <FolderIcon/>
            </Box>

          </Box>

          <Typography color="text.secondary">
          Total Expense Till Now !
          </Typography>

          <Typography variant="h2" fontWeight="bold">
            ₹{total}
          </Typography>

          <Chip
            label="↑ 36.8%"
            sx={{
              mt:1,
              background:"#d7f5e6",
              color:"#2e8b57"
            }}
          />

        </Box>

        {/* CENTER GRAPH */}

        <Box sx={{width:200}}>
          <Line data={data} options={options}/>
        </Box>

        <Divider orientation="vertical" flexItem sx={{mx:3}}/>

        {/* RIGHT SECTION */}

        <Box sx={{flex:1,textAlign:"center"}}>

          <Box
            sx={{
              width:45,
              height:45,
              borderRadius:"50%",
              background:"#f0f0f0",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              mx:"auto",
              mb:2
            }}
          >
            <PersonOutlineIcon/>
          </Box>

          <Typography color="text.secondary">
            Total Transactions
          </Typography>

          <Typography variant="h2" fontWeight="bold">
            {transactions}
          </Typography>

          <Chip
            label="↓ 12%"
            sx={{
              mt:1,
              background:"#ffe3e3",
              color:"#d9534f"
            }}
          />

        </Box>

      </Box>

    </Box>

  );

}

export default OverviewCard;