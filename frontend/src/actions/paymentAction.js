import {
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAIL,
  ALL_PAYMENT_REQUEST,
  ALL_PAYMENT_SUCCESS,
  ALL_PAYMENT_FAIL,
  PAYMEN_DETAILS_REQUEST,
  PAYMEN_DETAILS_SUCCESS,
  PAYMEN_DETAILS_FAIL,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAIL,
  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/paymentConstant";

import axios from "axios";

// Create Payment
export const createPayment = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PAYMENT_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      "/api/v1/payment/new",
      paymentData,
      config
    );

    dispatch({ type: ADD_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_PAYMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Payment
export const getAllPayment = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PAYMENT_REQUEST });

    const { data } = await axios.get("/api/v1/payment");

    dispatch({ type: ALL_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PAYMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Payment Detail
export const getPaymentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PAYMEN_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/payment/${id}`);

    dispatch({
      type: PAYMEN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMEN_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Payment
export const updatePayment = (id, paymentData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PAYMENT_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/admin/payment/${id}`,
      paymentData,
      config
    );

    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Payment
export const deletePayment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PAYMENT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/payment/${id}`);

    dispatch({ type: DELETE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PAYMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
