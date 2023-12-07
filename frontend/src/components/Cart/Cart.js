import React, { Fragment, useEffect } from "react";
import CardItemCard from "./CardItemCard";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromCart } from "../../actions/cartAction";
import { getAllPayment } from "../../actions/paymentAction";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import * as FaIcons from "react-icons/fa";

import "../../css/Order/Cart.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

function Cart({ history }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, allpayments } = useSelector((state) => state.allPayment);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  useEffect(() => {
    dispatch(getAllPayment());
  }, [dispatch, history]);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title="รายละเอียดค่าธรรมเนียม" />
      {loading ? (
        <Loader />
      ) : (
        <div className="pageModel">
          <div className="formModel">
            <h1 className="formTitle">รายการที่ต้องชำระ</h1>
            {cartItems.length === 0 ? (
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
                <RemoveShoppingCartIcon />

                <h3>ไม่มีรายการ</h3>
                <br />
                <Link to="/address/me">ที่อยู่ของฉัน</Link>
              </div>
            ) : (
              <Fragment>
                <div>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.address}>
                        <CardItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                      </div>
                    ))}
                  <br />
                  <div>
                    <center>
                      <div className="paymentMethodBox">
                        <div className="pmmTitle">
                          <h2>วิธีการชำระเงิน</h2>
                          <h4>
                            กรุณาชำระเงินตามรายละเอียดที่ได้แจ้งไว้ด้านบน
                            เมื่อชำระเงินเสร็จ
                            กรุณาแนบหลักฐานการชำระเงินได้ที่นี่
                          </h4>
                        </div>
                        <div className="pmmBody">
                          {allpayments && allpayments.length === 0 ? (
                            <Fragment>
                              <h4>ยังไม่มี QR Code สำหรับชำระค่าธรรมเนียม</h4>{" "}
                              <br />{" "}
                              <p>
                                {" "}
                                กรุณาติดต่อเจ้าหน้าที่พนักงานเทศบาลตำบลสันผักหวาน
                              </p>
                            </Fragment>
                          ) : (
                            <div className="ppmDetail">
                              <h2>โอนเงิน</h2>
                              {allpayments &&
                                allpayments.map((paymentData) => (
                                  <div key={paymentData._id}>
                                    <p>
                                      <label>บัญชีธนาคาร : </label>{" "}
                                      {paymentData.bankname}
                                    </p>
                                    <p>
                                      <label>สาขา : </label>{" "}
                                      {paymentData.bankbranch}
                                    </p>
                                    <p>
                                      <label>ชื่อบัญชี : </label>{" "}
                                      {paymentData.accountbankname}
                                    </p>
                                    <p>
                                      <label>เลขที่บัญชี : </label>{" "}
                                      {paymentData.banknumber}
                                    </p>
                                    <h3>สแกน QR Code พร้อมเพย์</h3>
                                    <img
                                      src={paymentData.imageqrcode.url}
                                      alt=""
                                      width={200}
                                    />
                                  </div>
                                ))}
                            </div>
                          )}

                          <div className="totalPriceItem">
                            <h4>จำนวนเงินที่ต้องชำระ</h4>
                            <div className="PriceItem">
                              <h2 className="totalColor">
                                {`${cartItems
                                  .reduce(
                                    (acc, item) =>
                                      acc + item.quantity * item.trash ||
                                      acc + item.quantity * item.wastewater ||
                                      acc +
                                        item.quantity * item.wastewater +
                                        item.wastewater,
                                    0
                                  )
                                  .toFixed(2)
                                  .replace(
                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                    "$1,"
                                  )} `}
                              </h2>
                              &nbsp;
                              <p>บาท</p>
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <div className="pmmFooter">
                          <button
                            className="btnSave btnPayment"
                            onClick={checkoutHandler}
                          >
                            <div className="spanButton">
                              <FaIcons.FaMoneyBillAlt
                                className="iconEditImg"
                                size={22}
                              />
                              <p>แนบหลักฐานชำระเงิน</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </center>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Cart;
