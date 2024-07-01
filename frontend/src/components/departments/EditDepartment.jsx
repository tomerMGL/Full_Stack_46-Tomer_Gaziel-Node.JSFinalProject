import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllEmployees,
  updateEmployee,
} from "../../features/employees/employeesSlice";
import {
  updateDepartment,
  deleteDepartment,
  reset,
} from "../../features/departments/departmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDepartment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hasData, setHasData] = useState(false);

  const { departmentsData, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.departments);

  const { employeeData, isSuccess: employeeSuccess, message: employeeMessage } = useSelector((state) => state.employees);

  useEffect(() => {
    if (location.state) {
      dispatch(getAllEmployees());
      setCurrentDepartment();
      setHasData(true);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    if(employeeSuccess){
      toast.success(employeeMessage)
    }

  }, [isError, isSuccess, employeeSuccess, employeeMessage]);

  const [editDepartment, setEditDepartment] = useState({
    id: "",
    name: "",
    manager: "",
    employeesList: [],
  });

  const setCurrentDepartment = () => {
    setEditDepartment({
      id: location.state._id,
      name: location.state.name,
      manager: location.state?.manager || "",
      employeesList: location.state.notInEmployees,
    });
  };

  const changeData = (e) => {
    setEditDepartment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [updateEmployeeDepartment, setUpdateEmployeeDepartment] = useState({
    id: "",
    departmentId: location?.state?._id,
  });

  const addEmployeeToDepartmentHandler = (e) => {
    e.preventDefault();
    if (updateEmployeeDepartment.id !== "") {
      dispatch(updateEmployee(updateEmployeeDepartment));
    } else {
      toast.warning("Employee Are Not Detect!");
    }
  };

  const updateDepartmentHandler = async (e) => {
    e.preventDefault();
    const { employeesList, ...editDepartmentWithoutEmployees } = editDepartment;
    dispatch(updateDepartment(editDepartmentWithoutEmployees));
    await dispatch(reset());
    navigate("../")
  };

  const deleteDepartmentHandler = async (e) => {
    e.preventDefault();
    const message = await dispatch(deleteDepartment(editDepartment.id));
    console.log(message.payload.message);
    if (message.payload.message) {
      toast.success(message.payload.message);
      dispatch(reset());
      navigate("../");
    }
  };

  if (!hasData)
    return (
      <div
        className="w-full h-full flex justify-center items-center text-red-500 font-bold text-2xl cursor-pointer"
        onClick={() => navigate("../")}
      >
        Department NOT SELECTED! (click to back)
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        <h2 className="text-[#013201] text-3xl font-bold">Edit Department</h2>
        <form className="w-1/2 flex flex-col gap-4">
          <input
            type="text"
            name="id"
            className="bg-gray-200 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            disabled={true}
            value={editDepartment.id}
          />

          <input
            type="text"
            name="name"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            value={editDepartment.name}
            onChange={changeData}
          />

          <select
            name="manager"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            onChange={changeData}
            value={editDepartment.manager}
          >
            <option hidden value="">
              Manager
            </option>
            {employeeData &&
              employeeData.map((emp, index) => (
                <option
                  key={`/department/edit/employee-${index}`}
                  value={emp._id}
                >
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
          </select>
          <div className="flex flex-row">
            <select
              className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
              onChange={(e) => {
                setUpdateEmployeeDepartment((prevState) => ({
                  ...prevState,
                  id: e.target.value,
                }));
              }}
            >
              <option hidden value="">
                Employees
              </option>
              {editDepartment.employeesList &&
                editDepartment.employeesList.map((emp, index) => (
                  <option
                    key={`/department/edit/employeeList-${index}`}
                    value={emp._id}
                  >
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
            </select>

            <button
              className="w-1/4 h-10 bg-green-600 rounded-full text-white font-bold text-2xl"
              onClick={addEmployeeToDepartmentHandler}
            >
              +
            </button>
          </div>

          <button
            className="bg-green-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
            onClick={updateDepartmentHandler}
          >
            Update Department
          </button>
          <button
            className="bg-red-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
            onClick={() => navigate("../")}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
            onClick={deleteDepartmentHandler}
          >
            Delete Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
