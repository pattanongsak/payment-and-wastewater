const express = require("express");
const {
  createPayment,
  getAllPayment,
  updatePayment,
  deletePayment,
  getSinglePayment,
} = require("../controllers/payments/paymentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/payment/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPayment);

router
  .route("/payment")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee", "user"),
    getAllPayment
  );

router
  .route("/admin/payment/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePayment)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSinglePayment)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePayment);

module.exports = router;
