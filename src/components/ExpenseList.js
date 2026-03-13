import React from "react";

function ExpenseList({ expenses }) {

  return (

    <div>

      <h3>Expense List</h3>

      {expenses.length === 0 && <p>No expenses yet</p>}

      {expenses.map((expense) => (

        <div key={expense.expenseId} style={{border:"1px solid #ddd",padding:"10px",margin:"5px"}}>

          <p>Description: {expense.description}</p>
          <p>Amount: ₹{expense.amount}</p>
          <p>Platform: {expense.platform}</p>
          <p>Date: {expense.transactionDate}</p>

        </div>

      ))}

    </div>

  );

}

export default ExpenseList;