import { Router } from "express";
import { validate } from "../validators/validate.js";
import { productSchema } from "../validators/schemaValidate.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

export const productRoutes = Router();

productRoutes.post("/", validate(productSchema), createProduct);
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProduct);
productRoutes.patch("/:id", validate(productSchema), updateProduct);
productRoutes.delete("/:id", deleteProduct);
