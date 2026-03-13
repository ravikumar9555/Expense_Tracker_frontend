import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

function ExpenseList({ expenses, onEdit }) {

  const latestExpenses = expenses.slice(-5).reverse();

  return (

    <Box>

      <Typography variant="h5" mb={3}>
        Latest Expenses
      </Typography>

      {latestExpenses.length === 0 && (
        <Typography>No expenses yet</Typography>
      )}

      {latestExpenses.map((expense,index) => (

        <Card
          key={expense.expenseId}
          sx={{
            mb:2,
            borderRadius:3,
            transition:"0.3s",
            overflow:"hidden",
            boxShadow:"0 6px 18px rgba(0,0,0,0.08)",
            "&:hover":{
              transform:"translateY(-4px)",
              boxShadow:"0 12px 28px rgba(0,0,0,0.15)"
            },
            "&:hover .description":{
              maxHeight:"100px",
              opacity:1
            }
          }}
        >

          <CardContent>

            {/* MAIN ROW */}

            <Box
              sx={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between"
              }}
            >

              {/* LEFT CONTENT */}

              <Box
                sx={{
                  display:"flex",
                  alignItems:"center",
                  gap:4   // spacing between items
                }}
              >

                {/* NUMBER */}

                <Avatar
                  sx={{
                    width:32,
                    height:32,
                    fontSize:"14px",
                    background:"#f0f0f0",
                    color:"#555"
                  }}
                >
                  {index+1}
                </Avatar>

                {/* AMOUNT */}

                <Typography
                  fontWeight="bold"
                  sx={{
                    fontSize:"18px",
                    color:
                      expense.amount > 1000
                        ? "#e53935"
                        : "#2e7d32"
                  }}
                >
                  ₹{expense.amount}
                </Typography>

                {/* PAYMENT MODE */}

                <Typography color="text.secondary">
                  {expense.platform}
                </Typography>

                {/* DATE */}

                <Typography color="text.secondary">
                  {expense.transactionDate}
                </Typography>

              </Box>

              {/* EDIT BUTTON */}

              <IconButton
                onClick={()=>onEdit(expense)}
                sx={{
                  background:"#f5f5f5",
                  "&:hover":{
                    background:"#eaeaea"
                  }
                }}
              >
                <EditIcon/>
              </IconButton>

            </Box>

            {/* DESCRIPTION ON HOVER */}

            <Box
              className="description"
              sx={{
                maxHeight:0,
                opacity:0,
                transition:"all 0.3s ease",
                overflow:"hidden",
                mt:2
              }}
            >

              <Typography variant="body2" color="text.secondary">
                Purpose: {expense.description}
              </Typography>

            </Box>

          </CardContent>

        </Card>

      ))}

    </Box>

  );

}

export default ExpenseList;