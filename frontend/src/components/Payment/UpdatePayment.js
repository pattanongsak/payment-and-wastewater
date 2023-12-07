import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updatePayment,
  getPaymentDetails,
} from "../../actions/paymentAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { UPDATE_PAYMENT_RESET } from "../../constants/paymentConstant";

import "../../css/Order/Shipping.css";

import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

import { Link } from "react-router-dom";

import Select from "react-select";

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

const UpdatePayment = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, paymented } = useSelector(
    (state) => state.paymentDetail
  );

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.payment
  );

  const [bankname, setBankname] = useState("");
  const [bankbranch, setBankbranch] = useState(0);
  const [accountbankname, setAccountbankname] = useState("");
  const [banknumber, setBanknumber] = useState("");

  const [imageqrcode, setImageqrcode] = useState();
  const [imageqrcodePreview, setImageqrcodePreview] = useState("/Profile.png");

  const productId = match.params.id;

  useEffect(() => {
    if (paymented && paymented._id !== productId) {
      dispatch(getPaymentDetails(productId));
    } else {
      setBankname(paymented.bankname);
      setBankbranch(paymented.bankbranch);
      setAccountbankname(paymented.accountbankname);
      setBanknumber(paymented.banknumber);
      setImageqrcodePreview(paymented.imageqrcode.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("แก้ไขข้อมูลสำเร็จ");
      history.push("/list-slip/payment");
      dispatch({ type: UPDATE_PAYMENT_RESET });
      window.location.reload();
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    paymented,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("bankname", bankname);
    myForm.set("bankbranch", bankbranch);
    myForm.set("accountbankname", accountbankname);
    myForm.set("banknumber", banknumber);
    myForm.set("imageqrcode", imageqrcode);

    dispatch(updatePayment(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageqrcodePreview(reader.result);
        setImageqrcode(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [openModal, setOpenModal] = useState(false);

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
    setBankname(selectedOption.value);
    console.log(selectedOption.value);
  };
  console.log(paymented.bankname);

  return (
    <Fragment>
      <MetaData title="แก้ไขสลิปการชำระเงิน" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <form
              className="formModel"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <div className="formTitle">
                <h1>ตั้งค่าบัญชี</h1>
                <h3>แก้ไขบัญชีเก็บค่าธรรมเนียม</h3>
              </div>
              <div className="formBox">
                <div className="gridBox">
                  <div class="formSelectBank">
                    <label>บัญชีธนาคาร</label>{" "}
                    <div>
                      <Select
                        className="selectBank"
                        value={selectedOption}
                        onChange={handleChange}
                        options={seclectBank.map((bank) => ({
                          label: bank.label,
                          value: bank.value,
                          image: bank.images,
                        }))}
                        isSearchable={false}
                        placeholder={
                          paymented?.bankname
                            ? paymented.bankname
                            : "บัญชีธนาคาร"
                        }
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
                  </div>
                  <div className="formInput">
                    <label>สาขาธนาคาร</label>
                    <input
                      type="text"
                      placeholder="สาขาธนาคาร"
                      required
                      onChange={(e) => setBankbranch(e.target.value)}
                      value={bankbranch}
                    />
                  </div>
                </div>
                <div className="gridBox">
                  <div className="formInput">
                    <label>ชื่อบัญชี</label>
                    <input
                      type="text"
                      placeholder="ชื่อเจ้าของบัญชีธนาคาร"
                      required
                      onChange={(e) => setAccountbankname(e.target.value)}
                      value={accountbankname}
                    />
                  </div>
                  <div className="formInput">
                    <label>เลขบัญชี</label>
                    <input
                      type="text"
                      pattern="^[0-9]{1-30}$"
                      placeholder="เลขบัญชีธนาคาร"
                      required
                      name="banknumber"
                      onChange={(e) => setBanknumber(e.target.value)}
                      value={banknumber}
                    />
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
                          onChange={updateProductImagesChange}
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
                    </div>
                  </div>
                  <center className="btnBox">
                    <div className="btnBoxSub">
                      <div
                        className="btnSave btnSize btnEditProfile"
                        onClick={() => setOpenModal(true)}
                      >
                        <div className="spanButton">
                          <MdIcons.MdSave className="iconEditImg" size={22} />
                          <p>บันทึกข้อมูล</p>
                        </div>
                      </div>
                      <Link to="/list-slip/payment">
                        <button
                          className="btnSave btnSize btnCancel"
                          type="reset"
                        >
                          <div className="spanButton">
                            <MdIcons.MdCancel
                              className="iconEditImg"
                              size={22}
                            />
                            <p>ยกเลิก</p>
                          </div>
                        </button>
                      </Link>
                    </div>
                  </center>
                </div>
              </div>

              <div className={openModal ? "openModal" : "closeModal"}>
                <div className="modal-content">
                  <div className="modal-header modal-SaveBar">
                    <MdIcons.MdClose
                      className="close"
                      size={35}
                      onClick={() => setOpenModal(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <IoIcons.IoIosCheckmarkCircleOutline
                      className="iconModal-Save"
                      size={120}
                    />
                    <div>
                      <p>คุณต้องการบันทึกการเปลี่ยนแปลงข้อมูลหรือไม่?</p>
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
                          <MdIcons.MdCancel className="iconEditImg" size={22} />
                          <p>ยกเลิก</p>
                        </div>
                      </button>
                      <button
                        className="btnSave btnSize modal-Save"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        <div className="spanButton">
                          <MdIcons.MdSave className="iconEditImg" size={22} />
                          <p>บันทึกข้อมูล</p>
                        </div>
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

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

export default UpdatePayment;
