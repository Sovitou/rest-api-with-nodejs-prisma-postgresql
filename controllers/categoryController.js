import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    if (!req.body.name)
      return res.status(422).json({ error: "Name is required" });

    if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
      return res.status(409).json({ error: `${req.body.name} already exited` });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });
    return res.status(200).json({ newCategory });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categoryName = await prisma.category.findMany();

    return res.status(200).json(categoryName);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const findCategoryId = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!findCategoryId)
      return res
        .status(404)
        .json({ error: ` Category id ${findCategoryId} not found` });

    return res.status(202).json(findCategoryId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const findCategoryId = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!findCategoryId)
      return res.status(404).json({ error: ` Category id not found` });

    if (!req.body.name)
      return res.status(422).json({ error: "Name is required" });

    if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
      return res.status(409).json({ error: `${req.body.name} already exited` });
    }

    const updatedCategory = await prisma.category.update({
      data: {
        name: req.body.name,
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const findCategoryId = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!findCategoryId)
      return res.status(404).json({ error: ` Category id not found` });

    const deletedCategory = await prisma.category.delete({
      where: { id: parseInt(req.params.id) },
    });

    return res.status(200).json({ msg: `Category delected`, deletedCategory });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
