import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authLogin, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import factoryLogo from "../assets/logoBlack.png";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [userLogin, setUserLogin] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      navigate("/");
    }

    dispatch(reset());
  }, [message, user, dispatch, isError, isSuccess]);

  const login = async (e) => {
    e.preventDefault();
    dispatch(authLogin(userLogin));
  };

  const changeData = (e) => {
    setUserLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loadSeeds = async (e) => {
    e.preventDefault();
    const { data} = await axios.get("http://localhost:8000/users/seeds");
    if(data.success){
      toast.info(data.message)
    } else {
      toast.error(data.message)
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-screen bg-[#d1ffc6] flex flex-col justify-center items-center">
      <div className="w-2/4 h-4/5 rounded-xl bg-gradient-to-tr from-[#6cff55] to-[#a6ff93] flex flex-col items-center justify-center gap-5 drop-shadow-2xl shadow-xl">
        <img src={factoryLogo} alt="Factory logo" />
        <h1 className="text-[#013201] text-5xl font-bold">Login</h1>
        <form className="w-1/3 flex flex-col gap-4">
          <input
            type="text"
            name="email"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            placeholder="Email"
            onChange={changeData}
          />
          <input
            type="text"
            name="username"
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl"
            placeholder="Username"
            onChange={changeData}
          />
          <button
            className="bg-[#ebffe5] rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl border-0"
            onClick={login}
          >
            Log-In
          </button>
          <button
            className="rounded-full w-full h-10 pl-3 drop-shadow-2xl shadow-xl mt-10 gradient_anim_btn border-2 border-black"
            onClick={loadSeeds}
          >
            Load Seeds
          </button>
        </form>
        <p className="mt-10"> Created By © Tomer Gaziel.</p>
      </div>
    </div>
  );
};

export default LoginPage;
