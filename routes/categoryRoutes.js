import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";

export const categoryRoutes = Router();

categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategory);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);
