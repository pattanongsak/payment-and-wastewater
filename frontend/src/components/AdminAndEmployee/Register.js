import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import "../../css/Profile/EditProfile.css";
import "../../css/FormModel/FormSelect.css";
import "../../css/FormModel/FormInput.css";
import "../../css/FormModel/Responsive.css";
import "../../css/Register/Register.css";
import { REGISTER_USER_RESET } from "../../constants/userConstants";

const LoginSignUp = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isSuccess } = useSelector(
    (state) => state.registermodule
  );
  const { user } = useSelector((state) => state.user);

  const [newUser, setNewUser] = useState({
    identification: "",
    titlename: "",
    firstname: "",
    lastname: "",
    phone: "",
    jobtitle: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const {
    identification,
    titlename,
    firstname,
    lastname,
    phone,
    jobtitle,
    email,
    password,
    confirmPassword,
    role,
  } = newUser;

  const [identificationFocused, setFocusedidentification] = useState(false);
  const [titlenameFocused, setFocusedtitlename] = useState(false);
  const [firstnameFocused, setFocusedfirstname] = useState(false);
  const [lastnameFocused, setFocusedlastname] = useState(false);
  const [emailFocused, setFocusedEmail] = useState(false);
  const [passwordFocused, setFocusedPassword] = useState(false);
  const [confirmPasswordFocused, setconfirmPassword] = useState(false);
  const [phoneFocused, setFocusedphone] = useState(false);

  const [avatar, setAvatar] = useState(
    "https://img.icons8.com/?size=512&id=65342&format=png"
  );
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("identification", identification);
    myForm.set("titlename", titlename);
    myForm.set("firstname", firstname);
    myForm.set("lastname", lastname);
    myForm.set("phone", phone);
    myForm.set("jobtitle", jobtitle);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.set("role", role);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isSuccess) {
      alert.success("สมัครบัญชีสำเร็จ");
      history.push("/user-dashboard");
      dispatch({ type: REGISTER_USER_RESET });
      window.location.reload();
    }
  }, [dispatch, error, alert, history, isSuccess]);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Fragment>
      <MetaData title={"สมัครสมาชิก"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <form
              className="formModel"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              {user.role === "admin" ? (
                <Fragment>
                  <h1 className="formTitle">เพิ่มข้อมูลผู้ใช้ระบบ</h1>
                </Fragment>
              ) : (
                <Fragment>
                  <h1 className="formTitle">เพิ่มข้อมูลลูกหนี้</h1>
                </Fragment>
              )}
              <center>
                <div className="formBoxTop">
                  <div className="gridBox">
                    <div className="formInput">
                      <div className="upPicture">
                        <label>
                          <input
                            type="file"
                            id="imageUpload"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                          />
                          <div className="">
                            <img
                              id="updateImage"
                              src={avatarPreview}
                              alt="Avatar Preview"
                            />
                          </div>
                          <center className="">
                            <div className="btnSave btnSize btnUpPicture">
                              <div className="spanButton">
                                <FaIcons.FaCamera
                                  className="iconEditImg"
                                  size={22}
                                />
                                <p>อัปโหลดภาพ</p>
                              </div>
                            </div>
                          </center>
                          <h3>
                            รองรับไฟล์นามสกุล jpg, jpeg หรือ png และ
                            ขนาดไฟล์ที่เหมาะสมคือ 300x300 พิกเซล
                          </h3>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </center>
              <div className="formBox">
                <div className="gridBox">
                  <div className="formInput" id="identification">
                    <label>เลขบัตรประชาชน</label>
                    <input
                      type="text"
                      maxLength={13}
                      pattern="^[0-9]{13}$"
                      placeholder="กรอกเลขบัตรประชาชน"
                      required
                      name="identification"
                      value={identification}
                      onChange={registerDataChange}
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
                      placeholder="E-Mail"
                      required
                      name="email"
                      value={email}
                      onChange={registerDataChange}
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
                  <div className="formInput">
                    <label>รหัสผ่าน</label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      pattern="^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,50}$"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                      //------
                      onBlur={() => setFocusedPassword(true)}
                      onFocus={() => setFocusedPassword(true)}
                      focused={passwordFocused.toString()}
                      //------
                    />
                    {passwordFocused === true && (
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
                      onChange={registerDataChange}
                      onBlur={() => setconfirmPassword(true)}
                      onFocus={() => setconfirmPassword(true)}
                      focused={confirmPasswordFocused.toString()}
                    />
                    {confirmPassword !== password.value && (
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
                          onChange={registerDataChange}
                        >
                          <option value="user">ลูกหนี้</option>
                          <option value="admin">ผู้ดูแลระบบ</option>
                          <option value="employee">พนักงาน</option>
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
                      onChange={registerDataChange}
                      //------
                      onBlur={() => setFocusedtitlename(true)}
                      onFocus={() => setFocusedtitlename(true)}
                      focused={titlenameFocused.toString()}
                      //------
                    >
                      <option value="">คำนำหน้าชื่อ</option>
                      <option value="นาย">นาย</option>
                      <option value="นาง">นาง</option>
                      <option value="นางสาว">นางสาว</option>
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
                      onChange={registerDataChange}
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
                      onChange={registerDataChange}
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
                      onChange={registerDataChange}
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
                  {user.role === "admin" && (
                    <Fragment>
                      <div className="formInput">
                        <label>ตำแหน่งงาน</label>
                        <input
                          type="text"
                          placeholder="กรอกตำแหน่งงาน (ไม่จำเป็น)"
                          name="jobtitle"
                          value={jobtitle}
                          onChange={registerDataChange}
                        />
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
              <center className="btnBox">
                <button
                  className="btnSave btnSize btnEditProfile"
                  type="submit"
                  value="Register"
                >
                  <div className="spanButton">
                    <IoIcons.IoMdPersonAdd className="iconEditImg" size={22} />
                    <p>ลงทะเบียน</p>
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

export default LoginSignUp;
