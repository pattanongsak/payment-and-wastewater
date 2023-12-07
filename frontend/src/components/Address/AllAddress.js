import React, { Fragment, useEffect, useState } from "react";
import {
  getAllAddressDetails,
  deleteAddress,
  clearErrors,
} from "../../actions/addressAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { DELETE_ADDRESS_RESET } from "./../../constants/addressConstants";
import Pagination from "react-js-pagination";
import "../AdminAndEmployee/Search.css";
import "../../css/Address/AllAddress.css";
import MetaData from "../layout/MetaData";

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as FcIcons from "react-icons/fc";
import * as IoIcons from "react-icons/io";

function AllAddress({ history, match }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const { error, loading, alladdress, addressCount, resultPerPage } = useSelector(
    (state) => state.allAddress
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.address
  );
  
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const deleteAddressHandler = (id) => {
    dispatch(deleteAddress(id));
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
      alert.success("ลบที่อยู่สำเร็จ");
      history.push("/alladdress");
      dispatch({ type: DELETE_ADDRESS_RESET });
    }

    dispatch(getAllAddressDetails(keyword, currentPage));

  }, [
    dispatch,
    error,
    alert,
    deleteError,
    history,
    isDeleted,
    keyword,
    currentPage,
  ]);

  //Search Address
  const [keywordText, setKeywordText] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywordText.trim()) {
      history.push(`/alladdress/${keywordText}`);
    } else {
      history.push("/alladdress");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [AddressId, setAddressId] = useState(null);

  const setModalAddressId = ( AddressItemId ) =>{
    setOpenModal(true);
    setAddressId(AddressItemId);
  }

  return (
    <Fragment>
      <MetaData title={"ข้อมูลที่อยู่"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel">
              <h1 className="formTitle">ข้อมูลที่อยู่ทั้งหมด</h1>
              <div className="formBoxTop">
                <form className="searchBox" onSubmit={searchSubmitHandler}>
                  <label>ค้นหาผู้ใช้ระบบ</label>
                  <div className="formSearch">
                    <input
                      className="formInput"
                      type="text"
                      maxLength={13}
                      pattern="^[0-9]{1-13}$"
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
                {alladdress.length === 0 ? (
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
                    <h3>ไม่มีพบข้อมูลที่อยู่</h3>
                    <h3>กรุณาค้นหาใหม่อีกครั้ง</h3>
                    <br />
                  </div>
                ) : (
                  <Fragment>
                    <div className="listAddressBodyBox">
                      <div className="listBodyTitle">ข้อมูลที่อยู่</div>
                      <div className="listBodyTitle">รายละเอียด</div>
                      <div className="listBodyTitle">ตัวเลือก</div>
                    </div>
                    {alladdress &&
                      alladdress.map((address) => (
                        <div key={address._id}>
                          <Fragment>
                            <div className="listAddressBody">
                              <div className="listBodyDetail">
                                <div className="listaddressDetail">
                                  <div className="addressTag">
                                    <div className="listaddressDetail">
                                      <BsIcons.BsHouse size={22} />
                                      <div className="addressOption gapADT">
                                        <h3 className={address.paymenttype === "ย้ายออก" ? "colorADTGray" : "colorBlue"}>
                                          {address.identification}
                                        </h3>
                                        <h3>/</h3>
                                        <h3
                                          className={
                                            address.paymenttype === "ครัวเรือน"
                                              ? "colorADTGreen"
                                              :address.paymenttype === "กิจการ" ? "colorADTRed" : "colorADTGray"
                                          }
                                        >
                                          {address.paymenttype}
                                        </h3>
                                      </div>
                                    </div>
                                    <div className="listaddressDetail">
                                      <BiIcons.BiUser size={22} />
                                      <h3>
                                        {address.titlename} {address.firstname}{" "}
                                        {address.lastname}
                                      </h3>
                                    </div>
                                    <div className="listaddressDetail">
                                      <p>
                                        <label>บ้านเลขที่: </label>
                                        {address.homenumber}{" "}
                                        <label>หมู่ที่: </label>
                                        {address.villageno} <label>ซอย: </label>
                                        {address.lane} <label>ถนน: </label>
                                        {address.road}
                                      </p>
                                    </div>
                                    <div className="listaddressDetail">
                                      <p>
                                        <label>ตำบล: </label>
                                        {address.subdistrict}{" "}
                                        <label>อำเภอ: </label>
                                        {address.district}{" "}
                                        <label>รหัสไปรษณีย์: </label>
                                        {address.zipcode}{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="listBodyDetail userLevel">
                                <Link
                                  className="linkAddress"
                                  to={`/address/${address._id}/0`}
                                >
                                  <div className="addressOption iconPaymentDetail">
                                    <FcIcons.FcMoneyTransfer size={25} />
                                    <p>ชำระเงิน</p>
                                  </div>
                                </Link>

                              </div>


                              <div className="listBodyDetail addressOption">
                                <Link
                                  className="linkIcon"
                                  to={`/update/address/${address._id}`}
                                >
                                  <MdIcons.MdOutlineModeEditOutline
                                    className="addressOption iconOpion iconColorYellow"
                                    size={25}
                                  />
                                </Link>
                                <MdIcons.MdOutlineDelete
                                  className="addressOption iconOpion iconColorRed"
                                  size={25}
                                  onClick={() => setModalAddressId( address._id )}
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
                                      คุณแน่ใจหรือไม่ว่าคุณต้องการลบข้อมูลที่อยู่นี้?
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
                                        deleteAddressHandler(AddressId)
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
                        </div>
                      ))}
                  </Fragment>
                )}
                <div className="btnBox">
                  <center>
                    <p>
                      แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                      {addressCount} รายการ{" "}
                    </p>
                  </center>
                  {resultPerPage < addressCount && (
                    <div className="paginationBox">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={addressCount}
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
export default AllAddress;
