import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../layout/Loader/Loader";
import MetaData from "../../../layout/MetaData";
import * as XLSX from "xlsx";
import { useAlert } from "react-alert";

import { getAllAddressOfReport } from "../../../../actions/addressAction";
import {
  getAllOrdersOfReport,
  clearErrors,
} from "../../../../actions/orderAction";
import { getAllMonths } from "../../../../actions/monthAction";
import { getAllYears } from "../../../../actions/yearAction";

import "../../../../css/Report/RepotDetail.css";
import * as SiIcons from "react-icons/si";

function UserPaymentTrashOfbisuness({ match }) {
  const yearId = match.params.id;

  const dispatch = useDispatch();
  const alert = useAlert();
  const { alladdress } = useSelector((state) => state.allAddressOfReport);
  const { months } = useSelector((state) => state.allmonth);
  const { loading, orders, error } = useSelector(
    (state) => state.allOrdersOfReport
  );
  const { years } = useSelector((state) => state.allYear);

  const [selectedOption] = useState("paymentTrash");
  const [selectedOption1, setSelectedOption1] = useState("all");
  let checkInfoValue = [];

  if (alladdress && orders && months) {
    for (const item of alladdress) {
      for (const item2 of orders) {
        for (const item3 of months) {
          for (const info of item2.ori) {
            for (const info2 of info.selectMonth) {
              if (selectedOption1 === "all") {
                if (info.trash && selectedOption === "paymentTrash") {
                  if (
                    item._id === info.address &&
                    item3._id === info2._id &&
                    info.paymenttype === "กิจการ"
                  ) {
                    checkInfoValue.push({
                      id: info2._id,
                      idAddress: item._id,
                      status: item2.orderStatus,
                      paymentPrice: info.trash,
                      anoTherPrice: item2.another,
                      amountPrice: info.quantity,
                      infoMonth: info2._id,
                      infoYear: info.selectYear._id,
                      infoVillageno: info.villageno,
                    });
                  }
                }
              }
              if (info.villageno && selectedOption1 === info.villageno) {
                if (info.trash && selectedOption === "paymentTrash") {
                  if (
                    item._id === info.address &&
                    item3._id === info2._id &&
                    info.paymenttype === "กิจการ"
                  ) {
                    checkInfoValue.push({
                      id: info2._id,
                      idAddress: item._id,
                      status: item2.orderStatus,
                      paymentPrice: info.trash,
                      anoTherPrice: item2.another,
                      amountPrice: info.quantity,
                      infoMonth: info2._id,
                      infoYear: info.selectYear._id,
                      infoVillageno: info.villageno,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  //ยอดรวมแต่ละบ้าน
  const sumTotal = (addressItmeId) => {
    let totalSum = 0;
    checkInfoValue.forEach((ele) => {
      if (ele.infoYear === yearId) {
        if (ele.idAddress === addressItmeId) {
          if (ele.status === "success") {
            const itemPrice = parseInt(ele.paymentPrice);
            const anoTherPrice = parseInt(ele.anoTherPrice);
            totalSum += itemPrice + anoTherPrice;
          }
        }
      }
    });
    return totalSum;
  };

  //ยอดรวมแต่ละบ้าน ของแต่ละเดือน
  const sumTotalOfMonth = (addressItmeId2) => {
    let totalSum = 0;

    checkInfoValue.forEach((ele) => {
      if (
        ele.infoYear === yearId &&
        ele.infoMonth === addressItmeId2 &&
        ele.status === "success"
      ) {
        const itemPrice = parseInt(ele.paymentPrice);
        const anoTherPrice = parseInt(ele.anoTherPrice);
        totalSum += itemPrice + anoTherPrice;
      }
    });
    return totalSum;
  };

  //ยอดรวม ทั้งหมด แต่ละบ้านของทุกเดือน
  const sumTotalAmount = () => {
    let totalSum = 0;
    let alltotalSum = 0;

    checkInfoValue.forEach((ele) => {
      if (
        ele.infoYear === yearId &&
        ele.infoMonth &&
        ele.status === "success"
      ) {
        const itemPrice = parseInt(ele.paymentPrice);
        const anoTherPrice = parseInt(ele.anoTherPrice);
        totalSum += itemPrice + anoTherPrice;
        alltotalSum = totalSum;
      }
    });

    return alltotalSum;
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllOrdersOfReport());
    dispatch(getAllMonths());
    dispatch(getAllYears());
    dispatch(getAllAddressOfReport());
  }, [dispatch, alert, error, yearId]);

  //Print Excel
  const handleOnExport = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.table_to_sheet(
      document.getElementById("reportPaymantTable"),
      { raw: true }
    );

    // กำหนดรูปแบบข้อมูลสำหรับเซลล์ในไฟล์ Excel
    const style = { numFmt: "#,##0" };
    const range = XLSX.utils.decode_range(ws["!ref"]);

    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = ws[cellAddress];

        if (cell && cell.t === "n" && cell.v > 1000) {
          cell.z = style.numFmt;
        }
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "หน้าแรก");

    XLSX.writeFile(wb, "รายงานลูกหนี้ค้างชำระ.xlsx");
  };

  return (
    <Fragment>
      <MetaData title={"ลูกหนี้ชำระค่าขยะประเภทครัวเรือน"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel login-wrapper">
              <div className="formReportBox">
                <h1 className="formTitle ">
                  รายงานลูกหนี้ชำระเงินค่าขยะ ประเภทกิจการ
                </h1>
                <div className="reportformTitle">
                  <h3 className="">
                    ประจำปีงบประมาณ "
                    {years &&
                      years.map((year) => (
                        <Fragment>
                          {year._id === yearId && (
                            <>{parseInt(year.year) + 543}"</>
                          )}
                        </Fragment>
                      ))}
                  </h3>
                  <form>
                    <span>หมู่ที่ </span>
                    <select
                      className="reportformSelect"
                      onChange={(e) => setSelectedOption1(e.target.value)}
                    >
                      <option value="all">หมู่บ้านทั้งหมด</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </form>
                </div>

                <div className="tableReportOverViewX">
                  <table id="reportPaymantTable">
                    <thead>
                      <tr>
                        <th colspan="19">
                          {selectedOption1 === "all" ? (
                            <h3>หมู่บ้านทั้งหมด</h3>
                          ) : (
                            <h3>หมู่ที่ {selectedOption1}</h3>
                          )}{" "}
                          ตำบลสันผักหวาน อำเภอคุมการจัดเก็บหางดง จำหวัดเชียงใหม่{" "}
                          ประจำปีงบประมาณ{" "}
                          {years &&
                            years.map((year) => (
                              <Fragment>
                                {year._id === yearId && (
                                  <>{parseInt(year.year) + 543}</>
                                )}
                              </Fragment>
                            ))}{" "}
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <p className="th100">บ้านเลขที่</p>
                        </th>
                        <th colspan="2">
                          <p className="th250">ชื่อ - นามสกุล</p>
                        </th>
                        <th>
                          <p className="th100">ประเภท</p>
                        </th>
                        <th colspan="2">
                          <p className="th200">เบอร์โทรศัพท์</p>
                        </th>
                        {months &&
                          months.map((month) => (
                            <th key={month._id}>
                              <label className="th70">{month.month}</label>
                            </th>
                          ))}
                        <th>
                          <p className="th150">ยอดชำระ(บาท)</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {alladdress &&
                        alladdress.map((addressItme) => (
                          <tr
                            id={addressItme._id}
                            key={addressItme._id}
                            className={
                              selectedOption1 === "all" &&
                              addressItme.paymenttype === "กิจการ"
                                ? ""
                                : addressItme.villageno === selectedOption1 &&
                                  addressItme.paymenttype === "กิจการ"
                                ? ""
                                : "hideReportData"
                            }
                          >
                            {selectedOption1 === "all" &&
                            addressItme.paymenttype === "กิจการ" ? (
                              <Fragment>
                                <td>{addressItme.homenumber}</td>
                                <td colspan="2">
                                  <p>
                                    {addressItme.titlename}
                                    {addressItme.firstname}{" "}
                                    {addressItme.lastname}
                                  </p>
                                </td>
                                <td>{addressItme.paymenttype}</td>
                                <td colspan="2">{addressItme.phone}</td>
                                {months &&
                                  months.map((month) => (
                                    <td key={month._id}>
                                      {checkInfoValue.map((ele) => {
                                        if (ele.infoYear === yearId) {
                                          if (
                                            ele.idAddress === addressItme._id
                                          ) {
                                            if (ele.id === month._id) {
                                              if (ele.status === "success") {
                                                return (
                                                  <label key={ele.id}>
                                                    {ele.paymentPrice}
                                                    {ele.anoTherPrice === 0 ? (
                                                      <></>
                                                    ) : (
                                                      <>
                                                        {" "}
                                                        {" + "}
                                                        {ele.anoTherPrice}
                                                      </>
                                                    )}
                                                  </label>
                                                );
                                              }
                                            }
                                          }
                                        }
                                        return null; // ส่งคืนค่า null เมื่อเงื่อนไขไม่ตรง
                                      })}
                                    </td>
                                  ))}
                                <td>
                                  {sumTotal(addressItme._id).toLocaleString()}
                                </td>
                              </Fragment>
                            ) : addressItme.villageno === selectedOption1 &&
                              addressItme.paymenttype === "กิจการ" ? (
                              <Fragment>
                                <td>{addressItme.homenumber}</td>
                                <td colspan="2">
                                  <p>
                                    {addressItme.titlename}
                                    {addressItme.firstname}{" "}
                                    {addressItme.lastname}
                                  </p>
                                </td>
                                <td>{addressItme.paymenttype}</td>
                                <td colspan="2">{addressItme.phone}</td>
                                {months &&
                                  months.map((month) => (
                                    <td key={month._id}>
                                      {checkInfoValue.map((ele) => {
                                        if (ele.infoYear === yearId) {
                                          if (
                                            ele.idAddress === addressItme._id
                                          ) {
                                            if (ele.id === month._id) {
                                              if (ele.status === "success") {
                                                return (
                                                  <label key={ele.id}>
                                                    {ele.paymentPrice}
                                                    {ele.anoTherPrice === 0 ? (
                                                      <></>
                                                    ) : (
                                                      <>
                                                        {" "}
                                                        {" + "}
                                                        {ele.anoTherPrice}
                                                      </>
                                                    )}
                                                  </label>
                                                );
                                              }
                                            }
                                          }
                                        }
                                        return null; // ส่งคืนค่า null เมื่อเงื่อนไขไม่ตรง
                                      })}
                                    </td>
                                  ))}
                                <td>
                                  {sumTotal(addressItme._id).toLocaleString()}
                                </td>
                              </Fragment>
                            ) : (
                              <></>
                            )}
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colspan="6">รวมยอดทั้งหมดที่ชำระ (บาท)</th>
                        {months &&
                          months.map((addressItme1) => (
                            <th key={addressItme1._id}>
                              {sumTotalOfMonth(
                                addressItme1._id
                              ).toLocaleString()}
                            </th>
                          ))}

                        <th>{sumTotalAmount(alladdress).toLocaleString()}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <center>
                  <button
                    className="btnSave btnDownloadExcel"
                    onClick={handleOnExport}
                  >
                    <div className="spanLogin">
                      <SiIcons.SiMicrosoftexcel
                        className="iconEditImg"
                        size={22}
                      />
                      <p>ดาวน์โหลด Excel File</p>
                    </div>
                  </button>
                </center>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UserPaymentTrashOfbisuness;
