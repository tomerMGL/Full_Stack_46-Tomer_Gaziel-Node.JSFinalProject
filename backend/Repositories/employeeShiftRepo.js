const employeeShiftModel = require("../Models/employeeShiftModel");

const getAllRelations = () => {
  return employeeShiftModel.find({});
};

const getShiftsById = async (shiftId) => {
  return employeeShiftModel.find({ shiftId: shiftId });
};

const getEmployeeById = (employeeId) => {
  return employeeShiftModel.find({ employeeId: employeeId });
};

const createNewRelation = (shiftId, employeeId) => {
  return employeeShiftModel.create({
    shiftId: shiftId,
    employeeId: employeeId,
  });
};

const deleteRelation = (id) => {
  return employeeShiftModel.findByIdAndDelete(id);
};

const deleteAllRelationsByEmployeeId = async (id) => {
  const status  = await employeeShiftModel.deleteMany({ employeeId: id });
  return status
}

module.exports = {
  getAllRelations,
  getShiftsById,
  getEmployeeById,
  createNewRelation,
  deleteRelation,
  deleteAllRelationsByEmployeeId
};
