const express = require("express");
const {
  createMonth,
  getAllMonth,
} = require("../controllers/monthAndyear/monthController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/month/new")
  .post(isAuthenticatedUser, authorizeRoles("admin", "employee"), createMonth);

router.route("/all/month").get(isAuthenticatedUser, getAllMonth);

module.exports = router;
