import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import { useTheme } from "../context/ThemeContext";

import * as XLSX from "xlsx";

function Reports() {
    const { theme } = useTheme();
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const sales = JSON.parse(localStorage.getItem("sales") || "[]");

  const revenue = sales.reduce(
    (sum: number, sale: any) => sum + sale.total,
    0
  );

  const exportToExcel = () => {
  const sales = JSON.parse(localStorage.getItem("sales") || "[]");

  if (sales.length === 0) {
    alert("No sales data available.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(sales);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Sales Report"
  );

  XLSX.writeFile(workbook, "Sales_Report.xlsx");
};

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
          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h1>Reports</h1>

  <button
    onClick={exportToExcel}
    style={{
      background: "#16a34a",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    📊 Export Excel
  </button>
</div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "25px",
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
              value={`₹${revenue}`}
              color="#7c3aed"
            />
          </div>

         <div
  style={{
    marginTop: "40px",
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "20px",
    borderRadius: "10px",
  }}
>
            <h2>Sales Report</h2>

           <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
              <thead>
                <tr>
                  <th>Challan</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {sales.length > 0 ? (
                  sales.map((sale: any) => (
                    <tr key={sale.id}>
                      <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {sale.challanNo}
</td>
                      <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {sale.challanNo}
</td>
                      <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {sale.challanNo}
</td>
                      <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {sale.challanNo}
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
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
                      No Sales Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;