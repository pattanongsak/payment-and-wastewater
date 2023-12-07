import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userAction";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import * as IoIcons from "react-icons/io";

function HistoryPayment({ item, info, getItem }) {
  const [openModal, setOpenModal] = useState(false);

  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const exportPDF = () => {
    const input = document.getElementById(item._id);
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("userStatement");
    });
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Fragment>
      <div id={item._id} className="ordHistoryBox">
        <div className="OdrTitleBox">
          <div className="OdrBoxRow">
            <div
              className={
                openModal
                  ? item.orderStatus === "Processing"
                    ? "openHistoryOrd OdrBoxTitleColor OdrBoxTitleColorS1 ordHistoryTitle"
                    : item.orderStatus === "success"
                    ? "openHistoryOrd OdrBoxTitleColor OdrBoxTitleColorS2 ordHistoryTitle"
                    : "openHistoryOrd OdrBoxTitleColor OdrBoxTitleColorS3 ordHistoryTitle"
                  : item.orderStatus === "Processing"
                  ? "OdrBoxTitleColor OdrBoxTitleColorS1 ordHistoryTitle"
                  : item.orderStatus === "success"
                  ? "OdrBoxTitleColor OdrBoxTitleColorS2 ordHistoryTitle"
                  : "OdrBoxTitleColor OdrBoxTitleColorS3 ordHistoryTitle"
              }
            >
              <p className="OdrBoxTitleFont">
                <label>เลขที่ใบเสร็จ : </label>
                {String(item._id).substr(0, 8).toUpperCase()}{" "}
                <IoIcons.IoMdPrint
                  className="OdrPriceBox"
                  size={28}
                  onClick={() => exportPDF()}
                />
              </p>
              <div></div>
              {openModal ? (
                <IoIcons.IoIosArrowUp
                  className="arrowCursor"
                  size={25}
                  onClick={() => setOpenModal(false)}
                />
              ) : (
                <IoIcons.IoIosArrowDown
                  className="arrowCursor"
                  size={25}
                  onClick={() => setOpenModal(true)}
                />
              )}
            </div>
          </div>
        </div>
        <div className={openModal ? "" : "closeHistoryOrd"}>
          <div className="OdrBoxCol">
            <div className="OdrDetailBox">
              <div className="OrdBoxInfo">
                <div>
                  <label>สถานะ</label>
                </div>
                <div
                  className={
                    item.orderStatus === "Processing"
                      ? "statusColor1"
                      : item.orderStatus === "success"
                      ? "statusColor2"
                      : "statusColor3"
                  }
                >
                  {item.orderStatus === "Processing"
                    ? "รอตรวจสอบ"
                    : item.orderStatus === "success"
                    ? "ชำระแล้ว"
                    : "ไม่ตรงเงื่อนไข"}
                </div>
              </div>
            </div>
            <div className="OdrDetailBox">
              <div className="OrdBoxInfo">
                <div>
                  <label>ประเภท</label>
                </div>
                {info.trash ? "ค่าขยะ" : <></>}
                {info.wastewater ? "ค่าน้ำเสีย" : <></>} / {info.paymenttype}
              </div>
            </div>
          </div>
          <div className="OdrBoxCol">
            <div className="OdrDetailBox">
              <div className="OrdBoxInfo">
                <div>
                  <label>ปีงบประมาณ</label>
                </div>
                <span>{parseInt(info.selectYear.year) + 543} </span>
              </div>
            </div>
            <div className="OdrDetailBox">
              <div className="OrdBoxInfo">
                <div>
                  <label>เดือนที่ชำระ</label>
                </div>
                {info.selectMonth &&
                  info.selectMonth.map((arrmonth) => (
                    <>
                      <span>{arrmonth.month} </span>
                    </>
                  ))}
              </div>
            </div>
          </div>

          <div className="OdrBoxCol">
            <div className="OdrDetailBox">
              <div className="OrdBoxInfo">
                <div>
                  <label>วันที่ชำระเงิน</label>
                </div>
                {String(item.createAt).substr(8, 2) +
                  " " +
                  (String(item.createAt).substr(5, 2) === "12"
                    ? "ธันวาคม"
                    : String(item.createAt).substr(5, 2) === "11"
                    ? "พฤศจิกายน"
                    : String(item.createAt).substr(5, 2) === "10"
                    ? "ตุลาคม"
                    : String(item.createAt).substr(5, 2) === "09"
                    ? "กันยายน"
                    : String(item.createAt).substr(5, 2) === "08"
                    ? "สิงหาคม"
                    : String(item.createAt).substr(5, 2) === "07"
                    ? "กรกฎาคม"
                    : String(item.createAt).substr(5, 2) === "06"
                    ? "มิถุนายน"
                    : String(item.createAt).substr(5, 2) === "05"
                    ? "พฤษภาคม"
                    : String(item.createAt).substr(5, 2) === "04"
                    ? "เมษายน"
                    : String(item.createAt).substr(5, 2) === "03"
                    ? "มีนาคม"
                    : String(item.createAt).substr(5, 2) === "02"
                    ? "กุมภาพันธ์"
                    : String(item.createAt).substr(5, 2) === "01"
                    ? "มกราคม"
                    : "") +
                  " " +
                  String(item.createAt).substr(0, 4)}
              </div>
            </div>
            <div className="OdrDetailBox">
              <div className="OrdBoxInfo">
                <div>
                  <label>จำนวนเงินชำระ (บาท)</label>
                </div>
                <span>
                  {item.another ? (
                    <>
                      {(parseInt(item.itemsPrice) + parseInt(item.another))
                        .toFixed(2)
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                    </>
                  ) : (
                    <>
                      {parseInt(item.itemsPrice)
                        .toFixed(2)
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
          {item.imageslip ? (
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
                      <label>ธนาคารที่ชำระเงิน</label>
                    </div>
                    <span>{item.shipInfo.bankname}</span>
                    <br />
                    <br />
                    <div>
                      <label>โอนชำระเงิน (บาท)</label>
                    </div>
                    <span className="itemPriceColor">
                      {parseInt(item.shipInfo.amount)
                        .toFixed(2)
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                    </span>
                    <br />
                    <br />
                    <div>
                      <label>เวลาชำระเงิน</label>
                    </div>
                    <span>{item.shipInfo.timeofpayment} น.</span>
                    <br />
                    <br />
                    <div>
                      <label>คำอธิบาย</label>
                    </div>
                    <span>
                      {item.shipInfo.comment ? item.shipInfo.comment : " - "}
                    </span>
                    <br />
                    <br />
                  </div>
                </div>
                <div className="OdrDetailBox">
                  <div className="OrdBoxInfo">
                    <div>
                      <label>หลักฐานชำระเงิน</label>
                    </div>
                    <span>
                      <div onClick={() => getItem(item.imageslip.url)}>
                        <img
                          className="ordHistroyImgSlip"
                          src={item.imageslip.url}
                          alt="Slips Preview"
                        />
                      </div>
                    </span>
                  </div>
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

                    {users &&
                      users.map((userItem) => (
                        <Fragment>
                          {String(userItem._id) === String(item.user) && (
                            <Fragment>
                              <h4>
                                {userItem.titlename} {userItem.firstname}{" "}
                                {userItem.lastname}
                              </h4>
                              <div
                                className={
                                  userItem.role === "user"
                                    ? "useredColorBox useredColor3"
                                    : userItem.role === "employee"
                                    ? "useredColorBox useredColor2"
                                    : "useredColorBox useredColor1"
                                }
                              >
                                {userItem.role === "admin"
                                  ? "( ผู้ดูแลระบบเทศบาลสันผักหวาน )"
                                  : userItem.role === "employee"
                                  ? "( เจ้าหน้าที่เทศบาลสันผักหวาน )"
                                  : ""}
                              </div>
                            </Fragment>
                          )}
                        </Fragment>
                      ))}
                  </center>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default HistoryPayment;
