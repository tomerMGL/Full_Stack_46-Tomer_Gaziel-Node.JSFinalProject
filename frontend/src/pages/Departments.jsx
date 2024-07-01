import React from "react";
import data from "../data";
import { Link, Outlet } from "react-router-dom";
const Departments = () => {
  return (
    <div className="w-full h-full flex flex-row relative">
      <div className="w-48 h-full fixed z-10">
        <ul className="w-full h-full flex flex-col justify-center pl-5 gap-3 bg-slate-300">
          {data.departments.map((item, index) => (
            <Link
              to={`/departments/${item !== "Main" ? item : ""}`}
              key={`departments-${index}`}
            >
              <li className="font-bold text-md">{item} Department</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-full ml-48">
        <Outlet />
      </div>
    </div>
  );
};

export default Departments;
