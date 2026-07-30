import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CustomerForm from "../components/CustomerForm";
import { useTheme } from "../context/ThemeContext";

type Customer = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  businessName: string;
  gst: string;
  customerType: string;
  address: string;
  status: string;
  followUpDate: string;
  notes: string;
};

function Customers() {
    const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [viewCustomer, setViewCustomer] =
    useState<Customer | null>(null);

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const savedCustomers = localStorage.getItem("customers");

    if (savedCustomers) {
      return JSON.parse(savedCustomers);
    }

    return [
      {
        id: 1,
        name: "John Smith",
        mobile: "9876543210",
        email: "john@gmail.com",
        businessName: "ABC Pvt Ltd",
        gst: "27ABCDE1234F1Z5",
        customerType: "Wholesale",
        address: "Mumbai",
        status: "Active",
        followUpDate: "2026-08-05",
        notes: "Regular customer",
      },
      {
        id: 2,
        name: "Sarah Wilson",
        mobile: "9123456780",
        email: "sarah@gmail.com",
        businessName: "XYZ Traders",
        gst: "",
        customerType: "Retail",
        address: "Delhi",
        status: "Lead",
        followUpDate: "2026-08-10",
        notes: "Interested in bulk purchase",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(
      "customers",
      JSON.stringify(customers)
    );
  }, [customers]);

  const saveCustomer = (customer: Omit<Customer, "id">) => {
    if (editingCustomer) {
      setCustomers(
        customers.map((c) =>
          c.id === editingCustomer.id
            ? {
                ...editingCustomer,
                ...customer,
              }
            : c
        )
      );

      setEditingCustomer(null);
    } else {
      setCustomers([
        ...customers,
        {
          id: Date.now(),
          ...customer,
        },
      ]);
    }
  };

  const deleteCustomer = (id: number) => {
    if (window.confirm("Delete this customer?")) {
      setCustomers(
        customers.filter((c) => c.id !== id)
      );
    }
  };

  const filteredCustomers = customers.filter((c) =>
  [
    c.name,
    c.mobile,
    c.email,
    c.businessName,
    c.gst,
    c.customerType,
    c.status,
  ]
    .join(" ")
    .toLowerCase()
    .includes(search.toLowerCase())
);

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
          <h1>Customer Management</h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
  width: "320px",
  padding: "10px",
  background: theme === "dark" ? "#374151" : "#ffffff",
  color: theme === "dark" ? "#ffffff" : "#111827",
  border: "1px solid #ccc",
  borderRadius: "6px",
}}
            />

           <button
  onClick={() => {
    setEditingCustomer(null);
    setShowForm(true);
  }}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
              + Add Customer
            </button>
          </div>

          {showForm && (
            <CustomerForm
              customer={editingCustomer}
              onSave={saveCustomer}
              onClose={() => {
                setEditingCustomer(null);
                setShowForm(false);
              }}
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
  Name
</th>
                <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Mobile
</th>
                <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Business
</th>
                <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Type
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
  Follow Up
</th>
                <th
  style={{
    padding: "14px",
    border: "1px solid #ddd",
    textAlign: "center",
  }}
>
  Actions
</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
  key={customer.id}
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
  {customer.id}
</td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {customer.name}
</td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {customer.mobile}
</td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {customer.businessName}
</td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {customer.customerType}
</td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {customer.status}
</td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {customer.followUpDate}
</td>

                  <td>
                    <button
                      onClick={() =>
                        setViewCustomer(customer)
                      }
                      style={{
                        marginRight: "5px",
                      }}
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setEditingCustomer(customer);
                        setShowForm(true);
                      }}
                      style={{
                        marginRight: "5px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCustomer(customer.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {viewCustomer && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
  style={{
    width: "500px",
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "25px",
    borderRadius: "10px",
  }}
>
                <h2>Customer Details</h2>

                <hr />

                <p>
                  <b>Name:</b> {viewCustomer.name}
                </p>

                <p>
                  <b>Mobile:</b> {viewCustomer.mobile}
                </p>

                <p>
                  <b>Email:</b> {viewCustomer.email}
                </p>

                <p>
                  <b>Business:</b>{" "}
                  {viewCustomer.businessName}
                </p>

                <p>
                  <b>GST:</b> {viewCustomer.gst || "-"}
                </p>

                <p>
                  <b>Customer Type:</b>{" "}
                  {viewCustomer.customerType}
                </p>

                <p>
                  <b>Status:</b> {viewCustomer.status}
                </p>

                <p>
                  <b>Address:</b>{" "}
                  {viewCustomer.address}
                </p>

                <p>
                  <b>Follow Up:</b>{" "}
                  {viewCustomer.followUpDate}
                </p>

                <p>
                  <b>Notes:</b> {viewCustomer.notes}
                </p>

                <button
                  onClick={() =>
                    setViewCustomer(null)
                  }
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    padding: "10px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;