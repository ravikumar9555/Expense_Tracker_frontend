import React, { useState } from "react";
import { Box, Card, TextField, Button } from "@mui/material";

function ExpenseForm({ addExpense }) {

  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [platform,setPlatform] = useState("");
  const [date,setDate] = useState("");

  const handleSubmit = () => {

    const expense = {
      expenseId: Date.now(),
      description,
      amount: Number(amount),   // ✅ FIX (prevents NaN)
      platform,
      transactionDate: date
    };

    addExpense(expense);

    setDescription("");
    setAmount("");
    setPlatform("");
    setDate("");
  };

  return (

    <Card
      sx={{
        mb:2,
        borderRadius:3,
        p:2,
        boxShadow:"0 6px 18px rgba(0,0,0,0.08)"
      }}
    >

      <Box
        sx={{
          display:"flex",
          gap:2,
          alignItems:"center"
        }}
      >

        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          sx={{width:120}}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          sx={{flex:1}}
        />

        <TextField
          label="Platform"
          value={platform}
          onChange={(e)=>setPlatform(e.target.value)}
          placeholder="Netflix / Swiggy / Amazon"
          sx={{width:180}}
        />

        <TextField
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          sx={{width:160}}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{borderRadius:"30px"}}
        >
          Add
        </Button>

      </Box>

    </Card>

  );

}

export default ExpenseForm;