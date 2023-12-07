import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateAddress,
  getAddressDetails,
} from "../../actions/addressAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { UPDATE_ADDRESS_RESET } from "../../constants/addressConstants";
import Loader from "./../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "../../css/Address/CreateAddress.css";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

function UpdateAddress({ history, match }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, address } = useSelector((state) => state.addressDetail);

  const {
    error: updateError,
    loading,
    isUpdated,
  } = useSelector((state) => state.address);

  const [identification, setIdentification] = useState("");
  const [titlename, setTitlename] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [paymenttype, setPaymenttype] = useState("");
  const [place, setPlace] = useState("");
  const [homenumber, setHomenumber] = useState("");
  const [lane, setLane] = useState("");
  const [villageno, setVillageno] = useState("");
  const [road, setRoad] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [trash, setTrash] = useState("");
  const [wastewater, setWastewater] = useState("");

  const addressId = match.params.id;

  useEffect(() => {
    if (address && address._id !== addressId) {
      dispatch(getAddressDetails(addressId));
    } else {
      setIdentification(address.identification);
      setTitlename(address.titlename);
      setFirstname(address.firstname);
      setLastname(address.lastname);
      setPaymenttype(address.paymenttype);
      setPlace(address.place);
      setHomenumber(address.homenumber);
      setLane(address.lane);
      setVillageno(address.villageno);
      setRoad(address.road);
      setProvince(address.province);
      setDistrict(address.district);
      setSubdistrict(address.subdistrict);
      setZipcode(address.zipcode);
      setTrash(address.trash);
      setWastewater(address.wastewater);
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
      alert.success("แก้ไขข้อมูลที่อยู่สำเร็จ");
      history.push("/alladdress");
      dispatch({ type: UPDATE_ADDRESS_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    addressId,
    address,
    updateError,
  ]);

  const updateAddressSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("identification", identification);
    myForm.set("titlename", titlename);
    myForm.set("firstname", firstname);
    myForm.set("lastname", lastname);
    myForm.set("paymenttype", paymenttype);
    myForm.set("place", place);
    myForm.set("homenumber", homenumber);
    myForm.set("lane", lane);
    myForm.set("villageno", villageno);
    myForm.set("road", road);
    myForm.set("province", province);
    myForm.set("district", district);
    myForm.set("subdistrict", subdistrict);
    myForm.set("zipcode", zipcode);
    myForm.set("trash", trash);
    myForm.set("wastewater", wastewater);

    dispatch(updateAddress(addressId, myForm));
  };

  const [identificationFocused, setFocusedidentification] = useState(false);
  const [titlenameFocused, setFocusedtitlename] = useState(false);
  const [firstnameFocused, setFocusedfirstname] = useState(false);
  const [lastnameFocused, setFocusedlastname] = useState(false);
  const [paymenttypeFocused, setFocusedPaymenttype] = useState(false);

  const [homenumberFocused, setFocusedHomenumber] = useState(false);
  const [laneFocused, setFocusedLane] = useState(false);
  const [villagenoFocused, setFocusedVillageno] = useState(false);
  const [roadFocused, setFocusedRoad] = useState(false);
  const [provinceFocused, setFocusedProvince] = useState(false);
  const [subdistrictFocused, setFocusedSubdistrict] = useState(false);
  const [districtFocused, setFocusedDistrict] = useState(false);
  const [zipcodeFocused, setFocusedZipcode] = useState(false);

  const [trashFocused, setFocusedTrash] = useState(false);
  const [wastewaterFocused, setFocusedWastewater] = useState(false);

  const seclectPlace = [
    {
      label: "กรุณาเลือก",
      value: "",
    },
    {
      label: "ห้องเช่า",
      value: "ห้องเช่า",
    },
    {
      label: "อพาร์ทเม้นท์",
      value: "อพาร์ทเม้นท์",
    },
    {
      label: "หอพัก",
      value: "หอพัก",
    },
    {
      label: "ร้านอาหารและเครื่องดื่ม",
      value: "ร้านอาหารและเครื่องดื่ม",
    },
    {
      label: "ร้านขายของชำ",
      value: "ร้านขายของชำ",
    },
    {
      label: "มินิมาร์ท",
      value: "มินิมาร์ท",
    },
    {
      label: "ซุปเปอร์มาร์เก็ต",
      value: "ซุปเปอร์มาร์เก็ต",
    },
    {
      label: "สวนอาหาร",
      value: "สวนอาหาร",
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="แก้ไขที่อยู่ลูกหนี้" />
          <div className="pageModel">
            <form
              className="formModel"
              encType="multipart/form-data"
              onSubmit={updateAddressSubmitHandler}
            >
              <div className="formTitle">
                <h1>แก้ไขที่อยู่ลูกหนี้</h1>
              </div>
              <div className="formBox">
                <div className="gridBox">
                  <div className="formInput" id="identification">
                    <label>เลขบัตรประชาชน</label>
                    <input
                      type="text"
                      maxLength={13}
                      placeholder="กรอกเลขบัตรประชาชน"
                      pattern="^[0-9]{13}$"
                      required
                      value={identification}
                      onChange={(e) => setIdentification(e.target.value)}
                      //------
                      onBlur={() => setFocusedidentification(true)}
                      onFocus={() => setFocusedidentification(true)}
                      focused={identificationFocused.toString()}
                      //------
                    />
                    {identificationFocused === true && (
                      <span className="message">
                        *กรอกเลขบัตรประชาชน 13 ตัว!
                      </span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>คำนำหน้าชื่อ</label>
                    <select
                      className="formSelect"
                      name="titlename"
                      required
                      onChange={(e) => setTitlename(e.target.value)}
                      //------
                      onBlur={() => setFocusedtitlename(true)}
                      onFocus={() => setFocusedtitlename(true)}
                      focused={titlenameFocused.toString()}
                      //------
                    >
                      {address.titlename === "นาย" && (
                        <Fragment>
                          <option value="นาย" selected>
                            นาย
                          </option>
                          <option value="นาง">นาง</option>
                          <option value="นางสาว">นางสาว</option>
                        </Fragment>
                      )}
                      {address.titlename === "นาง" && (
                        <Fragment>
                          <option value="นาย">นาย</option>
                          <option value="นาง" selected>
                            นาง
                          </option>
                          <option value="นางสาว">นางสาว</option>
                        </Fragment>
                      )}
                      {address.titlename === "นางสาว" && (
                        <Fragment>
                          <option value="นาย">นาย</option>
                          <option value="นาง">นาง</option>
                          <option value="นางสาว" selected>
                            นางสาว
                          </option>
                        </Fragment>
                      )}
                    </select>
                    {titlenameFocused === true && (
                      <span className="message">*กรุณาเลือกคำนำหน้า!</span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>ชื่อ</label>
                    <input
                      type="text"
                      placeholder="กรุณากรอกชื่อ"
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      //------
                      onBlur={() => setFocusedfirstname(true)}
                      onFocus={() => setFocusedfirstname(true)}
                      focused={firstnameFocused.toString()}
                      //------
                    />
                    {firstnameFocused === true && (
                      <span className="message">*กรุณากรอกชื่อ!</span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>นามสกุล</label>
                    <input
                      type="text"
                      placeholder="กรอกนามสกุล"
                      required
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      //------
                      onBlur={() => setFocusedlastname(true)}
                      onFocus={() => setFocusedlastname(true)}
                      focused={lastnameFocused.toString()}
                      //------
                    />
                    {lastnameFocused === true && (
                      <span className="message">*กรุณากรอกนามสกุล!</span>
                    )}
                  </div>
                  <div className="formInput">
                    <label>ประเภทที่อยู่</label>
                    <select
                      className="formSelect"
                      name="paymenttype"
                      required
                      onChange={(e) => setPaymenttype(e.target.value)}
                      //------
                      onBlur={() => setFocusedPaymenttype(true)}
                      onFocus={() => setFocusedPaymenttype(true)}
                      focused={paymenttypeFocused.toString()}
                      //------
                    >
                      {address.paymenttype === "ครัวเรือน" && (
                        <Fragment>
                          <option value="">กรุณาเลือก</option>
                          <option value="ครัวเรือน" selected>
                            ครัวเรือน
                          </option>
                          <option value="กิจการ">กิจการ</option>
                          <option value="ย้ายออก">ย้ายออก</option>
                        </Fragment>
                      )}
                      {address.paymenttype === "กิจการ" && (
                        <Fragment>
                          <option value="">กรุณาเลือก</option>
                          <option value="ครัวเรือน">ครัวเรือน</option>
                          <option value="กิจการ" selected>
                            กิจการ
                          </option>
                          <option value="ย้ายออก">ย้ายออก</option>
                        </Fragment>
                      )}
                      {address.paymenttype === "ย้ายออก" && (
                        <Fragment>
                          <option value="">กรุณาเลือก</option>
                          <option value="ครัวเรือน">ครัวเรือน</option>
                          <option value="กิจการ">กิจการ</option>
                          <option value="ย้ายออก" selected>
                            ย้ายออก
                          </option>
                        </Fragment>
                      )}
                    </select>
                    {paymenttypeFocused === true && (
                      <span className="message">*กรุณาเลือกประเภท!</span>
                    )}
                  </div>
                  {paymenttype === "กิจการ" && (
                    <div className="formInput">
                      <label>ประเภทกิจการ</label>
                      <select
                        className="formSelect SelectBusiness"
                        name="place"
                        required
                        onChange={(e) => setPlace(e.target.value)}
                        //------
                        onBlur={() => setFocusedPaymenttype(true)}
                        onFocus={() => setFocusedPaymenttype(true)}
                        focused={paymenttypeFocused.toString()}
                        //------
                      >
                        {seclectPlace.map((option) => (
                          <Fragment>
                            <option
                              value={option.value}
                              selected={
                                option.value === address.place ? true : false
                              }
                            >
                              {option.label}
                            </option>
                          </Fragment>
                        ))}
                      </select>
                      <span className="message">*กรุณาเลือกกิจการ!</span>
                    </div>
                  )}
                  <div className="formInput" id="trash">
                    <label>ค่าขยะ</label>
                    <input
                      type="text"
                      placeholder="กรอกค่าขยะ (บาท)"
                      required
                      value={trash}
                      onChange={(e) => setTrash(e.target.value)}
                      //------
                      onBlur={() => setFocusedTrash(true)}
                      onFocus={() => setFocusedTrash(true)}
                      focused={trashFocused.toString()}
                      //------
                    />
                    {trashFocused === true && (
                      <span className="message">*กรุณากรอกรค่าขยะ!</span>
                    )}
                  </div>
                  <div className="formInput" id="wastewater">
                    <label>ค่าน้ำเสีย</label>
                    <input
                      type="text"
                      placeholder="กรอกค่าน้ำเสีย (บาท)"
                      required
                      value={wastewater}
                      onChange={(e) => setWastewater(e.target.value)}
                      //------
                      onBlur={() => setFocusedWastewater(true)}
                      onFocus={() => setFocusedWastewater(true)}
                      focused={wastewaterFocused.toString()}
                      //------
                    />
                    {wastewaterFocused === true && (
                      <span className="message">*กรุณากรอกรค่าน้ำเสีย!</span>
                    )}
                  </div>
                </div>
                <div className="gridBox">
                  <div className="formInput" id="homenumber">
                    <label>บ้านเลขที่</label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="กรอกบ้านเลขที่"
                      pattern="^[0-9]{1-10}$"
                      required
                      value={homenumber}
                      onChange={(e) => setHomenumber(e.target.value)}
                      //------
                      onBlur={() => setFocusedHomenumber(true)}
                      onFocus={() => setFocusedHomenumber(true)}
                      focused={homenumberFocused.toString()}
                      //------
                    />
                    {homenumberFocused === true && (
                      <span className="message">*กรอกบ้านเลขที่!</span>
                    )}
                  </div>
                  <div className="formInput" id="villageno">
                    <label>หมู่บ้านที่</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="กรอกหมู่ที่"
                      pattern="^[0-9]{1-5}$"
                      required
                      value={villageno}
                      onChange={(e) => setVillageno(e.target.value)}
                      //------
                      onBlur={() => setFocusedVillageno(true)}
                      onFocus={() => setFocusedVillageno(true)}
                      focused={villagenoFocused.toString()}
                      //------
                    />
                    {villagenoFocused === true && (
                      <span className="message">*กรอกหมู่บ้าน (หมู่ที่)!</span>
                    )}
                  </div>
                  <div className="formInput" id="lane">
                    <label>ซอย</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="กรอกซอยที่"
                      pattern="^[0-9]{1-5}$"
                      required
                      value={lane}
                      onChange={(e) => setLane(e.target.value)}
                      //------
                      onBlur={() => setFocusedLane(true)}
                      onFocus={() => setFocusedLane(true)}
                      focused={laneFocused.toString()}
                      //------
                    />
                    {laneFocused === true && (
                      <span className="message">*กรอกซอย(ซอยที่)!</span>
                    )}
                  </div>
                  <div className="formInput" id="road">
                    <label>ถนน</label>
                    <input
                      type="text"
                      placeholder="กรอกชื่อถนน (หากไม่มีเติมสัญลักษณ์ - )"
                      required
                      value={road}
                      onChange={(e) => setRoad(e.target.value)}
                      //------
                      onBlur={() => setFocusedRoad(true)}
                      onFocus={() => setFocusedRoad(true)}
                      focused={roadFocused.toString()}
                      //------
                    />
                    {roadFocused === true && (
                      <span className="message">*กรุณากรอกชื่อถนน!</span>
                    )}
                  </div>
                  <div className="formInput" id="subdistrict">
                    <label>ตำบล</label>
                    <input
                      type="text"
                      placeholder="กรอกตำบล"
                      required
                      value={subdistrict}
                      onChange={(e) => setSubdistrict(e.target.value)}
                      //------
                      onBlur={() => setFocusedSubdistrict(true)}
                      onFocus={() => setFocusedSubdistrict(true)}
                      focused={subdistrictFocused.toString()}
                      //------
                    />
                    {subdistrictFocused === true && (
                      <span className="message">*กรุณากรอกตำบล!</span>
                    )}
                  </div>
                  <div className="formInput" id="district">
                    <label>อำเภอ</label>
                    <input
                      type="text"
                      placeholder="กรอกอำเภอ"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      //------
                      onBlur={() => setFocusedDistrict(true)}
                      onFocus={() => setFocusedDistrict(true)}
                      focused={districtFocused.toString()}
                      //------
                    />
                    {districtFocused === true && (
                      <span className="message">*กรุณากรอกอำเภอ!</span>
                    )}
                  </div>
                  <div className="formInput" id="province">
                    <label>จังหวัด</label>
                    <input
                      type="text"
                      placeholder="กรอกจังหวัด"
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      //------
                      onBlur={() => setFocusedProvince(true)}
                      onFocus={() => setFocusedProvince(true)}
                      focused={provinceFocused.toString()}
                      //------
                    />
                    {provinceFocused === true && (
                      <span className="message">*กรุณากรอกจังหวัด!</span>
                    )}
                  </div>
                  <div className="formInput" id="zipcode">
                    <label>รหัสไปรษณีย์</label>
                    <input
                      type="text"
                      placeholder="กรอกรหัสไปรษณีย์"
                      required
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      //------
                      onBlur={() => setFocusedZipcode(true)}
                      onFocus={() => setFocusedZipcode(true)}
                      focused={zipcodeFocused.toString()}
                      //------
                    />
                    {zipcodeFocused === true && (
                      <span className="message">*กรุณากรอกรหัสไปรษณีย์!</span>
                    )}
                  </div>
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
                  <Link to="/alladdress">
                    <button className="btnSave btnSize btnCancel" type="reset">
                      <div className="spanButton">
                        <MdIcons.MdCancel className="iconEditImg" size={22} />
                        <p>ยกเลิก</p>
                      </div>
                    </button>
                  </Link>
                </div>
              </center>
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
}

export default UpdateAddress;
