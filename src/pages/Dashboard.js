import { useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCards from "../components/SummaryCards";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [expenses, setExpenses] = useState(user?.expenses || []);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (

    <div>

      <Navbar />

      <div className="dashboard">

        <SummaryCards expenses={expenses} />

        <ExpenseChart expenses={expenses} />

        <ExpenseForm addExpense={addExpense} />

        <ExpenseList expenses={expenses} />

      </div>

    </div>

  );
}

export default Dashboard;