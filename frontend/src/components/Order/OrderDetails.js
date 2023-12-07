import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import "./myOrders.css";

function OrderDetails({ match }) {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="รายละเอียดการชำระเงิน" />

          <div className="container">
            <div>
              <Typography component="h1">
                การชำระเงิน {order && order._id}
              </Typography>
              <Typography>ข้อมูลรายละเอียดการชำระเงิน</Typography>
              <div className="container">
                <div>
                  <h2>ชื่อ-นามสกุล</h2>
                  <span>
                    {order.user && order.user.titlename}{" "}
                    {order.user && order.user.firstname}{" "}
                    {order.user && order.user.lastname}
                  </span>
                </div>
                <div>
                  <h2>ข้อมูลธนาคาร</h2>
                  <span>
                    ชื่อธนาคาร: {order.shipInfo && order.shipInfo.bankname}
                  </span>{" "}
                  <span>
                    จำนวนเงิน: {order.shipInfo && order.shipInfo.amount}
                  </span>{" "}
                  <span>
                    วันที่ชำระเงิน:{" "}
                    {order.shipInfo && order.shipInfo.dateofpayment}
                  </span>{" "}
                  <span>
                    เวลาที่ชำระเงิน:{" "}
                    {order.shipInfo && order.shipInfo.timeofpayment}
                  </span>{" "}
                  <span>
                    คำอธิบาย: {order.shipInfo && order.shipInfo.comment}
                  </span>
                  <div>
                    <img
                      id="registerImage"
                      src={order.shipInfo && order.imageslip.url}
                      alt="Slips Preview"
                    />
                  </div>
                </div>
                <div>
                  <h2>ข้อมูลงวดที่ชำระเงิน</h2>
                  <span>
                    ประเภทที่อยู่:{" "}
                    {order.ori &&
                      order.ori.map((item) => (
                        <>
                          <p>{item.paymenttype}</p>
                          <p>{item.place}</p>
                          <p>{item.province}</p>
                          <p>{item.district}</p>
                          <p>{item.subdistrict}</p>
                          <p>{item.homenumber}</p>
                          <p>{item.villageno}</p>
                          <p>{item.road}</p>
                          <p>{item.lane}</p>
                          <p>{item.zipcode}</p>
                          <p>ค่าขยะ{item.trash}</p>
                          <p>ค่าน้ำเสีย{item.wastewater}</p>
                          <p>{item.quantity}</p>
                          <h2>เดือน</h2>
                          {item.selectMonth.map((thisMonth) => (
                            <>
                              <p>{thisMonth.month}</p>
                            </>
                          ))}
                        </>
                      ))}
                  </span>
                </div>
                <div>
                  <h2>สถานะ</h2>
                  <div
                    className={
                      order.orderStatus === "success"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderDetails;
