import React from "react";
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function SummaryCards({ expenses }) {

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (

    <div style={{ marginBottom: "20px" }}>

      <Typography variant="h5" gutterBottom>
        Expense Summary
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2}>

        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Total Expenses</Typography>
              <Typography variant="h6">₹{total}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Transactions</Typography>
              <Typography variant="h6">{expenses.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Expense Table */}
      <Card style={{ marginTop: "20px" }}>

        <CardContent>

          <Typography variant="h6" gutterBottom>
            Expense Details
          </Typography>

          <Table>

            <TableHead>
              <TableRow>
                  <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
              
                <TableCell>Platform</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {expenses.map((expense) => (

                <TableRow key={expense.expenseId}>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  
                  <TableCell>{expense.platform}</TableCell>
                  <TableCell>{expense.transactionDate}</TableCell>
                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

    </div>

  );

}

export default SummaryCards;