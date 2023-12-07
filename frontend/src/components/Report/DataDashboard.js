import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { getAllYears, getYearDetails } from "../../actions/yearAction";
import { Link } from "react-router-dom";

import "../../css/Report/Report.css";

function DataDashboard({ history, match }) {
  const yearId = match.params.id;

  const dispatch = useDispatch();

  const { years } = useSelector((state) => state.allYear);

  const {
    loading,
    year,
    usersofyearcount,
    databssuccess,
    datahhsuccess,
    databswaitbisuness,
    databswaithousehold,
    householdtypecount,
    bisunestypecount,
    subtotal,
    subtotalwastewaterandtrah,
    subtotaltrash,
    subtotalwastewater,
    subtotalAnother,
    addressofyearcount,
  } = useSelector((state) => state.getyeardetail);

  const [yearReport, setYearReport] = useState(yearId);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    setYearReport(e.target.value);
    history.push(`/datauser-dashboards/fillter/${e.target.value}`);
    window.location.reload();
  };

  useEffect(() => {
    if (year && year._id !== yearId) {
      dispatch(getYearDetails(yearId));
    }

    dispatch(getAllYears());
  }, [dispatch, year, yearId]);

  return (
    <Fragment>
      <MetaData title={"สรุปรายงานลูกหนี้"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel">
              <div className="formBoxTop">
                <h1 className="formTitle">สรุปรายงานลูกหนี้</h1>

                <div className="selectYearReport">
                  <p>ปีงบประมาณ</p>
                  <form>
                    <select
                      className="formYeartSelectOption"
                      required
                      onChange={searchSubmitHandler}
                    >
                      <option value={yearId}>เลือกปี</option>
                      {years &&
                        years.map((year) => (
                          <Fragment>
                            <option
                              value={year._id}
                              selected={year._id === yearReport ? true : false}
                            >
                              {parseInt(year.year) + 543}
                            </option>
                          </Fragment>
                        ))}
                    </select>
                  </form>
                </div>
                {yearReport ? (
                  <Fragment>
                    <div>
                      <Fragment>
                        <h3>จำนวนลูกหนี้ และ ที่อยู่เก็บค่าธรรมเนียม</h3>
                        <div className="dashboardRow1">
                          <div className="dashboardReport">
                            <p>ลูกหนี้ทั้งหมด</p>
                            <p className="reportText reportTextColor1">
                              {usersofyearcount}
                            </p>
                          </div>
                          <div className="dashboardReport">
                            <p>จำนวนที่อยู่เก็บค่าธรรมเนียม</p>
                            <p className="reportText reportTextColor1">
                              {addressofyearcount}
                            </p>
                          </div>
                        </div>

                        <h3>สถานะการดำเนินการ</h3>
                        <div className="dashboardRow1">
                          <div className="dashboardReport">
                            <p>ประเภทกิจการ</p>
                            <p className="reportText">{bisunestypecount} </p>
                            <div className="dashboardReport-sub">
                              <div className="">
                                <p>ชำระเเล้ว</p>
                                <p className="reportText">
                                  {parseInt(databssuccess).toLocaleString()}
                                </p>
                              </div>
                              <div className="">
                                <p>ค้างชำระ</p>
                                <p className="reportText reportTextColor2">
                                  {parseInt(
                                    databswaitbisuness
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="dashboardReport">
                            <p>ประเภทครัวเรือน</p>
                            <p className="reportText">{householdtypecount} </p>

                            <div className="dashboardReport-sub">
                              <div className="">
                                <p>ชำระเเล้ว</p>
                                <p className="reportText">
                                  {parseInt(datahhsuccess).toLocaleString()}
                                </p>
                              </div>
                              <div className="">
                                <p>ค้างชำระ</p>
                                <p className="reportText reportTextColor2">
                                  {parseInt(
                                    databswaithousehold
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>งบประมาณประจำปี (บาท)</h3>
                        <div className="dashboardRow2">
                          <div className="dashboardReport">
                            <p>ยอดรวมทั้งหมด</p>
                            <p className="reportText reportTextColor1">
                              {(
                                parseInt(subtotal) + parseInt(subtotalAnother)
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div className="dashboardReport">
                            <p>ยอดเงินที่ได้รับ</p>
                            <p className="reportText">
                              {parseInt(
                                subtotalwastewaterandtrah
                              ).toLocaleString()}
                            </p>
                          </div>
                          <div className="dashboardReport">
                            <p>ค่าธรรมเนียมเพิ่มเติมที่ได้รับ</p>
                            <p className="reportText">
                              {parseInt(subtotalAnother).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="dashboardRow1">
                          <div className="dashboardReport">
                            <p>ค่าขยะที่ได้รับ</p>
                            <p className="reportText">
                              {parseInt(subtotaltrash).toLocaleString()}
                            </p>
                          </div>
                          <div className="dashboardReport">
                            <p>ค่าน้ำเสียที่ได้รับ</p>
                            <p className="reportText">
                              {parseInt(subtotalwastewater).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </Fragment>
                    </div>
                    <div className="printBox">
                      <div className="printBoxOutline">
                        <div className="printRow">
                          <div className="reportPrintTitle">
                            <h3 className="">ลูกหนี้ชำระค่าขยะ</h3>
                          </div>
                          <Link
                            className="textLinknone"
                            to={`/user/payment/trash/all/${yearReport}`}
                          >
                            <button className="btnSave reportPrintBtn">
                              <p>รายละเอียด</p>
                            </button>
                          </Link>
                        </div>

                        <div className="printRow">
                          <div className="reportPrintTitle">
                            <h3 className="">ลูกหนี้ชำระค่าบำบัดน้ำเสีย</h3>
                          </div>

                          <Link
                            className="textLinknone"
                            to={`/user/payment/wastewater/all/${yearReport}`}
                          >
                            <button className="btnSave reportPrintBtn">
                              <p>รายละเอียด</p>
                            </button>
                          </Link>
                        </div>
                      </div>

                      <div className="printBoxOutline">
                        <h3 className="colorADTGreen">ประเภทครัวเรือน</h3>
                        <div className="printRow">
                          <div className="reportPrintTitle">
                            <h4>ลูกหนี้ชำระค่าขยะ (ครัวเรือน)</h4>
                          </div>

                          <Link
                            className="textLinknone"
                            to={`/user/payment/trash/home/${yearReport}`}
                          >
                            <button className="btnSave reportPrintBtn">
                              <p>รายละเอียด</p>
                            </button>
                          </Link>
                        </div>
                        <div className="printRow">
                          <div className="reportPrintTitle">
                            <h4>ลูกหนี้ชำระค่าบำบัดน้ำเสีย (ครัวเรือน)</h4>
                          </div>
                          <Link
                            className="textLinknone"
                            to={`/user/payment/wastwater/home/${yearReport}`}
                          >
                            <button className="btnSave reportPrintBtn">
                              <p>รายละเอียด</p>
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="printBoxOutline">
                        <h3 className="colorADTRed">ประเภทกิจการ</h3>
                        <div className="printRow">
                          <div className="reportPrintTitle">
                            <h4>ลูกหนี้ชำระค่าขยะ (กิจการ)</h4>
                          </div>
                          <Link
                            className="textLinknone"
                            to={`/user/payment/trash/bisuness/${yearReport}`}
                          >
                            <button className="btnSave reportPrintBtn">
                              <p>รายละเอียด </p>
                            </button>
                          </Link>
                        </div>
                        <div className="printRow">
                          <div className="reportPrintTitle">
                            <h4>ลูกหนี้ชำระค่าบำบัดน้ำเสีย (กิจการ)</h4>
                          </div>
                          <Link
                            className="textLinknone"
                            to={`/user/payment/wastwater/bisuness/${yearReport}`}
                          >
                            <button className="btnSave reportPrintBtn">
                              <p>รายละเอียด </p>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div>
                      <Fragment>
                        <h3>จำนวนลูกหนี้ และ ที่อยู่เก็บค่าธรรมเนียม</h3>
                        <div className="dashboardRow1">
                          <div className="dashboardReport">
                            <p>ลูกหนี้ทั้งหมด</p>
                            <p className="reportText reportTextColor1">{0}</p>
                          </div>
                          <div className="dashboardReport">
                            <p>จำนวนที่อยู่เก็บค่าธรรมเนียม</p>
                            <p className="reportText reportTextColor1">{0}</p>
                          </div>
                        </div>
                        <h3>สถานะการดำเนินการ</h3>
                        <div className="dashboardRow1">
                          <div className="dashboardReport">
                            <p>ประเภทกิจการ</p>
                            <p className="reportText">{0} </p>
                            <div className="dashboardReport-sub">
                              <div className="">
                                <p>ชำระเเล้ว</p>
                                <p className="reportText">{0}</p>
                              </div>
                              <div className="">
                                <p>ค้างชำระ</p>
                                <p className="reportText reportTextColor2">
                                  {0}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="dashboardReport">
                            <p>ประเภทครัวเรือน</p>
                            <p className="reportText">{0} </p>

                            <div className="dashboardReport-sub">
                              <div className="">
                                <p>ชำระเเล้ว</p>
                                <p className="reportText">{0}</p>
                              </div>
                              <div className="">
                                <p>ค้างชำระ</p>
                                <p className="reportText reportTextColor2">
                                  {0}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3>งบประมาณประจำปี (บาท)</h3>
                        <div className="dashboardRow2">
                          <div className="dashboardReport">
                            <p>ยอดรวมทั้งหมด</p>
                            <p className="reportText reportTextColor1">{0}</p>
                          </div>
                          <div className="dashboardReport">
                            <p>ยอดเงินที่ได้รับ</p>
                            <p className="reportText">{0}</p>
                          </div>
                          <div className="dashboardReport">
                            <p>ค่าธรรมเนียมเพิ่มเติมที่ได้รับ</p>
                            <p className="reportText">{0}</p>
                          </div>
                        </div>
                        <div className="dashboardRow1">
                          <div className="dashboardReport">
                            <p>ค่าขยะที่ได้รับ</p>
                            <p className="reportText">{0}</p>
                          </div>
                          <div className="dashboardReport">
                            <p>ค่าน้ำเสียที่ได้รับ</p>
                            <p className="reportText">{0}</p>
                          </div>
                        </div>
                        <div className="printBox"></div>
                      </Fragment>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default DataDashboard;
