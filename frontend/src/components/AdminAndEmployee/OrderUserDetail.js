import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import {
  UPDATE_ORDER_RESET,
} from "../../constants/orderConstants";
import "../../css/ListOrder/ListOrderDetail.css";
import "../../css/ZoomImg/ZoomImg.css";
import CloseIcon from "@material-ui/icons/Close";
import * as MdIcons from "react-icons/md";

function OrderDetails({ match, history }) {
  const { order, loading } = useSelector((state) => state.orderDetails);

  const {
    error,
    isUpdated,
  } = useSelector((state) => state.order);

  const [status, setSetStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("แก้ไขสถานะออร์เดอร์สำเร็จ");
      history.push("/allorder");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [
    dispatch,
    alert,
    error,
    match.params.id,
    history,
    isUpdated,
  ]);

  const [modelZoom, setModelZoom] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  const getItem = (url) => {
    setTempUrl(url);
    setModelZoom(true);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ยันยันการชำระเงิน" />
          <div className="pageModel">
            <div className="formModel">
              <div className={modelZoom ? "modelZoom open" : "modelZoom"}>
                <img src={tempUrl} alt="Slips Preview" />
                <CloseIcon onClick={() => setModelZoom(false)} />
              </div>
              <h1 className="formTitle">รายการชำระที่รอการตรวจสอบ</h1>
              <div className="boxShadow">
                <div className="OdrTitleBox">
                  <div className="OdrBoxRow">
                    <p className="OdrBoxTitleColor OdrBoxTitleFont OdrDetailBoxTitleColor">
                      เลขที่ใบเสร็จ :{" "}
                      {String(order._id).substr(0, 8).toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="OdrBoxCol">
                  <div className="OdrDetailBox">
                    <div className="OrdBoxInfo">
                      <div>
                        <label>รหัสบัตรประจำตัวประชาชน</label>
                      </div>
                      {order.ori &&
                        order.ori.map((item) => (
                          <div key={order._id}>
                            <span>{item.identification} </span>
                            <div>
                              <label>ชื่อ - นามสกุล</label>
                            </div>
                            <span>
                              {item.titlename} {item.firstname} {item.lastname}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="OdrDetailBox">
                    <div className="OrdBoxInfo">
                      <div>
                        <label>สถานะ</label>
                      </div>
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
                  </div>
                </div>
                <div className="OdrBoxCol">
                  <div className="OdrDetailBox">
                    <div className="OrdBoxInfo">
                      <div>
                        <label>ที่อยู่</label>
                      </div>
                      {order.ori &&
                        order.ori.map((item) => (
                          <div key={order._id}>
                            {item.homenumber}
                            &nbsp;
                            <label>หมู่ที่:</label> {item.villageno}&nbsp;
                            <label>ซอย:</label> {item.lane}&nbsp;
                            <label>ถนน:</label> {item.road}&nbsp;
                            <label>ตำบล:</label> {item.subdistrict}&nbsp;
                            <label>อำเภอ:</label> {item.district}&nbsp;
                            <label>จังหวัด:</label> {item.province}&nbsp;
                            <label>รหัสไปรษณีย์:</label> {item.zipcode}
                            &nbsp;
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="OdrDetailBox">
                    <div className="OrdBoxInfo">
                      <div>
                        <label>ประเภท</label>
                      </div>
                      {order.ori &&
                        order.ori.map((item) => (
                          <div key={order._id}>
                            {item.trash ? "ค่าขยะ" : <></>}
                            {item.wastewater ? "ค่าน้ำเสีย" : <></>} /{" "}
                            {item.paymenttype}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="OdrBoxCol">
                  <div className="OrdBoxInfo">
                    <div>
                      <label>ปีงบประมาณ</label>
                    </div>
                    {order.ori &&
                      order.ori.map((item) => (
                        <div key={order._id}>
                          <span>{parseInt(item.selectYear.year) + 543} </span>
                        </div>
                      ))}
                  </div>
                  <div className="OrdBoxInfo">
                    <div>
                      <label>เดือนที่ชำระ</label>
                    </div>
                    {order.ori &&
                      order.ori.map((item) => (
                        <div key={order._id}>
                          {item.selectMonth.map((thisMonth) => (
                            <>
                              <span className="spanDetail">
                                {"[ "}
                                {thisMonth.month}
                                {" ]"}
                              </span>
                            </>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="OdrBoxCol">
                  <div className="OrdBoxInfo">
                    <div>
                      <label>วันที่ชำระเงิน</label>
                    </div>
                    {String(order.createAt).substr(8, 2) +
                      " " +
                      (String(order.createAt).substr(5, 2) === "12"
                        ? "ธันวาคม"
                        : String(order.createAt).substr(5, 2) === "11"
                        ? "พฤศจิกายน"
                        : String(order.createAt).substr(5, 2) === "10"
                        ? "ตุลาคม"
                        : String(order.createAt).substr(5, 2) === "09"
                        ? "กันยายน"
                        : String(order.createAt).substr(5, 2) === "08"
                        ? "สิงหาคม"
                        : String(order.createAt).substr(5, 2) === "07"
                        ? "กรกฎาคม"
                        : String(order.createAt).substr(5, 2) === "06"
                        ? "มิถุนายน"
                        : String(order.createAt).substr(5, 2) === "05"
                        ? "พฤษภาคม"
                        : String(order.createAt).substr(5, 2) === "04"
                        ? "เมษายน"
                        : String(order.createAt).substr(5, 2) === "03"
                        ? "มีนาคม"
                        : String(order.createAt).substr(5, 2) === "02"
                        ? "กุมภาพันธ์"
                        : String(order.createAt).substr(5, 2) === "01"
                        ? "มกราคม"
                        : "") +
                      " " +
                      (parseInt(String(order.createAt).substr(0, 4)) + 543)}
                  </div>
                  <div className="OrdBoxInfo">
                    <div>
                      <label>จำนวนเงินชำระ (บาท)</label>
                    </div>
                    <span>
                      {order.another ? (
                        <>
                          {(
                            parseInt(order.itemsPrice) + parseInt(order.another)
                          )
                            .toFixed(2)
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                        </>
                      ) : (
                        <>
                          {parseInt(order.itemsPrice)
                            .toFixed(2)
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                        </>
                      )}
                    </span>
                  </div>
                </div>
                {order.shipInfo ? (
                  <Fragment>
                    <div className="OdrBoxRow">
                      <div className="OrdBoxInfo">
                        <center>
                          <div>
                            <label>ช่องทางชำระ</label>
                          </div>
                          <h3 className="addressPaymentColor">
                            การชำระเงินผ่านการโอนเงินบัญชีธนาคาร
                          </h3>
                        </center>
                      </div>
                    </div>

                    <div className="OdrBoxCol">
                      <div className="OdrDetailBox">
                        <div className="OrdBoxInfo">
                          <div>
                            <label>จากธนาคาร</label>
                          </div>
                          <p>{order.shipInfo && order.shipInfo.bankname}</p>
                        </div>
                      </div>
                      <div className="OdrDetailBox">
                        <div className="OrdBoxInfo">
                          <div>
                            <label>โอนชำระเงิน (บาท)</label>
                          </div>
                          <p className="OrderPrice">
                            {order.shipInfo && order.shipInfo.amount
                              ? parseInt(order.shipInfo.amount)
                                  .toFixed(2)
                                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="OdrBoxCol">
                      <div className="OdrDetailBox">
                        <div className="OrdBoxInfo">
                          <div>
                            <label>วันที่โอนเงิน</label>
                          </div>

                          {order.shipInfo && order.shipInfo.dateofpayment
                            ? String(order.shipInfo.dateofpayment).substr(
                                8,
                                2
                              ) +
                              " " +
                              (String(order.shipInfo.dateofpayment).substr(
                                5,
                                2
                              ) === "12"
                                ? "ธันวาคม"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "11"
                                ? "พฤศจิกายน"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "10"
                                ? "ตุลาคม"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "09"
                                ? "กันยายน"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "08"
                                ? "สิงหาคม"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "07"
                                ? "กรกฎาคม"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "06"
                                ? "มิถุนายน"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "05"
                                ? "พฤษภาคม"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "04"
                                ? "เมษายน"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "03"
                                ? "มีนาคม"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "02"
                                ? "กุมภาพันธ์"
                                : String(order.shipInfo.dateofpayment).substr(
                                    5,
                                    2
                                  ) === "01"
                                ? "มกราคม"
                                : "") +
                              " " +
                              (parseInt(
                                String(order.shipInfo.dateofpayment).substr(
                                  0,
                                  4
                                )
                              ) +
                                543)
                            : ""}
                        </div>
                      </div>
                      <div className="OdrDetailBox">
                        <div className="OrdBoxInfo">
                          <div>
                            <label>เวลาโอนเงิน (น.)</label>
                          </div>
                          <p>
                            {order.shipInfo && order.shipInfo.timeofpayment}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="OdrBoxRow">
                      <div className="OrdBoxInfo">
                        <div>
                          <label>หมายเหตุ</label>
                        </div>
                        <p>
                          {order.shipInfo && order.shipInfo.comment
                            ? order.shipInfo.comment
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="OdrBoxRow">
                      <div className="OrdBoxInfo">
                        <center>
                          <div>
                            <label>ช่องทางชำระ</label>
                          </div>
                          <h3 className="addressPaymentColor">
                            ชำระเงินผ่านเทศบาลสันผักหวาน
                          </h3>
                        </center>
                      </div>
                    </div>
                    <div className="OdrBoxRow">
                      <div className="OrdBoxInfo">
                        <center>
                          <div>
                            <label>ผู้รับชำระเงิน</label>
                          </div>
                          <div>
                            {order.user && order.user.titlename}
                            {order.user && order.user.firstname}{" "}
                            {order.user && order.user.lastname}
                          </div>
                          <div className="userfeePayment">
                            ( เจ้าหน้าที่เทศบาลสันผักหวาน )
                          </div>
                        </center>
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
              {order.shipInfo ? (
                <Fragment>
                  <div className="boxShadow boxShadowRow">
                    <div className="OdrBoxTitleColor OdrDetailBoxTitleColor">
                      <p className="OdrBoxTitleFont">หลักฐานชำระเงิน</p>
                    </div>
                    <div className="OdrBoxRow">
                      <center className="OrdBoxInfo">
                        <div
                          onClick={() =>
                            getItem(order.shipInfo && order.imageslip.url)
                          }
                        >
                          <img
                            className="slipInfo"
                            src={order.shipInfo && order.imageslip.url}
                            alt="Slips Preview"
                          />
                        </div>
                      </center>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}

              <center className="btnBox">
                <form onSubmit={updateOrderSubmitHandler}>
                  {order && order.orderStatus === "success" ? (
                    <Fragment>
                      <button
                        className="btnSave btnSize btnCancel"
                        onClick={(e) => setSetStatus("defective")}
                      >
                        <div className="spanButton">
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ไม่ตรงกับเงื่อนไข</p>
                        </div>
                      </button>
                    </Fragment>
                  ) : order && order.orderStatus === "defective" ? (
                    <Fragment>
                      <button
                        className="btnSave btnSize btnEditProfile"
                        type="submit"
                        onClick={(e) => setSetStatus("success")}
                      >
                        <div className="spanButton">
                          <MdIcons.MdSave className="iconEditImg" size={22} />
                          <p>ยืนยันการตรวจสอบ</p>
                        </div>
                      </button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button
                        className="btnSave btnSize btnEditProfile"
                        type="submit"
                        onClick={(e) => setSetStatus("success")}
                      >
                        <div className="spanButton">
                          <MdIcons.MdSave className="iconEditImg" size={22} />
                          <p>ยืนยันการตรวจสอบ</p>
                        </div>
                      </button>
                      <button
                        className="btnSave btnSize btnCancel"
                        onClick={(e) => setSetStatus("defective")}
                      >
                        <div className="spanButton">
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ไม่ตรงกับเงื่อนไข</p>
                        </div>
                      </button>
                    </Fragment>
                  )}
                </form>
              </center>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderDetails;
