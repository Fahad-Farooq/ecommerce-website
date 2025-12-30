import { useEffect, useState } from "react";
import API from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    public_id: "",
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setForm((prev) => ({
        ...prev,
        image: res.data.url,
        public_id: res.data.public_id,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editId) {
        await API.put(`/products/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post("/products", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        public_id: "",
      });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error Saving Product: ", error);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      public_id: product.public_id,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchProducts();
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
      public_id: "",
    });
  };
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Manage Products
      </h2>
      {user?.isAdmin ? (
        <div className="grid md:grid-cols-2 gap-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rouned-md focus:ring focus:ring-blue-300 mb-2"
              required
            />
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rouned-md focus:ring focus:ring-blue-300 mb-2"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border rouned-md focus:ring focus:ring-blue-300 mb-2"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rouned-md focus:ring focus:ring-blue-300 mb-2"
              required
            />
            <input
              type="text"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full p-2 border rouned-md focus:ring focus:ring-blue-300 mb-2"
              required
            />

            <input type="file" onChange={handleUpload} accept="image/*" />
            {uploading && <p>Uploading...</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editId ? "Update Product" : "Add Product"}
            </button>
            {form.image && <img src={form.image} className="w-20 rounded" />}
            {editId && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </form>
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Product List
            </h3>
            {products.length === 0 ? (
              <p className="text-gray-500">No Products Available</p>
            ) : (
              <ul className="">
                {products.map((p) => (
                  <li
                    key={p._id}
                    className="p-3 flex justify-between items-start hover:bg-gray-50 transition"
                  >
                    <div className="flex">
                      <div>
                        {" "}
                        <img
                          src={p.image}
                          alt=""
                          className="w-40 rounded-lg mr-2.5"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-600 mb-1">
                          {p.category}
                        </p>
                        <p className="text-gray-700">
                          ${p.price} | Stock: {p.stock}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 text-white bg-yellow-400 text-sm rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1  text-white bg-red-500 text-sm rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-lg text-red-600 font-semibold">
            You Are Not Authorized To View This Page
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
