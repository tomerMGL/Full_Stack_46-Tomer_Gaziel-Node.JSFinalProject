const express = require("express");
const userService = require("../Services/userService");
const { protect } = require("../Middlewares/authMiddleware");
const { actionsMiddleware } = require("../Middlewares/actionsMiddleware");

const router = express.Router();

router.get("/", protect, actionsMiddleware, async (req, res) => {
  const allUsers = await userService.getAllUsers();
  return res.status(200).json({ message: "Users retrieved successfully", data: allUsers });
});

router.get("/seeds", async (req, res) => {
  const status = await userService.dataSeed();
  return res.status(200).json( status );
});

router.post("/login", async (req, res) => {
  const { username, email } = req.body;
  const status = await userService.checkUserLogin(email, username);

  status.token
    ? res.status(200).json({ message: "User authenticated successfully", data: status })
    : res.status(400).json({ message: status });
});

module.exports = router;
