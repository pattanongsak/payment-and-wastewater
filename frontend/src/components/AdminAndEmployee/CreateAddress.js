import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createAddress } from "../../actions/addressAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { NEW_ADDRESS_RESET } from "../../constants/addressConstants";
import "../../css/Address/CreateAddress.css";
import * as MdIcons from "react-icons/md";
import { getUserDetails } from "../../actions/userAction";

import { Switch } from "antd";

function CreateAddress({ history, match }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newAddress);
  const { usered } = useSelector((state) => state.userDetails);
  const [identification, setIdentification] = useState("");
  const [titlename, setTitlename] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [paymenttype, setPaymenttype] = useState("");
  const [place, setPlace] = useState("");
  const [homenumber, setHomenumber] = useState("");
  const [lane, setLane] = useState("");
  const [villageno, setVillageno] = useState("");
  const [road, setRoad] = useState("");
  const [province, setProvince] = useState("เชียงใหม่");
  const [district, setDistrict] = useState("หางดง");
  const [subdistrict, setSubdistrict] = useState("สันผักหวาน");
  const [zipcode, setZipcode] = useState("50230");
  const [trash, setTrash] = useState("");
  const [wastewater, setWastewater] = useState(0);

  const userId = match.params.id;

  useEffect(() => {
    if (usered && usered._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setIdentification(usered.identification);
      setTitlename(usered.titlename);
      setFirstname(usered.firstname);
      setLastname(usered.lastname);
      setPhone(usered.phone);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("บันทึกที่อยู่สำเร็จ");
      history.push("/alladdress");
      dispatch({ type: NEW_ADDRESS_RESET });
      window.location.reload();
    }
  }, [dispatch, alert, error, history, userId, usered, success]);

  const createAddressSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("identification", identification);
    myForm.set("titlename", titlename);
    myForm.set("firstname", firstname);
    myForm.set("lastname", lastname);
    myForm.set("phone", phone);
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

    dispatch(createAddress(myForm));
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
  const [phoneFocused, setFocusedphone] = useState(false);

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

  const [toggle, setToggle] = useState(
    localStorage.getItem("toggle") === "true"
  );

  const toggleSwitch = () => {
    setToggle((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggle", newState.toString());
      return newState;
    });
  };

  return (
    <Fragment>
      <MetaData title="เพิ่มที่อยู่ลูกหนี้" />
      <div className="pageModel">
        <form
          className="formModel"
          encType="multipart/form-data"
          onSubmit={createAddressSubmitHandler}
        >
          <div className="formTitle">
            <h1>เพิ่มที่อยู่ลูกหนี้</h1>
          </div>
          <div className="formBox">
            <div className="gridBox">
              <div className="formInput" id="identification">
                <label>เลขบัตรประชาชน</label>
                <input
                  type="text"
                  className="textReadOnly"
                  maxLength={13}
                  placeholder="กรอกเลขบัตรประชาชน"
                  pattern="^[0-9]{13}$"
                  required
                  readOnly
                  disabled
                  name="identification"
                  value={identification}
                  onChange={(e) => setIdentification(e.target.value)}
                  //------
                  onBlur={() => setFocusedidentification(true)}
                  onFocus={() => setFocusedidentification(true)}
                  focused={identificationFocused.toString()}
                  //------
                />
                {identificationFocused === true && (
                  <span className="message">*กรอกเลขบัตรประชาชน 13 ตัว!</span>
                )}
              </div>
              <div className="formSelect">
                <label>คำนำหน้าชื่อ</label>
                <input
                  type="text"
                  className="textReadOnly"
                  maxLength={13}
                  placeholder="กรอกเลขบัตรประชาชน"
                  pattern="^[0-9]{13}$"
                  required
                  readOnly
                  disabled
                  name="titlename"
                  value={titlename}
                  onChange={(e) => setTitlename(e.target.value)}
                  //------
                  onBlur={() => setFocusedtitlename(true)}
                  onFocus={() => setFocusedtitlename(true)}
                  focused={titlenameFocused.toString()}
                  //------
                />
                {titlenameFocused === true && (
                  <span className="message">*กรุณาเลือกคำนำหน้า!</span>
                )}
              </div>
              <div className="formInput">
                <label>ชื่อ</label>
                <input
                  type="text"
                  className="textReadOnly"
                  placeholder="กรุณากรอกชื่อ"
                  required
                  readOnly
                  disabled
                  name="firstname"
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
                  className="textReadOnly"
                  placeholder="กรอกนามสกุล"
                  required
                  readOnly
                  disabled
                  name="lastname"
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
              <div className="formInput " id="phone">
                <label>เบอร์โทร</label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="กรอกเบอร์โทรศัพท์"
                  pattern="^[0-9]{10}$"
                  required
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  //------
                  onBlur={() => setFocusedphone(true)}
                  onFocus={() => setFocusedphone(true)}
                  focused={phoneFocused.toString()}
                  //------
                />
                {phoneFocused === true && (
                  <span className="message">*กรอกเบอร์โทร 10 ตัว!</span>
                )}
              </div>
              <div className="formInput">
                <label>ประเภทที่อยู่</label>
                <select
                  className="formSelect"
                  name="paymenttype"
                  value={paymenttype}
                  required
                  onChange={(e) => setPaymenttype(e.target.value)}
                  //------
                  onBlur={() => setFocusedPaymenttype(true)}
                  onFocus={() => setFocusedPaymenttype(true)}
                  focused={paymenttypeFocused.toString()}
                  //------
                >
                  <option value="">กรุณาเลือก</option>
                  <option value="ครัวเรือน">ครัวเรือน</option>
                  <option value="กิจการ">กิจการ</option>
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
                    value={place}
                    required
                    onChange={(e) => setPlace(e.target.value)}
                    //------
                    onBlur={() => setFocusedPaymenttype(true)}
                    onFocus={() => setFocusedPaymenttype(true)}
                    focused={paymenttypeFocused.toString()}
                    //------
                  >
                    {seclectPlace.map((option) => (
                      <option value={option.value}>{option.label}</option>
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
                  name="trash"
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

              <div>
                <div className="alingSwitch pdSwitch">
                  <Switch onClick={toggleSwitch} checked={toggle} />{" "}
                  <p>
                    {toggle ? <b>เปิดใช้งาน</b> : <b>ปิดใช้งาน</b>}{" "}
                    ค่าบําบัดน้ำเสีย
                  </p>
                </div>
                {toggle ? (
                  <div className="formInput" id="wastewater">
                    <label>ค่าน้ำเสีย</label>
                    <input
                      type="text"
                      placeholder="กรอกค่าน้ำเสีย (บาท)"
                      required
                      name="wastewater"
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
                ) : (
                  <div></div>
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
                  name="homenumber"
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
                <select
                  className="formSelect"
                  name="villageno"
                  required
                  value={villageno}
                  onChange={(e) => setVillageno(e.target.value)}
                  //------
                  onBlur={() => setFocusedVillageno(true)}
                  onFocus={() => setFocusedVillageno(true)}
                  focused={villagenoFocused.toString()}
                  //------
                >
                  <option value="">เลือกหมู่บ้าน</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
                {villagenoFocused === true && (
                  <span className="message">*กรุณาเลือกหมู่บ้าน!</span>
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
                  name="lane"
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
                  name="road"
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
                  className="textReadOnly"
                  type="text"
                  placeholder="กรอกตำบล"
                  required
                  readOnly
                  name="subdistrict"
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
                  className="textReadOnly"
                  type="text"
                  placeholder="กรอกอำเภอ"
                  required
                  readOnly
                  name="district"
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
                  className="textReadOnly"
                  type="text"
                  placeholder="กรอกจังหวัด"
                  required
                  readOnly
                  name="province"
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
                  className="textReadOnly"
                  type="text"
                  placeholder="กรอกรหัสไปรษณีย์"
                  required
                  readOnly
                  name="zipcode"
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
            <button
              className="btnSave btnSize btnCreate"
              type="submit"
              disabled={loading ? true : false}
            >
              <div className="spanButton">
                <MdIcons.MdAddBusiness className="iconEditImg" size={22} />
                <p>บันทึกข้อมูล</p>
              </div>
            </button>
            {/* </Link> */}
          </center>
        </form>
      </div>
    </Fragment>
  );
}

export default CreateAddress;
