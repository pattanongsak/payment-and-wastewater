import React, { Fragment, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createPayment } from "../../actions/paymentAction";
import { useAlert } from "react-alert";
import { ADD_PAYMENT_RESET } from "../../constants/paymentConstant";
import MetaData from "../layout/MetaData";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import "../../css/Order/Shipping.css";

import Select from "react-select";

import { getAllPayment } from "../../actions/paymentAction";

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

function CreatePayment({ history }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, success } = useSelector((state) => state.newPayment);

  const { allpayments } = useSelector((state) => state.allPayment);

  const [paymentqeCode, setPayment] = useState({
    bankname: "",
    bankbranch: "",
    accountbankname: "",
    banknumber: "",
  });
  const { bankname, bankbranch, accountbankname, banknumber } = paymentqeCode;

  const [imageqrcode, setimageqrcode] = useState("/Cloude.png");
  const [imageqrcodePreview, setimageqrcodePreview] = useState("/Cloude.png");

  const [banknameFocused, setFocusedbankname] = useState(false);
  const [bankbranchFocused, setFocusedbankbranch] = useState(false);
  const [accountbanknameFocused, setFocusedaccountbankname] = useState(false);
  const [banknumberFocused, setFocusedbanknumber] = useState(false);
  const [imageqrcodeFocused, setFocusedimageqrcode] = useState(false);

  function goPaymentList() {
    history.push(`/list-slip/payment`);
  }

  const paymentSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("bankname", bankname);
    myForm.set("bankbranch", bankbranch);
    myForm.set("accountbankname", accountbankname);
    myForm.set("banknumber", banknumber);

    myForm.set("imageqrcode", imageqrcode);
    dispatch(createPayment(myForm));
  };

  const paymentDataChange = (e) => {
    if (e.target.name === "imageqrcode") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setimageqrcodePreview(reader.result);
          setimageqrcode(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPayment({ ...paymentqeCode, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("บันทึกข้อมูลสำเร็จ");
      history.push("/list-slip/payment");
      dispatch({ type: ADD_PAYMENT_RESET });
    }
    dispatch(getAllPayment());
  }, [dispatch, error, alert, history, success]);

  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setPayment({ ...paymentqeCode, bankname: selectedOption.value });
  };

  return (
    <Fragment>
      <MetaData title="เพิ่มสลิปการชำระเงิน" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {allpayments && allpayments.length === 0 ? (
            <div className="pageModel">
              <form
                className="formModel"
                encType="multipart/form-data"
                onSubmit={paymentSubmit}
              >
                <div className="formTitle">
                  <h1>ตั้งค่าบัญชี</h1>
                  <h3>เพิ่มบัญชีเก็บค่าธรรมเนียม</h3>
                </div>
                <div className="formBox">
                  <div className="gridBox">
                    <div class="formSelectBank">
                      <label>บัญชีธนาคาร</label>{" "}
                      <div>
                        <Select
                          className="selectBank"
                          placeholder="บัญชีธนาคาร"
                          value={selectedOption}
                          onChange={handleChange}
                          options={seclectBank.map((bank) => ({
                            label: bank.label,
                            value: bank.value,
                            image: bank.images,
                          }))}
                          isSearchable={false}
                          onBlur={() => setFocusedbankname(true)}
                          onFocus={() => setFocusedbankname(true)}
                          focused={banknameFocused.toString()}
                          components={{
                            Option: CustomOption, // Define a custom Option component to display images
                          }}
                        />
                        <div>
                          {bankname && (
                            <img
                              className="bankImgPV"
                              src={
                                seclectBank.find(
                                  (bank) => bank.value === bankname
                                ).images
                              }
                              alt={bankname}
                              width={35}
                            />
                          )}
                        </div>
                      </div>
                      {bankbranchFocused === true && (
                        <span className="message">เลือกธนาคาร!</span>
                      )}
                    </div>

                    <div className="formInput">
                      <label>สาขาธนาคาร</label>
                      <input
                        type="text"
                        placeholder="สาขาธนาคาร"
                        required
                        name="bankbranch"
                        value={bankbranch}
                        onChange={paymentDataChange}
                        //------
                        onBlur={() => setFocusedbankbranch(true)}
                        onFocus={() => setFocusedbankbranch(true)}
                        focused={bankbranchFocused.toString()}
                        //------
                      />
                      {bankbranchFocused === true && (
                        <span className="message">*กรอกสาขาธนาคาร!</span>
                      )}
                    </div>
                  </div>
                  <div className="gridBox">
                    <div className="formInput">
                      <label>ชื่อบัญชี</label>
                      <input
                        type="text"
                        placeholder="ชื่อเจ้าของบัญชีธนาคาร"
                        required
                        name="accountbankname"
                        value={accountbankname}
                        onChange={paymentDataChange}
                        //------
                        onBlur={() => setFocusedaccountbankname(true)}
                        onFocus={() => setFocusedaccountbankname(true)}
                        focused={accountbanknameFocused.toString()}
                        //------
                      />
                      {accountbanknameFocused === true && (
                        <span className="message">
                          *กรอกชื่อเจ้าของบัญชีธนาคาร!
                        </span>
                      )}
                    </div>
                    <div className="formInput">
                      <label>เลขบัญชี</label>
                      <input
                        type="text"
                        pattern="^[0-9]{1-30}$"
                        placeholder="เลขบัญชีธนาคาร"
                        required
                        name="banknumber"
                        value={banknumber}
                        onChange={paymentDataChange}
                        //------
                        onBlur={() => setFocusedbanknumber(true)}
                        onFocus={() => setFocusedbanknumber(true)}
                        focused={banknumberFocused.toString()}
                        //------
                      />
                      {banknumberFocused === true && (
                        <span className="message">*เลขบัญชีธนาคาร!</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="formBoxTop">
                  <div className="gridBox">
                    <div className="formInput">
                      <div className="uploader">
                        <label>
                          <input
                            type="file"
                            id="imageUpload"
                            name="imageqrcode"
                            accept="image/*"
                            onChange={paymentDataChange}
                            //------
                            onBlur={() => setFocusedimageqrcode(true)}
                            onFocus={() => setFocusedimageqrcode(true)}
                            focused={imageqrcodeFocused.toString()}
                            //------
                            required
                          />
                          <div className="fileTitle">
                            <h1>อัปโหลดภาพ QR Code</h1>
                            <h3>
                              สามารถแนบไฟล์ประเภท jpg, jpeg, และ png
                              ซึ่งขนาดของแต่ละไฟล์ต้องไม่เกิน 700 KB
                            </h3>
                          </div>
                          <div className="uploadImgBox">
                            <img
                              className={
                                imageqrcodePreview === "/Cloude.png"
                                  ? "uploadImage"
                                  : "SlipsImage"
                              }
                              src={imageqrcodePreview}
                              alt="imageqrcodePreview Preview"
                            />
                          </div>
                        </label>
                        {imageqrcodeFocused === true && (
                          <span className="message">*กรุณาแนบไฟล์รูปภาพ!</span>
                        )}
                      </div>
                    </div>
                    <center className="pmmFooter">
                      <button type="submit" className="btnSave btnPayment">
                        <div className="spanButton">
                          <FaIcons.FaMoneyBillAlt
                            className="iconEditImg"
                            size={22}
                          />
                          <p>บันทึกข้อมูล</p>
                        </div>
                      </button>
                    </center>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <Fragment>
              <div className="pageModel">
                <div className="formModel">
                  <h1 className="formTitle">** มีรายการบัญชีรับเงินแล้ว **</h1>
                  <center className="menuGap">
                    <button className="menu" onClick={goPaymentList}>
                      <BsIcons.BsCashCoin size={60} />
                      <h2 className="labelMenu">รายการบัญชีรับเงิน</h2>
                    </button>
                  </center>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps}>
    <img
      src={data.image}
      alt={label}
      style={{ marginRight: "8px", height: "20px", width: "20px" }}
    />
    {label}
  </div>
);

export default CreatePayment;
