import { Router } from "express";
import {
  createUser,
  getAllUsers,
  loginUser
} from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

export default router;
