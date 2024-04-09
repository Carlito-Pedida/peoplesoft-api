import { RequestHandler } from "express";
import { User, IUser } from "../models/user";
import {
  comparePasswords,
  hashPassword,
  signUserToken,
  verifyUser
} from "../services/auth";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  let userList = await User.find();
  res.status(200).json(userList);
};

export const createUser: RequestHandler = async (req, res, next) => {
  const newUser: IUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    imageUrl: req.body.imageUrl,
    position: req.body.position,
    username: req.body.username,
    password: req.body.password
  });

  try {
    if (newUser.username && newUser.password) {
      let hashedPassword = await hashPassword(newUser.password);
      newUser.password = hashedPassword;
      let created = await newUser.save();
      res.status(201).json({
        username: created.username,
        userId: created._id
      });
    } else {
      res.status(400).send("Username and password required");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  let existingUser: IUser | null = await User.findOne({
    username: req.body.username
  });

  if (existingUser) {
    let passwordsMatch = await comparePasswords(
      req.body.password,
      existingUser.password
    );

    if (passwordsMatch) {
      let token = await signUserToken(existingUser);
      res.status(200).json({ token });
    } else {
      res.status(401).json("Invalid password");
    }
  } else {
    res.status(401).json("Invalid username");
  }
};
