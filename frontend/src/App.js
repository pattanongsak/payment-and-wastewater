//Import Libary
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import CSS
import "./App.css";

//Import Components
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Footer from "./components/layout/footer/Footer";

// Loader
import Webfont from "webfontloader";

//Import Screen
import Register from "./components/AdminAndEmployee/Register";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";

import Myaddress from "./components/Address/Myaddress";
import AddressDetail from "./components/Address/AddressDetail";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/Success";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";

// import Payment from "./components/Payment/Payment.js";

import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";

import ListSlipPayment from "./components/Payment/ListSlipPayment";
import UpdatePayment from "./components/Payment/UpdatePayment";
import UserDashboard from "./components/AdminAndEmployee/UserList";
import CreatePayment from "./components/Payment/CreatePayment";
import AdminDashboards from "./components/AdminAndEmployee/AdminDashboard";
import UpdateUser from "./components/AdminAndEmployee/UpdateUser";
// import AllAddress from "./components/Address/AllAddress";
import SearchAddress from "./components/Search/SearchAddress";
import SearchUsers from "./components/Search/SearchUsers";
import SearchAllusers from "./components/Search/SearchAllusers";
import CreateAddress from "./components/AdminAndEmployee/CreateAddress";
import CreateAddressNoId from "./components/AdminAndEmployee/CreateAddressNoId";
import UpdateAddress from "./components/AdminAndEmployee/UpdateAddress";
import OrderList from "./components/AdminAndEmployee/OrderList";
import OrderUserDetail from "./components/AdminAndEmployee/OrderUserDetail";
import Createyear from "./components/Payment/Createyear";
import DataDashboard from "./components/Report/DataDashboard";
import UserPaymentTrashOfHome from "./components/Report/ReportDetail/household/UserPaymentTrashOfHome";
import UserPaymentWastWTOfHome from "./components/Report/ReportDetail/household/UserPaymentWastWTOfHome";

import UserPaymentTrashOfbisuness from "./components/Report/ReportDetail/Business/UserPaymentTrashOfbisuness";
import UserPaymentWastWTOfBisuness from "./components/Report/ReportDetail/Business/UserPaymentWastWTOfBisuness";

//Store
import store from "./store";
import { loadUser } from "./actions/userAction";

//Protected Route
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ConfirmOrderSuccess from "./components/Cart/ConfirmOrderSuccess";
import UserPaymentTrashOfAll from "./components/Report/ReportDetail/UserPaymentTrashOfAll";
import UserPaymentWastWTOfAll from "./components/Report/ReportDetail/UserPaymentWastWTOfAll";
import AllAddress from "./components/Address/AllAddress";

function App() {
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        <Sidebar />
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />

          <Route path="/login" exact component={Login} />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />

          {/* ---------Address-------- */}
          <ProtectedRoute exact path="/address/me" component={Myaddress} />
          {/* <ProtectedRoute exact path="/address/:id" component={AddressDetail} /> */}
          <ProtectedRoute
            exact
            path="/address/:id/:id1"
            component={AddressDetail}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />

          {/* --------------------Shiiping and Order-------------------- */}

          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          {/* ---------Payment-------- */}
          {/* <ProtectedRoute exact path="/payment/:id" component={Payment} /> */}

          {/*--------------------------------- Admin and Employee Roue ------------------------------------- */}

          {/*--------------------------------- Employee Roue ------------------------------------- */}

          <ProtectedRoute
            isEmployee={true}
            path="/admin/user/:id"
            exact
            component={UpdateUser}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/user-dashboard"
            exact
            component={UserDashboard}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/user-dashboard/:keyword"
            exact
            component={UserDashboard}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/search/users"
            exact
            component={SearchUsers}
          />

          <ProtectedRoute
            isEmployee={true}
            path="/alladdress"
            exact
            component={AllAddress}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/alladdress/:keyword"
            component={AllAddress}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/search/address"
            exact
            component={SearchAddress}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/createaddress"
            exact
            component={CreateAddressNoId}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/createaddress/:id"
            exact
            component={CreateAddress}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/update/address/:id"
            exact
            component={UpdateAddress}
          />

          <ProtectedRoute
            isEmployee={true}
            path="/allorder"
            exact
            component={OrderList}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/allorder/:id"
            exact
            component={OrderList}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/allorder/:id/:keyword"
            exact
            component={OrderList}
          />

          <ProtectedRoute
            isEmployee={true}
            path="/order/detail/:id"
            exact
            component={OrderUserDetail}
          />
          <ProtectedRoute
            exact
            path="/employee/order/confirm"
            component={ConfirmOrderSuccess}
          />

          <ProtectedRoute
            isEmployee={true}
            path="/register"
            exact
            component={Register}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/datauser-dashboards"
            exact
            component={DataDashboard}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/datauser-dashboards/fillter/:id"
            exact
            component={DataDashboard}
          />

          <ProtectedRoute
            isEmployee={true}
            path="/user/payment/trash/home/:id"
            exact
            component={UserPaymentTrashOfHome}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/user/payment/wastwater/home/:id"
            exact
            component={UserPaymentWastWTOfHome}
          />

          <ProtectedRoute
            isEmployee={true}
            path="/user/payment/trash/bisuness/:id"
            exact
            component={UserPaymentTrashOfbisuness}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/user/payment/wastwater/bisuness/:id"
            exact
            component={UserPaymentWastWTOfBisuness}
          />

          <ProtectedRoute
            isEmployee={true}
            path="/user/payment/trash/all/:id"
            exact
            component={UserPaymentTrashOfAll}
          />
          <ProtectedRoute
            isEmployee={true}
            path="/user/payment/wastewater/all/:id"
            exact
            component={UserPaymentWastWTOfAll}
          />
          {/*--------------------------------- Admin Roue ------------------------------------- */}

          <ProtectedRoute
            isAdmin={true}
            path="/admin-dashboards"
            exact
            component={AdminDashboards}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin-dashboards/:keyword"
            exact
            component={AdminDashboards}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/search/all-users"
            exact
            component={SearchAllusers}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/create/payment"
            exact
            component={CreatePayment}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/list-slip/payment"
            exact
            component={ListSlipPayment}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/update/payment/:id"
            exact
            component={UpdatePayment}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/admin/create-year"
            exact
            component={Createyear}
          />

          <ProtectedRoute
            isAdmin={true}
            path="/datauser-dashboards"
            exact
            component={DataDashboard}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/datauser-dashboards/fillter/:id"
            exact
            component={DataDashboard}
          />

          <ProtectedRoute
            isAdmin={true}
            path="/user/payment/trash/home/:id"
            exact
            component={UserPaymentTrashOfHome}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/user/payment/wastwater/home/:id"
            exact
            component={UserPaymentWastWTOfHome}
          />

          <ProtectedRoute
            isAdmin={true}
            path="/user/payment/trash/bisuness/:id"
            exact
            component={UserPaymentTrashOfbisuness}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/user/payment/wastwater/bisuness/:id"
            exact
            component={UserPaymentWastWTOfBisuness}
          />

          <ProtectedRoute
            isAdmin={true}
            path="/user/payment/trash/all/:id"
            exact
            component={UserPaymentTrashOfAll}
          />
          <ProtectedRoute
            isAdmin={true}
            path="/user/payment/wastewater/all/:id"
            exact
            component={UserPaymentWastWTOfAll}
          />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
