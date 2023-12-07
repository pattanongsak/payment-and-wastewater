import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import * as ImIcons from "react-icons/im";

import "../../css/Profile/UpdatePassword.css";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldpassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [OldPasswordFocused, setFocusedOldPassword] = useState(false);
  const [newPasswordFocused, setFocusednewPassword] = useState(false);
  const [confirmPasswordFocused, setconfirmPassword] = useState(false);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldpassword", oldpassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("แก้ไขรหัสผ่านสำเร็จ");
      history.push("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);

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
          <MetaData title="เปลี่ยนรหัสผ่าน" />
          <div className="pageModel">
            <form
              className="formModel"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
              <h1 className="formTitle">เปลี่ยนรหัสผ่าน</h1>
              <div className="formBoxTop">
                <div className="gridBox">
                  <div className="formInput">
                    <label>รหัสผ่านเดิม</label>
                    <input
                      className="formInput"
                      type={passwordShown ? "text" : "password"}
                      placeholder="รหัสผ่านเดิม"
                      required
                      value={oldpassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      //------
                      onBlur={() => setFocusedOldPassword(true)}
                      onFocus={() => setFocusedOldPassword(true)}
                      focused={OldPasswordFocused.toString()}
                      //------
                    />
                    {OldPasswordFocused === true && (
                      <span className="message">
                        *กรุณากรอกรหัสผ่านเดิมให้ถูกต้อง
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>รหัสผ่านใหม่</label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      placeholder="รหัสผ่านใหม่"
                      pattern="^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,50}$"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      //------
                      onBlur={() => setFocusednewPassword(true)}
                      onFocus={() => setFocusednewPassword(true)}
                      focused={newPasswordFocused.toString()}
                      //------
                    />
                    {newPasswordFocused === true && (
                      <span className="message">
                        *รหัสผ่านควรมีความยาว 8 ตัวอักษร
                        และประกอบด้วยตัวอักษรอย่างน้อย 1 ตัว ตัวเลข 1 ตัว!
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>ยืนยันรหัสผ่านใหม่</label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      placeholder="ยืนยันรหัสผ่านใหม่"
                      pattern={newPassword}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      //------
                      onBlur={() => setconfirmPassword(true)}
                      onFocus={() => setconfirmPassword(true)}
                      focused={confirmPasswordFocused.toString()}
                      //------
                    />
                    {confirmPasswordFocused === true && (
                      <span className="message">*รหัสผ่านไม่ตรงกัน</span>
                    )}
                  </div>
                  <div className="showpassword">
                    <label className="gap">แสดงรหัสผ่าน</label>
                    <input type="checkbox" onChange={togglePassword} />
                  </div>
                </div>
              </div>
              <center className="mg30">
                <button
                  className="btnSave btnPassword changePasswordColor"
                  type="submit"
                >
                  <div className="spanButton">
                    <ImIcons.ImKey className="iconEditImg" size={22} />
                    <p>เปลี่ยนรหัสผ่าน</p>
                  </div>
                </button>
              </center>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
