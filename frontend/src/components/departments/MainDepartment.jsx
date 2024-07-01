import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDepartments, reset } from "../../features/departments/departmentsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { departmentsData, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.departments);

  useEffect(() => {
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
    }

  }, [isError, isSuccess, dispatch]);

  return (
    <div className="">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Name</th>
            <th>Dapartment Manager</th>
            <th>employees</th>
          </tr>
        </thead>
        <tbody>
          {departmentsData &&
            departmentsData.map((department, index) => (
              <tr
                key={`departmentsKey-${index}`}
                className={`${
                  index % 2 == 0 ? "bg-white" : "bg-slate-300"
                } border-b dark:bg-gray-800 dark:border-gray-700 text-lg `}
              >
                <td
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate("./edit", { state: department })}
                >
                  {department.name}
                </td>
                <td>{`${department.managerData?.firstName ? department.managerData?.firstName : "General"} ${department.managerData?.lastName ? department.managerData?.lastName : ""}`}</td>
                <td>
                  <ul>
                    {department.employees.map((employee, index) => (
                      <li
                        key={`employeeDepartment-${index}`}
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() =>
                          navigate("../../employees/edit", { state: employee })
                        }
                      >{`${employee.firstName} ${employee.lastName}`}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainDepartment;
