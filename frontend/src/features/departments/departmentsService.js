import axios from "axios";
import employeesService from "../employees/emplyeesService";
const API_URL = "http://localhost:8000/departments";

// Get all department
const getAllDepartments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data: allDepartments } = await axios.get(API_URL, config);

  const { data: allEmployees } = await employeesService.getAllEmployees(token);

  allDepartments.data.forEach((department) => {
    // add manager data
    const manager = allEmployees.find((emp) => emp._id === department.manager);
    department.managerData = manager;

    // add employees
    const employees = {
      inDepartment: [],
      notInEmployees: [],
    };

    allEmployees.filter((emp) => {
      emp.departmentId === department._id
        ? employees.inDepartment.push(emp)
        : employees.notInEmployees.push(emp);
    });

    department.employees = employees.inDepartment;
    department.notInEmployees = employees.notInEmployees;

    return department;
  });
  return allDepartments;
};

// Update department
const updateDepartments = async (token, newDepartment) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {data: status} = await axios.put(`${API_URL}/${newDepartment.id}`, newDepartment, config);
  return status;
};

// Create new department
const createNewDepartments = async (token, newDepartment) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data: status } = await axios.post(API_URL, newDepartment, config);
  return status;
};


// Delete Department
const deleteDepartment = async (token, departmentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: status } = await axios.delete(
    `${API_URL}/${departmentId}`,
    config
  );
  return status;
};

const departmentsService = {
  getAllDepartments,
  updateDepartments,
  createNewDepartments,
  deleteDepartment,
};

export default departmentsService;
