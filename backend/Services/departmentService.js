const departmentRepo = require("../Repositories/departmentRepo");
const employeesService = require("../Services/employeeService");

// @desc Get all departments
// @GET /departments
// @access Private
const getAllDepartments = () => {
  return departmentRepo.getAllDepartments();
};

const getDepartmentById = (id) => {
  return departmentRepo.getDepartmentById(id);
};

// @desc Create new department
// @POST /departments
// @access Private
const createNewDepartment = (newDepartment) => {
  return departmentRepo.createNewDepartment(newDepartment);
};

// @desc Update department
// @PUT /departments/id
// @access Private
const updateDepartment = (id, newDepartment) => {
  return departmentRepo.updateDepartment(id, newDepartment);
};

// @desc Delete department
// @DELETE /departments/id
// @access Private
const deleteDepartment = async (id) => {
  const employeeStatus = await employeesService.deleteAllEmplyeesByDepartmentId(
    id
  );
  const departmentStatus = await departmentRepo.deleteDepartment(id);
  return { employeeStatus: employeeStatus.deletedCount, departmentStatus: departmentStatus };
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createNewDepartment,
  updateDepartment,
  deleteDepartment,
};
