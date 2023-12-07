import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { getAllYears } from "../../actions/yearAction";

import "../../css/Address/Address.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";

function AddressCard({ address }) {
  const dispatch = useDispatch();

  const { loading, years } = useSelector((state) => state.allYear);

  useEffect(() => {
    dispatch(getAllYears());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="gridBox">
          <div className="addressBox">
            <div className="addressTitleTag">
              <h3>ประเภท : </h3>
              <h3
                className={
                  address.paymenttype === "ครัวเรือน"
                    ? "colorADTGreen"
                    : "colorADTRed"
                }
              >
                {address.paymenttype}
              </h3>
            </div>
            <div className="addressDetail">
              <p>
                <label>บ้านเลขที่:</label> {address.homenumber}&nbsp;
                <label>หมู่ที่:</label> {address.villageno}&nbsp;
                <label>ซอย:</label> {address.lane}&nbsp;
              </p>
              <p>
                <label>ถนน:</label> {address.road}&nbsp;
                <label>ตำบล:</label> {address.subdistrict}&nbsp;
              </p>
              <p>
                <label>อำเภอ:</label> {address.district}&nbsp;
                <label>จังหวัด:</label> {address.province}&nbsp;
                <label>รหัสไปรษณีย์:</label> {address.zipcode}&nbsp;
              </p>
            </div>
            <center>
              {years.length > 0 ? (
                <Link to={`/address/${address._id}/0`}>
                  <button className="btnSave btnAddress" id="mg20">
                    <div className="spanLogin">
                      <FaIcons.FaHouseUser className="iconEditImg" size={22} />
                      <p className="spanBtnText">เลือกที่อยู่นี้</p>
                    </div>
                  </button>
                </Link>
              ) : (
                <p className="spanBtnText">ยังไม่มีปีการชำระเงิน</p>
              )}
            </center>
          </div>
        </div>
      )}
    </>
  );
}

export default AddressCard;
