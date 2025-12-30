import { useEffect, useState } from "react";
import API from "@/services/api";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed To Fetch Products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  if (loading) return <p className="text-center py-10">Loading Products...</p>;
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Explore Our Products
      </h1>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
              category === cat
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                : "bg=white text-gray-700 border-gray-300"
            } hover:bg-blue-50`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div>
        {filteredProducts.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <Link to={`/product/${p._id}`} key={p._id}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 p-4 flex flex-col">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-48 w-full object-cover rounded-xl mb-4"
                  />
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {p.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {p.description}
                  </p>
                  <p className="text-blue-600 text-lg font-bold mb-3">
                    {p.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-auto"
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
