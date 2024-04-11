import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";

const secret = "The best things in life are priceless!";

export const hashPassword = async (plainTextPassword: string) => {
  const saltRound = 12;
  const hash = await bcrypt.hash(plainTextPassword, saltRound);
  return hash;
};

export const comparePasswords = async (
  plainTextPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const signUserToken = async (user: IUser) => {
  let token = jwt.sign(
    {
      userId: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      imageUrl: user.imageUrl
    },
    secret,
    { expiresIn: "1hr" }
  );
  return token;
};

export const verifyUser = async (req: Request) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      let decoded: any = await jwt.verify(token, secret);
      return await User.findById(decoded.userId);
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};
