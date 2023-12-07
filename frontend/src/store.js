import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  registerReducer,
  userDetailReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  addressDetailsReducer,
  myaddressReducer,
  allAddressReducer,
  newAddressReducer,
  addressReducer,
  allAddressOrReportReducer,
} from "./reducers/addressReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersOfReportReducer,
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailReducer,
  orderReducer,
} from "./reducers/orderReducer";
import {
  allPaymentReducer,
  newPaymentReducer,
  paymentDetailsReducer,
  paymentReducer,
} from "./reducers/paymentReducer";
import {
  allYearsReducer,
  newYearReducer,
  orderYearReducer,
  yearDetailReducer,
  yearManageReducer,
  yearOfAddressDetailReducer,
} from "./reducers/yearReducer";
import { allMonthReducer } from "./reducers/monthReducer";

const reducer = combineReducers({
  user: userReducer,
  registermodule: registerReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  myaddress: myaddressReducer,
  addressDetail: addressDetailsReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailReducer,
  allAddress: allAddressReducer,
  allAddressOfReport: allAddressOrReportReducer,
  newAddress: newAddressReducer,
  address: addressReducer,
  allOrders: allOrdersReducer,
  allOrdersOfReport: allOrdersOfReportReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailReducer,
  newPayment: newPaymentReducer,
  allPayment: allPaymentReducer,
  paymentDetail: paymentDetailsReducer,
  payment: paymentReducer,
  addYear: newYearReducer,
  allYear: allYearsReducer,
  allmonth: allMonthReducer,
  getyeardetail: yearDetailReducer,
  getyearofaddressdetail: yearOfAddressDetailReducer,
  getorderofyear: orderYearReducer,
  yearManage: yearManageReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
