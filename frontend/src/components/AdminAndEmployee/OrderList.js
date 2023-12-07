import React, { Fragment, useEffect, useState } from "react";
import { getAllOrders, clearErrors } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import "../../css/ListOrder/ListOrder.css";
import * as MdIcons from "react-icons/md";
import Pagination from "react-js-pagination";
import { getAllYears, getOrderOfYears } from "../../actions/yearAction";
import MetaData from "../layout/MetaData";

function OrderList({ history, match }) {
  const yearId = match.params.id;
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const alert = useAlert();

  const [yearReport, setYearReport] = useState(yearId);
  const [keywordText, setKeywordText] = useState("");
  const [radioChk, setRadioChk] = useState("Processing");

  const [currentPage, setCurrentPage] = useState(1);
  const { years } = useSelector((state) => state.allYear);
  const {
    loading,
    error,
    orders,
    ordersStatusProcessing,
    ordersStatusSuccess,
    ordersStatusDefective,
    orderStatusProcessingCount,
    orderStatusSuccessCount,
    orderStatusDefectiveCount,
    resultPerPage,
  } = useSelector((state) => state.allOrders);

  const { year, ordersOfYear, ordersOfYearCount } = useSelector(
    (state) => state.getorderofyear
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywordText.trim()) {
      history.push(`/allorder/${yearId}/${keywordText}`);
      setCurrentPage(1);
      dispatch(getOrderOfYears(yearId, keywordText, 1)); // เรียกใช้ action พร้อมส่ง keywordText
    } else {
      history.push(`/allorder/${yearId}`);
      setCurrentPage(1);
      dispatch(getOrderOfYears(yearId, "", 1)); // เรียกใช้ action โดยไม่ส่ง keyword (ค้นหาทั้งหมด)
    }
  };

  const searchSelectHandler = async (e) => {
    e.preventDefault();
    setYearReport(e.target.value);
    history.push(`/allorder/${e.target.value}`);
    window.location.reload();
  };

  useEffect(() => {
    if (year && year._id === yearId) {
      dispatch(getOrderOfYears(yearId, keyword, currentPage));
    } else {
      dispatch(getOrderOfYears(yearId, keyword, currentPage));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrders(keyword, currentPage));
    dispatch(getAllYears());
  }, [dispatch, alert, error, history, keyword, currentPage]);

  return (
    <Fragment>
      <MetaData title={"รายการค่าธรรมเนียม"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel">
              <h1 className="formTitle">รอตรวจสอบยอดชำระ</h1>
              <div className="formBoxTop">
                <div className="listOdrWrap">
                  <div className="selectYearReport">
                    <p>ปีงบประมาณ</p>
                    <form>
                      <select
                        className="formYeartSelectOption"
                        required
                        onChange={searchSelectHandler}
                      >
                        <option value={yearId}>เลือกปี</option>
                        {years &&
                          years.map((year) => (
                            <Fragment>
                              <option
                                value={year._id}
                                selected={
                                  year._id === yearReport ? true : false
                                }
                              >
                                {parseInt(year.year) + 543}
                              </option>
                            </Fragment>
                          ))}
                      </select>
                    </form>
                  </div>

                  {yearId ? (
                    <form className="searchBox" onSubmit={searchSubmitHandler}>
                      <label>ค้นหารายการ</label>
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
                  ) : (
                    <></>
                  )}

                  <form>
                    <label>ตัวเลือก : </label>
                    {yearId ? (
                      <>
                        <input
                          type="radio"
                          checked={radioChk === "allorder"}
                          value="allorder"
                          onClick={() => setRadioChk("allorder")}
                          onChange={() => setCurrentPage(1)}
                        />{" "}
                        รายการทั้งหมดแต่ละปี{" "}
                      </>
                    ) : (
                      <>
                        <input
                          type="radio"
                          checked={radioChk === "Processing"}
                          value="Processing"
                          onClick={() => setRadioChk("Processing")}
                          onChange={() => setCurrentPage(1)}
                        />{" "}
                        รอการตรวจสอบ{" "}
                        <input
                          type="radio"
                          checked={radioChk === "defective"}
                          value="defective"
                          onClick={() => setRadioChk("defective")}
                          onChange={() => setCurrentPage(1)}
                        />{" "}
                        ไม่ตรงเงื่อนไข{" "}
                        <input
                          type="radio"
                          checked={radioChk === "success"}
                          value="success"
                          onClick={() => setRadioChk("success")}
                          onChange={() => setCurrentPage(1)}
                        />{" "}
                        สำเร็จ{" "}
                      </>
                    )}
                  </form>
                </div>
                {orders && orders.length === 0 ? (
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
                    <h3>ไม่มีพบข้อมูลในระบบ</h3>
                    <h3>กรุณาค้นหาใหม่อีกครั้ง...</h3>
                    <br />
                  </div>
                ) : radioChk === "Processing" ? (
                  <Fragment>
                    <div className="listOrderBox">
                      <div className="listOrderTitle">เลขที่ใบเสร็จ</div>
                      <div className="listOrderTitle">ชื่อผู้ชำระเงิน</div>
                      <div className="listOrderTitle">สถานะ</div>
                      <div className="listOrderTitle">ประเภท</div>
                      <div className="listOrderTitle">จำนวนเงิน</div>
                      <div className="listOrderTitle">รายละเอียด</div>
                    </div>
                    {ordersStatusProcessing &&
                      ordersStatusProcessing.map((order) => (
                        <div key={order._id}>
                          {order && order.orderStatus === radioChk ? (
                            <center className="listOrderBody">
                              <div className="listOrderBodyDetail">
                                <b className="OrderNo">
                                  {String(order._id).substr(0, 8).toUpperCase()}
                                </b>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div>
                                  <p
                                    className={
                                      order.shipInfo ? "" : "OrderNameTag"
                                    }
                                  >
                                    {order.user.firstname} {order.user.lastname}
                                  </p>
                                  {order.shipInfo ? (
                                    <label>
                                      ชำระเมื่อ{" "}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(8, 2)}
                                      {"-"}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(5, 2) === "12"
                                        ? "ธันวาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "11"
                                        ? "พฤศจิกายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "10"
                                        ? "ตุลาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "09"
                                        ? "กันยายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "08"
                                        ? "สิงหาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "07"
                                        ? "กรกฎาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "06"
                                        ? "มิถุนายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "05"
                                        ? "พฤษภาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "04"
                                        ? "เมษายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "03"
                                        ? "มีนาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "02"
                                        ? "กุมภาพันธ์"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "01"
                                        ? "มกราคม"
                                        : ""}
                                      {"-"}
                                      {parseInt(
                                        String(
                                          order.shipInfo.dateofpayment
                                        ).substr(0, 4)
                                      ) + 543}{" "}
                                      เวลา {order.shipInfo.timeofpayment} น.
                                    </label>
                                  ) : (
                                    <Fragment>
                                      <label>
                                        ( ชำระเงินผ่านเทศบาลสันผักหวาน )
                                      </label>
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div
                                  className={
                                    order.orderStatus === "Processing"
                                      ? "statusColor1"
                                      : order.orderStatus === "success"
                                      ? "statusColor2"
                                      : "statusColor3"
                                  }
                                >
                                  {order.orderStatus === "Processing"
                                    ? "รอตรวจสอบ"
                                    : order.orderStatus === "success"
                                    ? "ชำระแล้ว"
                                    : "ไม่ตรงเงื่อนไข"}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                {order.ori.map((orderItem) => (
                                  <div key={order._id}>
                                    {orderItem.trash ? "ค่าขยะ" : <></>}
                                    {orderItem.wastewater ? (
                                      "ค่าน้ำเสีย"
                                    ) : (
                                      <></>
                                    )}{" "}
                                    / {orderItem.paymenttype}
                                  </div>
                                ))}
                              </div>
                              <div className="listOrderBodyDetail">
                                <p className="OrderPrice">
                                  {order.another ? (
                                    <>
                                      {(
                                        parseInt(order.itemsPrice) +
                                        parseInt(order.another)
                                      )
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      {parseInt(order.itemsPrice)
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="listOrderBodyDetail">
                                <Link
                                  className="OrderIcon"
                                  to={`/order/detail/${order._id}`}
                                >
                                  <FiIcons.FiEdit size={20} />
                                </Link>
                              </div>
                            </center>
                          ) : (
                            <Fragment></Fragment>
                          )}
                        </div>
                      ))}
                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {orderStatusProcessingCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < orderStatusProcessingCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={orderStatusProcessingCount}
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
                ) : radioChk === "defective" ? (
                  <Fragment>
                    <div className="listOrderBox">
                      <div className="listOrderTitle">เลขที่ใบเสร็จ</div>
                      <div className="listOrderTitle">ชื่อผู้ชำระเงิน</div>
                      <div className="listOrderTitle">สถานะ</div>
                      <div className="listOrderTitle">ประเภท</div>
                      <div className="listOrderTitle">จำนวนเงิน</div>
                      <div className="listOrderTitle">รายละเอียด</div>
                    </div>
                    {ordersStatusDefective &&
                      ordersStatusDefective.map((order) => (
                        <div key={order._id}>
                          {order && order.orderStatus === radioChk ? (
                            <center className="listOrderBody">
                              <div className="listOrderBodyDetail">
                                <b className="OrderNo">
                                  {String(order._id).substr(0, 8).toUpperCase()}
                                </b>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div>
                                  <p
                                    className={
                                      order.shipInfo ? "" : "OrderNameTag"
                                    }
                                  >
                                    {order.user.firstname} {order.user.lastname}
                                  </p>
                                  {order.shipInfo ? (
                                    <label>
                                      ชำระเมื่อ{" "}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(8, 2)}
                                      {"-"}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(5, 2) === "12"
                                        ? "ธันวาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "11"
                                        ? "พฤศจิกายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "10"
                                        ? "ตุลาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "09"
                                        ? "กันยายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "08"
                                        ? "สิงหาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "07"
                                        ? "กรกฎาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "06"
                                        ? "มิถุนายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "05"
                                        ? "พฤษภาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "04"
                                        ? "เมษายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "03"
                                        ? "มีนาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "02"
                                        ? "กุมภาพันธ์"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "01"
                                        ? "มกราคม"
                                        : ""}
                                      {"-"}
                                      {parseInt(
                                        String(
                                          order.shipInfo.dateofpayment
                                        ).substr(0, 4)
                                      ) + 543}{" "}
                                      เวลา {order.shipInfo.timeofpayment} น.
                                    </label>
                                  ) : (
                                    <Fragment>
                                      <label>
                                        ( ชำระเงินผ่านเทศบาลสันผักหวาน )
                                      </label>
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div
                                  className={
                                    order.orderStatus === "Processing"
                                      ? "statusColor1"
                                      : order.orderStatus === "success"
                                      ? "statusColor2"
                                      : "statusColor3"
                                  }
                                >
                                  {order.orderStatus === "Processing"
                                    ? "รอตรวจสอบ"
                                    : order.orderStatus === "success"
                                    ? "ชำระแล้ว"
                                    : "ไม่ตรงเงื่อนไข"}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                {order.ori.map((orderItem) => (
                                  <div key={order._id}>
                                    {orderItem.trash ? "ค่าขยะ" : <></>}
                                    {orderItem.wastewater ? (
                                      "ค่าน้ำเสีย"
                                    ) : (
                                      <></>
                                    )}{" "}
                                    / {orderItem.paymenttype}
                                  </div>
                                ))}
                              </div>
                              <div className="listOrderBodyDetail">
                                <p className="OrderPrice">
                                  {order.another ? (
                                    <>
                                      {(
                                        parseInt(order.itemsPrice) +
                                        parseInt(order.another)
                                      )
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      {parseInt(order.itemsPrice)
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="listOrderBodyDetail">
                                <Link
                                  className="OrderIcon"
                                  to={`/order/detail/${order._id}`}
                                >
                                  <FiIcons.FiEdit size={20} />
                                </Link>
                              </div>
                            </center>
                          ) : (
                            <Fragment></Fragment>
                          )}
                        </div>
                      ))}
                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {orderStatusDefectiveCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < orderStatusDefectiveCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={orderStatusDefectiveCount}
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
                ) : radioChk === "success" ? (
                  <Fragment>
                    <div className="listOrderBox">
                      <div className="listOrderTitle">เลขที่ใบเสร็จ</div>
                      <div className="listOrderTitle">ชื่อผู้ชำระเงิน</div>
                      <div className="listOrderTitle">สถานะ</div>
                      <div className="listOrderTitle">ประเภท</div>
                      <div className="listOrderTitle">จำนวนเงิน</div>
                      <div className="listOrderTitle">รายละเอียด</div>
                    </div>
                    {ordersStatusSuccess &&
                      ordersStatusSuccess.map((order) => (
                        <div key={order._id}>
                          {order && order.orderStatus === radioChk ? (
                            <center className="listOrderBody">
                              <div className="listOrderBodyDetail">
                                <b className="OrderNo">
                                  {String(order._id).substr(0, 8).toUpperCase()}
                                </b>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div>
                                  <p
                                    className={
                                      order.shipInfo ? "" : "OrderNameTag"
                                    }
                                  >
                                    {order.user.firstname} {order.user.lastname}
                                  </p>
                                  {order.shipInfo ? (
                                    <label>
                                      ชำระเมื่อ{" "}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(8, 2)}
                                      {"-"}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(5, 2) === "12"
                                        ? "ธันวาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "11"
                                        ? "พฤศจิกายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "10"
                                        ? "ตุลาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "09"
                                        ? "กันยายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "08"
                                        ? "สิงหาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "07"
                                        ? "กรกฎาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "06"
                                        ? "มิถุนายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "05"
                                        ? "พฤษภาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "04"
                                        ? "เมษายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "03"
                                        ? "มีนาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "02"
                                        ? "กุมภาพันธ์"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "01"
                                        ? "มกราคม"
                                        : ""}
                                      {"-"}
                                      {parseInt(
                                        String(
                                          order.shipInfo.dateofpayment
                                        ).substr(0, 4)
                                      ) + 543}{" "}
                                      เวลา {order.shipInfo.timeofpayment} น.
                                    </label>
                                  ) : (
                                    <Fragment>
                                      <label>
                                        ( ชำระเงินผ่านเทศบาลสันผักหวาน )
                                      </label>
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div
                                  className={
                                    order.orderStatus === "Processing"
                                      ? "statusColor1"
                                      : order.orderStatus === "success"
                                      ? "statusColor2"
                                      : "statusColor3"
                                  }
                                >
                                  {order.orderStatus === "Processing"
                                    ? "รอตรวจสอบ"
                                    : order.orderStatus === "success"
                                    ? "ชำระแล้ว"
                                    : "ไม่ตรงเงื่อนไข"}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                {order.ori.map((orderItem) => (
                                  <div key={order._id}>
                                    {orderItem.trash ? "ค่าขยะ" : <></>}
                                    {orderItem.wastewater ? (
                                      "ค่าน้ำเสีย"
                                    ) : (
                                      <></>
                                    )}{" "}
                                    / {orderItem.paymenttype}
                                  </div>
                                ))}
                              </div>
                              <div className="listOrderBodyDetail">
                                <p className="OrderPrice">
                                  {order.another ? (
                                    <>
                                      {(
                                        parseInt(order.itemsPrice) +
                                        parseInt(order.another)
                                      )
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      {parseInt(order.itemsPrice)
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="listOrderBodyDetail">
                                <Link
                                  className="OrderIcon"
                                  to={`/order/detail/${order._id}`}
                                >
                                  <FiIcons.FiEdit size={20} />
                                </Link>
                              </div>
                            </center>
                          ) : (
                            <Fragment></Fragment>
                          )}
                        </div>
                      ))}
                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {orderStatusSuccessCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < orderStatusSuccessCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={orderStatusSuccessCount}
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
                ) : radioChk === "allorder" ? (
                  <Fragment>
                    <div className="listOrderBox">
                      <div className="listOrderTitle">เลขที่ใบเสร็จ</div>
                      <div className="listOrderTitle">ชื่อผู้ชำระเงิน</div>
                      <div className="listOrderTitle">สถานะ</div>
                      <div className="listOrderTitle">ประเภท</div>
                      <div className="listOrderTitle">จำนวนเงิน</div>
                      <div className="listOrderTitle">รายละเอียด</div>
                    </div>
                    {ordersOfYear &&
                      ordersOfYear.map((order) => (
                        <div key={order._id}>
                          <Fragment>
                            <center className="listOrderBody">
                              <div className="listOrderBodyDetail">
                                <b className="OrderNo">
                                  {String(order._id).substr(0, 8).toUpperCase()}
                                </b>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div>
                                  <p
                                    className={
                                      order.shipInfo ? "" : "OrderNameTag"
                                    }
                                  >
                                    {order.user.firstname} {order.user.lastname}
                                  </p>
                                  {order.shipInfo ? (
                                    <label>
                                      ชำระเมื่อ{" "}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(8, 2)}
                                      {"-"}
                                      {String(
                                        order.shipInfo.dateofpayment
                                      ).substr(5, 2) === "12"
                                        ? "ธันวาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "11"
                                        ? "พฤศจิกายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "10"
                                        ? "ตุลาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "09"
                                        ? "กันยายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "08"
                                        ? "สิงหาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "07"
                                        ? "กรกฎาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "06"
                                        ? "มิถุนายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "05"
                                        ? "พฤษภาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "04"
                                        ? "เมษายน"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "03"
                                        ? "มีนาคม"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "02"
                                        ? "กุมภาพันธ์"
                                        : String(
                                            order.shipInfo.dateofpayment
                                          ).substr(5, 2) === "01"
                                        ? "มกราคม"
                                        : ""}
                                      {"-"}
                                      {parseInt(
                                        String(
                                          order.shipInfo.dateofpayment
                                        ).substr(0, 4)
                                      ) + 543}{" "}
                                      เวลา {order.shipInfo.timeofpayment} น.
                                    </label>
                                  ) : (
                                    <Fragment>
                                      <label>
                                        ( ชำระเงินผ่านเทศบาลสันผักหวาน )
                                      </label>
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                <div
                                  className={
                                    order.orderStatus === "Processing"
                                      ? "statusColor1"
                                      : order.orderStatus === "success"
                                      ? "statusColor2"
                                      : "statusColor3"
                                  }
                                >
                                  {order.orderStatus === "Processing"
                                    ? "รอตรวจสอบ"
                                    : order.orderStatus === "success"
                                    ? "ชำระแล้ว"
                                    : "ไม่ตรงเงื่อนไข"}
                                </div>
                              </div>
                              <div className="listOrderBodyDetail">
                                {order.ori.map((orderItem) => (
                                  <div key={order._id}>
                                    {orderItem.trash ? "ค่าขยะ" : <></>}
                                    {orderItem.wastewater ? (
                                      "ค่าน้ำเสีย"
                                    ) : (
                                      <></>
                                    )}{" "}
                                    / {orderItem.paymenttype}
                                  </div>
                                ))}
                              </div>
                              <div className="listOrderBodyDetail">
                                <p className="OrderPrice">
                                  {order.another ? (
                                    <>
                                      {(
                                        parseInt(order.itemsPrice) +
                                        parseInt(order.another)
                                      )
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      {parseInt(order.itemsPrice)
                                        .toFixed(2)
                                        .replace(
                                          /(\d)(?=(\d\d\d)+(?!\d))/g,
                                          "$1,"
                                        )}
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="listOrderBodyDetail">
                                <Link
                                  className="OrderIcon"
                                  to={`/order/detail/${order._id}`}
                                >
                                  <FiIcons.FiEdit size={20} />
                                </Link>
                              </div>
                            </center>
                          </Fragment>
                        </div>
                      ))}
                    <div className="btnBox">
                      <center>
                        <p>
                          แสดง {currentPage} ถึง {resultPerPage} ทั้งหมด{" "}
                          {ordersOfYearCount} รายการ{" "}
                        </p>
                      </center>
                      {resultPerPage < ordersOfYearCount && (
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={ordersOfYearCount}
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
                  <></>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderList;
