import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "@/services/api";
import { useCart } from "@/context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error Fetching Product", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Product Details
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-2xl bg-white shadow-md rounded-xl p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {product.name}
        </h1>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Category:</span>
          {product.category}
        </p>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-lg font-semibold text-blue-600 mb-4">
          {product.price}
        </p>
        <p
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          } mb-6`}
        >
          {product.stock > 0 ? `In Stock ${product.stock}` : "Out Of Stock"}
        </p>
        <div className="flex flex-col">
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white py-2 w-full mb-2 rounded-lg hover:bg-blue-700 transition mt-auto"
          >
            Add To Cart
          </button>
          <Link
            to="/"
            className="bg-gray-700 text-white w-full text-center py-2 rounded-md hover:bg-gray-800 transition"
          >
            Back To Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
