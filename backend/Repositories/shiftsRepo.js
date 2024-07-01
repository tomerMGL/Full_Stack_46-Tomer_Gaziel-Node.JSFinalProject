const shiftModel = require("../Models/shiftModel");

const getAllshifts = () => {
  return shiftModel.find({});
};

const getShiftById = (id) => {
  return shiftModel.findById(id);
};

const createNewShift = (newShift) => {
  return shiftModel.create(newShift);
};

const updateShift = (id, newShift) => {
  return shiftModel.findByIdAndUpdate(id, newShift);
};

module.exports = { getAllshifts, getShiftById, createNewShift, updateShift };
