import { useTheme } from "../context/ThemeContext";

type Props = {
  title: string;
  value: string;
  color: string;
};

function StatCard({ title, value, color }: Props) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        flex: 1,
        minWidth: "180px",
        padding: "20px",
        borderRadius: "12px",
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#111827",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderLeft: `6px solid ${color}`,
        transition: "0.3s",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          color: theme === "dark" ? "#d1d5db" : "#374151",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: color,
          margin: 0,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;