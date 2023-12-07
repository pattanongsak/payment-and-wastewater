import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import { clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import imgLogin from "../../images/imgLogin.gif";

import "../../css/FormModel/FormSelect.css";
import "../../css/FormModel/FormInput.css";
import "../../css/FormModel/Responsive.css";
import "../../css/Login/Login.css";
import MetaData from "../layout/MetaData";

function Login({ history, location }) {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const alert = useAlert();

  const loginTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [emailFocused, setFocusedEmail] = useState(false);
  const [passwordFocused, setFocusedPassword] = useState(false);

  const loginSubmit = (e) => {
    setFocusedEmail(true);
    setFocusedPassword(true);
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="pageModel">
      <MetaData title="เข้าสู่ระบบ" />
      <form
        className="formModel login-wrapper"
        ref={loginTab}
        onSubmit={loginSubmit}
      >
        <div className="formBox">
          <div className="gridBox loginSubTitleBox">
            <h2 className="formTitle loginTitleText">
              ระบบชำระค่าธรรมเนียมขยะและบำบัดน้ำเสีย
            </h2>
            <h3 className="loginSubTitle">** หมายเหตุ ** </h3>
            <h4 className="loginSubTitle loginSub">
              หากต้องการใช้ระบบชำระค่าธรรมเนียม{" "}
            </h4>
            <h4 className="loginSubTitle  loginSub">
              โปรดติดต่อที่ : เทศบาลตำบลสันผักหวาน จังหวัดเชียงใหม่
            </h4>
            <img className="imgLogin" src={imgLogin} alt="logo" />
          </div>
          <div className="gridBox vl">
            <h1 className="formTitle loginTitle">เข้าสู่ระบบ</h1>
            <div className="formInput loginInput">
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onBlur={() => setFocusedEmail(true)}
                onFocus={() => setFocusedEmail(true)}
                focused={emailFocused.toString()}
                required
              />
              {emailFocused === true && (
                <span className="message">*กรุณากรอกอีเมล!</span>
              )}
            </div>
            <div className="formInput loginInput">
              <input
                type={passwordShown ? "text" : "password"}
                placeholder="PASSWORD"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onBlur={() => setFocusedPassword(true)}
                onFocus={() => setFocusedPassword(true)}
                focused={passwordFocused.toString()}
                required
              />
              {passwordFocused === true && (
                <span className="message">*กรุณากรอกรหัสผ่าน!</span>
              )}
            </div>
            <div className="showpassword loginInput">
              <label className="gap">แสดงรหัสผ่าน</label>
              <input type="checkbox" onChange={togglePassword} />
            </div>
            <center>
              <button type="submit" value="Login" className="btnSave btnLogin">
                <div className="spanLogin">
                  เข้าสู่ระบบ{" "}
                  <MdIcons.MdOutlineNavigateNext
                    className="iconLogin"
                    size={22}
                  />
                </div>
              </button>
            </center>
            <div className="forget">
              <Link to="/password/forgot" className="spanForget">
                <span>ลืมรหัสผ่าน</span>
                <BsIcons.BsQuestionCircleFill
                  className="iconForget"
                  size={15}
                />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
