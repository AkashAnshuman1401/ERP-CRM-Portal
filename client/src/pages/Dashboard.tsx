import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import { useTheme } from "../context/ThemeContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


function Dashboard() {
  const { theme } = useTheme();

  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  const customers = JSON.parse(localStorage.getItem("customers") || "[]");

  const products = JSON.parse(localStorage.getItem("products") || "[]");

  const sales = JSON.parse(localStorage.getItem("sales") || "[]");

  const revenue = sales.reduce(
    (sum: number, sale: any) => sum + sale.total,
    0
  );

  const lowStock = products.filter(
    (p: any) => p.stock <= p.minStock
  );

  const recentSales = [...sales].reverse().slice(0, 5);

  // Charts Data
  const salesChartData = sales.map((sale: any, index: number) => ({
    name: `Sale ${index + 1}`,
    revenue: sale.total,
  }));

  const revenueTrendData = sales.map((sale: any, index: number) => ({
  sale: `Sale ${index + 1}`,
  revenue: sale.total,
}));

  const categoryCount: { [key: string]: number } = {};

  products.forEach((product: any) => {
    categoryCount[product.category] =
      (categoryCount[product.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />

        <div
  style={{
    padding: "30px",
    background: theme === "dark" ? "#111827" : "#f3f4f6",
    minHeight: "100vh",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
          <h1>Welcome Admin 👋</h1>
          <p
  style={{
    marginTop: "-5px",
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
  }}
>
  Here's an overview of your ERP CRM system.
</p>

          <h3>ERP CRM Dashboard</h3>

          <hr />

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <StatCard
              title="Employees"
              value={employees.length.toString()}
              color="#2563eb"
            />

            <StatCard
              title="Customers"
              value={customers.length.toString()}
              color="#16a34a"
            />

            <StatCard
              title="Products"
              value={products.length.toString()}
              color="#dc2626"
            />

            <StatCard
              title="Sales"
              value={sales.length.toString()}
              color="#f59e0b"
            />

            <StatCard
  title="Revenue"
  value={`₹${revenue.toLocaleString()}`}
  color="#7c3aed"
/>

            <StatCard
              title="Low Stock"
              value={lowStock.length.toString()}
              color="#ef4444"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "40px",
              alignItems: "flex-start",
            }}
          >
            <div
  style={{
    flex: 2,
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  }}
>
              <h2>Recent Sales</h2>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
  style={{
    padding: "12px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
  }}
>
  Challan
</th>

<th
  style={{
    padding: "12px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
  }}
>
  Customer
</th>

<th
  style={{
    padding: "12px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
  }}
>
  Total
</th>

<th
  style={{
    padding: "12px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
  }}
>
  Status
</th>
                  </tr>
                </thead>

                <tbody>
                  {recentSales.length > 0 ? (
                    recentSales.map((sale: any) => (
                      <tr key={sale.id}>
                        <td
  style={{
    padding: "12px",
    borderBottom: "1px solid #ddd",
  }}
>
  {sale.challanNo}
</td>

<td
  style={{
    padding: "12px",
    borderBottom: "1px solid #ddd",
  }}
>
  {sale.customer}
</td>

<td
  style={{
    padding: "12px",
    borderBottom: "1px solid #ddd",
  }}
>
  ₹{sale.total.toLocaleString()}
</td>

<td
  style={{
    padding: "12px",
    borderBottom: "1px solid #ddd",
  }}
>
  {sale.status}
</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        No Sales Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div
  style={{
    flex: 1,
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  }}
>
              <h2>Low Stock Alerts</h2>

              {lowStock.length > 0 ? (
                lowStock.map((product: any) => (
                  <div
                    key={product.id}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      background:
  theme === "dark"
    ? "#3f1d1d"
    : "#fef2f2",

color:
  theme === "dark"
    ? "#ffffff"
    : "#111827",
                      borderRadius: "5px",
                    }}
                  >
                    <strong>{product.name}</strong>
                    <br />
                    Stock Left: {product.stock}
                  </div>
                ))
              ) : (
                <p>No Low Stock Products 🎉</p>
              )}
            </div>
          </div>

          {/* Charts */}

          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            <div
  style={{
    flex: 1,
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  }}
>
              <h2>Sales Revenue</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div
  style={{
    flex: 1,
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  }}
>
              <h2>Products by Category</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div
  style={{
    marginTop: "40px",
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  }}
>
  <h2>Revenue Trend</h2>

  <ResponsiveContainer width="100%" height={350}>
    <LineChart data={revenueTrendData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="sale" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#16a34a"
        strokeWidth={4}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;