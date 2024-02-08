import React, { useState } from "react";
import Logo from "../../assets/sidebar/logo.png";
import { ReactComponent as Email } from "../../assets/login/email.svg";
import { ReactComponent as Password } from "../../assets/login/password.svg";
import { apisPath, paths } from "../../utils/path";
import { login } from "../../redux/reducer/LoginReducer";
import { openTicker } from "../../redux/reducer/ErrorTickerReducer";
import { openSuccessTicker } from "../../redux/reducer/SuccessTickerReducer";
import { useDispatch } from "react-redux";
import http from "../../services/utility";

export default function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleLogin = async () => {
    // await http
    //   .post(apisPath?.adminLogin?.login, formData)
    //   .then((res) => {
        dispatch(
          // openSuccessTicker({ title: "Success", body: res?.data?.message })
          openSuccessTicker({ title: "Success", body: "Login Succesfully" })
        );
        localStorage.setItem("userLogin", true);
        dispatch(login());
      // })
      // .catch((err) => {
      //   // console.log(err);
      //   dispatch(
      //     openTicker({ title: "Error", body: err?.response?.data?.message })
      //   );
      // });
  };

  return (
    <div className="login">
      <img src={Logo} alt="bignlean" />
      <h3>Log In</h3>
      <div className="login__content">
        <div className="transparent__input login__input">
          <input
            type="text"
            className="input_transparent"
            placeholder="Enter Email"
            autoComplete="true"
            name="identifier"
            value={formData?.identifier}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e?.target?.name]: e?.target?.value };
              })
            }
          />
          <Email className="transparent__input__icon" />
        </div>
        <div className="transparent__input login__input">
          <input
            type="password"
            className="input_transparent"
            placeholder="Enter Password"
            autoComplete="true"
            name="password"
            value={formData?.password}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e?.target?.name]: e?.target?.value };
              })
            }
          />
          <Password className="transparent__input__icon" />
        </div>
        {/* <span
          onClick={() => navigate(`/${paths?.front?.user?.reset_password}`)}
        >
          Reset Password
        </span> */}
      </div>
      <div className="login__bottom_content">
        <div className="login__bottom_content__remember_me">
          <label className="login__bottom_content__remember_me__no_of_user__switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          Remember Me
        </div>
      </div>
      <button className="button-red" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}
