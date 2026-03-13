import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {

  const upi = expenses
    .filter((e) => e.platform?.toLowerCase() === "upi")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const cash = expenses
    .filter((e) => e.platform?.toLowerCase() === "cash")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const card = expenses
    .filter((e) => e.platform?.toLowerCase() === "card")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const data = {
    labels: ["UPI", "Cash", "Card"],
    datasets: [
      {
        data: [upi, cash, card],
        backgroundColor: [
          "#3498db",
          "#2ecc71",
          "#e74c3c"
        ]
      }
    ]
  };

  return (
    <div style={{ width: "450px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center" }}>
        Expense Distribution
      </h2>

      {upi === 0 && cash === 0 && card === 0 ? (
        <p style={{ textAlign: "center" }}>No data available</p>
      ) : (
        <Pie data={data} />
      )}
    </div>
  );
}

export default ExpenseChart;