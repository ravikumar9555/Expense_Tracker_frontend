import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {

  const upi = expenses.filter(e => e.platform === "UPI")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const cash = expenses.filter(e => e.platform === "Cash")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const card = expenses.filter(e => e.platform === "Card")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const data = {
    labels: ["UPI", "Cash", "Card"],
    datasets: [
      {
        data: [upi, cash, card],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"]
      }
    ]
  };

  return (

    <div className="chart">

      <h3>Expense Distribution</h3>

      <Pie data={data} />

    </div>

  );
}

export default ExpenseChart;