const express = require("express");
const shiftService = require("../Services/shiftService");
const { protect } = require("../Middlewares/authMiddleware");
const { actionsMiddleware } = require("../Middlewares/actionsMiddleware");
const router = express.Router();

router.get("/", protect, actionsMiddleware, async (req, res) => {
  const allShifts = await shiftService.getAllshifts();
  return res.status(200).json({ message: "Success", data: allShifts });
});

router.get("/:id", protect, async (req, res) => {
  const shift = await shiftService.getShiftById(req.params.id);
  return res.status(200).json({ message: "Success", data: [shift] });
});

router.post("/", protect, actionsMiddleware, async (req, res) => {
  const status = await shiftService.createNewShift(req.body);
  return res.status(201).json({ message: status });
});

router.put("/:id", protect, actionsMiddleware, async (req, res) => {
  const status = await shiftService.updateShift(req.params.id, req.body);
  return res.status(200).json({ message: status });
});

module.exports = router;
