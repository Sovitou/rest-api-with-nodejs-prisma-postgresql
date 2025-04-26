import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().required(),
});

export const productSchema = Joi.object({
  name: Joi.string().required().max(120),
  description: Joi.string().optional().allow(""),
  price: Joi.number().required().min(0).message({
    "number.base": `"price" must be a number`,
    "number.min": `"price" must be at least 0`,
    "any.required": `"price" is required`,
  }),
  currency: Joi.string().optional().length(3).default("USD"),
  quantity: Joi.number().integer().required().min(0),
  categoryId: Joi.number().integer().required(),
});
