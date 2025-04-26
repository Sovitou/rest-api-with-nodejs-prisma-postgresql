import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, currency, quantity, categoryId } =
      req.body;

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res
        .status(404)
        .json({ error: `Category with id ${categoryId} not found` });
    }
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        currency,
        quantity,
        category: { connect: { id: categoryId } },
      },
    });
    return res.status(200).json({ newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const findProductId = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!findProductId)
      return res
        .status(404)
        .json({ error: ` Category id ${findProductId} not found` });

    return res.status(202).json(findProductId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, currency, quantity, categoryId } =
      req.body;

    const findProductId = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!findProductId)
      return res
        .status(404)
        .json({ error: ` Product id ${findProductId} not found` });

    const updatedProduct = await prisma.product.update({
      data: {
        name,
        description,
        price,
        currency,
        quantity,
        category: { connect: { id: categoryId } },
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const findCategoryId = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!findCategoryId)
      return res.status(404).json({ error: ` Product ${id} not found` });

    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(req.params.id) },
    });

    return res.status(200).json({ msg: `Category delected`, deletedProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
