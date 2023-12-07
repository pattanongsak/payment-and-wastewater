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
  NEW_ADDRESS_RESET,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_RESET,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_RESET,
  CLEAR_ERRORS,
  ALL_ADDRESS_OF_REPORT_REQUEST,
  ALL_ADDRESS_OF_REPORT_SUCCESS,
  ALL_ADDRESS_OF_REPORTS_FAIL,
} from "../constants/addressConstants";

export const myaddressReducer = (state = { myaddress: [] }, action) => {
  switch (action.type) {
    case MY_ADDRESS_REQUEST:
      return {
        loading: true,
        myaddress: [],
      };

    case MY_ADDRESS_SUCCESS:
      return {
        loading: false,
        myaddress: action.payload.myaddress,
      };

    case MY_ADDRESS_FAIL:
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

export const addressDetailsReducer = (
  state = { address: {}, months: [], years: [] },
  action
) => {
  switch (action.type) {
    case ADDRESS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ADDRESS_DETAILS_SUCCESS:
      return {
        loading: false,
        address: action.payload.address,
        months: action.payload.months,
        years: action.payload.years,
      };

    case ADDRESS_DETAILS_FAIL:
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

export const allAddressReducer = (state = { alladdress: [] }, action) => {
  switch (action.type) {
    case ALL_ADDRESS_REQUEST:
      return {
        loading: true,
        alladdress: [],
      };

    case ALL_ADDRESS_SUCCESS:
      return {
        loading: false,
        alladdress: action.payload.alladdress,
        addressCount: action.payload.addressCount,
        resultPerPage: action.payload.resultPerPage,
      };

    case ALL_ADDRESS_FAIL:
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

export const newAddressReducer = (state = { addressuser: {} }, action) => {
  switch (action.type) {
    case NEW_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ADDRESS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        addressuser: action.payload.addressuser,
      };

    case NEW_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_ADDRESS_RESET:
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

export const addressReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ADDRESS_FAIL:
    case UPDATE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ADDRESS_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_ADDRESS_RESET:
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

export const allAddressOrReportReducer = (
  state = { alladdress: [] },
  action
) => {
  switch (action.type) {
    case ALL_ADDRESS_OF_REPORT_REQUEST:
      return {
        loading: true,
        alladdress: [],
      };

    case ALL_ADDRESS_OF_REPORT_SUCCESS:
      return {
        loading: false,
        alladdress: action.payload.alladdress,
      };

    case ALL_ADDRESS_OF_REPORTS_FAIL:
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
