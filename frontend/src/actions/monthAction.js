import axios from "axios";
import { GET_ALL_MONTH_FAIL, 
        GET_ALL_MONTH_REQUEST, 
        GET_ALL_MONTH_SUCCESS } 
from "../constants/monthConstants";

export const getAllMonths = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_MONTH_REQUEST });
  
      const { data } = await axios.get("/api/v1/all/month");
  
      dispatch({ type: GET_ALL_MONTH_SUCCESS, payload: data.months });
    } catch (error) {
      dispatch({
        type: GET_ALL_MONTH_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  