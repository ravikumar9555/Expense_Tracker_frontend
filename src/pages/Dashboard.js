import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import Sidebar from "../components/Sidebar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import OverviewCard from "../components/OverviewCard";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [expenses, setExpenses] = useState(user?.expenses || []);
  const [page, setPage] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);

  // Add Expense
  const addExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
    setShowAddForm(false);
  };

  // Latest 5 expenses
  const latest = expenses.slice(0,5);

  const now = new Date();

  // Monthly Expenses
  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.transactionDate);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  // Yearly Expenses
  const yearlyExpenses = expenses.filter((e) => {
    const d = new Date(e.transactionDate);
    return d.getFullYear() === now.getFullYear();
  });

  // Monthly Total
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  // Yearly Total
  const yearlyTotal = yearlyExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const renderPage = () => {

    switch (page) {

      // ================= OVERVIEW =================
      case "overview":
        return (

          <Box>

            <OverviewCard expenses={expenses} />

            {/* HEADER */}
            <Box
              sx={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                mt:4,
                mb:2
              }}
            >

              <Typography variant="h5" fontWeight="bold">
                Latest Expenses
              </Typography>

              <Box
                sx={{
                  background:"#4CAF50",
                  color:"#fff",
                  px:3,
                  py:1,
                  borderRadius:"30px",
                  cursor:"pointer",
                  fontWeight:"bold",
                  "&:hover":{background:"#43a047"}
                }}
                onClick={()=>setShowAddForm(!showAddForm)}
              >
                + Add Expense
              </Box>

            </Box>

            {/* ADD EXPENSE FORM */}
            {showAddForm && (
              <ExpenseForm addExpense={addExpense}/>
            )}

            {/* EXPENSE LIST */}
            <ExpenseList
              expenses={latest}
              setExpenses={setExpenses}
            />

          </Box>
        );

      // ================= ADD PAGE =================
      case "add":
        return (
          <ExpenseForm
            addExpense={addExpense}
          />
        );

      // ================= ALL EXPENSES =================
      case "latest":
        return (
          <ExpenseList
            expenses={expenses}
            setExpenses={setExpenses}
          />
        );

      // ================= MONTHLY =================
      case "monthly":
        return (

          <Box>

            <Typography variant="h4" mb={2}>
              Monthly Expense
            </Typography>

            <Typography variant="h5" mb={4}>
              ₹{monthlyTotal}
            </Typography>

            <ExpenseChart
              expenses={monthlyExpenses}
            />

          </Box>

        );

      // ================= YEARLY =================
      case "yearly":
        return (

          <Box>

            <Typography variant="h4" mb={2}>
              Yearly Expense
            </Typography>

            <Typography variant="h5" mb={4}>
              ₹{yearlyTotal}
            </Typography>

            <ExpenseChart
              expenses={yearlyExpenses}
            />

          </Box>

        );

      default:
        return null;

    }

  };

  return (

    <Box
      sx={{
        display:"flex",
        background:"#f5f6fa",
        minHeight:"100vh"
      }}
    >

      {/* SIDEBAR */}
      <Sidebar setPage={setPage} />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex:1,
          p:4,
          maxWidth:"1200px"
        }}
      >

        {renderPage()}

      </Box>

    </Box>

  );

}

export default Dashboard;