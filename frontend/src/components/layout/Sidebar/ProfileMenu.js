import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../../../css/Sidebar/Sidebar.css";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";

const ProfileMenu = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  function account() {
    history.push("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("ออกจากระบบสำเร็จ");
    history.push("/");
  }

  return (
    <ul className="block">
      <il onClick={account}>
        <Link className="sidebarLink" id="btnProfile">
          <div className="flex" id="btnProfile">
            <FaIcons.FaUserAlt />
            <div class="sidebarLabel">ข้อมูลส่วนตัว</div>
          </div>
        </Link>
      </il>

      <il onClick={logoutUser}>
        <Link className="sidebarLink" id="btnLogout">
          <div className="flex" id="btnLogout">
            <MdIcons.MdLogout />
            <div class="sidebarLabel">ออกจากระบบ</div>
          </div>
        </Link>
      </il>
    </ul>
  );
};

export default ProfileMenu;
