import { ZodError } from "zod";
export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError)
      return res
        .status(400)
        .json({ message: err.errors[0]?.message || "Invalid Input" });

    return res.status(500).json({ message: "Validation Failed" });
  }
};
