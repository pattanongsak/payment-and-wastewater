import React, { Fragment } from "react";
import "../../css/Menu/Menu.css";
import "../../css/FormModel/Responsive.css";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";

function Home({ history }) {
  const { user } = useSelector((state) => state.user);

  function goCart() {
    history.push(`/cart`);
  }
  function goOrder() {
    history.push(`/allorder`);
  }
  function goalladdress() {
    history.push(`/alladdress`);
  }
  function goReport() {
    history.push(`/datauser-dashboards`);
  }

  if (user.role === "admin" || user.role === "employee") {
    return (
      <Fragment>
        <MetaData title="ระบบชำระค่าธรรมเนียม-เทศบาลตำบลสันผักหวาน" />
        <div className="pageModel">
          <div className="formModel">
            <h1 className="formTitle">ชำระค่าธรรมเนียมขยะ</h1>
            <center className="menuGap">
              <button className="menu" onClick={goOrder}>
                <MdIcons.MdPendingActions size={60} />
                <h2 className="labelMenu">รอตรวจสอบยอดชำระ</h2>
              </button>
              <button className="menu" onClick={goalladdress}>
                <FaIcons.FaHouseUser size={60} />
                <h2 className="labelMenu">ค้นหาที่อยู่</h2>
              </button>
              <button className="menu" onClick={goReport}>
                <TbIcons.TbReportAnalytics size={60} />
                <h2 className="labelMenu">สรุปรายงานลูกหนี้</h2>
              </button>
            </center>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <MetaData title="ระบบชำระค่าธรรมเนียม-เทศบาลตำบลสันผักหวาน" />
        <div className="pageModel">
          <div className="formModel">
            <h1 className="formTitle">ชำระค่าธรรมเนียมขยะ</h1>
            <center className="menuGap">
              <button className="menu" onClick={goCart}>
                <FaIcons.FaMoneyBillAlt size={60} />
                <h2 className="labelMenu">รายการที่ต้องชำระ</h2>
              </button>
            </center>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
