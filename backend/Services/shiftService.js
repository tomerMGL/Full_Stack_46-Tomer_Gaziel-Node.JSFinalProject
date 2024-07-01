const shiftsRepo = require("../Repositories/shiftsRepo");

// @desc Get all shifts
// @GET /shifts
// @access Private
const getAllshifts = () => {
  return shiftsRepo.getAllshifts();
};

// @desc Get shift by id
// @GET /shifts/:id
// @access Private
const getShiftById = (id) => {
  return shiftsRepo.getShiftById(id);
};

// @desc Create new shift
// @POST /shifts
// @access Private
const createNewShift = async (newShift) => {
  await shiftsRepo.createNewShift(newShift);
  return "Shift created successfully.";
};

// @desc Update shift
// @PUT /shifts/id
// @access Private
const updateShift = async (id, newShift) => {
  await shiftsRepo.updateShift(id, newShift);
  return "Shift updated successfully.";
};

module.exports = { getAllshifts, getShiftById, createNewShift, updateShift };
