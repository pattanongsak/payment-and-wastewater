import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./Search.css";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "./../../constants/userConstants";
import MetaData from "./../layout/MetaData";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";

import "../../css/UserDashboard/UserDashboard.css";

function AdminDashboard({ history, match }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    error,
    users,
    specifiUser,
    specifiEmployee,
    specifiAdmin,
    specifiRevoke,
    usersCount,
    specifiUserCount,
    specifiEmployeeCount,
    specifiemAdminCount,
    specifiemRevokeCount,
    resultPerPage,
  } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
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
      history.push("/admin-dashboards");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers(keyword, currentPage));
  }, [
    dispatch,
    error,
    alert,
    deleteError,
    history,
    isDeleted,
    message,
    keyword,
    currentPage,
  ]);

  //Search User
  const [keywordText, setKeywordText] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywordText.trim()) {
      history.push(`/admin-dashboards/${keywordText}`);
      setCurrentPage(1);
    } else {
      history.push("/admin-dashboards");
      setCurrentPage(1);
    }
    setRadioChk("");
  };

  const [radioChk, setRadioChk] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [userId, setUserId] = useState(null);

  const setModalUserId = (userItemId) => {
    setOpenModal(true);
    setUserId(userItemId);
  };

  return (
    <Fragment>
      <MetaData title={"ข้อมูลผู้ใช้ระบบ"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel">
              <h1 className="formTitle">ข้อมูลผู้ใช้ทั้งหมด</h1>
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
                <div>
                  <div>
                    <form>
                      <label>ตัวเลือก : </label>
                      <input
                        type="radio"
                        checked={radioChk === "admin"}
                        value="admin"
                        onClick={() => setRadioChk("admin")}
                        onChange={() => setCurrentPage(1)}
                      />{" "}
                      ผู้ดูแลระบบ{" "}
                      <input
                        type="radio"
                        checked={radioChk === "employee"}
                        value="employee"
                        onClick={() => setRadioChk("employee")}
                        onChange={() => setCurrentPage(1)}
                      />{" "}
                      พนักงาน{" "}
                      <input
                        type="radio"
                        checked={radioChk === "user"}
                        value="user"
                        onClick={() => setRadioChk("user")}
                        onChange={() => setCurrentPage(1)}
                      />{" "}
                      ลูกหนี้{" "}
                      <input
                        type="radio"
                        checked={radioChk === "revoke"}
                        value="revoke"
                        onClick={() => setRadioChk("revoke")}
                        onChange={() => setCurrentPage(1)}
                      />{" "}
                      ระงับการใช้งาน{" "}
                      <input
                        type="radio"
                        checked={radioChk === "alluser"}
                        value="alluser"
                        onClick={() => setRadioChk("")}
                        onChange={() => setCurrentPage(1)}
                      />{" "}
                      ทั้งหมด{" "}
                    </form>
                  </div>
                </div>
                <div className="align-right">
                  <Link to="/register">
                    <button className="btnSave btnNewUser colorGreen">
                      <div className="spanLogin">
                        <IoIcons.IoMdPersonAdd
                          className="iconEditImg"
                          size={22}
                        />
                        <p>เพิ่มผู้ใช้ระบบ</p>
                      </div>
                    </button>
                  </Link>
                </div>
                {users.length === 0 ? (
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
                    <h3>ไม่มีพบข้อมูลผู้ใช้ระบบ</h3>
                    <h3>กรุณาค้นหาใหม่อีกครั้ง</h3>
                    <br />
                  </div>
                ) : radioChk === "admin" ? (
                  <Fragment>
                    <div className="listBodyBox">
                      <div className="listBodyTitle">ข้อมูลผู้ใช้</div>
                      <div className="listBodyTitle">สิทธ์ผู้ใช้</div>
                      <div className="listBodyTitle">ตัวเลือก</div>
                    </div>
                    {specifiAdmin &&
                      specifiAdmin.map((user) => (
                        <div key={user._id}>
                          {user && user.role === radioChk ? (
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
                                          size={25}
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
                                        <MdIcons.MdEmail size={20} />
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
                                        : user.role === "admin"
                                        ? "roleTag colorRed"
                                        : "roleTag colorGray"
                                    }
                                  >
                                    {user.role === "admin"
                                      ? "ผู้ดูแลระบบ"
                                      : user.role === "employee"
                                      ? "พนักงาน"
                                      : user.role === "user"
                                      ? "ลูกหนี้"
                                      : "ระงับการใช้งาน"}
                                  </p>
                                </div>
                                <div className="listBodyDetail userOption">
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
                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {specifiemAdminCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < specifiemAdminCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={specifiemAdminCount}
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
                  </Fragment>
                ) : radioChk === "employee" ? (
                  <Fragment>
                    <div className="listBodyBox">
                      <div className="listBodyTitle">ข้อมูลผู้ใช้</div>
                      <div className="listBodyTitle">สิทธ์ผู้ใช้</div>
                      <div className="listBodyTitle">ตัวเลือก</div>
                    </div>
                    {specifiEmployee &&
                      specifiEmployee.map((user) => (
                        <div key={user._id}>
                          {user && user.role === radioChk ? (
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
                                          size={25}
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
                                        <MdIcons.MdEmail size={20} />
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
                                        : user.role === "admin"
                                        ? "roleTag colorRed"
                                        : "roleTag colorGray"
                                    }
                                  >
                                    {user.role === "admin"
                                      ? "ผู้ดูแลระบบ"
                                      : user.role === "employee"
                                      ? "พนักงาน"
                                      : user.role === "user"
                                      ? "ลูกหนี้"
                                      : "ระงับการใช้งาน"}
                                  </p>
                                </div>
                                <div className="listBodyDetail userOption">
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
                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {specifiEmployeeCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < specifiEmployeeCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={specifiEmployeeCount}
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
                  </Fragment>
                ) : radioChk === "user" ? (
                  <Fragment>
                    <div className="listBodyBox">
                      <div className="listBodyTitle">ข้อมูลผู้ใช้</div>
                      <div className="listBodyTitle">สิทธ์ผู้ใช้</div>
                      <div className="listBodyTitle">ตัวเลือก</div>
                    </div>
                    {specifiUser &&
                      specifiUser.map((user) => (
                        <div key={user._id}>
                          {user && user.role === radioChk ? (
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
                                          size={25}
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
                                        <MdIcons.MdEmail size={20} />
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
                                        : user.role === "admin"
                                        ? "roleTag colorRed"
                                        : "roleTag colorGray"
                                    }
                                  >
                                    {user.role === "admin"
                                      ? "ผู้ดูแลระบบ"
                                      : user.role === "employee"
                                      ? "พนักงาน"
                                      : user.role === "user"
                                      ? "ลูกหนี้"
                                      : "ระงับการใช้งาน"}
                                  </p>
                                </div>
                                <div className="listBodyDetail userOption">
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
                  </Fragment>
                ) : radioChk === "revoke" ? (
                  <Fragment>
                    <div className="listBodyBox">
                      <div className="listBodyTitle">ข้อมูลผู้ใช้</div>
                      <div className="listBodyTitle">สิทธ์ผู้ใช้</div>
                      <div className="listBodyTitle">ตัวเลือก</div>
                    </div>
                    {specifiRevoke &&
                      specifiRevoke.map((user) => (
                        <div key={user._id}>
                          {user && user.role === radioChk ? (
                            <Fragment>
                              <div
                                className={
                                  user.role === "revoke"
                                    ? "listBody bgColorGrayIdn colorGrayIdn"
                                    : " listBody"
                                }
                              >
                                <div className="listBodyDetail">
                                  <div className="userDetail">
                                    <div className="">
                                      <img
                                        className={
                                          user.role === "revoke"
                                            ? "imgUser imgUserRevoke"
                                            : "imgUser"
                                        }
                                        src={user.avatar.url}
                                        alt="userAvater"
                                      />
                                    </div>
                                    <div className="userTag">
                                      <div className="userDetail">
                                        <HiIcons.HiOutlineIdentification
                                          size={25}
                                        />
                                        <h5>
                                          <h4
                                            className={
                                              user.role === "revoke"
                                                ? "colorGrayIdn"
                                                : "colorBlue"
                                            }
                                          >
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
                                        <MdIcons.MdEmail size={20} />
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
                                        : user.role === "admin"
                                        ? "roleTag colorRed"
                                        : "roleTag colorGray"
                                    }
                                  >
                                    {user.role === "admin"
                                      ? "ผู้ดูแลระบบ"
                                      : user.role === "employee"
                                      ? "พนักงาน"
                                      : user.role === "user"
                                      ? "ลูกหนี้"
                                      : "ระงับการใช้งาน"}
                                  </p>
                                </div>
                                <div className="listBodyDetail userOption">
                                  <Link
                                    className={
                                      user.role === "revoke"
                                        ? "colorGrayIdn"
                                        : "linkIcon"
                                    }
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

                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {specifiemRevokeCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < specifiemRevokeCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={specifiemRevokeCount}
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
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="listBodyBox">
                      <div className="listBodyTitle">ข้อมูลผู้ใช้</div>
                      <div className="listBodyTitle">สิทธ์ผู้ใช้</div>
                      <div className="listBodyTitle">ตัวเลือก</div>
                    </div>
                    {users &&
                      users.map((user) => (
                        <div key={user._id}>
                          <Fragment>
                            <div
                              className={
                                user.role === "revoke" ||
                                user.role === "temporarily"
                                  ? "listBody bgColorGrayIdn colorGrayIdn"
                                  : " listBody"
                              }
                            >
                              <div className="listBodyDetail">
                                <div className="userDetail">
                                  <div className="">
                                    <img
                                      className={
                                        user.role === "revoke" ||
                                        user.role === "temporarily"
                                          ? "imgUser imgUserRevoke"
                                          : "imgUser"
                                      }
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
                                        <h4
                                          className={
                                            user.role === "revoke" ||
                                            user.role === "temporarily"
                                              ? "colorGrayIdn"
                                              : "colorBlue"
                                          }
                                        >
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
                                      : user.role === "admin"
                                      ? "roleTag colorRed"
                                      : "roleTag colorGray"
                                  }
                                >
                                  {user.role === "admin"
                                    ? "ผู้ดูแลระบบ"
                                    : user.role === "employee"
                                    ? "พนักงาน"
                                    : user.role === "user"
                                    ? "ลูกหนี้"
                                    : user.role === "temporarily"
                                    ? "หยุดใช้งานชั่วคราว"
                                    : "ระงับการใช้งาน"}
                                </p>
                              </div>
                              <div className="listBodyDetail userOption">
                                <Link
                                  className={
                                    user.role === "revoke" ||
                                    user.role === "temporarily"
                                      ? "colorGrayIdn"
                                      : "linkIcon"
                                  }
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
                              className={openModal ? "openModal" : "closeModal"}
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
                                      onClick={() => deleteUserHandler(userId)}
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
                        </div>
                      ))}
                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {usersCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < usersCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={usersCount}
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
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default AdminDashboard;
