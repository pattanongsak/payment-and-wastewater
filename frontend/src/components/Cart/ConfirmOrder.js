import React, { Fragment, useEffect, useState } from "react";
import CheckoutStep from "../Cart/CheckoutStep.js";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
// import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../actions/orderAction";
import "../../css/Order/ConfirmOrder.css";
import { CREATE_ORDER_RESET } from "../../constants/orderConstants.js";
import { removeItemsFromCart } from "../../actions/cartAction.js";

import CloseIcon from "@material-ui/icons/Close";
import LoaderSuccess from "../layout/Loader/LoaderSuccess.js";

import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

function ConfirmOrder({ history }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error, success } = useSelector((state) => state.newOrder);
  const [another] = useState(0);

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + item.quantity * item.trash ||
      acc + item.quantity * item.wastewater ||
      acc + item.quantity * item.wastewater + item.wastewater,
    0
  );

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("shippingInfo", JSON.stringify(shippingInfo));
    myForm.set("orderItems", JSON.stringify(cartItems));
    myForm.set("itemsPrice", subtotal);
    myForm.set("imageslip", shippingInfo.imageslip);
    myForm.set("another", another);

    // order()
    dispatch(createOrder(myForm));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const cancelHandler = () => {
    if (cartItems) {
      for (let item of cartItems) {
        deleteCartItems(item.address);
      }
      history.push("/address/me");
    }
  };

  useEffect(() => {
    if (success) {
      alert.success("บันทึกที่อยู่สำเร็จ");
      history.push("/success");
      dispatch({ type: CREATE_ORDER_RESET });
      if (cartItems) {
        for (let item of cartItems) {
          deleteCartItems(item.address);
        }
      }
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, success, history, cartItems]);

  const [modelZoom, setModelZoom] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  const getItem = (url) => {
    setTempUrl(url);
    setModelZoom(true);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <MetaData title="ยืนยันข้อมูลการชำระเงิน" />
      <CheckoutStep activeStep={1} />

      <div className="pageModel">
        <form className="formModel" onSubmit={submitHandler}>
          <div className={modelZoom ? "modelZoom open" : "modelZoom"}>
            <img src={tempUrl} alt="Slips Preview" />
            <CloseIcon onClick={() => setModelZoom(false)} />
          </div>
          <div className="formTitle">
            <h1>ตรวจสอบรายการ</h1>
          </div>
          <div className="boxShadow">
            <div className="OdrTitleBox">
              <div className="OdrBoxRow">
                <div className="OdrBoxTitleColor OdrDetailBoxTitleColor OdrBoxTitleFont btnHeaderBox">
                  <p>รายละเอียดค่าธรรมเนียม</p>
                  <button
                    className="btnSave btnDelectOrd"
                    onClick={() => cancelHandler()}
                  >
                    <div className="spanButton">
                      <MdIcons.MdDelete className="iconEditImg" size={22} />
                      <p className="btnDelectTextOrd">ลบรายการ</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <Fragment>
                  <div className="OdrBoxRow">
                    <div className="OrdBoxInfo">
                      <div>
                        <label>ที่อยู่</label>
                      </div>
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
                  </div>
                  <div className="OdrBoxCol">
                    <div className="OdrDetailBox">
                      <div className="OrdBoxInfo">
                        <div>
                          <label>ประเภท</label>
                        </div>
                        <span>
                          {item.trash ? "ค่าขยะ" : <></>}
                          {item.wastewater ? "ค่าน้ำเสีย" : <></>} /{" "}
                          {item.paymenttype}
                        </span>
                      </div>
                    </div>
                    <div className="OdrDetailBox">
                      <div className="OrdBoxInfo">
                        <div>
                          <label>ปีงบประมาณ</label>
                        </div>
                        <span>{parseInt(item.selectYear.year) + 543}</span>
                      </div>
                    </div>
                  </div>
                  <div className="OdrBoxRow">
                    <div className="OrdBoxInfo">
                      <div>
                        <label>เดือนที่เลือกชำระ</label>
                      </div>
                      <div className="cardItemBody">
                        {item.selectMonth.month ? (
                          <Fragment>
                            <div className="cardGridItem ">
                              {item.selectMonth.month}
                            </div>
                            <div className="cardGridItem cardGridItemCol2">
                              {item.trash ? (
                                <p>{item.trash} บาท</p>
                              ) : (
                                <div></div>
                              )}
                              {item.wastewater ? (
                                <p>{item.wastewater} บาท</p>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="cardGridItem">
                              {item.selectMonth.map((e) => (
                                <p className="cardGridSubItem">
                                  {e.month}
                                  <hr />
                                </p>
                              ))}
                            </div>
                            <div className="cardGridItem cardGridItemCol2">
                              {item.selectMonth.map((e) => (
                                <Fragment>
                                  {item.trash ? (
                                    <p className="cardGridSubItem">
                                      {item.trash} บาท
                                      <hr />
                                    </p>
                                  ) : (
                                    <div></div>
                                  )}
                                  {item.wastewater ? (
                                    <p className="cardGridSubItem">
                                      {item.wastewater} บาท
                                      <hr />
                                    </p>
                                  ) : (
                                    <div></div>
                                  )}
                                </Fragment>
                              ))}
                            </div>
                          </Fragment>
                        )}
                      </div>
                    </div>
                    <div className="hrOdrAddress" />
                  </div>
                  <div className="OdrBoxCol">
                    <div className="OdrDetailBox">
                      <Fragment></Fragment>
                    </div>
                    <div className="OdrDetailBox">
                      <div className="OrdBoxInfo">
                        <div>
                          <label>รวมค่าธรรมเนียม</label>
                        </div>
                        <span>
                          <h2 className="totalPrice">
                            {subtotal
                              .toFixed(2)
                              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                          </h2>{" "}
                          บาท
                        </span>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
          </div>

          <div className="boxShadow boxShadowRow">
            <div className="OdrTitleBox">
              <div className="OdrBoxRow">
                <div className="OdrBoxTitleColor OdrDetailBoxTitleColor OdrBoxTitleFont btnHeaderBox">
                  <p>หลักฐานการชำระเงิน</p>
                </div>
              </div>
            </div>
            <div className="OdrBoxCol">
              <div className="OdrDetailBox">
                <div className="OrdBoxInfo">
                  <div>
                    <label>รายละเอียดการโอนชำระ</label>
                  </div>
                  <div className="ordPayDataBox ">
                    <div className="ordPayData ">
                      <p>ธนาคาร</p>
                      <p>วันที่ชำระเงิน</p>
                      <p>เวลาชำระเงิน</p>
                      <p>จำนวนเงิน</p>
                      <p>หมายเหตุ</p>
                    </div>
                    <div className="ordPayData">
                      <h4>{shippingInfo.bankname}</h4>
                      <h4>{shippingInfo.dateofpayment}</h4>
                      <h4>{shippingInfo.timeofpayment} น.</h4>
                      <h4>{shippingInfo.amount} บาท</h4>
                      <h4>
                        {shippingInfo.comment ? shippingInfo.comment : "-"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="OdrDetailBox">
                <div className="OrdBoxInfo">
                  <div>
                    <label>สลิปโอนเงิน</label>
                  </div>
                  <center className="OrdBoxInfo">
                    <div onClick={() => getItem(shippingInfo.imageslip)}>
                      <img
                        className="slipInfo"
                        src={shippingInfo.imageslip}
                        alt="Slips Preview"
                      />
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <center className="btnFooter btnBox">
            <button
              className="btnSave btnPayment"
              type="submit"
              onClick={() => setOpenModal(true)}
            >
              <div className="spanButton">
                <BsIcons.BsCheckCircleFill className="iconEditImg" size={22} />
                <p>ยืนยันรายการ</p>
              </div>
            </button>
            <button
              className="btnSave btnSize btnCancel"
              onClick={() => cancelHandler()}
            >
              <div className="spanButton">
                <MdIcons.MdCancel className="iconEditImg" size={22} />
                <p>ยกเลิกรายการ</p>
              </div>
            </button>
          </center>

          <div className={openModal ? "openModal SuccessModal" : "closeModal"}>
            <div className="modal-content">
              <div className="modal-header modal-SaveBar"></div>
              <div className="modal-body">
                <LoaderSuccess />
                <div>
                  <p>กรุณารอสักครู่... ระบบทำการบันทึกข้อมูล</p>
                </div>
              </div>
              <div className="modal-footer">
                <center className="btnBox"></center>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default ConfirmOrder;
