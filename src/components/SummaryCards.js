function SummaryCards({ expenses }) {

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const monthly = total; 
  const yearly = total;

  return (

    <div className="cards">

      <div className="card">
        <h3>Total Expense</h3>
        <p>₹{total}</p>
      </div>

      <div className="card">
        <h3>Monthly</h3>
        <p>₹{monthly}</p>
      </div>

      <div className="card">
        <h3>Yearly</h3>
        <p>₹{yearly}</p>
      </div>

    </div>

  );
}

export default SummaryCards;