const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAlluser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  deleteUser,
  updateUserRole,
  updateloginRoleUserOn,
  updateloginRoleUserOff,
} = require("../controllers/users/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/register")
  .post(isAuthenticatedUser, authorizeRoles("admin", "employee"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/update/login/user/on")
  .put(isAuthenticatedUser, updateloginRoleUserOn);
router
  .route("/update/login/user/off")
  .put(isAuthenticatedUser, updateloginRoleUserOff);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getAlluser);

router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin", "employee"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin", "employee"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "employee"), deleteUser);

module.exports = router;
