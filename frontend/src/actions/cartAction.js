import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addTrashItemsToCart =
  (id, quantity, arrIndex, arrYear) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/address/${id}`);
    const newArrWithArrIndex = [];

    for (let i = 0; i < data.months.length; i++) {
      for (let j = 0; j < arrIndex.length; j++) {
        if (i === arrIndex[j]) {
          newArrWithArrIndex.push(data.months[i]);
        }
      }
    }

    if (quantity >= 12) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          address: data.address._id,
          identification: data.address.identification,
          titlename: data.address.titlename,
          firstname: data.address.firstname,
          lastname: data.address.lastname,
          paymenttype: data.address.paymenttype,
          place: data.address.place,
          homenumber: data.address.homenumber,
          lane: data.address.lane,
          villageno: data.address.villageno,
          road: data.address.road,
          province: data.address.province,
          district: data.address.district,
          subdistrict: data.address.subdistrict,
          zipcode: data.address.zipcode,
          trash: data.address.trash,
          stock: data.address.Stock,
          quantity,

          selectMonth: data.months,
          selectYear: data.years[arrYear],
        },
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          address: data.address._id,
          identification: data.address.identification,
          titlename: data.address.titlename,
          firstname: data.address.firstname,
          lastname: data.address.lastname,
          paymenttype: data.address.paymenttype,
          place: data.address.place,
          homenumber: data.address.homenumber,
          lane: data.address.lane,
          villageno: data.address.villageno,
          road: data.address.road,
          province: data.address.province,
          district: data.address.district,
          subdistrict: data.address.subdistrict,
          zipcode: data.address.zipcode,
          trash: data.address.trash,
          stock: data.address.Stock,
          quantity,
          selectMonth: newArrWithArrIndex,
          selectYear: data.years[arrYear],
        },
      });
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// Add to Cart
export const addWaterWastItemsToCart =
  (id, quantity, arrIndex, arrYear) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/address/${id}`);
    const newArrWithArrIndex = [];

    for (let i = 0; i < data.months.length; i++) {
      for (let j = 0; j < arrIndex.length; j++) {
        if (i === arrIndex[j]) {
          newArrWithArrIndex.push(data.months[i]);
        }
      }
    }

    if (quantity >= 12) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          address: data.address._id,
          identification: data.address.identification,
          titlename: data.address.titlename,
          firstname: data.address.firstname,
          lastname: data.address.lastname,
          paymenttype: data.address.paymenttype,
          place: data.address.place,
          homenumber: data.address.homenumber,
          lane: data.address.lane,
          villageno: data.address.villageno,
          road: data.address.road,
          province: data.address.province,
          district: data.address.district,
          subdistrict: data.address.subdistrict,
          zipcode: data.address.zipcode,
          wastewater: data.address.wastewater,
          stock: data.address.Stock,
          quantity,
          selectMonth: data.months,
          selectYear: data.years[arrYear],
        },
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          address: data.address._id,
          identification: data.address.identification,
          titlename: data.address.titlename,
          firstname: data.address.firstname,
          lastname: data.address.lastname,
          paymenttype: data.address.paymenttype,
          place: data.address.place,
          homenumber: data.address.homenumber,
          lane: data.address.lane,
          villageno: data.address.villageno,
          road: data.address.road,
          province: data.address.province,
          district: data.address.district,
          subdistrict: data.address.subdistrict,
          zipcode: data.address.zipcode,
          wastewater: data.address.wastewater,
          stock: data.address.Stock,
          quantity,
          selectMonth: newArrWithArrIndex,
          selectYear: data.years[arrYear],
        },
      });
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
