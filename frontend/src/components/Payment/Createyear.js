import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createYear } from "../../actions/yearAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { ADD_YEAR_RESET } from "../../constants/yearConstants";
import Loader from "../layout/Loader/Loader";

import { getAllYears, deleteYear } from "../../actions/yearAction";
import { DELETE_YEAR_RESET } from "../../constants/yearConstants";

import "../../css/FormModel/FormSelect.css";
import "../../css/FormModel/FormInput.css";
import "../../css/FormModel/Responsive.css";
import "../../css/Register/Register.css";

import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";

function Createyear({ history }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.addYear);
  const { years } = useSelector((state) => state.allYear);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.yearManage
  );

  const deleteYearrHandler = (id) => {
    dispatch(deleteYear(id));
  };

  const [year, setYear] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("บันทึกปีสำเร็จ");
      history.push("/admin/create-year");
      dispatch({ type: ADD_YEAR_RESET });
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("ลบปีชำระเงินสำเร็จ");
      history.push("/admin/create-year");
      dispatch({ type: DELETE_YEAR_RESET });
      window.location.reload();
    }

    dispatch(getAllYears());
  }, [dispatch, alert, error, history, success, isDeleted, deleteError]);

  const createYearsSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("year", year);

    dispatch(createYear(myForm));
  };

  const [yearFocused, setFocusedyear] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [yearId, setYearId] = useState(null);

  const setModalYearId = (yearItemId) => {
    setOpenModal(true);
    setYearId(yearItemId);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ตั้งค่าปีงบประมาณ" />
          <div className="pageModel">
            <div className="formModel">
              <h1 className="formTitle">ตั้งค่าปีงบประมาณ</h1>
              <div className="formBox btnBox">
                <div className="gridBox">
                  <div>
                    <label>รายการปีงบประมาณ</label>
                    {years &&
                      years.map((item) => (
                        <div key={item._id}>
                          <div className="printRow dashboardReport">
                            <h3>พ.ศ. {parseInt(item.year) + 543}</h3>
                            <label>ค.ศ. {parseInt(item.year)}</label>
                            <div
                              className="btnSave btnDelectOrd"
                              onClick={() => setModalYearId(item._id)}
                            >
                              <div className="spanButton">
                                <MdIcons.MdDelete
                                  className="iconEditImg"
                                  size={22}
                                />
                                <p className="btnDelectTextOrd">ลบรายการ</p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={openModal ? "openModal" : "closeModal"}
                          >
                            <div className="modal-content">
                              <div className="modal-header modal-DeleteBar">
                                <MdIcons.MdClose
                                  className="close"
                                  size={35}
                                  onClick={() => setOpenModal(false)}
                                />
                              </div>
                              <div className="modal-body">
                                <IoIcons.IoIosCloseCircleOutline
                                  className="iconModal-Delete"
                                  size={120}
                                />
                                <div>
                                  <p>คุณแน่ใจหรือไม่ว่าคุณต้องการลบข้อมูล?</p>
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
                                      <MdIcons.MdCancel
                                        className="iconEditImg"
                                        size={22}
                                      />
                                      <p>ยกเลิก</p>
                                    </div>
                                  </button>
                                  <button
                                    className="btnSave btnSize modal-Delete"
                                    type="submit"
                                    onClick={() => deleteYearrHandler(yearId)}
                                  >
                                    <div className="spanButton">
                                      <MdIcons.MdDelete
                                        className="iconEditImg"
                                        size={22}
                                      />
                                      <p>ลบ</p>
                                    </div>
                                  </button>
                                </center>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <form className="gridBox" onSubmit={createYearsSubmitHandler}>
                  <div className="formInput">
                    <label>เพิ่มปีการชำระเงิน</label>
                    <input
                      type="text"
                      maxLength={4}
                      pattern="^[0-9]{4}$"
                      placeholder="กำหนดปีเป็น (ค.ศ.) "
                      required
                      name="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      //------
                      onBlur={() => setFocusedyear(true)}
                      onFocus={() => setFocusedyear(true)}
                      focused={yearFocused.toString()}
                      //------
                    />
                    {yearFocused === true && (
                      <span className="message">
                        *ปีการชำระเงินให้ถูกต้อง! (ค.ศ.)
                      </span>
                    )}
                  </div>
                  <center className="btnBox">
                    <button
                      className="btnSave btnSize btnCreate"
                      type="submit"
                      value="Update"
                    >
                      <div className="spanButton">
                        <MdIcons.MdSend className="iconEditImg" size={22} />
                        <p>บันทึกข้อมูล</p>
                      </div>
                    </button>
                  </center>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Createyear;
