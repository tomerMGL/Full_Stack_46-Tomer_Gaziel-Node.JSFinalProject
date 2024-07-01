import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset } from "../features/users/usersSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";

const Users = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getAllUsers(token));
  },[]);

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    if(isSuccess){
      toast.success(message);
    }

  }, [isError, isSuccess]);

  if(isLoading) return <Spinner />;
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* <h2>Users</h2> */}
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>

            <th >Username</th>
            <th >Avilible Actions</th>
            <th >Max Actions</th>
          </tr>
        </thead>
        <tbody>
        {users &&
          users.map((user, index) => (
            <tr key={`userKey-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg">
              <td>{user.username}</td>
              <td>{user.actionsAllowed}</td>
              <td>{user.numOfActions}</td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default Users;
