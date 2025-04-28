import { Router } from "express";
import { validate } from "../validators/validate.js";
import { userSchema } from "../validators/schemaValidate.js";
import { createUser, signIn } from "../controllers/authController.js";

export const authRoutes = Router();

authRoutes.post("/register", validate(userSchema), createUser);
authRoutes.post("/login", signIn);
