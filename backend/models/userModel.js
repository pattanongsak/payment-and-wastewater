const mongoose = require("mongoose");
const validator = require("validator");

//library hash รหัส
const bcrypt = require("bcryptjs");

//library JWT
const jwt = require("jsonwebtoken");

//library Resset Password
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  identification: {
    type: String,
    required: [true, "กรุณากรอก เลขบัตรประจำตัวประชาชน"],
    trim: true,
    unique: true,
    maxLength: [13, "กรุณากรอก เลขบัตรประจำตัวประชาชนให้ครบ 13 หลัก"],
    minLength: [13, "กรุณากรอก เลขบัตรประจำตัวประชาชนให้ครบ 13 หลัก"],
  },
  titlename: {
    type: String,
    required: [true, "กรุณากรอก คำนำหน้าชื่อ"],
  },
  firstname: {
    type: String,
    required: [true, "กรุณากรอก ชื่อจริง"],
    maxLength: [30, "กรุณากรอก ชื่อจริง ไม่เกิน 30 ตัวอักษร"],
    minLength: [2, "กรุณากรอก ชื่อจริง ไม่น้อยกว่า 2 ตัวอักษร"],
  },
  lastname: {
    type: String,
    required: [true, "กรุณากรอก นามสกุล"],
    maxLength: [30, "กรุณากรอก นามสกุล ไม่เกิน 30 ตัวอักษร"],
    minLength: [4, "กรุณากรอก นามสกุล ไม่เกิน 4 ตัวอักษร"],
  },
  phone: {
    type: String,
    required: [true, "กรุณากรอก เบอร์โทรศัพท์"],
    maxLength: [10, "กรุณากรอก เบอร์โทรศัพท์ ไม่เกิน 10 ตัวอักษร"],
    minLength: [10, "กรุณากรอก เบอร์โทรศัพท์ ไม่น้อยกว่า 10 ตัวอักษร"],
  },
  jobtitle: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "กรุณากรอก อีเมล์"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "กรุณากรอก พาสเวิร์ด"],
    minLength: [8, "กรุณากรอก พาสเวิร์ด ไม่น้อยกว่า 8 ตัวอักษร"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
  },
  createyear: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
