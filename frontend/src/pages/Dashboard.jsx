import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { authLogOut } from "../features/auth/authSlice";
import data from "../data";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const logOut = () => {
    console.log(user);
    dispatch(authLogOut());
  };

  return (
    <div className="w-full h-full relative bg-[#d1ffc6] flex flex-row">
      <div className="w-1/4 h-full fixed top-0 bg-white flex flex-col justify-around items-center">
        <Link to={"/"}>
          <div className="w-40 h-40 top-10 border-2 border-red-500 rounded-full flex justify-center items-center text-center">
            Hello, <br />
            {user && user.fullName}
          </div>
        </Link>

        <div>
          <ul className="flex flex-col gap-3">
            {data.menu.map((item, index) => (
              <Link to={`/${item}`} key={`menu-${index}`}>
                <li className="font-bold text-3xl">{item}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <button
            className="bg-[#0d8704] rounded-full w-56 h-10 drop-shadow-2xl shadow-xl border-0 text-white text-2xl font-bold"
            onClick={logOut}
          >
            Log-Out
          </button>
        </div>
        <p> Created By © Tomer Gaziel.</p>
      </div>
      <div className="w-3/4 h-full absolute right-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
