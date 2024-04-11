import { Router } from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  getOneUser,
  updateOneUser
} from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:userId", getOneUser);
router.put("/:userId", updateOneUser);

export default router;
