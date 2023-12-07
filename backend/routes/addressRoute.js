const express = require("express");
const {
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  myAddress,
  getAddressDetails,
  allAddressOfReport,
} = require("../controllers/address/addressController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/address/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    createAddress
  );

router
  .route("/admin/address")
  .get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getAllAddress);

router
  .route("/admin/address/of/report")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    allAddressOfReport
  );

router
  .route("/admin/address/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "employee"), updateAddress)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "employee"),
    deleteAddress
  );

router.route("/address/me").get(isAuthenticatedUser, myAddress);

router.route("/address/:id").get(getAddressDetails);

module.exports = router;
