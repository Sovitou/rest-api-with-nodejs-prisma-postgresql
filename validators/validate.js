export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).json({ errors });
    }

    req.body = value; // sanitized validated value
    next(); // continue to controller
  };
};
