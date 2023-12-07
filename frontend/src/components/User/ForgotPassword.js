import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import * as MdIcons from "react-icons/md";
import "../../css/FormModel/FormSelect.css";
import "../../css/FormModel/FormInput.css";
import "../../css/FormModel/Responsive.css";
import "../../css/Register/Register.css";

function ForgotPassword() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");
  const [identification, setIdentification] = useState("");

  const [emailFocused, setFocusedEmail] = useState(false);
  const [identificationFocused, setFocusedIdentification] = useState(false);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    myForm.set("identification", identification);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="แก้ไขข้อมูลส่วนตัว" />
          <div className="pageModel">
            <form className="formModel" onSubmit={forgotPasswordSubmit}>
              <h1 className="formTitle">ลืมรหัสผ่าน</h1>
              <div className="formTopBox">
                <div className="gridBox">
                  <div className="formInput">
                    <label>รหัสบัตรประจำตัวประชาขน</label>
                    <input
                      type="text"
                      placeholder="รหัสบัตรประจำตัวประชาขน"
                      required
                      maxLength={13}
                      name="identification"
                      value={identification}
                      onChange={(e) => setIdentification(e.target.value)}
                      //------
                      onBlur={() => setFocusedIdentification(true)}
                      onFocus={() => setFocusedIdentification(true)}
                      focused={identificationFocused.toString()}
                      //------
                    />
                    {identificationFocused === true && (
                      <span className="message">
                        *กรอกรหัสบัตรประจำตัวประชาขนถูกต้อง!
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>อีเมล</label>
                    <input
                      type="email"
                      placeholder="E-Mail"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      //------
                      onBlur={() => setFocusedEmail(true)}
                      onFocus={() => setFocusedEmail(true)}
                      focused={emailFocused.toString()}
                      //------
                    />
                    {emailFocused === true && (
                      <span className="message">*กรอกอีเมลให้ถูกต้อง!</span>
                    )}
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
                    <MdIcons.MdSend className="iconEditImg" size={22} />
                    <p>ยืนยันอีเมล</p>
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

export default ForgotPassword;
