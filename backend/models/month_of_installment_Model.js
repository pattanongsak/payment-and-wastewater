const mongoose = require("mongoose");

const monthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: [true, "กรุณากรอก งวดการชำระค่าธรรมเนียม"],
    minLength: [4, "กรุณากรอก งวดการชำระค่าธรรมเนียม ไม่น้อยกว่า 4 ตัวอักษร"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Month", monthSchema);
