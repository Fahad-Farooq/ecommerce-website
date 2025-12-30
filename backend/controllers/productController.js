import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error Fetching Products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock, image, description, public_id } =
      req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
      public_id,
      createdBy: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error Creating Product", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, image, public_id } =
      req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock, image },
      {
        new: true,
      }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product Not Found" });
    res.json({ message: "Product Updated Successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server Error Updating Product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product Not Found" });

    if (deleted.public_id) {
      await cloudinary.uploader.destroy(deleted.public_id);
    }

    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error Updating Product", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Products" });
  }
};
