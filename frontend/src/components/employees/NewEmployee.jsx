import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewEmployee } from "../../features/employees/employeesSlice";
import { getAllDepartments } from "../../features/departments/departmentsSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeData, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.employees
  );

  const { departmentsData } = useSelector((state) => state.departments);

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    startWorkYear: 0,
    departmentId: 0,
  });

  const changeData = (e) => {
    setNewEmployee((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const newEmployeeHandler = (e) => {
    e.preventDefault();
    dispatch(createNewEmployee(newEmployee));
    navigate("../");
  };

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
          name="firstName"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          placeholder="First Name"
          onChange={changeData}
        />
        <input
          type="text"
          name="lastName"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          placeholder="Last Name"
          onChange={changeData}
        />

        <input
          type="number"
          name="startWorkYear"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          placeholder="Start Year"
          onChange={changeData}
        />

        <select
          name="departmentId"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          onChange={changeData}
        >
          <option hidden value="">Departments</option>
          {departmentsData && departmentsData.map((department, index) => (
            <option key={`departmentList-${index}`} value={department._id} >{department.name}</option>
          ))}

        </select>

        <button
          className="bg-green-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
          onClick={newEmployeeHandler}
        >
          Save Employee
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

export default NewEmployee;
