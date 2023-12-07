import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "./../layout/Loader/Loader";
import { UPDATE_USER_RESET } from "./../../constants/userConstants";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";

import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

function UpdateUser({ history, match }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { loading, error, usered } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [identification, setIdentification] = useState("");
  const [titlename, setTitlename] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const userId = match.params.id;

  const [identificationFocused, setFocusedidentification] = useState(false);
  const [titlenameFocused, setFocusedtitlename] = useState(false);
  const [firstnameFocused, setFocusedfirstname] = useState(false);
  const [lastnameFocused, setFocusedlastname] = useState(false);
  const [emailFocused, setFocusedEmail] = useState(false);
  const [phoneFocused, setFocusedphone] = useState(false);
  const [pwFocused, setFocusedPW] = useState(false);
  const [cpwFocused, setFocusedCPW] = useState(false);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("identification", identification);
    myForm.set("titlename", titlename);
    myForm.set("firstname", firstname);
    myForm.set("lastname", lastname);
    myForm.set("phone", phone);
    myForm.set("jobtitle", jobtitle);
    myForm.set("email", email);
    myForm.set("role", role);

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updateUser(userId, myForm));
  };

  useEffect(() => {
    if (usered && usered._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setIdentification(usered.identification);
      setTitlename(usered.titlename);
      setFirstname(usered.firstname);
      setLastname(usered.lastname);
      setPhone(usered.phone);
      setJobtitle(usered.jobtitle);
      setEmail(usered.email);
      setRole(usered.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("แก้ไขข้อมูลผู้ใช้ระบบสำเร็จ");
      history.push(
        user.role === "admin" ? "/admin-dashboards" : "/user-dashboard"
      );
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    userId,
    usered,
    user,
    updateError,
  ]);

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
          <MetaData title="แก้ไขข้อมูลผู้ใช้ระบบ" />
          <div className="pageModel">
            <form
              className="formModel"
              encType="multipart/form-data"
              onSubmit={updateUserSubmitHandler}
            >
              {user.role === "admin" ? (
                <h1 className="formTitle">แก้ไขข้อมูลผู้ใช้ระบบ</h1>
              ) : (
                <h1 className="formTitle">แก้ไขข้อมูลลูกหนี้</h1>
              )}
              <div className="formBox">
                <div className="gridBox">
                  <div className="formInput" id="identification">
                    <label>เลขบัตรประชาชน</label>
                    <input
                      type="text"
                      maxLength={13}
                      placeholder="กรอกเลขบัตรประชาชน"
                      pattern="^[0-9]{13}$"
                      required
                      name="identification"
                      value={identification}
                      onChange={(e) => setIdentification(e.target.value)}
                      //------
                      onBlur={() => setFocusedidentification(true)}
                      onFocus={() => setFocusedidentification(true)}
                      focused={identificationFocused.toString()}
                      //------
                    />
                    {identificationFocused === true && (
                      <span className="message">
                        *กรอกเลขบัตรประชาชน 13 ตัว!
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>อีเมล</label>
                    <input
                      type="email"
                      placeholder="กรอกอีเมล"
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
                  <div className="formInput " id="phone">
                    <label>เบอร์โทร</label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="กรอกเบอร์โทรศัพท์"
                      pattern="^[0-9]{10}$"
                      required
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      //------
                      onBlur={() => setFocusedphone(true)}
                      onFocus={() => setFocusedphone(true)}
                      focused={phoneFocused.toString()}
                      //------
                    />
                    {phoneFocused === true && (
                      <span className="message">*กรอกเบอร์โทร 10 ตัว!</span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>รหัสผ่าน</label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      pattern="^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,50}$"
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
                  {user.role === "admin" && (
                    <Fragment>
                      <div className="formInput">
                        <label>สิทธ์ผู้ใช้ระบบ</label>
                        <select
                          className="formSelect"
                          name="role"
                          required
                          onChange={(e) => setRole(e.target.value)}
                        >
                          {usered.role === "admin" && (
                            <Fragment>
                              <option value="admin" selected>
                                ผู้ดูแลระบบ
                              </option>
                              <option value="employee">พนักงาน</option>
                              <option value="user">ลูกหนี้</option>
                              <option value="revoke">ระงับการใช้งาน</option>
                            </Fragment>
                          )}
                          {usered.role === "employee" && (
                            <Fragment>
                              <option value="admin">ผู้ดูแลระบบ</option>
                              <option value="employee" selected>
                                พนักงาน
                              </option>
                              <option value="user">ลูกหนี้</option>
                              <option value="revoke">ระงับการใช้งาน</option>
                            </Fragment>
                          )}
                          {usered.role === "user" && (
                            <Fragment>
                              <option value="admin">ผู้ดูแลระบบ</option>
                              <option value="employee">พนักงาน</option>
                              <option value="user" selected>
                                ลูกหนี้
                              </option>
                              <option value="revoke">ระงับการใช้งาน</option>
                            </Fragment>
                          )}
                          {usered.role === "revoke" && (
                            <Fragment>
                              <option value="admin">ผู้ดูแลระบบ</option>
                              <option value="employee">พนักงาน</option>
                              <option value="user">ลูกหนี้</option>
                              <option value="revoke" selected>
                                ระงับการใช้งาน
                              </option>
                            </Fragment>
                          )}
                          {usered.role === "temporarily" && (
                            <Fragment>
                              <option value="temporarily" selected>
                                หยุดใช้งานชั่วคราว
                              </option>
                            </Fragment>
                          )}
                        </select>
                      </div>
                    </Fragment>
                  )}
                </div>
                <div className="gridBox">
                  <div className="formInput">
                    <label>คำนำหน้าชื่อ</label>
                    <select
                      className="formSelect"
                      name="titlename"
                      required
                      onChange={(e) => setTitlename(e.target.value)}
                      //------
                      onBlur={() => setFocusedtitlename(true)}
                      onFocus={() => setFocusedtitlename(true)}
                      focused={titlenameFocused.toString()}
                      //------
                    >
                      {usered.titlename === "นาย" && (
                        <Fragment>
                          <option value="นาย" selected>
                            นาย
                          </option>
                          <option value="นาง">นาง</option>
                          <option value="นางสาว">นางสาว</option>
                        </Fragment>
                      )}
                      {usered.titlename === "นาง" && (
                        <Fragment>
                          <option value="นาย">นาย</option>
                          <option value="นาง" selected>
                            นาง
                          </option>
                          <option value="นางสาว">นางสาว</option>
                        </Fragment>
                      )}
                      {usered.titlename === "นางสาว" && (
                        <Fragment>
                          <option value="นาย">นาย</option>
                          <option value="นาง">นาง</option>
                          <option value="นางสาว" selected>
                            นางสาว
                          </option>
                        </Fragment>
                      )}
                    </select>
                    {titlenameFocused === true && (
                      <span className="message">*กรุณาเลือกคำนำหน้า!</span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>ชื่อ</label>
                    <input
                      type="text"
                      placeholder="กรุณากรอกชื่อ"
                      required
                      name="firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      //------
                      onBlur={() => setFocusedfirstname(true)}
                      onFocus={() => setFocusedfirstname(true)}
                      focused={firstnameFocused.toString()}
                      //------
                    />
                    {firstnameFocused === true && (
                      <span className="message">*กรุณากรอกชื่อ!</span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>นามสกุล</label>
                    <input
                      type="text"
                      placeholder="กรอกนามสกุล"
                      required
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      //------
                      onBlur={() => setFocusedlastname(true)}
                      onFocus={() => setFocusedlastname(true)}
                      focused={lastnameFocused.toString()}
                      //------
                    />
                    {lastnameFocused === true && (
                      <span className="message">*กรุณากรอกนามสกุล!</span>
                    )}
                  </div>
                  {user.role === "admin" && (
                    <Fragment>
                      <div className="formInput">
                        <label>ตำแหน่งงาน</label>
                        <input
                          type="text"
                          placeholder="กรอกตำแหน่งงาน (ไม่จำเป็น)"
                          name="jobtitle"
                          value={jobtitle}
                          onChange={(e) => setJobtitle(e.target.value)}
                        />
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
              <center className="btnBox">
                <div className="btnBoxSub">
                  <div
                    className="btnSave btnSize btnEditProfile"
                    onClick={() => setOpenModal(true)}
                  >
                    <div className="spanButton">
                      <MdIcons.MdSave className="iconEditImg" size={22} />
                      <p>บันทึกข้อมูล</p>
                    </div>
                  </div>
                  <Link
                    to={
                      user.role === "admin"
                        ? "/admin-dashboards"
                        : "/user-dashboard"
                    }
                  >
                    <button className="btnSave btnSize btnCancel" type="reset">
                      <div className="spanButton">
                        <MdIcons.MdCancel className="iconEditImg" size={22} />
                        <p>ยกเลิก</p>
                      </div>
                    </button>
                  </Link>
                </div>
              </center>

              <div className={openModal ? "openModal" : "closeModal"}>
                <div className="modal-content">
                  <div className="modal-header modal-SaveBar">
                    <MdIcons.MdClose
                      className="close"
                      size={35}
                      onClick={() => setOpenModal(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <IoIcons.IoIosCheckmarkCircleOutline
                      className="iconModal-Save"
                      size={120}
                    />
                    <div>
                      <p>คุณต้องการบันทึกการเปลี่ยนแปลงข้อมูลหรือไม่?</p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <center className="btnBox">
                      <button
                        className="btnSave btnSize modal-Cancel"
                        type="reset"
                        onClick={() => window.location.reload()}
                      >
                        <div className="spanButton">
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ยกเลิก</p>
                        </div>
                      </button>
                      <button
                        className="btnSave btnSize modal-Save"
                        type="submit"
                        disabled={updateLoading ? true : false}
                      >
                        <div className="spanButton">
                          <MdIcons.MdSave className="iconEditImg" size={22} />
                          <p>บันทึกข้อมูล</p>
                        </div>
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateUser;
