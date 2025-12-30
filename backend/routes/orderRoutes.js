import express from "express";
import Order from "../models/Order.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, userName, items, totalPrice, address } = req.body;
    const newOrder = new Order({
      userId,
      userName,
      items,
      totalPrice,
      address,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed To Place Order" });
  }
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed To Fetch Orders", error: error.message });
  }
});

router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    order.status = status;
    await order.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed To Update Order", error: error.message });
  }
});

export default router;
