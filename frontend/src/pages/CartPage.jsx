import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">Your Cart Is Empty</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cart.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between border-b py-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <p className="text-gray-800">{p.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={p.qty}
                min="1"
                onChange={(e) => updateQuantity(p._id, Number(e.target.value))}
                className="w-16 border rounded text-center"
              />
              <button
                onClick={() => removeFromCart(p._id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </h2>
          <div>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-3"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
