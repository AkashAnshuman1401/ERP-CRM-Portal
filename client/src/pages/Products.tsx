import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ProductForm from "../components/ProductForm";
import { useTheme } from "../context/ThemeContext";

type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  warehouse: string;
};

function Products() {
    const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [viewProduct, setViewProduct] =
    useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      return JSON.parse(savedProducts);
    }

    return [
      {
        id: 1,
        name: "Laptop",
        sku: "LP001",
        category: "Electronics",
        price: 65000,
        stock: 20,
        minStock: 5,
        warehouse: "Warehouse A",
      },
      {
        id: 2,
        name: "Keyboard",
        sku: "KB001",
        category: "Accessories",
        price: 1200,
        stock: 100,
        minStock: 20,
        warehouse: "Warehouse B",
      },
      {
        id: 3,
        name: "Mouse",
        sku: "MS001",
        category: "Accessories",
        price: 800,
        stock: 10,
        minStock: 15,
        warehouse: "Warehouse A",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  const saveProduct = (
    product: Omit<Product, "id">
  ) => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...editingProduct,
                ...product,
              }
            : p
        )
      );

      setEditingProduct(null);
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...product,
        },
      ]);
    }
  };

  const deleteProduct = (id: number) => {
    if (window.confirm("Delete this product?")) {
      setProducts(
        products.filter((p) => p.id !== id)
      );
    }
  };

  const filteredProducts = products.filter((p) =>
  [
    p.name,
    p.sku,
    p.category,
    p.warehouse,
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
          <h1 style={{ marginBottom: "5px" }}>
  Product Management
</h1>

<p
  style={{
    marginTop: 0,
    marginBottom: "20px",
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
  }}
>
  Total Products: <b>{products.length}</b>
</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
  width: "320px",
  padding: "10px 14px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  outline: "none",
  background: theme === "dark" ? "#374151" : "#ffffff",
  color: theme === "dark" ? "#ffffff" : "#111827",
}}
            />

            <button
  onClick={() => {
    setEditingProduct(null);
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
              ➕ Add Product
            </button>
          </div>

          {showForm && (
            <ProductForm
              product={editingProduct}
              onSave={saveProduct}
              onClose={() => {
                setEditingProduct(null);
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
  ID
</th>
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
  ID
</th>
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
  ID
</th>
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
  ID
</th>
              </tr>
            </thead>

            <tbody>
                             {filteredProducts.map((product) => (
  <tr
    key={product.id}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        theme === "dark" ? "#374151" : "#f9fafb";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
    }}
  >
                  <td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {product.id}
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
    fontWeight: "600",
  }}
>
  {product.name}
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {product.sku}
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {product.category}
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: "#16a34a",
    fontWeight: "bold",
  }}
>
  ₹{product.price.toLocaleString()}
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color:
      product.stock <= product.minStock
        ? "#dc2626"
        : "#16a34a",
    fontWeight: "bold",
  }}
>
  {product.stock}

  {product.stock <= product.minStock && (
    <div
      style={{
        fontSize: "12px",
        marginTop: "4px",
        color: "#dc2626",
      }}
    >
      ⚠ Low Stock
    </div>
  )}
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    color: theme === "dark" ? "#ffffff" : "#111827",
  }}
>
  {product.warehouse}
</td>

<td
  style={{
    padding: "12px",
    border: "1px solid #ddd",
    whiteSpace: "nowrap",
  }}
>
  <button
    onClick={() => setViewProduct(product)}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "6px",
      fontSize: "13px",
    }}
  >
    👁 View
  </button>

  <button
    onClick={() => {
      setEditingProduct(product);
      setShowForm(true);
    }}
    style={{
      background: "#f59e0b",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "6px",
      fontSize: "13px",
    }}
  >
    ✏ Edit
  </button>

  <button
    onClick={() => deleteProduct(product.id)}
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "13px",
    }}
  >
    🗑 Delete
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>

          {viewProduct && (
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
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#ffffff" : "#111827",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  }}
>
  <h2 style={{ marginTop: 0 }}>
    📦 Product Details
  </h2>

  <hr style={{ marginBottom: "20px" }} />

  <p>
    <b>Product Name:</b> {viewProduct.name}
  </p>

  <p>
    <b>SKU:</b> {viewProduct.sku}
  </p>

  <p>
    <b>Category:</b> {viewProduct.category}
  </p>

  <p>
    <b>Price:</b> ₹{viewProduct.price.toLocaleString()}
  </p>

  <p>
    <b>Current Stock:</b> {viewProduct.stock}

    {viewProduct.stock <= viewProduct.minStock && (
      <span
        style={{
          color: "#dc2626",
          marginLeft: "10px",
          fontWeight: "bold",
        }}
      >
        ⚠ Low Stock
      </span>
    )}
  </p>

  <p>
    <b>Minimum Stock:</b> {viewProduct.minStock}
  </p>

  <p>
    <b>Warehouse:</b> {viewProduct.warehouse}
  </p>

  <button
    onClick={() => {
      setEditingProduct(viewProduct);
      setViewProduct(null);
      setShowForm(true);
    }}
    style={{
      width: "48%",
      padding: "10px",
      background: "#f59e0b",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "4%",
      marginTop: "20px",
    }}
  >
    ✏ Edit Product
  </button>

  <button
    onClick={() => setViewProduct(null)}
    style={{
      width: "48%",
      padding: "10px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "20px",
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

export default Products;