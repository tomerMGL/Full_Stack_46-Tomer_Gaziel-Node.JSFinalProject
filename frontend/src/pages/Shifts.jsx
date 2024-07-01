import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewShift, getAllShifts } from "../features/shifts/shiftsSlice";
import { reset } from "../features/employeeShift/employeeShiftSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shifts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message, shiftsData } = useSelector(
    (state) => state.shifts
  );

  const [shiftData, setShiftData] = useState({
    date: "",
    startingHour: "",
    endingHour: "",
  });

  const addShift = (e) => {
    e.preventDefault();
    dispatch(createNewShift(shiftData));
  };

  const changeHandler = (e) => {
    setShiftData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(getAllShifts());
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }
  }, [isError, isSuccess, message]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-14">
      <h2 className="text-3xl font-bold">Shifts</h2>

      <div className="w-full">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>date</th>
              <th>start shift</th>
              <th>end shift</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shiftsData &&
              shiftsData.map((shiftItem, index) => (
                <tr
                  key={`shiftKey-${index}`}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg"
                >
                  <td>
                    {shiftItem.date.slice(8, 10)}\{shiftItem.date.slice(5, 7)}\
                    {shiftItem.date.slice(0, 4)}
                  </td>
                  <td>{shiftItem.startingHour}</td>
                  <td>{shiftItem.endingHour}</td>
                  <td>
                    <button
                      className="w-20 bg-green-700 rounded-xl text-white p-2"
                      onClick={() => navigate(`${shiftItem._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <form className="w-full flex flex-row items-end justify-center gap-10">
        <div className="flex flex-col text-center">
          <p className="font-bold text-xl">Date</p>
          <input
            type="date"
            className="w-48 h-16"
            name="date"
            id="shiftDate"
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col text-center">
          <p className="font-bold text-xl">Starting Hour</p>

          <input
            type="time"
            className="w-48 h-16"
            name="startingHour"
            id="startingHour"
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col text-center">
          <p className="font-bold text-xl">Ending Hour</p>

          <input
            type="time"
            className="w-48 h-16"
            name="endingHour"
            id="endingHour"
            onChange={changeHandler}
          />
        </div>
        <button
          className="w-48 h-16 bg-green-600 text-white font-bold text-2xl rounded-full"
          onClick={addShift}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Shifts;
