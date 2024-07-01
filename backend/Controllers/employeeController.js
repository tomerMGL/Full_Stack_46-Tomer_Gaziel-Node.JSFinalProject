const employeeService = require("../Services/employeeService");
const express = require("express");
const { protect } = require("../Middlewares/authMiddleware");
const { actionsMiddleware } = require("../Middlewares/actionsMiddleware");
const router = express.Router();

router.get("/", protect, actionsMiddleware, async (req, res) => {
  const allEmployees = await employeeService.getAllEmployees();
  return res.status(200).json({ message: "Employees retrieved successfully", data: allEmployees });
});

router.get("/:id", protect, async (req, res) => {
  const employee = await employeeService.getemployeeById(req.params.id);
  return res.status(200).json({ message: "Employee retrieved successfully", data: employee });
});

router.post("/", protect, actionsMiddleware, async (req, res) => {
  const newEmployee = req.body;
  const status = await employeeService.createNewEmployee(newEmployee);
  return res.status(200).json({ message: status });
});

router.put("/:id", protect, actionsMiddleware, async (req, res) => {
  const newEmployee = req.body;
  const status = await employeeService.updateEmployee(req.params.id, req.body);

  return res.status(200).json({ message: status });
});

router.delete("/:id", protect, actionsMiddleware, async (req, res) => {
  const status = await employeeService.deleteEmployee(req.params.id);
  return res.status(200).json({
    message: `Employee deleted successfully. ${status.relationsStatus.deletedCount} associated shift relations removed.`,
  });
});

module.exports = router;
