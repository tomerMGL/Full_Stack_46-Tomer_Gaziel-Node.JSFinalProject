const express = require("express");
const employeeShiftService = require("../Services/employeeShiftService");
const { protect } = require("../Middlewares/authMiddleware");
const { actionsMiddleware } = require("../Middlewares/actionsMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const allRelations = await employeeShiftService.getAllRelations();
  return res.status(200).json({ message: "Data retrieved successfully", data: allRelations });
});

router.get("/shift/:id", protect, async (req, res) => {
  const shifts = await employeeShiftService.getShiftsById(req.params.id);
  return res.status(200).json({ message: "Data retrieved successfully", data: shifts });
});

router.get("/employee/:id", protect, async (req, res) => {
  const employee = await employeeShiftService.getEmployeeById(req.params.id);
  return res.status(200).json({ message: "Data retrieved successfully", data: employee });
});

router.post("/", protect, actionsMiddleware, async (req, res) => {
  await employeeShiftService.createNewRelation(
    req.body.shiftId,
    req.body.employeeId
  );
  return res.status(201).json({ message: "Shift-Employee relation created successfully" });
});

router.delete("/:id", protect, actionsMiddleware, async (req, res) => {
  const status = await employeeShiftService.deleteRelation(req.params.id);
  await employeeShiftService.deleteRelation(req.params.id);
  return res.status(200).json({ message: "Shift-Employee relation deleted successfully" });
});

module.exports = router;
