const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bankname: {
    type: String,
  },
  bankbranch: {
    type: String,
  },
  accountbankname: {
    type: String,
  },
  banknumber: {
    type: String,
  },
  imageqrcode:  {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
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

module.exports = mongoose.model("Payment", paymentSchema);
