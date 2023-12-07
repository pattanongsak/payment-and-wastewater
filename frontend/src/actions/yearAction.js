import {
  ADD_YEAR_REQUEST,
  ADD_YEAR_SUCCESS,
  ADD_YEAR_FAIL,
  GET_ALL_YEAR_REQUEST,
  GET_ALL_YEAR_SUCCESS,
  GET_ALL_YEAR_FAIL,
  CLEAR_ERRORS,
  GET_YEAR_DETAIL_REQUEST,
  GET_YEAR_DETAILV_SUCCESS,
  GET_YEAR_DETAIL_FAIL,
  GET_YEAR_Of_ADDRESS_DETAIL_REQUEST,
  GET_YEAR_Of_ADDRESS__SUCCESS,
  GET_YEAR_Of_ADDRESS__FAIL,
  DELETE_YEAR_REQUEST,
  DELETE_YEAR_SUCCESS,
  DELETE_YEAR_FAIL,
  GET_ORDER_Of_YEAR_REQUEST,
  GET_ORDER_Of_YEAR_SUCCESS,
  GET_ORDER_Of_YEAR_FAIL,
} from "../constants/yearConstants";

import axios from "axios";

// Create Year
export const createYear = (yearData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_YEAR_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/year/new", yearData, config);

    dispatch({
      type: ADD_YEAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_YEAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Years
export const getAllYears = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_YEAR_REQUEST });

    const { data } = await axios.get("/api/v1/getall/year");

    dispatch({ type: GET_ALL_YEAR_SUCCESS, payload: data.years });
  } catch (error) {
    dispatch({
      type: GET_ALL_YEAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getYearDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_YEAR_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/v1/year/detail/${id}`);

    dispatch({ type: GET_YEAR_DETAILV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_YEAR_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getYearOfAddressDetails = (id, id1) => async (dispatch) => {
  try {
    dispatch({ type: GET_YEAR_Of_ADDRESS_DETAIL_REQUEST });

    const { data } = await axios.get(
      `/api/v1/year/address/detail/${id}/${id1}`
    );

    dispatch({ type: GET_YEAR_Of_ADDRESS__SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_YEAR_Of_ADDRESS__FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderOfYears =
  (id, keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ORDER_Of_YEAR_REQUEST });

      let link = `/api/v1/year/order/${id}?keyword=${keyword}&page=${currentPage}`;

      if (keyword !== "") {
        link += `&name=${keyword}`;
      }

      const { data } = await axios.get(link);

      dispatch({ type: GET_ORDER_Of_YEAR_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ORDER_Of_YEAR_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Year
export const deleteYear = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_YEAR_REQUEST });

    const { data } = await axios.delete(`/api/v1/delete/year/${id}`);

    dispatch({ type: DELETE_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_YEAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
