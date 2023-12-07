import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import "../../css/Profile/EditProfile.css";
import "../../css/FormModel/FormSelect.css";
import "../../css/FormModel/FormInput.css";
import "../../css/FormModel/Responsive.css";
import "../../css/Register/Register.css";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { Link } from "react-router-dom";

function UpdateProfile({ history }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [identification, setIdentification] = useState("");
  const [titlename, setTitlename] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [identificationFocused, setFocusedidentification] = useState(false);
  const [titlenameFocused, setFocusedtitlename] = useState(false);
  const [firstnameFocused, setFocusedfirstname] = useState(false);
  const [lastnameFocused, setFocusedlastname] = useState(false);
  const [emailFocused, setFocusedEmail] = useState(false);
  const [phoneFocused, setFocusedphone] = useState(false);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("identification", identification);
    myForm.set("titlename", titlename);
    myForm.set("firstname", firstname);
    myForm.set("lastname", lastname);
    myForm.set("phone", phone);
    myForm.set("jobtitle", jobtitle);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setIdentification(user.identification);
      setTitlename(user.titlename);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setPhone(user.phone);
      setJobtitle(user.jobtitle);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("แก้ไขข้อมูลส่วนตัวสำเร็จ");
      dispatch(loadUser());
      history.push("/me/update");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);

  var isRole = user.role;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="แก้ไขข้อมูลส่วนตัว" />
          {isRole === "admin" ? (
            <Fragment>
              <div className="pageModel">
                <form
                  className="formModel"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <h1 className="formTitle">แก้ไขข้อมูลส่วนตัว</h1>
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
                                onChange={updateProfileDataChange}
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
                          {user.titlename === "นาย" && (
                            <Fragment>
                              <option value="นาย" selected>
                                นาย
                              </option>
                              <option value="นาง">นาง</option>
                              <option value="นางสาว">นางสาว</option>
                            </Fragment>
                          )}
                          {user.titlename === "นาง" && (
                            <Fragment>
                              <option value="นาย">นาย</option>
                              <option value="นาง" selected>
                                นาง
                              </option>
                              <option value="นางสาว">นางสาว</option>
                            </Fragment>
                          )}
                          {user.titlename === "นางสาว" && (
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
                    </div>
                  </div>
                  <center className="btnBox">
                    <button
                      className="btnSave btnSize btnEditProfile"
                      type="submit"
                      value="Update"
                    >
                      <div className="spanButton">
                        <MdIcons.MdSave className="iconEditImg" size={22} />
                        <p>บันทึกข้อมูล</p>
                      </div>
                    </button>
                    <Link to="/account">
                      <button
                        className="btnSave btnSize btnCancel"
                        type="reset"
                      >
                        <div className="spanButton">
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ยกเลิก</p>
                        </div>
                      </button>
                    </Link>
                  </center>
                </form>
              </div>
            </Fragment>
          ) : isRole === "employee" ? (
            <Fragment>
              <div className="pageModel">
                <form
                  className="formModel"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <h1 className="formTitle">แก้ไขข้อมูลส่วนตัว</h1>
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
                                onChange={updateProfileDataChange}
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
                        <label>ตำแหน่งงาน</label>
                        <input
                          type="text"
                          placeholder="กรอกตำแหน่งงาน (ไม่จำเป็น)"
                          name="jobtitle"
                          value={jobtitle}
                          onChange={(e) => setJobtitle(e.target.value)}
                        />
                      </div>
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
                          {user.titlename === "นาย" && (
                            <Fragment>
                              <option value="นาย" selected>
                                นาย
                              </option>
                              <option value="นาง">นาง</option>
                              <option value="นางสาว">นางสาว</option>
                            </Fragment>
                          )}
                          {user.titlename === "นาง" && (
                            <Fragment>
                              <option value="นาย">นาย</option>
                              <option value="นาง" selected>
                                นาง
                              </option>
                              <option value="นางสาว">นางสาว</option>
                            </Fragment>
                          )}
                          {user.titlename === "นางสาว" && (
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
                    </div>
                  </div>
                  <center className="btnBox">
                    <button
                      className="btnSave btnSize btnEditProfile"
                      type="submit"
                      value="Update"
                    >
                      <div className="spanButton">
                        <MdIcons.MdSave className="iconEditImg" size={22} />
                        <p>บันทึกข้อมูล</p>
                      </div>
                    </button>
                    <Link to="/account">
                      <button
                        className="btnSave btnSize btnCancel"
                        type="reset"
                      >
                        <div className="spanButton">
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ย้อนกลับ</p>
                        </div>
                      </button>
                    </Link>
                  </center>
                </form>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="pageModel">
                <form
                  className="formModel"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <h1 className="formTitle">แก้ไขข้อมูลส่วนตัว</h1>
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
                                onChange={updateProfileDataChange}
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
                  <center className="btnBox">
                    <button
                      className="btnSave btnSize btnEditProfile"
                      type="submit"
                      value="Update"
                    >
                      <div className="spanButton">
                        <MdIcons.MdSave className="iconEditImg" size={22} />
                        <p>บันทึกข้อมูล</p>
                      </div>
                    </button>
                    <Link to="/account">
                      <button
                        className="btnSave btnSize btnCancel"
                        type="reset"
                      >
                        <div className="spanButton">
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ย้อนกลับ</p>
                        </div>
                      </button>
                    </Link>
                  </center>
                </form>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProfile;
