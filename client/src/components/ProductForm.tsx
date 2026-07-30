import { useEffect, useState } from "react";

type ProductFormProps = {
  onClose: () => void;
  onSave: (product: {
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    minStock: number;
    warehouse: string;
  }) => void;

  product?: {
    id: number;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    minStock: number;
    warehouse: string;
  } | null;
};

function ProductForm({
  onClose,
  onSave,
  product,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState("");
  const [warehouse, setWarehouse] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setCategory(product.category);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setMinStock(product.minStock.toString());
      setWarehouse(product.warehouse);
    } else {
      setName("");
      setSku("");
      setCategory("");
      setPrice("");
      setStock("");
      setMinStock("");
      setWarehouse("");
    }
  }, [product]);

  const handleSave = () => {
    if (
      !name ||
      !sku ||
      !category ||
      !price ||
      !stock ||
      !minStock ||
      !warehouse
    ) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      name,
      sku,
      category,
      price: Number(price),
      stock: Number(stock),
      minStock: Number(minStock),
      warehouse,
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
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>{product ? "Edit Product" : "Add Product"}</h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ✖
          </button>
        </div>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="SKU / Code"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Unit Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Current Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Minimum Stock Alert"
          value={minStock}
          onChange={(e) => setMinStock(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Warehouse / Location"
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          style={inputStyle}
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
          {product ? "Update Product" : "Save Product"}
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

export default ProductForm;