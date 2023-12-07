import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { createOrderSuccess, clearErrors } from "../../actions/orderAction";
import "../../css/Order/ConfirmOrder.css";
import { removeItemsFromCart } from "../../actions/cartAction";
import { CREATE_ORDER_RESET } from "../../constants/orderConstants";
import LoaderSuccess from "../layout/Loader/LoaderSuccess";
import { Switch } from "antd";

import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

function ConfirmOrderSuccess({ history }) {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart);
  const { address } = useSelector((state) => state.addressDetail);

  const { error, success } = useSelector((state) => state.newOrder);

  const [another, setAnother] = useState(0);

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

    myForm.set("orderItems", JSON.stringify(cartItems));
    myForm.set("another", another);
    myForm.set("itemsPrice", subtotal);

    // order()
    dispatch(createOrderSuccess(myForm));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
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

  const cancelHandler = () => {
    if (cartItems) {
      for (let item of cartItems) {
        deleteCartItems(item.address);
      }
      history.push("/alladdress");
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleSwitch = () => {
    toggle ? setToggle(false) : setToggle(true);
    setAnother(0);
  };

  return (
    <Fragment>
      <MetaData title="ยืนยันข้อมูลการชำระเงิน" />

      <div className="pageModel">
        <form className="formModel" onSubmit={submitHandler}>
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
                  <div className="OdrBoxCol">
                    <div className="OdrDetailBox">
                      <div className="OrdBoxInfo">
                        <div>
                          <label>รหัสบัตรประจำตัวประชาชน</label>
                        </div>
                        <span>{address.identification}</span>
                      </div>
                    </div>
                    <div className="OdrDetailBox">
                      <div className="OrdBoxInfo">
                        <div>
                          <label>ชื่อ - นามสกุล</label>
                        </div>
                        <span>
                          {address.titlename} {address.firstname}{" "}
                          {address.lastname}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="OdrBoxCol">
                    <div className="OdrDetailBox">
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
                  </div>
                  <div className="OdrBoxCol">
                    <div className="OdrDetailBox">
                      <div className="OrdBoxInfo">
                        <div>
                          <label>ปีงบประมาณ</label>
                        </div>
                        <span>{parseInt(item.selectYear.year) + 543}</span>
                      </div>
                    </div>
                    <div className="OdrDetailBox">
                      {item.quantity === 1 ? (
                        <Fragment>
                          <div className="OrdBoxInfo">
                            <div className="alingSwitch pdSwitch">
                              <Switch onClick={toggleSwitch} checked={toggle} />{" "}
                              <p>
                                {toggle ? <b>เปิด</b> : <b>ปิด</b>}{" "}
                                ค่าธรรมเนียมอื่นๆ
                              </p>
                            </div>
                            {toggle ? (
                              <div className="formInput" id="wastewater">
                                <label>ค่าขยะอื่นๆ (บาท)</label>
                                <input
                                  type="text"
                                  placeholder="หากไม่มีให้กรอบเลข 0"
                                  name="another"
                                  value={another}
                                  onChange={(e) => setAnother(e.target.value)}
                                />
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div></div>
                        </Fragment>
                      )}
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
                            <div className="cardGridItem">
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
                                <p>{e.month}</p>
                              ))}
                            </div>
                            <div className="cardGridItem cardGridItemCol2">
                              {item.selectMonth.map((e) => (
                                <Fragment>
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

          <center className="btnFooter btnBox">
            <button
              className="btnSave btnSize btnPayment"
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

export default ConfirmOrderSuccess;
