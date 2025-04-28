import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";
import passport from "passport";
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: `${email} already exists` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return res
      .status(201)
      .json({ message: "User created successfully!", newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const signIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: info.message });

    req.login(user, (loginErr) => {
      if (loginErr) return res.status(500).json({ error: loginErr.message });
      return res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
};
