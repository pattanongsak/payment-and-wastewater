import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";

import "../../css/Profile/Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  var fullName = user.titlename + " " + user.firstname + " " + user.lastname;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  let monthSpan = <p></p>;
  if (String(user.createdAt).substr(5, 2) === "12") {
    monthSpan = "ธันวาคม";
  } else if (String(user.createdAt).substr(5, 2) === "11") {
    monthSpan = "พฤศจิกายน";
  } else if (String(user.createdAt).substr(5, 2) === "10") {
    monthSpan = "ตุลาคม";
  } else if (String(user.createdAt).substr(5, 2) === "09") {
    monthSpan = "กันยายน";
  } else if (String(user.createdAt).substr(5, 2) === "08") {
    monthSpan = "สิงหาคม";
  } else if (String(user.createdAt).substr(5, 2) === "07") {
    monthSpan = "กรกฎาคม";
  } else if (String(user.createdAt).substr(5, 2) === "06") {
    monthSpan = "มิถุนายน";
  } else if (String(user.createdAt).substr(5, 2) === "05") {
    monthSpan = "พฤษภาคม";
  } else if (String(user.createdAt).substr(5, 2) === "04") {
    monthSpan = "เมษายน";
  } else if (String(user.createdAt).substr(5, 2) === "03") {
    monthSpan = "มีนาคม";
  } else if (String(user.createdAt).substr(5, 2) === "02") {
    monthSpan = "กุมภาพันธ์";
  } else if (String(user.createdAt).substr(5, 2) === "01") {
    monthSpan = "มกราคม";
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.firstname} ข้อมูลส่วนตัว`} />
          <div className="pageModel">
            <div className="formModel">
              <h1 className="formTitle">ข้อมูลส่วนตัว</h1>
              <div className="formBox mg30">
                <div className="gridBox">
                  <center>
                    <div>
                      <img
                        src={user.avatar.url}
                        alt={user.identification}
                        id="profileImg"
                      />
                    </div>
                    <div className="registered">
                      <h4>เป็นสมาชิกเมื่อ วันที่</h4>
                      <p>
                        {String(user.createdAt).substr(8, 2)}
                        {" " + monthSpan + " "}
                        {String(user.createdAt).substr(0, 4)}
                      </p>
                    </div>
                    <Link to="/me/update">
                      <button className="btnSave btnAccount editProfileColor">
                        <div className="spanLogin">
                          <MdIcons.MdEdit className="iconEditImg" size={22} />
                          <p>แก้ไขข้อมูลส่วนตัว</p>
                        </div>
                      </button>
                    </Link>
                    <Link to="/password/update">
                      <button
                        className="btnSave btnAccount changePasswordColor"
                        id="mg20"
                      >
                        <div className="spanLogin">
                          <ImIcons.ImKey className="iconEditImg" size={22} />
                          <p>เปลี่ยนรหัสผ่าน</p>
                        </div>
                      </button>
                    </Link>
                  </center>
                </div>
                <div className="gridBox">
                  <div className="formInput">
                    <label>ชื่อผู้ใช้ระบบ</label>
                    <input
                      type="text"
                      value={fullName}
                      className="fontSize16"
                      readOnly
                    />
                  </div>
                  <div className="formInput">
                    <label>รหัสบัตรประจำตัวชาชน</label>
                    <input
                      type="text"
                      value={user.identification}
                      className="fontSize16"
                      readOnly
                    />
                  </div>
                  <div className="formInput">
                    <label>อีเมล</label>
                    <input
                      type="text"
                      value={user.email}
                      className="fontSize16"
                      readOnly
                    />
                  </div>
                  <div className="formInput">
                    <label>เบอร์โทรศัพท์</label>
                    <input
                      type="text"
                      value={user.phone}
                      className="fontSize16"
                      readOnly
                    />
                  </div>
                  {user.role === "admin" || user.role === "employee" ? (
                    <div className="formInput">
                      <label>ตำแหน่งงาน</label>
                      <input
                        type="text"
                        value={user.jobtitle ? user.jobtitle : "-"}
                        className="fontSize16"
                        readOnly
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
