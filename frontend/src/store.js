import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import usersReducer from "./features/users/usersSlice";
import employeesReducer from "./features/employees/employeesSlice";
import shiftReducer from "./features/shifts/shiftsSlice";
import employeeShiftReducer from "./features/employeeShift/employeeShiftSlice";
import departmentsReducer from "./features/departments/departmentsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        employees: employeesReducer,
        shifts: shiftReducer,
        employeeShift: employeeShiftReducer,
        departments: departmentsReducer
    },
});