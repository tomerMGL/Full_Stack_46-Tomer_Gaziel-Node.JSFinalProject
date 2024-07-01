const departmentModel = require("../Models/departmentModel");

const getAllDepartments = () => {
  return departmentModel.find({});
};

const getDepartmentById = async (id) => {
  return await departmentModel.findById(id);

}

const createNewDepartment = async (newDepartment) => {
  await departmentModel.create(newDepartment);
  return "New Department Created";
};

const updateDepartment = async (id, newDepartment) => {
  await departmentModel.findByIdAndUpdate(id, newDepartment);
  return "Updated Department";
};

const deleteDepartment = async (id) => {
  await departmentModel.findByIdAndDelete(id);
  return "Department Deleted";
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createNewDepartment,
  updateDepartment,
  deleteDepartment,
};
