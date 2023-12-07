import React, { Fragment } from "react";
import CheckoutStep from "../Cart/CheckoutStep.js";

import "../../css/Order/Success.css";

import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import MetaData from "../layout/MetaData.js";

function Success({ history }) {
  function goHomePage() {
    history.push(`/`);
  }

  return (
    <Fragment>
       <MetaData title="ส่งข้อมูลเรียบร้อยแล้ว" />
      <CheckoutStep activeStep={3} />
      <div className="pageModel">
        <div className="formModel">
          <center className="successBox">
            <div className="formTitle">
              <h1>ส่งข้อมูลเรียบร้อยแล้ว</h1>
            </div>
            <div className="successBoby">
              <BsIcons.BsClock className="successIcon" size={150} />
              <p>
                คุณชำระค่าธรรมเนียมเรียบร้อยแล้ว กรุณารอเจ้าหน้าที่ตรวจสอบข้อมูล
                ภายใน 3 วันทำการ
              </p>
            </div>
            <div className="successFooter">
                <button className="btnSave btnPayment" onClick={goHomePage}>
                  <div className="spanButton">
                    <FaIcons.FaHouseUser className="iconEditImg" size={22} />
                    <p>กลับสู่หน้าหลัก</p>
                  </div>
                </button>
            </div>
          </center>
        </div>
      </div>
    </Fragment>
  );
}

export default Success;
