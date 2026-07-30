import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type SalesFormProps = {
  onClose: () => void;
  onSave: (sale: {
    challanNo: string;
    customer: string;
    product: string;
    quantity: number;
    price: number;
    total: number;
    status: string;
    date: string;
  }) => void;
};

function SalesForm({ onClose, onSave }: SalesFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [customer, setCustomer] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Draft");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCustomers = localStorage.getItem("customers");
    const savedProducts = localStorage.getItem("products");

    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (product) {
      setTotal(product.price * quantity);
    } else {
      setTotal(0);
    }
  }, [productId, quantity, products]);

  const handleSave = () => {
  if (!customer || !productId) {
    alert("Please select customer and product.");
    return;
  }

  const selectedProduct = products.find(
    (p) => p.id === Number(productId)
  );

  if (!selectedProduct) return;

  if (quantity > selectedProduct.stock) {
    alert("Insufficient Stock!");
    return;
  }

  const updatedProducts = products.map((p) =>
    p.id === selectedProduct.id
      ? {
          ...p,
          stock: p.stock - quantity,
        }
      : p
  );

  localStorage.setItem(
    "products",
    JSON.stringify(updatedProducts)
  );

  onSave({
    challanNo: `CH-${Date.now()}`,
    customer,
    product: selectedProduct.name,
    quantity,
    price: selectedProduct.price,
    total,
    status,
    date: new Date().toLocaleDateString(),
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
          width: "450px",
          background: "white",
          padding: "25px",
          borderRadius: "10px",
        }}
      >
        <h2>Create Sales Challan</h2>

        <hr />

        <select
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            marginBottom: "10px",
          }}
        >
          <option value="">Select Customer</option>

          {customers.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option value="">Select Product</option>

          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          placeholder="Quantity"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          <option value="Draft">Draft</option>
          <option value="Confirmed">Confirmed</option>
        </select>

        <div
          style={{
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3>Total: ₹{total}</h3>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              background: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Challan
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;