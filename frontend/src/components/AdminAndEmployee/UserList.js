import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
  updateLoginUser,
  updateLoginUserOff,
} from "../../actions/userAction";
import {
  DELETE_USER_RESET,
  UPDATE_LOGIN_USER_OFF_RESET,
  UPDATE_LOGIN_USER_RESET,
} from "./../../constants/userConstants";
import MetaData from "./../layout/MetaData";

import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";

import "../../css/UserDashboard/UserDashboard.css";
import "../../css/FormModel/ModalBox.css";

import { Switch } from "antd";

function UserList({ history, match }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, specifiUser, specifiUserCount, resultPerPage } =
    useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    isUpdateLoginUser,
    isUpdateLoginUserOff,
    message,
  } = useSelector((state) => state.profile);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
    setOpenModal(false);
  };

  const [toggle, setToggle] = useState(
    localStorage.getItem("toggle") === "true"
  );

  const toggleSwitch = () => {
    setToggle((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggle", newState.toString());
      return newState;
    });
    dispatch(updateLoginUser());
  };

  const toggleSwitchOff = () => {
    setToggle((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggle", newState.toString());
      return newState;
    });
    dispatch(updateLoginUserOff());
  };

  useEffect(() => {
    const storedToggle = localStorage.getItem("toggle");
    if (storedToggle !== null) {
      setToggle(storedToggle === "true");
    }
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/user-dashboard");
      dispatch({ type: DELETE_USER_RESET });
    }

    if (isUpdateLoginUser) {
      alert.success("ลูกหนี้จะไม่สามาถเข้าสู่ระบบได้ชั่วคราว");
      dispatch({ type: UPDATE_LOGIN_USER_RESET });
    }

    if (isUpdateLoginUserOff) {
      alert.success("ลูกหนี้สามาถเข้าสู่ระบบได้ตามปกติ");
      dispatch({ type: UPDATE_LOGIN_USER_OFF_RESET });
    }

    dispatch(getAllUsers(keyword, currentPage));
  }, [
    dispatch,
    error,
    alert,
    deleteError,
    history,
    isDeleted,
    isUpdateLoginUser,
    isUpdateLoginUserOff,
    message,
    keyword,
    currentPage,
  ]);

  //Search User
  const [keywordText, setKeywordText] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywordText.trim()) {
      history.push(`/user-dashboard/${keywordText}`);
    } else {
      history.push("/user-dashboard");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(null);

  const setModalUserId = (userItemId) => {
    setOpenModal(true);
    setUserId(userItemId);
  };

  return (
    <Fragment>
      <MetaData title={"ข้อมูลลูกหนี้"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel">
              <h1 className="formTitle">ข้อมูลลูกหนี้ทั้งหมด</h1>
              <div className="formBoxTop">
                <form className="searchBox" onSubmit={searchSubmitHandler}>
                  <label>ค้นหาผู้ใช้ระบบ</label>
                  <div className="formSearch">
                    <input
                      className="formInput"
                      type="text"
                      value={keywordText}
                      placeholder="ค้นหาด้วย... ชื่อลูกหนี้"
                      onChange={(e) => setKeywordText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btnSave btnSearch iconSearch"
                    >
                      <MdIcons.MdSearch size={25} />
                    </button>
                  </div>
                </form>
                <div className="alingBetween">
                  <div className="alingSwitch">
                    <Switch
                      onClick={toggle ? toggleSwitchOff : toggleSwitch}
                      checked={toggle}
                    />{" "}
                    <p>
                      {toggle ? <b>เปิดใช้งาน</b> : <b>ปิดใช้งาน</b>} ลูกหนี้
                    </p>
                  </div>
                  <div className="">
                    <Link to="/register">
                      <button className="btnSave btnNewUser colorGreen">
                        <div className="spanLogin">
                          <IoIcons.IoMdPersonAdd
                            className="iconEditImg"
                            size={22}
                          />
                          <p>เพิ่มข้อมูลลูกหนี้</p>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
                {specifiUser.length === 0 ? (
                  <div
                    className="emotyCart"
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      padding: "10vmax",
                      height: "50vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h3>ไม่มีพบข้อมูลลูกหนี้</h3>
                    <h3>กรุณาค้นหาใหม่อีกครั้ง</h3>
                    <br />
                  </div>
                ) : (
                  <Fragment>
                    <div className="listBodyBox">
                      <div className="listBodyTitle">ข้อมูลผู้ใช้</div>
                      <div className="listBodyTitle">สิทธ์ผู้ใช้</div>
                      <div className="listBodyTitle">ตัวเลือก</div>
                    </div>
                    {specifiUser &&
                      specifiUser.map((user) => (
                        <div key={user._id}>
                          {user && user.role === "user" ? (
                            <Fragment>
                              <div className="listBody">
                                <div className="listBodyDetail">
                                  <div className="userDetail">
                                    <div className="">
                                      <img
                                        className="imgUser"
                                        src={user.avatar.url}
                                        alt="userAvater"
                                      />
                                    </div>
                                    <div className="userTag">
                                      <div className="userDetail">
                                        <HiIcons.HiOutlineIdentification
                                          size={30}
                                        />
                                        <h5>
                                          <h4 className="colorBlue">
                                            {user.identification}
                                          </h4>
                                        </h5>
                                      </div>
                                      <div className="userDetail">
                                        <HiIcons.HiOutlineUser size={25} />
                                        <p>
                                          {user.titlename} {user.firstname}{" "}
                                          {user.lastname}
                                        </p>
                                      </div>
                                      <div className="userDetail">
                                        <HiIcons.HiOutlineMail size={25} />
                                        <p>{user.email}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="listBodyDetail userLevel">
                                  <p
                                    className={
                                      user.role === "user"
                                        ? "roleTag colorGreen"
                                        : user.role === "employee"
                                        ? "roleTag colorYellow"
                                        : "roleTag colorRed"
                                    }
                                  >
                                    {user.role === "admin"
                                      ? "ผู้ดูแลระบบ"
                                      : user.role === "employee"
                                      ? "พนักงาน"
                                      : "ลูกหนี้"}
                                  </p>
                                </div>
                                <div className="listBodyDetail userOption">
                                  <Link
                                    className="linkIcon"
                                    to={`/createaddress/${user._id}`}
                                  >
                                    <MdIcons.MdAddBusiness
                                      className="userOption iconOpion iconColorBlue"
                                      size={25}
                                    />
                                  </Link>
                                  <Link
                                    className="linkIcon"
                                    to={`/admin/user/${user._id}`}
                                  >
                                    <MdIcons.MdOutlineModeEditOutline
                                      className="userOption iconOpion iconColorYellow"
                                      size={25}
                                    />
                                  </Link>
                                  <MdIcons.MdOutlineDelete
                                    className="userOption iconOpion iconColorRed"
                                    size={25}
                                    onClick={() => setModalUserId(user._id)}
                                  />
                                </div>
                              </div>

                              <div
                                className={
                                  openModal ? "openModal" : "closeModal"
                                }
                              >
                                <div className="modal-content">
                                  <div className="modal-header modal-DeleteBar">
                                    <MdIcons.MdClose
                                      className="close"
                                      size={35}
                                      onClick={() => setOpenModal(false)}
                                    />
                                  </div>
                                  <div className="modal-body">
                                    <IoIcons.IoIosCloseCircleOutline
                                      className="iconModal-Delete"
                                      size={120}
                                    />
                                    <div>
                                      <p>
                                        คุณแน่ใจหรือไม่ว่าคุณต้องการลบข้อมูลผู้ใช้ระบบคนนี้?
                                      </p>
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
                                          <MdIcons.MdCancel
                                            className="iconEditImg"
                                            size={22}
                                          />
                                          <p>ยกเลิก</p>
                                        </div>
                                      </button>
                                      <button
                                        className="btnSave btnSize modal-Delete"
                                        type="submit"
                                        onClick={() =>
                                          deleteUserHandler(userId)
                                        }
                                      >
                                        <div className="spanButton">
                                          <MdIcons.MdDelete
                                            className="iconEditImg"
                                            size={22}
                                          />
                                          <p>ลบ</p>
                                        </div>
                                      </button>
                                    </center>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          ) : (
                            <Fragment></Fragment>
                          )}
                        </div>
                      ))}
                  </Fragment>
                )}
                <div className="btnBox">
                  <center>
                    <p>
                      แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                      {specifiUserCount} รายการ{" "}
                    </p>
                  </center>
                  {resultPerPage < specifiUserCount && (
                    <div className="paginationBox">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={specifiUserCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UserList;
