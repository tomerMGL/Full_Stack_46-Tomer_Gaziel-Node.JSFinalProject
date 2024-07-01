import axios from "axios";
import employeeService from "../employees/emplyeesService";

const API_URL = "http://localhost:8000/relations";

const getRelationsByShiftId = async (token, shiftId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: allRelations } = await axios.get(
    `${API_URL}/shift/${shiftId}`,
    config
  );

  for (let i = 0; i < allRelations.data.length; i++) {
    const { data: empName } = await axios.get(
      `http://localhost:8000/employees/${allRelations.data[i].employeeId}`,
      config
    );
    allRelations.data[i].employeeName =
      empName.data.firstName + " " + empName.data.lastName;
  }

  const { data: allEmployees } = await employeeService.getAllEmployees(token);

  if (allRelations.data.length !== 0) {
    const employeeList = allEmployees.filter((emp) => {
      return !allRelations.data.some(
        (relation) =>
          !Array.isArray(relation) && emp._id === relation?.employeeId
      );
    });
    allRelations.data.employeeList = employeeList;
  } else {
    allRelations.data.employeeList = allEmployees;
  }

  return allRelations;
};

const getRelationsByEmployeeId = async (token, employeeId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: allShifts } = axios.get(`${API_URL}/employee/${employeeId}`);
  console.log(allShifts);
};

const createNewRelation = async (token, newRelation) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const status = await axios.post(API_URL, newRelation, config);

  return status.data;
};

const deleteRelation = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data: status } = await axios.delete(`${API_URL}/${id}`, config);
  return status;
};

const employeeShiftService = {
  getRelationsByShiftId,
  getRelationsByEmployeeId,
  createNewRelation,
  deleteRelation,
};

export default employeeShiftService;
