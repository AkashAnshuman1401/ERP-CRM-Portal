import { useTheme } from "../context/ThemeContext";

function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        height: "70px",
        background: theme === "dark" ? "#1f2937" : "#2563eb",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
      }}
    >
      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 15px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: theme === "dark" ? "#facc15" : "#111827",
            color: theme === "dark" ? "#111827" : "#ffffff",
            fontWeight: "bold",
          }}
        >
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>

        <h3 style={{ margin: 0 }}>Admin</h3>
      </div>
    </div>
  );
}

export default Topbar;