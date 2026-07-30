import { useEffect, useState } from "react";

type CustomerFormProps = {
  onClose: () => void;
  onSave: (customer: {
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
  }) => void;
  customer?: {
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
  } | null;
};

function CustomerForm({
  onClose,
  onSave,
  customer,
}: CustomerFormProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [gst, setGst] = useState("");
  const [customerType, setCustomerType] = useState("Retail");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Lead");
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setMobile(customer.mobile);
      setEmail(customer.email);
      setBusinessName(customer.businessName);
      setGst(customer.gst);
      setCustomerType(customer.customerType);
      setAddress(customer.address);
      setStatus(customer.status);
      setFollowUpDate(customer.followUpDate);
      setNotes(customer.notes);
    } else {
      setName("");
      setMobile("");
      setEmail("");
      setBusinessName("");
      setGst("");
      setCustomerType("Retail");
      setAddress("");
      setStatus("Lead");
      setFollowUpDate("");
      setNotes("");
    }
  }, [customer]);

  const handleSave = () => {
    if (!name || !mobile || !email || !businessName) {
      alert("Please fill all required fields");
      return;
    }

    onSave({
      name,
      mobile,
      email,
      businessName,
      gst,
      customerType,
      address,
      status,
      followUpDate,
      notes,
    });

    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>{customer ? "Edit Customer" : "Add Customer"}</h2>

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
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="GST Number (Optional)"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
          style={inputStyle}
        />

        <select
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          style={inputStyle}
        >
          <option>Retail</option>
          <option>Wholesale</option>
          <option>Distributor</option>
        </select>

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={textAreaStyle}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option>Lead</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <input
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={textAreaStyle}
        />

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {customer ? "Update Customer" : "Save Customer"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  boxSizing: "border-box" as const,
};

const textAreaStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  minHeight: "70px",
  resize: "vertical" as const,
  boxSizing: "border-box" as const,
};

export default CustomerForm;