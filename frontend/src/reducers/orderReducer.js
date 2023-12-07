import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAILR_SUCCESS,
  ORDER_DETAIL_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  CLEAR_ERRORS,
  CREATE_ORDER_RESET,
  ALL_ORDER_PEPORT_REQUEST,
  ALL_ORDER_PEPORT_SUCCESS,
  ALL_ORDER_PEPORT_FAIL,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        order: action.payload.order,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_ORDER_RESET:
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

export const myOrdersReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case MY_ORDER_FAIL:
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

export const orderDetailReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILR_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAIL_FAIL:
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

// ---------------------- Admin and Employee -----------------

export const allOrdersReducer = (
  state = {
    orders: [],
    ordersStatusProcessing: [],
    ordersStatusSuccess: [],
    ordersStatusDefective: [],
  },
  action
) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        ordersStatusProcessing: action.payload.ordersStatusProcessing,
        ordersStatusSuccess: action.payload.ordersStatusSuccess,
        ordersStatusDefective: action.payload.ordersStatusDefective,
        orderStatusProcessingCount: action.payload.orderStatusProcessingCount,
        orderStatusSuccessCount: action.payload.orderStatusSuccessCount,
        orderStatusDefectiveCount: action.payload.orderStatusDefectiveCount,
        resultPerPage: action.payload.resultPerPage,
      };

    case ALL_ORDER_FAIL:
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

export const allOrdersOfReportReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_PEPORT_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDER_PEPORT_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        orderCount: action.payload.orderCount,
      };

    case ALL_ORDER_PEPORT_FAIL:
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

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
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
