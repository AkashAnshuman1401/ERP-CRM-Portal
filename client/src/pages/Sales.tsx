import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SalesForm from "../components/SalesForm";
import { useTheme } from "../context/ThemeContext";

type Sale = {
  id: number;
  challanNo: string;
  customer: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  date: string;
};

function Sales() {
    const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem("sales");

    if (saved) {
      return JSON.parse(saved);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  const saveSale = (sale: Omit<Sale, "id">) => {
    setSales([
      ...sales,
      {
        id: Date.now(),
        ...sale,
      },
    ]);
  };

  const printInvoice = (sale: Sale) => {
  const invoiceWindow = window.open("", "_blank");

  if (!invoiceWindow) return;

  invoiceWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>

        <style>
          body{
            font-family:Arial;
            padding:40px;
          }

          h1{
            text-align:center;
            color:#2563eb;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          table,th,td{
            border:1px solid black;
          }

          th,td{
            padding:10px;
          }

          .total{
            text-align:right;
            font-size:22px;
            margin-top:20px;
            font-weight:bold;
          }
        </style>

      </head>

      <body>

        <h1>ERP CRM PORTAL</h1>

        <hr>

        <p><b>Challan No:</b> ${sale.challanNo}</p>

        <p><b>Customer:</b> ${sale.customer}</p>

        <p><b>Date:</b> ${sale.date}</p>

        <p><b>Status:</b> ${sale.status}</p>

        <table>

          <tr>
  <th>Product</th>
  <th>Quantity</th>
  <th>Price</th>
  <th>Total</th>
</tr>

<tr>
  <td>${sale.product}</td>
  <td>${sale.quantity}</td>
  <td>₹${sale.price}</td>
  <td>₹${sale.total}</td>
</tr>

        </table>

        <div class="total">

          Grand Total : ₹${sale.total}

        </div>

      </body>

    </html>
  `);

  invoiceWindow.document.close();
  invoiceWindow.focus();
  invoiceWindow.print();
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
          <h1>Sales Challan</h1>

          <p
  style={{
    marginTop: "5px",
    marginBottom: "20px",
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
  }}
>
  Total Challans: <b>{sales.length}</b>
</p>

<p
  style={{
    marginTop: "-10px",
    marginBottom: "20px",
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
  }}
>
  Revenue: ₹
  {sales
    .reduce((sum, sale) => sum + sale.total, 0)
    .toLocaleString()}
</p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <button
  onClick={() => setShowForm(true)}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  ➕ New Challan
</button>
          </div>

          {showForm && (
            <SalesForm
              onSave={saveSale}
              onClose={() => setShowForm(false)}
            />
          )}

         <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  }}
>
            <thead
  style={{
    background: "#2563eb",
    color: "white",
  }}
>
  <tr>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  ID
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Challan No
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Customer
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Product
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Qty
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Price
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Total
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Status
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Date
</th>
    <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Action
</th>
  </tr>
</thead>

<tbody>
  {sales.length > 0 ? (
    sales.map((sale) => (
      <tr
  key={sale.id}
  onMouseEnter={(e) => {
    e.currentTarget.style.background =
      theme === "dark" ? "#374151" : "#f9fafb";
  }}
  onMouseLeave={(e) => {
  e.currentTarget.style.background =
    theme === "dark" ? "#1f2937" : "#ffffff";
}}
>
        <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {sale.id}
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
  {sale.customer}
</td>
        <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {sale.product}
</td>
        <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {sale.quantity}
</td>
        <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  ₹{sale.price.toLocaleString()}
</td>
        <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  ₹{sale.total.toLocaleString()}
</td>

        <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "5px",
      background:
        sale.status === "Confirmed"
          ? "#16a34a"
          : "#f59e0b",
      color: "white",
      fontWeight: "bold",
    }}
  >
    {sale.status}
  </span>
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  {sale.date}
</td>

        <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  <button
    onClick={() => printInvoice(sale)}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    🖨 Print
  </button>
</td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={10}
       style={{
  textAlign: "center",
  padding: "20px",
  color: theme === "dark" ? "#ffffff" : "#111827",
}}
      >
        No Sales Challans Found
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales;