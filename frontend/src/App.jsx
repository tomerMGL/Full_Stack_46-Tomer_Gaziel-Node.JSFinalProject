import Header from "./components/Header";
import {
  LoginPage,
  Dashboard,
  Departments,
  Employees,
  Logs,
  Shifts,
  Users,
  UserDash
} from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NewEmployee, EditEmployee, MainEmployee } from "./components/employees";
import { MainDepartment, EditDepartment, NewDepartment } from "./components/departments";
import EditShift from "./components/EditShift";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="w-full h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="employees" element={<Employees />}>
                <Route path="/employees/edit" element={<EditEmployee />} />
                <Route path="/employees/new" element={<NewEmployee />} />
                <Route path="/employees/" element={<MainEmployee />} />
              </Route>
              <Route path="departments" element={<Departments />}>
              <Route path="/departments/edit" element={<EditDepartment />} />
              <Route path="/departments/new" element={<NewDepartment />} />
              <Route path="/departments/" element={<MainDepartment />} />
              </Route>
              <Route path="shifts" element={<Shifts />} />
              <Route path="shifts/:shiftId" element={<EditShift />} />
              <Route path="users" element={<Users />} />
              <Route path="logs" element={<Logs />} />
              <Route path="/" element={<UserDash />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <ToastContainer position="bottom-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
