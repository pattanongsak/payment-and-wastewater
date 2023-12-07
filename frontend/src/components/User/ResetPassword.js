import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import * as MdIcons from "react-icons/md";

function ResetPassword({ history, match }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwFocused, setFocusedPW] = useState(false);
  const [cpwFocused, setFocusedCPW] = useState(false);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("เปลี่ยนรหัสผ่านสำเร็จ");

      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="pageModel">
            <form
              className="formModel"
              encType="multipart/form-data"
              onSubmit={resetPasswordSubmit}
            >
              <h1 className="formTitle">เปลี่ยนรหัสผ่าน</h1>
              <div className="formBoxTop">
                <div className="gridBox">
                  <div className="formInput">
                    <label>รหัสผ่าน</label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      pattern="^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,50}$"
                      required
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      //------
                      onBlur={() => setFocusedPW(true)}
                      onFocus={() => setFocusedPW(true)}
                      focused={pwFocused.toString()}
                      //------
                    />
                    {pwFocused === true && (
                      <span className="message">
                        *รหัสผ่านควรมีความยาว 8 ตัวอักษร
                        และประกอบด้วยตัวอักษรอย่างน้อย 1 ตัว ตัวเลข 1 ตัว!
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>ยืนยันรหัสผ่าน</label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      placeholder="Confirm Password"
                      pattern={password}
                      required
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => setFocusedCPW(true)}
                      onFocus={() => setFocusedCPW(true)}
                      focused={cpwFocused.toString()}
                    />
                    {cpwFocused !== password.value && (
                      <span className="message">*รหัสผ่านไม่ตรงกัน!</span>
                    )}
                  </div>
                  <div className="showpassword">
                    <label className="gap">แสดงรหัสผ่าน</label>
                    <input type="checkbox" onChange={togglePassword} />
                  </div>
                </div>
              </div>
              <center className="btnBox">
                <button
                  className="btnSave btnSize btnCreate"
                  type="submit"
                  value="Update"
                >
                  <div className="spanButton">
                    <MdIcons.MdSave className="iconEditImg" size={22} />
                    <p>บันทึกรหัสผ่าน</p>
                  </div>
                </button>
              </center>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ResetPassword;
