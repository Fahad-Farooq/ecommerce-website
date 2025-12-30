import { useContext, useState } from "react";
import { useCart } from "@/context/CartContext";
import API from "@/services/api";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!address) {
      alert("Please enter your address");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      try {
        await API.post("/orders", {
          userId: user._id,
          userName: user.name,
          items: cart.map((p) => ({
            productId: p._id,
            name: p.name,
            quantity: p.qty,
            image: p.image,
            price: p.price,
          })),
          totalPrice,
          address,
        });
        clearCart();
        navigate("/order-success");
      } catch (error) {
        console.error("Order Failed", error);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };
  return (
    <div className="p-6 min-h-screeen bg-gray-100">
      <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <textarea
          className="w-full p-3 border rounded-md mb-4"
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <p className="text-lg font-semibold mb-4">Total: ${totalPrice}</p>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Processing Payment" : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
