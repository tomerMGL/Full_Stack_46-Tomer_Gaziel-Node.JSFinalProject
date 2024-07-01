import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShiftById, updateShift } from "../features/shifts/shiftsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import {
  createNewRelation,
  getAllEmployeesByShiftId,
  deleteRelation,
  reset,
} from "../features/employeeShift/employeeShiftSlice";

const EditShift = () => {
  const { shiftId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageCounter, setMessageCounter] = useState(0);

  const { isLoading, isError, isSuccess, message, shiftsData } = useSelector(
    (state) => state.shifts
  );

  const {
    isSuccess: employeeShiftSuccess,
    message: employeeShiftMessage,
    relationsData,
  } = useSelector((state) => state.employeeShift);

  const [employeeIdForShift, setEmployeeIdForShift] = useState("");

  const [updatedShift, setUpdatedShift] = useState({
    id: shiftId,
    date: "",
    startingHour: "",
    endingHour: "",
  });

  useEffect(() => {
    dispatch(reset());
    dispatch(getShiftById(shiftId));
    dispatch(getAllEmployeesByShiftId(shiftId));
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    if (employeeShiftSuccess) toast.success(employeeShiftMessage);

    initialShift();
  }, [isError, isSuccess, message, shiftsData, messageCounter]);

  const changeData = (e) => {
    setUpdatedShift((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateShiftHandler = (e) => {
    e.preventDefault();
    dispatch(updateShift(updatedShift));
    navigate("../shifts");
  };

  const deleteRelationHandler = async (employeeId) => {
    await dispatch(deleteRelation(employeeId));
    await dispatch(getAllEmployeesByShiftId(shiftId));
    setMessageCounter((prev) => prev + 1);
  };

  const initialShift = () => {
    setUpdatedShift((prevState) => ({
      ...prevState,
      date: (shiftsData && shiftsData[0].date.slice(0, 10)) || "",
      startingHour: (shiftsData && shiftsData[0].startingHour) || "",
      endingHour: (shiftsData && shiftsData[0].endingHour) || "",
    }));
  };

  const addNewRelationHandler = async (e) => {
    e.preventDefault();
    if (employeeIdForShift !== "")
      await dispatch(
        createNewRelation({
          shiftId: updatedShift.id,
          employeeId: employeeIdForShift,
        })
      );
    setEmployeeIdForShift("");
    await dispatch(getAllEmployeesByShiftId(shiftId));
    setMessageCounter((prev) => prev + 1);
  };

  if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-[#013201] text-3xl font-bold">Update Shift</h2>
      <form className="w-1/2 flex flex-col gap-8">
        <input
          type="text"
          name="departmentId"
          className="rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl bg-gray-200"
          value={updatedShift.id}
          disabled={true}
        />
        <input
          type="date"
          name="date"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          value={updatedShift.date}
          onChange={changeData}
        />
        <input
          type="time"
          name="startingHour"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          value={updatedShift.startingHour}
          onChange={changeData}
        />

        <input
          type="time"
          name="endingHour"
          className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
          value={updatedShift.endingHour}
          onChange={changeData}
        />

        <div className="w-full flex flex-col items-center gap-2">
          <h3 className="font-bold text-xl">Employees</h3>
          <div className="w-full flex flex-wrap justify-center gap-1">
            {relationsData &&
              relationsData.map((relation, index) => (
                <div
                  key={`relations-updateShift-${index}`}
                  className="bg-slate-300 w-20 h-20 flex items-center justify-center hover:bg-red-600 p-4 text-center cursor-pointer"
                  onClick={() => deleteRelationHandler(relation._id)}
                >
                  {relation.employeeName}
                </div>
              ))}
          </div>
        </div>

        <div className="w-full h-10 flex flex-row items-center gap-5">
          <h3 className="text-md">Add Employee</h3>
          <select
            className="w-1/2 h-10 rounded-xl drop-shadow-2xl shadow-xl"
            name="employees"
            onChange={(e) => setEmployeeIdForShift(e.target.value)}
          >
            <option hidden>Select Employee</option>
            {relationsData &&
              relationsData.employeeList &&
              relationsData.employeeList.map((emp, index) => (
                <option key={`empOption-${index}`} value={emp._id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
          </select>

          <button
            className="w-1/4 h-10 bg-green-600 rounded-full text-white font-bold text-2xl"
            onClick={addNewRelationHandler}
          >
            +
          </button>
        </div>

        <button
          className="bg-green-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
          onClick={updateShiftHandler}
        >
          Update Shift
        </button>
        <button
          className="bg-red-600 rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0 text-white"
          onClick={() => navigate("../shifts")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditShift;
