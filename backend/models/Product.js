import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, require: true },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    image: { type: String },
    public_id: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
