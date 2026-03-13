import React, { useState } from "react";

function ExpenseForm({ addExpense }) {

  const [description,setDescription] = useState("");
  const [amount,setAmount] = useState("");
  const [platform,setPlatform] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const newExpense = {
      expenseId: Date.now(),
      description,
      amount: Number(amount),
      platform,
      transactionDate: new Date().toISOString().split("T")[0]
    };

    addExpense(newExpense);

    setDescription("");
    setAmount("");
    setPlatform("");

  };

  return (

    <div>

      <h3>Add Expense</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={(e)=>setPlatform(e.target.value)}
        />

        <button type="submit">Add</button>

      </form>

    </div>

  );

}

export default ExpenseForm;