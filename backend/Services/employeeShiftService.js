const employeeShiftRepo = require("../Repositories/employeeShiftRepo");

// @desc Get all relations
// @GET /relations
// @access Private
const getAllRelations = () => {
  return employeeShiftRepo.getAllRelations();
};

// @desc Get all relations by shift id
// @GET /relations/shift/id
// @access Private
const getShiftsById = (shiftId) => {
  return employeeShiftRepo.getShiftsById(shiftId);
};

// @desc Get all relations by employee id
// @GET /relations/employee/id
// @access Private
const getEmployeeById = (employeeId) => {
  return employeeShiftRepo.getEmployeeById(employeeId);
};

// @desc Create new relations
// @POST /relations
// @access Private
const createNewRelation = (shiftId, employeeId) => {
  return employeeShiftRepo.createNewRelation(shiftId, employeeId);
};

// @desc Delete relations
// @DELETE /relations/id
// @access Private
const deleteRelation = (id) => {
  return employeeShiftRepo.deleteRelation(id);
};

// @desc Delete relations
// @DELETE /relations/employee/id
// @access Private
const deleteAllRelationsByEmployeeId = (id) => {
  return employeeShiftRepo.deleteAllRelationsByEmployeeId(id);
}

module.exports = {
  getAllRelations,
  getShiftsById,
  getEmployeeById,
  createNewRelation,
  deleteRelation,
  deleteAllRelationsByEmployeeId
};
