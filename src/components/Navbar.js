import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (

    <nav className="navbar">

      <h2>ExpenseTracker</h2>

      <div>

        <button onClick={() => navigate("/login")}>
          Sign In
        </button>

        <button onClick={() => navigate("/signup")}>
          Sign Up
        </button>

      </div>

    </nav>

  );
}

export default Navbar;