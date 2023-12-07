const express = require("express");
const {
  newOrder,
  getSingOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  newOrderSuccess,
  allOrderOfReport,
} = require("../controllers/order/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/order/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee", "user"),
    newOrder
  );
router
  .route("/employee/order/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    newOrderSuccess
  );

router
  .route("/order/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee", "user"),
    getSingOrder
  );

router
  .route("/orders/me")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee", "user"),
    myOrders
  );

router
  .route("/admin/orders")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee", "user"),
    getAllOrders
  );

router
  .route("/admin/orders/report")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee", "user"),
    allOrderOfReport
  );

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "employee"), updateOrder)

module.exports = router;
