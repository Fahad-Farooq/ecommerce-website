import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "@/services/api";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myorders");
        setOrders(res.data);
      } catch (error) {
        console.error("Faled To Fetch Orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-20 text-lg">
        Loading Your Orders
      </div>
    );
  }
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You Haven't Any Orders</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">Order Id: {order._id}</h2>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-600">Total: ${order.totalPrice}</p>
                  <p className="text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative animate-fadein">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p className="text-gray-600 mb-1">Order Id: {selectedOrder._id}</p>
            <p className="text-gray-600 mb-1">Status: {selectedOrder.status}</p>
            <p className="text-gray-600 mb-1">
              Total: ${selectedOrder.totalPrice}
            </p>
            <p className="text-gray-600 mb-4">
              Date: {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <div className="border-t pt-3">
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="divide-y">
                {selectedOrder.items.map((item, i) => (
                  <li key={i} className="py-2 flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rouned"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p>Price: {item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
