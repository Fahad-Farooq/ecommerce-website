import { useEffect, useState } from "react";
import API from "@/services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/myorders");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed To Load Orders", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Failed To Update Orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p>You Have No Orders</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      <div className="bg-white rounded-xl shadow p-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border-b py-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{order._id}</h2>
              <p>{order.userName}</p>
              <p>{order.totalPrice}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Deliverd">Deliverd</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
