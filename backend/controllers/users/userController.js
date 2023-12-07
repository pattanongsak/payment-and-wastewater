const ErrorHander = require("../../utils/errorhander");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("../../models/userModel");
const sendToken = require("../../utils/jwtToken");
const ApiFeatures = require("../../utils/apifeatures");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const moment = require("moment");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    crop: "scale",
  });

  const {
    titlename,
    firstname,
    lastname,
    identification,
    phone,
    jobtitle,
    createyear,
    email,
    password,
    role,
  } = req.body;

  const currentYear = moment().year(); // ดึงปีค.ศ. ปัจจุบัน
  const year = moment(createyear).isValid()
    ? moment(createyear).year()
    : currentYear;

  const user = await User.create({
    identification,
    titlename,
    firstname,
    lastname,
    phone,
    jobtitle,
    email,
    password,
    createyear: year,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    role,
  });

  // sendToken(user, 201, res);
  res.status(200).json({
    success: true,
    message: "adduser success",
    user,
  });
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("โปรดกรอก อีเมล และ พาสเวิร์ด", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("ไม่พบบัญชีผู้ใช้", 401));
  }

  if (user.role === "revoke") {
    return next(new ErrorHander("บัญชีถูกระงับการใข้งาน", 401));
  }

  if (user.role === "temporarily") {
    return next(new ErrorHander("ไม่สามารถเข้าสู่ระบบได้ชั่วคราว", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("บัญชีถูกระงับการใข้งาน", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "ออกจากระบบสำเร็จ",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  const { email, identification } = req.body;

  if (!user) {
    return next(new ErrorHander("ไม้พบบัญชีผู้ใช้", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `เทศบาลตำบลสันผักหวาน ทำการส่ง URL สำหรับการเปลี่ยนรหัวผ่านในกรณี(ผู้ใช้ลืมรหัสผ่าน) :- \n\n ${resetPasswordUrl} \n\n หากคุณยังไม่ได้ขออีเมลนี้ โปรดเพิกเฉย.`;

  try {
    const users = await User.findOne({ email });

    if (users.identification !== identification) {
      return res.status(400).json({ message: "เลขบัตร ปชช ไม่ตรงกับ email" });
    }

    await sendEmail({
      email: user.email,
      subject: `Payment And Wastewater Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `ทำการส่งข้อความไปยังอีเมล ${user.email} สำเร็จ`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "ไม่พบบัญชีผู้ใช้",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("พาสเวิร์ดไม่ตรงกัน", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    identification: req.body.identification,
    titlename: req.body.titlename,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    jobtitle: req.body.jobtitle,
    email: req.body.email,
  };

  if (req.body.avatar !== "undefined") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// ---------------------------------- START Updateuser And ResetPassword --------------------------------------------------

// Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    identification: req.body.identification,
    titlename: req.body.titlename,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    jobtitle: req.body.jobtitle,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander("ไม่พบบัญชีผู้ใช้", 404));
  }

  // Check if a new password is provided and if it matches confirmPassword
  if (req.body.password) {
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("พาสเวิร์ดไม่ตรงกัน", 400));
    }
    // If the new password is provided, update the user's password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  }

  // Update other user fields
  user.identification = newUserData.identification;
  user.titlename = newUserData.titlename;
  user.firstname = newUserData.firstname;
  user.lastname = newUserData.lastname;
  user.phone = newUserData.phone;
  user.jobtitle = newUserData.jobtitle;
  user.email = newUserData.email;
  user.role = newUserData.role;

  await user.save();

  res.status(200).json({
    success: true,
  });
});

exports.updateloginRoleUserOn = catchAsyncErrors(async (req, res, next) => {
  // Find all users with role "user"
  const users = await User.find({ role: "user" });

  // Update the role to "temporarily" for all found users
  for (const user of users) {
    user.role = "temporarily";
    await user.save(); // Save the updated user to the database
  }

  res.status(200).json({
    success: true,
    message: "แก้ไขข้อมูลสำเร็จ",
  });
});

exports.updateloginRoleUserOff = catchAsyncErrors(async (req, res, next) => {
  // Find all users with role "user"
  const users = await User.find({ role: "temporarily" });

  // Update the role to "temporarily" for all found users
  for (const user of users) {
    user.role = "user";
    await user.save(); // Save the updated user to the database
  }

  res.status(200).json({
    success: true,
    message: "แก้ไขข้อมูลสำเร็จ",
  });
});

// ---------------------------------- END Updateuser And ResetPassword --------------------------------------------------

// Update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password isincorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Delete User -- Admin - Employee
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "ลบบัญชีผู้ใช้สำเร็จ",
  });
});

/*------------------------------------------------------------------------------------------------------------------------------- */

// Get All users (Admin, And Employee)
exports.getAlluser = catchAsyncErrors(async (req, res, next) => {
  // const users = await User.find();
  const usersCount = await User.countDocuments();
  const resultPerPage = 10;

  const apiFeature = new ApiFeatures(User.find(), req.query)
    .search()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let users = await apiFeature.query;

  const specifiUserCount = await User.countDocuments({ role: "user" });
  const apiFeatureSpecifiUser = new ApiFeatures(
    User.find({ role: "user" }),
    req.query
  )
    .search()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let specifiUser = await apiFeatureSpecifiUser.query;

  const specifiEmployeeCount = await User.countDocuments({ role: "employee" });
  const apiFeatureSpecifiEmployee = new ApiFeatures(
    User.find({ role: "employee" }),
    req.query
  )
    .search()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let specifiEmployee = await apiFeatureSpecifiEmployee.query;

  const specifiemAdminCount = await User.countDocuments({ role: "admin" });
  const apiFeatureSpecifiAdmin = new ApiFeatures(
    User.find({ role: "admin" }),
    req.query
  )
    .search()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let specifiAdmin = await apiFeatureSpecifiAdmin.query;

  const specifiemRevokeCount = await User.countDocuments({ role: "revoke" });
  const apiFeatureSpecifiRevoke = new ApiFeatures(
    User.find({ role: "revoke" }),
    req.query
  )
    .search()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let specifiRevoke = await apiFeatureSpecifiRevoke.query;

  res.status(200).json({
    success: true,
    // -------------- start array -------
    specifiUser,
    specifiEmployee,
    specifiAdmin,
    specifiRevoke,
    users,
    // -------------- end array -------
    // -------------- start count -------
    specifiUserCount,
    specifiEmployeeCount,
    specifiemAdminCount,
    specifiemRevokeCount,
    usersCount,
    // -------------- end count -------
    // -------------- start resultperpage -------
    resultPerPage,
    // -------------- start resultperpage -------
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Get Single user (Admin, And Employee)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const usered = await User.findById(req.params.id);

  if (!usered) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    usered,
  });
});
