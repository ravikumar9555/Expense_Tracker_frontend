import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import Sidebar from "../components/Sidebar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import OverviewCard from "../components/OverviewCard";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [expenses, setExpenses] = useState(user?.expenses || []);
  const [page, setPage] = useState("overview");

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const latest = expenses.slice(-5).reverse();

  const now = new Date();

  // Monthly expenses
  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.transactionDate);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  // Yearly expenses
  const yearlyExpenses = expenses.filter((e) => {
    const d = new Date(e.transactionDate);
    return d.getFullYear() === now.getFullYear();
  });

  // Monthly total
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  // Yearly total
  const yearlyTotal = yearlyExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const renderPage = () => {

    switch (page) {

      case "overview":
        return (
          <Box>

            <OverviewCard expenses={expenses} />
            {/* <PaymentModeChart expenses={expenses} /> */}
            <Box sx={{ mt: 4 }}>
              <ExpenseList expenses={latest} />
            </Box>

          </Box>
        );

      case "add":
        return <ExpenseForm addExpense={addExpense} />;

      case "latest":
        return <ExpenseList expenses={latest} />;

      case "monthly":
        return (
          <Box>

            <Typography variant="h4" mb={2}>
              Monthly Expense
            </Typography>

            <Typography variant="h5" mb={4}>
              ₹{monthlyTotal}
            </Typography>

            <ExpenseChart expenses={monthlyExpenses} />

          </Box>
        );

      case "yearly":
        return (
          <Box>

            <Typography variant="h4" mb={2}>
              Yearly Expense
            </Typography>

            <Typography variant="h5" mb={4}>
              ₹{yearlyTotal}
            </Typography>

            <ExpenseChart expenses={yearlyExpenses} />

          </Box>
        );

      default:
        return null;

    }

  };

  return (

    <Box
      sx={{
        display: "flex",
        background: "#f5f6fa",
        minHeight: "100vh"
      }}
    >

      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      {/* Content */}

      <Box
        sx={{
          flex: 1,
          p: 4,
          maxWidth: "1200px"
        }}
      >

        {renderPage()}

      </Box>

    </Box>

  );

}

export default Dashboard;