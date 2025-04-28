import { configDotenv } from "dotenv";
import express, { json } from "express";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
configDotenv();

const PORT = process.env.PORT;

const app = express();
app.use(json());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
