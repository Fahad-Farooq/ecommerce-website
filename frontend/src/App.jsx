import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminProducts from "./pages/AdminProducts";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider, useCart } from "./context/CartContext";
import { ShoppingCart } from "lucide-react";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  return (
    <nav className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
      <Link to="/ " className="text-xl font-bold text-blue-600">
        Shop
      </Link>
      <div className="flex gap-4">
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        {user?.isAdmin && (
          <>
            <Link
              to="/admin/products"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Products
            </Link>
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Orders
            </Link>
          </>
        )}
        {user ? (
          <>
            <Link to={"/profile"}>
              <h1 className="text-gray-700">Welcome {user.name}</h1>
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
