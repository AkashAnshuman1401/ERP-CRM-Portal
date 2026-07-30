import { useEffect, useState } from "react";

type EmployeeFormProps = {
  onClose: () => void;
  onSave: (employee: {
    name: string;
    department: string;
    email: string;
  }) => void;
  employee?: {
    id: number;
    name: string;
    department: string;
    email: string;
  } | null;
};

function EmployeeForm({
  onClose,
  onSave,
  employee,
}: EmployeeFormProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setDepartment(employee.department);
      setEmail(employee.email);
    } else {
      setName("");
      setDepartment("");
      setEmail("");
    }
  }, [employee]);

  const handleSave = () => {
    if (!name || !department || !email) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      name,
      department,
      email,
    });

    setName("");
    setDepartment("");
    setEmail("");

    onClose();
  };

  return (
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
          width: "400px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
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
          <h2>
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>

        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {employee ? "Update Employee" : "Save Employee"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeForm;