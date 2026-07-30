import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import EmployeeForm from "../components/EmployeeForm";
import { useTheme } from "../context/ThemeContext";

type Employee = {
  id: number;
  name: string;
  department: string;
  email: string;
};

function Employees() {
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const savedEmployees = localStorage.getItem("employees");

    if (savedEmployees) {
      return JSON.parse(savedEmployees) as Employee[];
    }

    return [
      {
        id: 1,
        name: "Rahul Sharma",
        department: "HR",
        email: "rahul@gmail.com",
      },
      {
        id: 2,
        name: "Priya Singh",
        department: "Sales",
        email: "priya@gmail.com",
      },
      {
        id: 3,
        name: "Amit Kumar",
        department: "IT",
        email: "amit@gmail.com",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Add / Update Employee
  const saveEmployee = (employee: {
    name: string;
    department: string;
    email: string;
  }) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id
            ? { ...editingEmployee, ...employee }
            : emp
        )
      );

      setEditingEmployee(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        ...employee,
      };

      setEmployees([...employees, newEmployee]);
    }
  };

  // Delete Employee
  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Search Employee
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
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
          <h1>Employee Management</h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <input
              type="text"
              placeholder="Search Employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
  padding: "10px",
  width: "300px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  background: theme === "dark" ? "#374151" : "#ffffff",
  color: theme === "dark" ? "#ffffff" : "#111827",
}}
            />

            <button
              onClick={() => {
                setEditingEmployee(null);
                setShowForm(true);
              }}
              style={{
                background: "#2563eb",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              + Add Employee
            </button>
          </div>

          {showForm && (
            <EmployeeForm
              employee={editingEmployee}
              onSave={saveEmployee}
              onClose={() => {
                setEditingEmployee(null);
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
    marginTop: "20px",
  }}
>
            <thead
              style={{
                background: "#2563eb",
                color: "white",
              }}
            >
              <tr>
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>Name</th>
                <th style={{ padding: "12px" }}>Department</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
                              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
                    {emp.id}
                  </td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
                    {emp.name}
                  </td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
                    {emp.department}
                  </td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
                    {emp.email}
                  </td>

                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
                    <button
                      onClick={() => {
                        setEditingEmployee(emp);
                        setShowForm(true);
                      }}
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;