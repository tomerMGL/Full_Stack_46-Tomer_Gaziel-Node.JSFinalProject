const employeeRepo = require("../Repositories/employeeRepo");
const employeeShiftService = require("../Services/employeeShiftService");

// @desc Get all employees
// @GET /employees
// @access Private
const getAllEmployees = () => {
  return employeeRepo.getAllEmployees();
};

// @desc Get all employees
// @GET /employees
// @access Private
const getemployeeById = (id) => {
  return employeeRepo.getEmployeeById(id);
};

// @desc Create new employee
// @POST /employees
// @access Private
const createNewEmployee = (employee) => {
  return employeeRepo.createNewEmployee(employee);
};

// @desc Update employee
// @PUT /employees/id
// @access Private
const updateEmployee = (id, newEmployee) => {
  return employeeRepo.updateEmployee(id, newEmployee);
};

// @desc Update employee
// @DELETE /employee/id
// @access Private
const deleteEmployee = async (id) => {
  const statusRelations =
    await employeeShiftService.deleteAllRelationsByEmployeeId(id);
  const statusEmployee = await employeeRepo.deleteEmployee(id);
  return { employeeStatus: statusEmployee, relationsStatus: statusRelations };
};

const deleteAllEmplyeesByDepartmentId = (id) => {
  return employeeRepo.deleteAllEmplyeesByDepartmentId(id);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  getemployeeById,
  deleteEmployee,
  deleteAllEmplyeesByDepartmentId,
};
