import { Router } from "express";
import {
  addEmployee,
  editEmployee,
  deleteEmployee,
  getAllEmployee,
  getOneEmployee
} from "../controllers/employeeController";

const router = Router();

router.get("/", getAllEmployee);
router.get("/:id", getOneEmployee);
router.post("/", addEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", deleteEmployee);

export default router;
