import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllEmployees,
  filterEmployeesByDepartment,
  reset,
} from "../../features/employees/employeesSlice";
import { getAllDepartments } from "../../features/departments/departmentsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employeeData, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.employees
  );

  const { departmentsData } = useSelector((state) => state.departments);

  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(getAllDepartments());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, dispatch]);

  useEffect(() => {
    if (departmentFilter) {
      dispatch(filterEmployeesByDepartment(departmentFilter));
    }
  }, [departmentFilter]);

  const filterHandler = async (e) => {
    await dispatch(getAllEmployees());
    setDepartmentFilter(e.target.value);
  };
  return (
    <div className="">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Full Name</th>
            <th>Dapartment</th>
            <th>Shifts</th>
          </tr>
        </thead>
        <tbody>
          {employeeData &&
            employeeData.map((employee, index) => (
              <tr
                key={`employeeKey-${index}`}
                className={`${
                  index % 2 == 0 ? "bg-white" : "bg-slate-300"
                } border-b dark:bg-gray-800 dark:border-gray-700 text-lg`}
              >
                <td
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate("./edit", { state: employee })}
                >
                  {employee.firstName} {employee.lastName}
                </td>
                <td
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() =>
                    navigate("../../departments/edit", {
                      state: employee.departmentData,
                    })
                  }
                >
                  {employee.departmentData.name}
                </td>
                <td>
                  <ul>
                    {employee.shifts.map((shift, shiftIndex) => (
                      <li
                        key={`mainEmpShift-${shiftIndex}`}
                      >{`${shift.date} | ${shift.startingHour} - ${shift.endingHour}`}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-10">
        <select
          className="bg-[#ebffe5] rounded-full w-1/4 h-10 pl-3 drop-shadow-2xl shadow-xl"
          onChange={filterHandler}
        >
          <option value="">All</option>
          {departmentsData &&
            departmentsData.map((department, index) => (
              <option key={`filterDepartment-${index}`} value={department._id}>
                {department.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default MainEmployee;
