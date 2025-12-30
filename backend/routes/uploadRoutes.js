import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No Filed Uploaded" });

      const file = req.file;
      const base64 = file.buffer.toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "products",
        resource_type: "image",
      });

      res
        .status(200)
        .json({ url: result.secure_url, public_id: result.public_id });
    } catch (error) {
      console.error("Cloudinary Upload Failed", error);
      res.status(500).json({ message: "Upload Failed", error: error.message });
    }
  }
);

export default router;
