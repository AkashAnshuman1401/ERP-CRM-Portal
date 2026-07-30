import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const { theme } = useTheme();

  return (
    <div
      className="sidebar"
      style={{
        width: "250px",
        height: "100vh",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
        background: theme === "dark" ? "#0f172a" : "#1e293b",
        transition: "0.3s",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        ERP CRM
      </h2>

      <hr style={{ borderColor: "#475569" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/employees"
          style={{ color: "white", textDecoration: "none" }}
        >
          👨 Employees
        </Link>

        <Link
          to="/customers"
          style={{ color: "white", textDecoration: "none" }}
        >
          🧑 Customers
        </Link>

        <Link
          to="/products"
          style={{ color: "white", textDecoration: "none" }}
        >
          📦 Products
        </Link>

        <Link
          to="/sales"
          style={{ color: "white", textDecoration: "none" }}
        >
          💰 Sales
        </Link>

        <Link
          to="/reports"
          style={{ color: "white", textDecoration: "none" }}
        >
          📈 Reports
        </Link>

        <hr
          style={{
            borderColor: "#475569",
            marginTop: "20px",
          }}
        />

        <Link
          to="/login"
          style={{
            color: "#f87171",
            textDecoration: "none",
            marginTop: "10px",
          }}
        >
          🚪 Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;