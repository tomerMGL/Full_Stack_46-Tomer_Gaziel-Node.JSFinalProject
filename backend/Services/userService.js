const userRepo = require("../Repositories/userRepo");
const jwt = require("jsonwebtoken");
const fakeData = require("../Repositories/fakeDataRepo");

// @desc Get all users
// @GET /users
// @access Private
const getAllUsers = () => {
  return userRepo.getAllUsers();
};

// @desc Login user
// @POST /users/login
// @access Public
const checkUserLogin = async (email, username) => {
  const user = await userRepo.getUserByEmail(email);

  if (!user) return "Authentication failed: Email address not found";

  if (!(user.username === username)) return "Authentication failed: Incorrect username";

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  return { user, token };
};

// @desc Insert all seeds to DB
// @GET /users/seeds
// @access Public
const dataSeed = async () => {
  const { data: allUserSeeds } = await userRepo.getUsersForSeed();
  const dbUsers = await getAllUsers();

  if (!dbUsers.length) {
    allUserSeeds.forEach(async (user, index) => {
      let newUser = {};

      newUser.userId = user.id;
      newUser.fullName = user.name;
      newUser.username = user.username;
      newUser.email = user.email;
      newUser.numOfActions = 500;
      newUser.actionsAllowed = 500;

      const status = await userRepo.createNewUser(newUser);
    });
    await fakeData();
  } else {
    return { message: "Database seeding skipped: Data already exists", success: false };
  }

  return { message: "Database seeding completed successfully.", success: true };
};

module.exports = { getAllUsers, dataSeed, checkUserLogin };
