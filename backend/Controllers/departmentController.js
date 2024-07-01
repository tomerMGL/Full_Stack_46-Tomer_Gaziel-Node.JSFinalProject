const express = require("express");
const departmentService = require("../Services/departmentService");
const { protect } = require("../Middlewares/authMiddleware");
const { actionsMiddleware } = require("../Middlewares/actionsMiddleware");
const router = express.Router();

// GET all departments
router.get("/", protect, actionsMiddleware, async (req, res) => {
  const allDepartment = await departmentService.getAllDepartments();
  return res
    .status(200)
    .json({ message: "Departments retrieved successfully", data: allDepartment });
});

// GET department by id
router.get("/:id", protect, async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.id);
  return res.status(200).json({ message: "Department retrieved successfully", data: department });
});

// POST create new department
router.post("/", protect, async (req, res) => {
  const status = await departmentService.createNewDepartment(req.body);
  return res.status(201).json({ message: status });
});

// PUT update department
router.put("/:id", protect, actionsMiddleware, async (req, res) => {
  const status = await departmentService.updateDepartment(
    req.params.id,
    req.body
  );
  return res.status(200).json({ message: status });
});

// DELETE delete department by id
router.delete("/:id", protect, actionsMiddleware, async (req, res) => {
  const status = await departmentService.deleteDepartment(req.params.id);
  return res.status(200).json({
    message: `Department deleted. Status: ${status.departmentStatus}.${status.employeeStatus} associated employees removed.`,
  });
});

module.exports = router;
