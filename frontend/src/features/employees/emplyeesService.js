import axios from "axios";
import shiftService from "../shifts/shiftsService";
const API_URL = "http://localhost:8000/employees";

// Get all employees
const getAllEmployees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data: allEmployees } = await axios.get(API_URL, config);

  await Promise.all(
    allEmployees.data.map(async (emp, index) => {
      const { data: dpName } = await axios.get(
        `http://localhost:8000/departments/${emp.departmentId}`,
        config
      );
      emp.departmentData = dpName.data;
    })
  );

  const addedShifts = await Promise.all(
    allEmployees.data.map(async (emp, index) => {
      const { data: shifts } = await axios.get(
        `http://localhost:8000/relations/employee/${emp._id}`,
        config
      );

      return { ...emp, shifts: shifts.data };
    })
  );

  for (let i = 0; i < addedShifts.length; i++) {
    for (
      let shiftData = 0;
      shiftData < addedShifts[i].shifts.length;
      shiftData++
    ) {
      const { data: shiftString } = await shiftService.getShiftById(
        token,
        addedShifts[i].shifts[shiftData].shiftId
      );
      addedShifts[i].shifts[shiftData].date = shiftString[0].date.slice(0, 10);
      addedShifts[i].shifts[shiftData].startingHour =
        shiftString[0].startingHour;
      addedShifts[i].shifts[shiftData].endingHour = shiftString[0].endingHour;
    }
  }

  return { message: allEmployees.message, data: addedShifts };
};

// Create new employee
const createNewEmployee = async (newEmployee, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  newEmployee.startWorkYear = +newEmployee.startWorkYear; // cast to number
  const { data: newEmp } = await axios.post(API_URL, newEmployee, config);
  return newEmp;
};

// Update employye
const updateEmployee = async (token, newEmployee) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: status } = await axios.put(
    `${API_URL}/${newEmployee.id}`,
    newEmployee,
    config
  );
  return status;
};

// Delete employee
const deleteEmployee = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data: status } = await axios.delete(`${API_URL}/${id}`,config);
  return status;
};

const employeesService = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeesService;
