const userModel = require("../Models/userModel");
const jsonfile = require("jsonfile");
const path = require("path");

const actionsMiddleware = async (req, res, next) => {
  const user = req.user;
  try {
    if (user.actionsAllowed > 0) {
      user.actionsAllowed -= 1;
      await userModel.findByIdAndUpdate(user.id, user);

      const logRow = {};
      logRow.id = user.userId;
      logRow.maxActions = user.numOfActions;
      logRow.date = new Date().toJSON().slice(0, 10);
      logRow.actionAllowed = user.actionsAllowed;

      saveActionInLocalJson(logRow);
    } else {
      return res.status(400).json({ message: "Not actions access" });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }

  next();
};

const saveActionInLocalJson = async (row) => {
  const file = path.join(__dirname, "../Data/logs.json");

  const { actions: logs } = await jsonfile.readFile(file);

  logs.push(row);

  await jsonfile.writeFile(file, { actions: logs });
};

module.exports = { actionsMiddleware };
