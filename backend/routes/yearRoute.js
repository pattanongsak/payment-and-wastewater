const express = require("express");
const {
  createYear,
  getAllYear,
  getYearDetailsOfReport,
  getYearAddressDetails,
  deleteYear,
  orderOfYear,
} = require("../controllers/monthAndyear/yearController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/year/new")
  .post(isAuthenticatedUser, authorizeRoles("admin", "employee"), createYear);

router.route("/getall/year").get(isAuthenticatedUser, getAllYear);

router.route("/delete/year/:id").delete(isAuthenticatedUser, deleteYear);

router
  .route("/year/detail/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    getYearDetailsOfReport
  );

router
  .route("/year/order/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin", "employee"), orderOfYear);

// ID ที่1 คือ ID year -- ID ที่1 คือ ID address -- ID ที่1 คือ ID month

router
  .route("/year/address/detail/:id/:id1")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee", "user"),
    getYearAddressDetails
  );

module.exports = router;
