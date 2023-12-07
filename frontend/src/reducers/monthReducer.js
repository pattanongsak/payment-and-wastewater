import {
  CLEAR_ERRORS,
  GET_ALL_MONTH_FAIL,
  GET_ALL_MONTH_REQUEST,
  GET_ALL_MONTH_SUCCESS,
} from "../constants/monthConstants";

export const allMonthReducer = (state = { months: [] }, action) => {
  switch (action.type) {
    case GET_ALL_MONTH_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_MONTH_SUCCESS:
      return {
        loading: false,
        months: action.payload,
      };

    case GET_ALL_MONTH_FAIL:
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
