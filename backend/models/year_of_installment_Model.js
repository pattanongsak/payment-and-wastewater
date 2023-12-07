const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "กรุณากรอก ปีการชำระค่าธรรมเนียม"],
    minLength: [4, "กรุณากรอก ปีการชำระค่าธรรมเนียม ไม่น้อยกว่า 4 ตัวอักษร"],
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

module.exports = mongoose.model("Year", yearSchema);
