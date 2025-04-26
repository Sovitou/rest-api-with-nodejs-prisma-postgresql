import { configDotenv } from "dotenv";
import express, { json } from "express";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
configDotenv();

const PORT = process.env.PORT;

const app = express();
app.use(json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
