import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddressDetails } from "../../actions/addressAction";
import Loader from "../layout/Loader/Loader";

import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as ImIcons from "react-icons/im";

import "../../css/Payment/PaymentPage.css";
import "../../css/Payment/PaymentDetail.css";
import "../../css/Address/AddressDetail.css";
import "../../css/ZoomImg/ZoomImg.css";

import { Link } from "react-router-dom";
import {
  addTrashItemsToCart,
  addWaterWastItemsToCart,
} from "../../actions/cartAction";

import { useAlert } from "react-alert";
import { getAllOrdersOfReport, clearErrors } from "../../actions/orderAction";
import { getYearOfAddressDetails } from "../../actions/yearAction";
import { getAllUsers } from "../../actions/userAction";

import CloseIcon from "@material-ui/icons/Close";
import HistoryPayment from "./HistoryPayment";
import MetaData from "../layout/MetaData";

function AddressDetail({ history, match }) {
  const addressId = match.params.id;
  const yearId = match.params.id1;

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, months, years, address } = useSelector(
    (state) => state.addressDetail
  );

  const { user } = useSelector((state) => state.user);

  const { orders, error } = useSelector((state) => state.allOrders);
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const addTrashItemsToCartHandler = () => {

    dispatch(addTrashItemsToCart(match.params.id, quantity, arr, arrYear));
    alert.success("เพิ่มไปยังรายการแล้ว");
  };

  const addTrashItemsToCartSuccessHandler = () => {
    dispatch(addTrashItemsToCart(match.params.id, quantity, arr, arrYear));
    history.push("/employee/order/confirm");
  };

  // -------------------------------

  const addWaterWastItemsToCartHandler = () => {
    dispatch(addWaterWastItemsToCart(match.params.id, quantity, arr, arrYear));
    alert.success("เพิ่มไปยังรายการแล้ว");
  };
  const addWaterWastItemsToCartSuccessHandler = () => {
    dispatch(addWaterWastItemsToCart(match.params.id, quantity, arr, arrYear));
    history.push("/employee/order/confirm");
  };

  const { year, addresses, showDataConfiden } = useSelector(
    (state) => state.getyearofaddressdetail
  );

  const [yearReport, setYearReport] = useState(yearId);
  const [yearFocused, setFocusedyear] = useState(true);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    setYearReport(e.target.value);
    history.push(`/address/${address._id}/${e.target.value}`);
    window.location.reload();
  };
  const paymentTypeSubmitHandler = async (e) => {
    setSelectedOption(e.target.value);
    clearFunction();
  };

  useEffect(() => {
    if (year && year._id !== yearId) {
      dispatch(getYearOfAddressDetails(addressId, yearId));
    }
    if (address && address._id !== addressId) {
      dispatch(getAddressDetails(addressId, yearId));
    }

    if (!address._id || !orders) return;
    if (orders) {
      for (const item of orders) {
        for (const info of item.ori) {

          if (address._id === info.address) {
            setCount((v) => v + 1);
          }
        }
      }
    } 

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrdersOfReport());
    dispatch(getAllUsers());
  }, [dispatch, alert, error, year, yearId, addressId, address, orders]);

  const [toggleTab, setToggleTab] = useState(1);
  const toggleState = (index) => {
    setToggleTab(index);
  };

  const [countChecked, setChecked] = useState("noneAction");
  const [selectedOption, setSelectedOption] = useState("paymentTrash");
  const [countQTY, setCountQTY] = useState(0);

  //เลือกปี
  const [arrYear, setArrYear] = useState(0);
  function countYear() {
    var arrYear = null;
    var selectYear = document.getElementById("paymentYear");
    for (var i = 0; i < selectYear.length; i++) {
      if (selectYear[i].selected === true) {
        arrYear = i - 1;
      }
    }
    setArrYear(arrYear);
  }

  //เลือกบางเดือน
  let selectedMonth = [];
  const [arr, setArr] = useState([]);
  function checkboxes() {
    let arrIndex = null;
    var inputElems = document.getElementsByTagName("input"),
      count = 0;
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
        count++;
        arrIndex = i;
        selectedMonth.push(arrIndex);
      }
      if (inputElems[i].checked === true) {
        inputElems[i].disabled = true;
      }
    }
    setChecked("Action");
    setQuantity(count);
    setArr(selectedMonth);
    setCountQTY(count);
  }

  //เลือกทุกเดือน
  function onCheckAll() {
    var inputElems = document.getElementsByTagName("input"),
      count = 0;
    for (let i = 0; i < 12; i++) {
      if (inputElems[i].disabled === false) {
        inputElems[i].checked = true;

        let elementCheck = i;
        if (inputElems[i].checked === true) {
          inputElems[i].disabled = true;
          setArr((prevArray) => [...prevArray, elementCheck]);
          count++;
        }
      }
    }
    setChecked("Action");
    setQuantity(count);
    countYear();
    setCountQTY(count);
  }

  //ล้างเช็ค
  function clearCheckboxes() {
    var inputElems = document.getElementsByTagName("input");
    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].checked === true) {
        inputElems[i].disabled = false;
        inputElems[i].checked = false;
      }
    }
  }

  //call 2 function
  function onChangeFunction() {
    checkboxes();
    countYear();
  }

  function clearFunction() {
    setArr([]);
    clearCheckboxes();
    setChecked("noneAction");
    setCountQTY(0);
  }

  //------ ZoomSlip
  const [modelZoom, setModelZoom] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  const getItem = (url) => {
    setTempUrl(url);
    setModelZoom(true);
  };
  //------

  let allfeePaymentHistory = [];
  let checkInfoValue = [];
  let checkInfoValue1 = [];

  if (addresses && showDataConfiden && address._id && orders && months) {
    for (const item of showDataConfiden) {
      for (const item2 of months) {
        for (const info of item.ori) {
          for (const info2 of info.selectMonth) {
            if (info.trash && selectedOption === "paymentTrash") {
              if (address._id === info.address && item2._id === info2._id) {
                checkInfoValue.push({
                  status: item.orderStatus,
                  id: info2._id,
                });
                const element = document.getElementById(info2._id);
                if (element) {
                  element.disabled = true;
                  element.checked = false;
                }
              }
            }
            if (info.wastewater && selectedOption === "paymentWastewater") {
              if (address._id === info.address && item2._id === info2._id) {
                checkInfoValue1.push({
                  status: item.orderStatus,
                  id: info2._id,
                });

                const element1 = document.getElementById(info2._id);
                if (element1) {
                  element1.disabled = true;
                  element1.checked = false;
                }
              }
            }
          }
        }
      }
    }
  }

  if (showDataConfiden) {
    for (const item of showDataConfiden) {
      for (const info of item.ori) {
        allfeePaymentHistory.push(
          <HistoryPayment item={item} info={info} getItem={getItem} />
        );
        break;
      }
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loader getLoad={1} />
      ) : (
        <Fragment>
           <MetaData title={`ที่อยู่ของ ${address.firstname}`} />
          <div className="pageModel">
            <div className="formModel login-wrapper">
              <div className={modelZoom ? "modelZoom open" : "modelZoom"}>
                <img src={tempUrl} alt="Slips Preview" />
                <CloseIcon onClick={() => setModelZoom(false)} />
              </div>
              <section className="about">
                <div className="row">
                  <div className="column">
                    <div className="tabs">
                      <div
                        id="tab1"
                        className={
                          toggleTab === 1
                            ? "single-tab active-tab"
                            : "single-tab"
                        }
                        onClick={() => toggleState(1)}
                      >
                        <h2>รายละเอียดการชำระค่าธรรมเนียม</h2>
                      </div>

                      <div
                        id="tab2"
                        className={
                          toggleTab === 2
                            ? "single-tab active-tab"
                            : "single-tab"
                        }
                        onClick={() => toggleState(2)}
                      >
                        <h2>ประวัติการชำระค่าธรรมเนียม</h2>
                      </div>
                    </div>

                    <div className="tab-content">
                      <div
                        className={
                          toggleTab === 1 ? "content active-content" : "content"
                        }
                      >
                        <center>
                          <h2 className="addressTitleColor">
                            รายละเอียดการชำระค่าธรรมเนียม
                          </h2>
                        </center>
                        <div>
                          <div className="addressDetailBox">
                            <div className="addressTopicBox">
                              <div className="addressTopic">
                                <FaIcons.FaHouseUser size={22} />
                                <h3 className="topicItem">
                                  ที่อยู่เก็บค่าธรรมเนียม
                                </h3>
                              </div>
                              <div className="addressType">
                                <p>ประเภท :</p>&nbsp;
                                <h3
                                  className={
                                    address.paymenttype === "ครัวเรือน"
                                      ? "colorADTGreen"
                                      : "colorADTRed"
                                  }
                                >
                                  {address.paymenttype}
                                </h3>
                                &nbsp;
                                {address.paymenttype === "กิจการ" ? (
                                  <Fragment>
                                    <p>สถานที่ :</p>&nbsp;
                                    <h3 className="colorADTRed">
                                      {address.place}
                                    </h3>
                                  </Fragment>
                                ) : (
                                  <Fragment></Fragment>
                                )}
                              </div>
                            </div>
                            <div className="addressIdentification">
                              <h4 className="TopicFlex">
                                เลขบัตรประจำตัวประชาชน :{" "}
                                <div className="addressTopicIcon">
                                  {address.identification}
                                </div>
                              </h4>
                            </div>
                            <div className="addressHostName">
                              <h4>
                                ชื่อเจ้าบ้าน : {address.titlename}{" "}
                                {address.firstname} {address.lastname}
                              </h4>
                            </div>
                            <div className="addressDetail">
                              <label>บ้านเลขที่:</label> {address.homenumber}
                              &nbsp;
                              <label>หมู่ที่:</label> {address.villageno}&nbsp;
                              <label>ซอย:</label> {address.lane}&nbsp;
                              <label>ถนน:</label> {address.road}&nbsp;
                              <label>ตำบล:</label> {address.subdistrict}&nbsp;
                              <label>อำเภอ:</label> {address.district}&nbsp;
                              <label>จังหวัด:</label> {address.province}&nbsp;
                              <label>รหัสไปรษณีย์:</label> {address.zipcode}
                              &nbsp;
                            </div>
                          </div>
                          <hr />
                        </div>
                        <div className="paymentDetailBox">
                          <div className="paymentTopicBox">
                            <div className="paymentTopic">
                              <FaIcons.FaMoneyBillAlt size={22} />
                              <h3 className="topicItem">
                                รายละเอียดชำระค่าธรรมเนียม
                              </h3>
                            </div>
                          </div>
                          {/* หัวตารางงวด */}
                          <div className="selectionPaymentGrid">
                            <div className="selectPaymentGrid">
                              <form className="selectPayment">
                                <div>
                                  <h4>ปีงบประมาณ : </h4>
                                </div>
                                <div className="gapSelectOption">
                                  <select
                                    className="formYeartSelectOption"
                                    id="paymentYear"
                                    required
                                    onChange={searchSubmitHandler}
                                    //------
                                    onBlur={() => setFocusedyear(true)}
                                    onFocus={() => setFocusedyear(true)}
                                    focused={yearFocused.toString()}
                                    //------
                                  >
                                    <option value={yearId === `0` ? "" : yearId}>
                                      เลือกปีชำระเงิน
                                    </option>
                                    {years &&
                                      years.map((year) => (
                                        <Fragment>
                                          <option
                                            value={year._id}
                                            selected={
                                              year._id === yearReport
                                                ? true
                                                : false
                                            }
                                          >
                                            {parseInt(year.year) + 543}
                                          </option>
                                        </Fragment>
                                      ))}
                                  </select>
                                  {yearFocused === true && (
                                    <span className="message">
                                      *กรุณาเลือกปีงบประมาณ!
                                    </span>
                                  )}
                                </div>
                              </form>
                            </div>

                            {yearId === `0` ? (
                              <></>
                            ) : (
                              <>
                                <div className="selectPaymentGrid">
                                  <div className="selectPayment">
                                    <div>
                                      <h4>การชำระเงิน : </h4>
                                    </div>
                                    <div className="gapSelectOption">
                                      <select
                                        className="formTypePaymentSelectOption"
                                        value={selectedOption}
                                        onChange={paymentTypeSubmitHandler}
                                      >
                                        <option value="paymentTrash">
                                          ค่าขยะ
                                        </option>
                                        {address.wastewater === 0 ? (
                                          <></>
                                        ) : (
                                          <option value="paymentWastewater">
                                            ค่าน้ำเสีย
                                          </option>
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          {yearId === `0` ? (
                            <></>
                          ) : (
                            <>
                              {/* ************************************ ฟอร์มค่าขยะ ********************************************* */}
                              {selectedOption === "paymentTrash" && (
                                <form encType="multipart/form-data">
                                  <div className="tableOverView">
                                    <table id="addressPaymantTable">
                                      <tr>
                                        <th className="tbWidth1">
                                          {countChecked === "noneAction" && (
                                            <div
                                              className="btnIconCheckBox btnCheckAll"
                                              onClick={onCheckAll}
                                            >
                                              <ImIcons.ImCheckboxChecked
                                                size={20}
                                              />
                                            </div>
                                          )}
                                          {countChecked === "Action" && (
                                            <div
                                              className="btnIconCheckBox btnClearCheck"
                                              onClick={clearFunction}
                                            >
                                              <ImIcons.ImCheckboxUnchecked
                                                size={20}
                                              />
                                            </div>
                                          )}
                                        </th>
                                        <th className="tbWidth2">เดือน</th>
                                        <th className="tbWidth3">สถานะ</th>
                                        <th className="tbWidth4">ยอดชำระ</th>
                                      </tr>
                                      {months && (
                                        <Fragment>
                                          {months.map((month) => (
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  name="product"
                                                  id={month._id}
                                                  value={quantity}
                                                  onChange={onChangeFunction}
                                                />
                                              </td>
                                              <td>
                                                <p>{month.month}</p>
                                              </td>
                                              <td>
                                                {checkInfoValue.map((ele) => {
                                                  if (ele.id === month._id) {
                                                    return (
                                                      <div
                                                        className={
                                                          ele.status ===
                                                          "Processing"
                                                            ? "statusColor1"
                                                            : ele.status ===
                                                              "success"
                                                            ? "statusColor2"
                                                            : "statusColor3"
                                                        }
                                                      >
                                                        {ele.status ===
                                                        "Processing"
                                                          ? "รอตรวจสอบ"
                                                          : ele.status ===
                                                            "success"
                                                          ? "ชำระแล้ว"
                                                          : "ไม่ตรงเงื่อนไข"}
                                                      </div>
                                                    );
                                                  }
                                                  return null;
                                                })}
                                              </td>
                                              <td>
                                                {address.trash
                                                  .toFixed(2)
                                                  .replace(
                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                    "$1,"
                                                  )}
                                              </td>
                                            </tr>
                                          ))}
                                        </Fragment>
                                      )}
                                      <tr>
                                        <th colspan="3">
                                          รวมยอดที่ต้องชำระ (บาท)
                                        </th>
                                        <th>
                                          <div className="sumTotalPrice">
                                            {(
                                              parseInt(address.trash) * countQTY
                                            )
                                              .toFixed(2)
                                              .replace(
                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                "$1,"
                                              )}
                                          </div>
                                        </th>
                                      </tr>
                                    </table>
                                  </div>
                                  {user.role === "user" ? (
                                    <Fragment>
                                      {countChecked === "noneAction" && (
                                        <center>
                                            <button
                                              disabled
                                              className="btnSave btnAddressPayment btnDisabled"
                                              onClick={
                                                addTrashItemsToCartHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <RiIcons.RiMoneyDollarCircleFill
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>ชำระเงิน</p>
                                              </div>
                                            </button>
                                        </center>
                                      )}
                                      {countChecked === "Action" && (
                                        <center>
                                          <Link to="/cart">
                                            <button
                                              className="btnSave btnAddressPayment"
                                              onClick={
                                                addTrashItemsToCartHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <RiIcons.RiMoneyDollarCircleFill
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>ชำระเงิน</p>
                                              </div>
                                            </button>
                                          </Link>
                                        </center>
                                      )}
                                    </Fragment>
                                  ) : (
                                    <div></div>
                                  )}
                                  {user.role === "employee" ||
                                  user.role === "admin" ? (
                                    <Fragment>
                                      {countChecked === "noneAction" && (
                                        <center>
                                            <button
                                              disabled
                                              className="btnSave btnAddressPayment btnDisabled"
                                              onClick={
                                                addTrashItemsToCartSuccessHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <GiIcons.GiReceiveMoney
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>รับชำระเงิน</p>
                                              </div>
                                            </button>
                                        </center>
                                      )}
                                      {countChecked === "Action" && (
                                        <center>
                                            <button
                                              className="btnSave btnAddressPayment"
                                              onClick={
                                                addTrashItemsToCartSuccessHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <GiIcons.GiReceiveMoney
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>รับชำระเงิน</p>
                                              </div>
                                            </button>
                                        </center>
                                      )}
                                    </Fragment>
                                  ) : (
                                    <div></div>
                                  )}
                                </form>
                              )}

                              {/* ************************************ ฟอร์มค่าน้ำเสีย ********************************************* */}
                              {selectedOption === "paymentWastewater" && (
                                <form encType="multipart/form-data">
                                  <div className="tableOverView">
                                    <table id="addressPaymantTable">
                                      <tr>
                                        <th className="tbWidth1">
                                          {countChecked === "noneAction" && (
                                            <div
                                              className="btnIconCheckBox btnCheckAll"
                                              onClick={onCheckAll}
                                            >
                                              <ImIcons.ImCheckboxChecked
                                                size={20}
                                              />
                                            </div>
                                          )}
                                          {countChecked === "Action" && (
                                            <div
                                              className="btnIconCheckBox btnClearCheck"
                                              onClick={clearFunction}
                                            >
                                              <ImIcons.ImCheckboxUnchecked
                                                size={20}
                                              />
                                            </div>
                                          )}
                                        </th>
                                        <th className="tbWidth2">เดือน</th>
                                        <th className="tbWidth3">สถานะ</th>
                                        <th className="tbWidth4">ยอดชำระ</th>
                                      </tr>
                                      {months && (
                                        <Fragment>
                                          {months.map((month) => (
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  name="product"
                                                  id={month._id}
                                                  value={quantity}
                                                  onChange={onChangeFunction}
                                                />
                                              </td>
                                              <td>
                                                <p>{month.month}</p>
                                              </td>
                                              <td>
                                                {checkInfoValue1.map((ele) => {
                                                  if (ele.id === month._id) {
                                                    return (
                                                      <div
                                                        className={
                                                          ele.status ===
                                                          "Processing"
                                                            ? "statusColor1"
                                                            : ele.status ===
                                                              "success"
                                                            ? "statusColor2"
                                                            : "statusColor3"
                                                        }
                                                      >
                                                        {ele.status ===
                                                        "Processing"
                                                          ? "รอตรวจสอบ"
                                                          : ele.status ===
                                                            "success"
                                                          ? "ชำระแล้ว"
                                                          : "ไม่ตรงเงื่อนไข"}
                                                      </div>
                                                    );
                                                  }
                                                  return null;
                                                })}
                                              </td>
                                              <td>
                                                {address.wastewater
                                                  .toFixed(2)
                                                  .replace(
                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                    "$1,"
                                                  )}
                                              </td>
                                            </tr>
                                          ))}
                                        </Fragment>
                                      )}
                                      <tr>
                                        <th colspan="3">
                                          รวมยอดที่ต้องชำระ (บาท)
                                        </th>
                                        <th>
                                          <div className="sumTotalPrice">
                                            {(
                                              parseInt(address.wastewater) *
                                              countQTY
                                            )
                                              .toFixed(2)
                                              .replace(
                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                "$1,"
                                              )}
                                          </div>
                                        </th>
                                      </tr>
                                    </table>
                                  </div>
                                  {user.role === "user" ? (
                                    <Fragment>
                                      {countChecked === "noneAction" && (
                                        <center>
                                            <button
                                              disabled
                                              className="btnSave btnAddressPayment btnDisabled"
                                              onClick={
                                                addWaterWastItemsToCartHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <RiIcons.RiMoneyDollarCircleFill
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>ชำระเงิน</p>
                                              </div>
                                            </button>
                                        </center>
                                      )}
                                      {countChecked === "Action" && (
                                        <center>
                                          <Link to="/cart">
                                            <button
                                              className="btnSave btnAddressPayment"
                                              onClick={
                                                addWaterWastItemsToCartHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <RiIcons.RiMoneyDollarCircleFill
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>ชำระเงิน</p>
                                              </div>
                                            </button>
                                          </Link>
                                        </center>
                                      )}
                                    </Fragment>
                                  ) : (
                                    <div></div>
                                  )}
                                  {user.role === "employee" ||
                                  user.role === "admin" ? (
                                    <Fragment>
                                      {countChecked === "noneAction" && (
                                        <center>
                                            <button
                                              disabled
                                              className="btnSave btnAddressPayment btnDisabled"
                                              onClick={
                                                addWaterWastItemsToCartSuccessHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <GiIcons.GiReceiveMoney
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>รับชำระเงิน</p>
                                              </div>
                                            </button>
                                        </center>
                                      )}
                                      {countChecked === "Action" && (
                                        <center>
                                            <button
                                              className="btnSave btnAddressPayment"
                                              onClick={
                                                addWaterWastItemsToCartSuccessHandler
                                              }
                                            >
                                              <div className="spanLogin">
                                                <GiIcons.GiReceiveMoney
                                                  className="iconEditImg"
                                                  size={22}
                                                />
                                                <p>รับชำระเงิน</p>
                                              </div>
                                            </button>
                                        </center>
                                      )}
                                    </Fragment>
                                  ) : (
                                    <div></div>
                                  )}
                                </form>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          toggleTab === 2 ? "content active-content" : "content"
                        }
                      >
                        <center>
                          <h2 className="addressTitleColor">
                            ประวัติการชำระค่าธรรมเนียม
                          </h2>
                        </center>
                        {allfeePaymentHistory.map((ele) => (
                          <>
                            <div className="ordHistoryModel">{ele}</div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default AddressDetail;
