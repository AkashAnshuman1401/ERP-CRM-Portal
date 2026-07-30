import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Inventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    setProducts(storedProducts);
  }, []);

  const updateStock = (id: number, type: "in" | "out") => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        if (type === "in") {
          return {
            ...product,
            stock: product.stock + 1,
          };
        } else {
          return {
            ...product,
            stock: product.stock > 0 ? product.stock - 1 : 0,
          };
        }
      }

      return product;
    });

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />

        <div style={{ padding: "30px" }}>
          <h1>Inventory Management</h1>

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "300px",
              padding: "10px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#2563eb", color: "white" }}>
                <th style={{ padding: "12px" }}>Product</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Minimum</th>
                <th>Warehouse</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td style={{ padding: "10px" }}>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.stock}</td>
                    <td>{product.minStock}</td>
                    <td>{product.warehouse}</td>

                    <td>
                      {product.stock <= product.minStock ? (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          Low Stock
                        </span>
                      ) : (
                        <span style={{ color: "green" }}>
                          In Stock
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => updateStock(product.id, "in")}
                        style={{
                          marginRight: "10px",
                          background: "green",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          cursor: "pointer",
                        }}
                      >
                        + Stock
                      </button>

                      <button
                        onClick={() => updateStock(product.id, "out")}
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          cursor: "pointer",
                        }}
                      >
                        - Stock
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Products Found
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

export default Inventory;