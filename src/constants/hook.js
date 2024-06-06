// useReduxData.js
import { useSelector } from 'react-redux';

export const useReduxData = () => {
    const userLoggedIn = useSelector((e) => e.user);
    const employeeLoggedIn = useSelector(e => e.employee);

    return { userLoggedIn, employeeLoggedIn };
};
