import React, { useEffect } from "react";
import Router from "./routes";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/reducer/LoginReducer";
import ErrorPopup from "./shared/Models/ErrorPopup";
import SuccessPopup from "./shared/Models/SuccessPopup";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const value = localStorage.getItem('userLogin');
    if (value && value === 'true') {
      dispatch(login());
    }
    else {
      dispatch(logout());
    }
  }

  return (
    <div>
      <Router />
      <ErrorPopup />
      <SuccessPopup />
    </div>
  );
}

export default App;
