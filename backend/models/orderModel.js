const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shipInfo: {
    bankname: {
      type: String,
    },
    amount: {
      type: String,
    },
    dateofpayment: {
      type: String,
    },
    timeofpayment: {
      type: String,
    },
    comment: {
      type: String,
    },
  },

  imageslip: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  ori: [
    {
      address: {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
        required: true,
      },
      identification: {
        type: String,
      },
      titlename: {
        type: String,
      },
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      paymenttype: {
        type: String,
      },
      place: {
        type: String,
      },
      province: {
        type: String,
      },
      district: {
        type: String,
      },
      subdistrict: {
        type: String,
      },
      homenumber: {
        type: String,
      },
      villageno: {
        type: String,
      },
      road: {
        type: String,
      },
      lane: {
        type: String,
      },
      zipcode: {
        type: String,
      },
      trash: {
        type: Number,
      },
      wastewater: {
        type: Number,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      selectMonth: [
        {
          _id: {
            type: mongoose.Schema.ObjectId,
            ref: "Month",
            required: true,
          },
          month: {
            type: String,
            required: true,
          },
        },
      ],
      selectYear: {
        _id: {
          type: mongoose.Schema.ObjectId,
          ref: "Year",
          required: true,
        },
        year: {
          type: String,
          required: true,
        },
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
  another: {
    type: Number,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
