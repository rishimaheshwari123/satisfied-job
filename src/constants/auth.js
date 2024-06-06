// constants/auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useUserLoggedIn = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('userLoggedIn');
        if (value !== null) {
          setUserLoggedIn(value === 'true');
        }
      } catch (error) {
        console.error('Error reading user login state:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return { userLoggedIn, setUserLoggedIn };
};

export const useEmployeeLoggedIn = () => {
  const [employeeLoggedIn, setEmployeeLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('employeeLoggedIn');
        if (value !== null) {
          setEmployeeLoggedIn(value === 'true');
        }
      } catch (error) {
        console.error('Error reading employee login state:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return { employeeLoggedIn, setEmployeeLoggedIn };
};
