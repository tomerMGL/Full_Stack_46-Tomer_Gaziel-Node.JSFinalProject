import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewDepartment, reset } from "../../features/departments/departmentsSlice";
import { getAllEmployees } from "../../features/employees/employeesSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewDepartment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { departmentsData, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.departments);

  const { employeeData } = useSelector((state) => state.employees);

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    manager: "",
  });

  const changeData = (e) => {
    setNewDepartment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const newDepartmentHandler = (e) => {
    e.preventDefault();
    if (!(newDepartment.manager === "")) {
      dispatch(createNewDepartment(newDepartment));
    } else {
      const { manager, ...newDepartmentWithoutManager } = newDepartment;
      dispatch(createNewDepartment(newDepartmentWithoutManager));
    }
    dispatch(reset());
    navigate("../");
  };

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message+"1");
    }

  }, [isError, isSuccess, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <h2 className="text-[#013201] text-3xl font-bold">Add New Employee</h2>
      <form className="w-1/2 flex flex-col gap-4">
        <input
          type="text"
          name="name"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          placeholder="Department Name"
          onChange={changeData}
        />

        <select
          name="manager"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          onChange={changeData}
        >
          <option hidden value="">
            Manager
          </option>
          {employeeData &&
            employeeData.map((employee, index) => (
              <option key={`departemplist-${index}`} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
        </select>

        <button
          className="bg-green-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
          onClick={newDepartmentHandler}
        >
          Save Department
        </button>
        <button
          className="bg-red-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
          onClick={() => navigate("../")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewDepartment;
