const employeeModel = require("../Models/employeeModel");

const getAllEmployees = async () => {
  return await employeeModel.find({});
};

const getEmployeeById = (id) => {
  return employeeModel.findById(id);
};

const createNewEmployee = async (employee) => {
  await employeeModel.create(employee);
  return "Employee Created";
};

const updateEmployee = async (id, newEmployee) => {
  await employeeModel.findByIdAndUpdate(id, newEmployee);
  return "Employee Updated";
};

const deleteEmployee = async (id) => {
  await employeeModel.findByIdAndDelete(id);
  return "Employee Deleted";
};

const deleteAllEmplyeesByDepartmentId = async (id) => {
  return await employeeModel.deleteMany({ departmentId: id });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  getEmployeeById,
  deleteEmployee,
  deleteAllEmplyeesByDepartmentId,
};
