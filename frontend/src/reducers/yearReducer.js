import {
  ADD_YEAR_REQUEST,
  ADD_YEAR_SUCCESS,
  ADD_YEAR_FAIL,
  ADD_YEAR_RESET,
  CLEAR_ERRORS,
  GET_ALL_YEAR_REQUEST,
  GET_ALL_YEAR_SUCCESS,
  GET_ALL_YEAR_FAIL,
  GET_YEAR_DETAIL_REQUEST,
  GET_YEAR_DETAILV_SUCCESS,
  GET_YEAR_DETAIL_FAIL,
  GET_YEAR_Of_ADDRESS_DETAIL_REQUEST,
  GET_YEAR_Of_ADDRESS__SUCCESS,
  GET_YEAR_Of_ADDRESS__FAIL,
  DELETE_YEAR_REQUEST,
  DELETE_YEAR_SUCCESS,
  DELETE_YEAR_FAIL,
  DELETE_YEAR_RESET,
  GET_ORDER_Of_YEAR_REQUEST,
  GET_ORDER_Of_YEAR_SUCCESS,
  GET_ORDER_Of_YEAR_FAIL,
} from "../constants/yearConstants";

export const newYearReducer = (state = { year: {} }, action) => {
  switch (action.type) {
    case ADD_YEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_YEAR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        year: action.payload.year,
      };

    case ADD_YEAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_YEAR_RESET:
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

export const allYearsReducer = (state = { years: [] }, action) => {
  switch (action.type) {
    case GET_ALL_YEAR_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_YEAR_SUCCESS:
      return {
        loading: false,
        years: action.payload,
      };

    case GET_ALL_YEAR_FAIL:
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

export const orderYearReducer = (
  state = {
    year: {},
    ordersOfYear: [],
  },
  action
) => {
  switch (action.type) {
    case GET_ORDER_Of_YEAR_REQUEST:
      return {
        ...state,
        loading: true,
        ordersOfYear: [],
      };
    case GET_ORDER_Of_YEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        year: action.payload.year,
        ordersOfYear: action.payload.ordersOfYear,
        ordersOfYearCount: action.payload.ordersOfYearCount,
      };

    case GET_ORDER_Of_YEAR_FAIL:
      return {
        ...state,
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

export const yearDetailReducer = (
  state = {
    year: {},
    addressofyear: [],
  },
  action
) => {
  switch (action.type) {
    case GET_YEAR_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        addressofyear: [],
      };
    case GET_YEAR_DETAILV_SUCCESS:
      return {
        ...state,
        loading: false,
        year: action.payload.year,
        usersofyearcount: action.payload.usersofyearcount,
        databssuccess: action.payload.databssuccess,
        datahhsuccess: action.payload.datahhsuccess,
        databswaitbisuness: action.payload.databswaitbisuness,
        databswaithousehold: action.payload.databswaithousehold,
        householdtypecount: action.payload.householdtypecount,
        bisunestypecount: action.payload.bisunestypecount,
        subtotal: action.payload.subtotal,
        subtotalwastewaterandtrah: action.payload.subtotalwastewaterandtrah,
        subtotaltrash: action.payload.subtotaltrash,
        subtotalAnother: action.payload.subtotalAnother,
        subtotalwastewater: action.payload.subtotalwastewater,
        addressofyearcount: action.payload.addressofyearcount,
      };

    case GET_YEAR_DETAIL_FAIL:
      return {
        ...state,
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

export const yearOfAddressDetailReducer = (
  state = {
    year: {},
    addresses: {},
    showDataConfiden: [],
  },
  action
) => {
  switch (action.type) {
    case GET_YEAR_Of_ADDRESS_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        showDataConfiden: [],
      };
    case GET_YEAR_Of_ADDRESS__SUCCESS:
      return {
        ...state,
        loading: false,
        year: action.payload.year,
        addresses: action.payload.addresses,
        showDataConfiden: action.payload.showDataConfiden,
      };

    case GET_YEAR_Of_ADDRESS__FAIL:
      return {
        ...state,
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

export const yearManageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_YEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_YEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };

    case DELETE_YEAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_YEAR_RESET:
      return {
        ...state,
        isDeleted: false,
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
