import axios from "axios";
import {
  MY_ADDRESS_REQUEST,
  MY_ADDRESS_SUCCESS,
  MY_ADDRESS_FAIL,
  ADDRESS_DETAILS_REQUEST,
  ADDRESS_DETAILS_SUCCESS,
  ADDRESS_DETAILS_FAIL,
  ALL_ADDRESS_REQUEST,
  ALL_ADDRESS_SUCCESS,
  ALL_ADDRESS_FAIL,
  NEW_ADDRESS_REQUEST,
  NEW_ADDRESS_SUCCESS,
  NEW_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  CLEAR_ERRORS,
  ALL_ADDRESS_OF_REPORT_REQUEST,
  ALL_ADDRESS_OF_REPORT_SUCCESS,
  ALL_ADDRESS_OF_REPORTS_FAIL,
} from "../constants/addressConstants";

// Get All Address
export const getMyAddress = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ADDRESS_REQUEST });

    const { data } = await axios.get(`/api/v1/address/me`);

    dispatch({
      type: MY_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Address Detail
export const getAddressDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADDRESS_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/address/${id}`);

    dispatch({
      type: ADDRESS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Address Detail
export const getAllAddressDetails =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ADDRESS_REQUEST });

      let link = `/api/v1/admin/address?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ADDRESS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllAddressOfReport = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADDRESS_OF_REPORT_REQUEST });

    let link = `/api/v1/admin/address/of/report`;

    const { data } = await axios.get(link);

    dispatch({ type: ALL_ADDRESS_OF_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ADDRESS_OF_REPORTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Address
export const createAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ADDRESS_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/address/new",
      addressData,
      config
    );

    dispatch({
      type: NEW_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Address
export const deleteAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADDRESS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/address/${id}`);

    dispatch({
      type: DELETE_ADDRESS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Address
export const updateAddress = (id, addressData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/address/${id}`,
      addressData,
      config
    );

    dispatch({
      type: UPDATE_ADDRESS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
