import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import OverviewCard from "../components/OverviewCard";

import { getExpensesApi } from "../services/   authService";
import { isTokenValid } from "../utils/authUtils";

function Dashboard() {

  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState("overview");

  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [loading,setLoading] = useState(false);

  const [showAddForm,setShowAddForm] = useState(false);

  // 🔐 Token validation
  useEffect(() => {

    if(!isTokenValid()){

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      navigate("/login",{replace:true});

    }

  },[navigate]);

  // 📦 Fetch expenses
  useEffect(()=>{

    loadExpenses(currentPage);

  },[currentPage]);

  const loadExpenses = async (pageNumber) => {

    try {

      setLoading(true);

      const backendPage = pageNumber - 1;

      const data = await getExpensesApi(backendPage,20);

      console.log("API Response:",data);

      setExpenses(data?.expenses || []);

      setTotalPages(data?.totalPages || 1);

    }
    catch(err){

      console.log("Error loading expenses",err);

    }
    finally{

      setLoading(false);

    }

  };

  const addExpense = () => {

    setShowAddForm(false);

    loadExpenses(currentPage);

  };

  const latest = expenses.slice(0,5);

  const now = new Date();

  const monthlyExpenses = expenses.filter((e)=>{
    const d = new Date(e.transactionDate);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const yearlyExpenses = expenses.filter((e)=>{
    const d = new Date(e.transactionDate);
    return d.getFullYear() === now.getFullYear();
  });

  const monthlyTotal = monthlyExpenses.reduce((sum,e)=>sum + Number(e.amount),0);
  const yearlyTotal = yearlyExpenses.reduce((sum,e)=>sum + Number(e.amount),0);

  const renderPage = ()=>{

    switch(page){

      case "overview":
        return(

          <Box>

            <OverviewCard expenses={expenses}/>

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

            {showAddForm && (
              <ExpenseForm addExpense={addExpense}/>
            )}

            <ExpenseList
              expenses={latest}
              reloadExpenses={()=>loadExpenses(currentPage)}
            />

          </Box>

        );

      case "latest":
        return(

          <Box>

            {loading ? (

              <Box sx={{textAlign:"center",mt:5}}>
                <CircularProgress/>
              </Box>

            ) : (

              <ExpenseList
                expenses={expenses}
                reloadExpenses={()=>loadExpenses(currentPage)}
              />

            )}

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e,value)=>setCurrentPage(value)}
              sx={{mt:4,display:"flex",justifyContent:"center"}}
            />

          </Box>

        );

      case "monthly":
        return(

          <Box>

            <Typography variant="h4" mb={2}>
              Monthly Expense
            </Typography>

            <Typography variant="h5" mb={4}>
              ₹{monthlyTotal}
            </Typography>

            <ExpenseChart expenses={monthlyExpenses}/>

          </Box>

        );

      case "yearly":
        return(

          <Box>

            <Typography variant="h4" mb={2}>
              Yearly Expense
            </Typography>

            <Typography variant="h5" mb={4}>
              ₹{yearlyTotal}
            </Typography>

            <ExpenseChart expenses={yearlyExpenses}/>

          </Box>

        );

      default:
        return null;

    }

  };

  return(

    <Box
      sx={{
        display:"flex",
        background:"#f5f6fa",
        minHeight:"100vh"
      }}
    >

      <Sidebar setPage={setPage}/>

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