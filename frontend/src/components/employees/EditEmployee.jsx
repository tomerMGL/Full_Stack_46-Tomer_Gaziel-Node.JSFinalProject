import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee, deleteEmployee, reset } from "../../features/employees/employeesSlice";
import { getAllDepartments } from "../../features/departments/departmentsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hasData, setHasData] = useState(false);

  const { departmentsData } = useSelector((state) => state.departments);

  const { isSuccess, isError, message } = useSelector(
    (state) => state.employees
  );

  useEffect(() => {
    if (location.state) {
      setCurrentEmployee();
      dispatch(getAllDepartments());
      setHasData(true);
    }
  }, []);

  const [editEmployee, setEditEmployee] = useState({
    id: "",
    firstName: "",
    firstName: "",
    lastName: "",
    startWorkYear: "",
    departmentId: "",
    shifts: [],
  });

  const setCurrentEmployee = () => {
    setEditEmployee({
      id: location.state._id,
      firstName: location.state.firstName,
      firstName: location.state.firstName,
      lastName: location.state.lastName,
      startWorkYear: location.state.startWorkYear,
      departmentId: location.state.departmentId,
      shifts: location.state.shifts,
    });
  };

  const changeData = (e) => {
    setEditEmployee((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const editEmployeeHandler = (e) => {
    e.preventDefault();
    const { shifts, ...editEmployeeWithoutShifts } = editEmployee;
    dispatch(updateEmployee(editEmployeeWithoutShifts));
    navigate("../");
  };

  const deleteEmployeeHandler = async (e) => {
    e.preventDefault();
    await dispatch(deleteEmployee(editEmployee.id));
    navigate("../")
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

  }, [isError, isSuccess, message]);

  if (!hasData) {
    return (
      <div
        className="w-full h-full flex justify-center items-center text-red-500 font-bold text-2xl cursor-pointer"
        onClick={() => navigate("../")}
      >
        EMPLOYEE NOT SELECTED! (click to back)
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        <h2 className="text-[#013201] text-3xl font-bold">Edit Employee</h2>
        <form className="w-1/2 flex flex-col gap-4">
          <input
            type="text"
            name="employeeId"
            className="bg-gray-200 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            disabled={true}
            value={editEmployee.id}
            onChange={changeData}
          />
          <input
            type="text"
            name="firstName"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            placeholder="First Name"
            value={editEmployee.firstName}
            onChange={changeData}
          />
          <input
            type="text"
            name="lastName"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            placeholder="Last Name"
            value={editEmployee.lastName}
            onChange={changeData}
          />

          <input
            type="number"
            name="startWorkYear"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            placeholder="Start Year"
            value={editEmployee.startWorkYear}
            onChange={changeData}
          />

          <select
            name="departmentId"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            onChange={changeData}
            value={editEmployee.departmentId || ""}
          >
            <option hidden value="">
              Departments
            </option>
            {departmentsData &&
              departmentsData.map((department, index) => (
                <option key={`departmentList-${index}`} value={department._id}>
                  {department.name}
                </option>
              ))}
          </select>

          <button
            className="bg-green-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
            onClick={editEmployeeHandler}
          >
            Update Employee
          </button>
          <button
            className="bg-red-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
            onClick={() => navigate("../")}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
            onClick={deleteEmployeeHandler}
          >
            Delete Employee
          </button>
        </form>
        <div className="w-full">
          <h2 className="text-center font-bold text-2xl">Shifts</h2>
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>date</th>
                <th>start shift</th>
                <th>end shift</th>
              </tr>
              {editEmployee.shifts &&
                editEmployee.shifts.map((shift, index) => (
                  <tr key={`/editEmployees/shift-$${index}`}>
                    <td>{shift.date}</td>
                    <td>{shift.startingHour}</td>
                    <td>{shift.endingHour}</td>
                  </tr>
                ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
