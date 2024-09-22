const express = require("express");
const router = express.Router();

const Employee = require("../models/employee");
const EmployeeController = require("../Controlers/EmployeeController");

router.get("/", EmployeeController.getAllEmployees);
router.post("/", EmployeeController.addEmployee);

router.get("/:id", EmployeeController.getEmployeeById);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;