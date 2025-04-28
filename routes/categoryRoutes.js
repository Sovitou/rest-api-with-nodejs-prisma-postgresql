import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { validate } from "../validators/validate.js";
import { categorySchema } from "../validators/schemaValidate.js";

export const categoryRoutes = Router();

categoryRoutes.post("/", validate(categorySchema), createCategory);
categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategory);
categoryRoutes.put("/:id", validate(categorySchema), updateCategory);
categoryRoutes.delete("/:id", deleteCategory);
