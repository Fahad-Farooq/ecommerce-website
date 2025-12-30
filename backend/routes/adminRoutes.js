import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      {
        $group: { _id: null, total: { $sum: "$totalPrice" } },
      },
    ]);

    const revenue = totalSales[0]?.total || 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed To Fetch Stats", err: error });
  }
});

export default router;
