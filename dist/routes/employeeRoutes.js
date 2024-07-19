"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const router = (0, express_1.Router)();
router.get("/", employeeController_1.getAllEmployee);
router.get("/:id", employeeController_1.getOneEmployee);
router.post("/", employeeController_1.addEmployee);
router.put("/:id", employeeController_1.editEmployee);
router.delete("/:id", employeeController_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map