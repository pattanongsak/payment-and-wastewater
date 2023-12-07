import React, { useEffect, Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import { getMyAddress } from "../../actions/addressAction";
import { useSelector, useDispatch } from "react-redux";
import AddressCard from "./AddressCard";
import * as BsIcons from "react-icons/bs";

function Myaddress() {
  const dispatch = useDispatch();

  const { loading, error, myaddress } = useSelector((state) => state.myaddress);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getMyAddress());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="pageModel">
            <div className="formModel mg">
              <h1 className="formTitle">ที่อยู่เก็บค่าธรรมเนียม</h1>
              {myaddress.length === 0 ? (
                <div className="emptyItem">
                  {" "}
                  <div>
                    <BsIcons.BsFillHouseFill
                      className="noAddressIcon"
                      size={90}
                    />
                  </div>
                  <h3>ไม่มีพบข้อมูลที่อยู่</h3>
                  <h3>กรุณาติดต่อเจ้าหน้าที่พนักงานเทศบาลตำบลสันผักหวาน</h3>
                  <br />
                </div>
              ) : (
                <Fragment></Fragment>
              )}
              {myaddress && (
                <div className="formBox">
                  {myaddress.map((address) => (
                    <AddressCard address={address} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default Myaddress;
