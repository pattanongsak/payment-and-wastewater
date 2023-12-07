import {
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAIL,
  ADD_PAYMENT_RESET,
  ALL_PAYMENT_REQUEST,
  ALL_PAYMENT_SUCCESS,
  ALL_PAYMENT_FAIL,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_RESET,
  UPDATE_PAYMENT_FAIL,
  PAYMEN_DETAILS_REQUEST,
  PAYMEN_DETAILS_SUCCESS,
  PAYMEN_DETAILS_FAIL,
  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAIL,
  DELETE_PAYMENT_RESET,
  CLEAR_ERRORS,
} from "../constants/paymentConstant";

export const newPaymentReducer = (state = { payment: {} }, action) => {
  switch (action.type) {
    case ADD_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_PAYMENT_SUCCESS:
      return {
        loading: false,
        payment: action.payload,
        success: action.payload.success,
      };

    case ADD_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADD_PAYMENT_RESET:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allPaymentReducer = (state = { allpayments: [] }, action) => {
  switch (action.type) {
    case ALL_PAYMENT_REQUEST:
      return {
        loading: true,
        allpayments: [],
      };

    case ALL_PAYMENT_SUCCESS:
      return {
        loading: false,
        allpayments: action.payload.allpayments,
      };

    case ALL_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const paymentDetailsReducer = (state = { paymented: {} }, action) => {
  switch (action.type) {
    case PAYMEN_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PAYMEN_DETAILS_SUCCESS:
      return {
        loading: false,
        paymented: action.payload.paymented,
      };

    case PAYMEN_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PAYMENT_REQUEST:
    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PAYMENT_FAIL:
    case UPDATE_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PAYMENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PAYMENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
