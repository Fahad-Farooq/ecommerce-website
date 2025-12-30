import { useEffect, useState } from "react";
import API from "@/services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed To Load Stats", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center py-10">Loading Dashboard</p>;
  }

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Products", value: stats.totalProducts },
    { name: "Orders", value: stats.totalOrders },
    { name: "Revenue", value: stats.revenue },
  ];
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard title="Users" value={stats.totalUsers} />
        <DashboardCard title="Products" value={stats.totalProducts} />
        <DashboardCard title="Orders" value={stats.totalOrders} />
        <DashboardCard title="Revenue" value={"$" + stats.revenue} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="bg-white shadow p-6 rounded-xl">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

export default AdminDashboard;
