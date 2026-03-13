import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent
} from "@mui/material";

import PaymentsIcon from "@mui/icons-material/Payments";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { addExpenseApi } from "../services/   authService";

function ExpenseForm({ addExpense }) {

  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [platform,setPlatform] = useState("");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");

  const handleSubmit = async () => {

    try {

      const expense = {
        description,
        amount,
        platform,
        transactionDate: date + " " + time
      };

      const savedExpense = await addExpenseApi(expense);

      addExpense(savedExpense);

      setDescription("");
      setAmount("");
      setPlatform("");
      setDate("");
      setTime("");

    } catch (err) {

      console.error(err);
      alert("Failed to add expense");

    }

  };

  const inputStyle = {
    background:"#f6f6f6",
    borderRadius:"40px",
    "& fieldset":{border:"none"}
  };

  return (

    <Box
      sx={{
        display:"flex",
        justifyContent:"center",
        mt:4
      }}
    >

      <Card
        sx={{
          width:500,
          borderRadius:4,
          p:3,
          boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
        }}
      >

        <CardContent>

          <Typography variant="h5" fontWeight="bold" mb={3}>
            Add Expense
          </Typography>

          {/* DESCRIPTION */}

          <Typography mb={1} display="flex" alignItems="center">
            <DescriptionIcon sx={{mr:1}}/>
            Description
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            sx={inputStyle}
          />

          {/* AMOUNT */}

          <Typography mt={3} mb={1} display="flex" alignItems="center">
            <PaymentsIcon sx={{mr:1}}/>
            Amount
          </Typography>

          <TextField
            type="number"
            fullWidth
            placeholder="Enter amount"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            sx={inputStyle}
          />

          {/* PAYMENT MODE */}

          <Typography mt={3} mb={1} display="flex" alignItems="center">
            <AccountBalanceWalletIcon sx={{mr:1}}/>
            Payment Mode
          </Typography>

          <TextField
            select
            fullWidth
            value={platform}
            onChange={(e)=>setPlatform(e.target.value)}
            sx={inputStyle}
          >

            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>

          </TextField>

          {/* DATE + TIME */}

          <Box sx={{display:"flex",gap:2,mt:3}}>

            <Box sx={{flex:1}}>

              <Typography mb={1} display="flex" alignItems="center">
                <CalendarMonthIcon sx={{mr:1}}/>
                Date
              </Typography>

              <TextField
                type="date"
                fullWidth
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                sx={inputStyle}
              />

            </Box>

            <Box sx={{flex:1}}>

              <Typography mb={1} display="flex" alignItems="center">
                <AccessTimeIcon sx={{mr:1}}/>
                Time
              </Typography>

              <TextField
                type="time"
                fullWidth
                value={time}
                onChange={(e)=>setTime(e.target.value)}
                sx={inputStyle}
              />

            </Box>

          </Box>

          {/* BUTTON */}

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt:4,
              borderRadius:"40px",
              textTransform:"none",
              fontSize:"16px",
              background:"#4CAF50",
              "&:hover":{background:"#43a047"}
            }}
            onClick={handleSubmit}
          >
            Add Expense
          </Button>

        </CardContent>

      </Card>

    </Box>

  );

}

export default ExpenseForm;