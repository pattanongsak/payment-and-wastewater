import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deletePayment,
  getAllPayment,
} from "../../actions/paymentAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_PAYMENT_RESET } from "../../constants/paymentConstant";
import MetaData from "../layout/MetaData";

import "../../css/Order/Shipping.css";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

import bankok from "./../../images/bankicon/1.png";
import kasikorn from "./../../images/bankicon/2.png";
import krungthai from "./../../images/bankicon/3.png";
import thaipanish from "./../../images/bankicon/4.png";
import tmb from "./../../images/bankicon/8.png";
import aomsin from "./../../images/bankicon/18.png";
import krungsri from "./../../images/bankicon/14.png";
import togoso from "./../../images/bankicon/22.png";
import cimp from "./../../images/bankicon/cimp.png";
import ticco from "./../../images/bankicon/27.png";
import tanachat from "./../../images/bankicon/25.png";
import uob from "./../../images/bankicon/13.png";
import toaoso from "./../../images/bankicon/21.png";

const ListSlipPayment = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, allpayments } = useSelector(
    (state) => state.allPayment
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.payment
  );

  const deletePaymentHandler = (id) => {
    dispatch(deletePayment(id));
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
      alert.success("ลบข้อมูลสำเร็จ");
      history.push("/list-slip/payment");
      dispatch({ type: DELETE_PAYMENT_RESET });
    }

    dispatch(getAllPayment());
  }, [dispatch, alert, error, history, isDeleted, deleteError]);

  const [openModal, setOpenModal] = useState(false);

  const seclectBank = [
    {
      label: "ธนาคารกรุงเทพ",
      value: "ธนาคารกรุงเทพ",
      images: bankok,
    },
    {
      label: "ธนาคารกสิกรไทย",
      value: "ธนาคารกสิกรไทย",
      images: kasikorn,
    },
    {
      label: "ธนาคารกรุงไทย",
      value: "ธนาคารกรุงไทย",
      images: krungthai,
    },
    {
      label: "ธนาคารออมสิน",
      value: "ธนาคารออมสิน",
      images: aomsin,
    },
    {
      label: "ธนาคารกรุงศรีอยุธยา",
      value: "ธนาคารกรุงศรีอยุธยา",
      images: krungsri,
    },
    {
      label: "ธนาคารทหารไทย",
      value: "ธนาคารทหารไทย",
      images: tmb,
    },
    {
      label: "ธนาคารไทยพาณิชย์",
      value: "ธนาคารไทยพาณิชย์",
      images: thaipanish,
    },
    {
      label: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร ( ธกส )",
      value: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
      images: togoso,
    },
    {
      label: "ธนาคารซีไอเอ็มบีไทย",
      value: "ธนาคารซีไอเอ็มบีไทย",
      images: cimp,
    },
    {
      label: "ธนาคารทิสโก้",
      value: "ธนาคารทิสโก้",
      images: ticco,
    },
    {
      label: "ธนาคารธนชาต",
      value: "ธนาคารธนชาต",
      images: tanachat,
    },
    {
      label: "ธนาคารยูโอบี",
      value: "ธนาคารยูโอบี",
      images: uob,
    },
    {
      label: "ธนาคารอาคารสงเคราะห์",
      value: "ธนาคารอาคารสงเคราะห์",
      images: toaoso,
    },
  ];

  return (
    <Fragment>
      <MetaData title="รายการสลิปการชำระเงิน" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel">
              <div className="formTitle">
                <h1>บัญชีเก็บค่าธรรมเนียม</h1>
              </div>
              {allpayments &&
                allpayments.map((item) => (
                  <div key={item._id}>
                    <div className="formBox">
                      <div className="gridBox">
                        <div className="formSelectBank">
                          <label>บัญชีธนาคาร</label>
                          <input
                            className="readOnly selectBank"
                            type="text"
                            value={item.bankname}
                            readOnly
                          />
                                 <div>
                        {item.bankname && (
                          <img
                            className="bankImgPV"
                            src={
                              seclectBank.find(
                                (bank) => bank.value === item.bankname
                              ).images
                            }
                            alt={item.bankname}
                            width={35}
                          />
                        )}
                      </div>
                        </div>
                        <div className="formInput">
                          <label>สาขาธนาคาร</label>
                          <input
                            className="readOnly"
                            type="text"
                            value={item.bankbranch}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="gridBox">
                        <div className="formInput">
                          <label>ชื่อบัญชี</label>
                          <input
                            className="readOnly"
                            type="text"
                            value={item.accountbankname}
                            readOnly
                          />
                        </div>
                        <div className="formInput">
                          <label>เลขบัญชี</label>
                          <input
                            className="readOnly"
                            type="text"
                            value={item.banknumber}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="formBoxTop">
                      <div className="gridBox">
                        <div className="formInput">
                          <div className="uploader">
                            <center>
                              <div className="fileTitle">
                                <h3>รูปภาพ QR Code</h3>
                              </div>
                              <div className="uploadImgBox">
                                <img
                                  className="SlipsImage"
                                  src={item.imageqrcode.url}
                                  alt="imageqrcode"
                                />
                              </div>
                            </center>
                          </div>
                        </div>
                        <center className="btnBox">
                          <Link to={`/update/payment/${item._id}`}>
                            <button className="btnSave btnSize btnEditProfile">
                              <div className="spanButton">
                                <MdIcons.MdSave
                                  className="iconEditImg"
                                  size={22}
                                />
                                <p>แก้ไขข้อมูล</p>
                              </div>
                            </button>
                          </Link>
                          <button
                            className="btnSave btnSize btnCancel"
                            onClick={() => setOpenModal(true)}
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
                    <div className={openModal ? "openModal" : "closeModal"}>
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
                            <p>คุณแน่ใจหรือไม่ว่าคุณต้องการลบข้อมูล?</p>
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
                              onClick={() => deletePaymentHandler(item._id)}
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
                  </div>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListSlipPayment;
