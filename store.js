// store.js
import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './src/redux/sclice/studentSclice'
import employeeSlice from './src/redux/sclice/employeeSclice'
import jobsSlice from './src/redux/sclice/JobSclice';
import resumeSlice from "./src/redux/sclice/resumeSclice"

const store = configureStore({
    reducer: {
        student: studentSlice,
        employee: employeeSlice,
        Jobs: jobsSlice,
        Resume: resumeSlice
    }
});

export default store;
