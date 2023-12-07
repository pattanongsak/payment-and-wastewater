import React, { Fragment } from "react";
import "../../css/Order/CardItem.css";
import * as MdIcons from "react-icons/md";

function CardItemCard({ item, deleteCartItems }) {
  return (
    <Fragment>
      <div className="boxShadow">
        <div className="OdrTitleBox">
          <div className="OdrBoxRow">
            <div className="OdrBoxTitleColor OdrDetailBoxTitleColor OdrBoxTitleFont btnHeaderBox">
              <p>รายละเอียดค่าธรรมเนียม</p>
              <button
                className="btnSave btnDelectOrd"
                onClick={() => deleteCartItems(item.address)}
              >
                <div className="spanButton">
                  <MdIcons.MdDelete className="iconEditImg" size={22} />
                  <p className="btnDelectTextOrd">ลบรายการ</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="OdrBoxRow">
          <div className="OrdBoxInfo">
            <div>
              <label>ที่อยู่</label>
            </div>
            {item.homenumber}
            &nbsp;
            <label>หมู่ที่:</label> {item.villageno}&nbsp;
            <label>ซอย:</label> {item.lane}&nbsp;
            <label>ถนน:</label> {item.road}&nbsp;
            <label>ตำบล:</label> {item.subdistrict}&nbsp;
            <label>อำเภอ:</label> {item.district}&nbsp;
            <label>จังหวัด:</label> {item.province}&nbsp;
            <label>รหัสไปรษณีย์:</label> {item.zipcode}
            &nbsp;
          </div>
        </div>
        <div className="OdrBoxCol">
          <div className="OdrDetailBox">
            <div className="OrdBoxInfo">
              <div>
                <label>ประเภท</label>
              </div>
              <span>
                {item.trash ? "ค่าขยะ" : <></>}
                {item.wastewater ? "ค่าน้ำเสีย" : <></>} / {item.paymenttype}
              </span>
            </div>
          </div>
          <div className="OdrDetailBox">
            <div className="OrdBoxInfo">
              <div>
                <label>ปีงบประมาณ</label>
              </div>
              <span>{parseInt(item.selectYear.year) + 543}</span>
            </div>
          </div>
        </div>
        <div className="OdrBoxRow">
          <div className="OrdBoxInfo">
            <div>
              <label>เดือนที่เลือกชำระ</label>
            </div>
            {item.selectMonth.month ? (
              <div className="cardItemBody">
                <div className="cardGridItem">{item.selectMonth.month}</div>
                <div className="cardGridItem">
                  {item.trash ? (
                    <span>{`ค่าขยะ ${item.trash}`}</span>
                  ) : (
                    <div></div>
                  )}
                  {item.wastewater ? (
                    <span>{`ค่าน้ำเสีย ${item.wastewater}`}</span>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ) : (
              <div className="cardItemBody">
                <div className="cardGridItem">
                  {item.selectMonth.map((e) => (
                    <div className="cardGridSubItem">
                      {e.month}
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="cardGridItem">
                  {item.selectMonth.map((e) => (
                    <>
                      {item.trash ? (
                        <div className="cardGridSubItem">
                          {`ค่าขยะ ${item.trash}`}
                          <hr />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {item.wastewater ? (
                        <div className="cardGridSubItem">
                          {`ค่าน้ำเสีย ${item.wastewater}`}
                          <hr />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CardItemCard;
