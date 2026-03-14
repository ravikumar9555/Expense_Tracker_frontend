import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  updateExpenseApi,
  deleteExpenseApi
} from "../services/   authService";

function ExpenseList({ expenses = [], reloadExpenses }) {

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const handleEdit = (expense) => {
    setEditId(expense.expenseId);
    setForm(expense);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // UPDATE EXPENSE
  const handleUpdate = async () => {
    try {

      await updateExpenseApi(form);

      setEditId(null);

      if (reloadExpenses) {
        reloadExpenses();
      }

    } catch (err) {
      console.log("Update error:", err);
    }
  };

  // DELETE EXPENSE
  const handleDelete = async (expenseId) => {
    try {

      await deleteExpenseApi(expenseId);

      if (reloadExpenses) {
        reloadExpenses();
      }

    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (

    <Box>

      {expenses.map((expense, index) => {

        const editing = editId === expense.expenseId;

        return (

          <Card
            key={expense.expenseId}
            sx={{
              mb:2,
              borderRadius:3,
              boxShadow:"0 6px 18px rgba(0,0,0,0.08)",
              transition:"0.25s",
              "&:hover":{
                boxShadow:"0 12px 25px rgba(0,0,0,0.15)"
              }
            }}
          >

            <CardContent
              sx={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
              }}
            >

              {editing ? (

                <Box sx={{display:"flex",gap:2}}>

                  <TextField
                    name="amount"
                    value={form.amount || ""}
                    onChange={handleChange}
                    sx={{width:120}}
                  />

                  <TextField
                    name="description"
                    value={form.description || ""}
                    onChange={handleChange}
                  />

                  <TextField
                    name="platform"
                    value={form.platform || ""}
                    onChange={handleChange}
                  />

                  <TextField
                    type="date"
                    name="transactionDate"
                    value={form.transactionDate || ""}
                    onChange={handleChange}
                  />

                </Box>

              ) : (

                <Box sx={{display:"flex",gap:4,alignItems:"center"}}>

                  <Typography fontWeight="bold">
                    {index + 1}
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    sx={{
                      color:
                        Number(expense.amount) > 1000
                          ? "#e53935"
                          : "#2e7d32",
                      fontSize:"18px"
                    }}
                  >
                    ₹{expense.amount}
                  </Typography>

                  <Typography>
                    {expense.platform}
                  </Typography>

                  <Typography>
                    {expense.transactionDate}
                  </Typography>

                </Box>

              )}

              <Box>

                {editing ? (

                  <>
                    <IconButton
                      color="success"
                      onClick={handleUpdate}
                    >
                      <CheckIcon/>
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(expense.expenseId)}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </>

                ) : (

                  <IconButton
                    onClick={() => handleEdit(expense)}
                  >
                    <EditIcon/>
                  </IconButton>

                )}

              </Box>

            </CardContent>

          </Card>

        );

      })}

    </Box>

  );

}

export default ExpenseList;