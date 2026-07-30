import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "50px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          width: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          ERP CRM Portal
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            marginBottom: "30px",
          }}
        >
          Welcome to the ERP CRM Management System
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;