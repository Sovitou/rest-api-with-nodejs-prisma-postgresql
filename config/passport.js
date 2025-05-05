import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (!existingUser) {
          return done(null, false, { message: `${email} not found` });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
          return done(null, false, { message: `Password is incorrect !` });
        }

        return done(null, existingUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
