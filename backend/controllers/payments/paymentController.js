const Payment = require("../../models/paymentModel");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apifeatures");
const ErrorHander = require("../../utils/errorhander");
const cloudinary = require("cloudinary");

// Ctreate Payment -- Admin
exports.createPayment = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.imageqrcode, {
    folder: "payments",
    crop: "scale",
  });

  const { bankname, bankbranch, accountbankname, banknumber } = req.body;

  const payment = await Payment.create({
    bankname,
    bankbranch,
    accountbankname,
    banknumber,
    imageqrcode: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    payment,
  });
});

// Get All Payment
exports.getAllPayment = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const paymentsCount = await Payment.countDocuments();

  const apiFeature = new ApiFeatures(Payment.find(), req.query)
    .filter()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let allpayments = await apiFeature.query;

  // apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    allpayments,
    paymentsCount,
    resultPerPage,
  });
});

// Get Single Payment (Admin)
exports.getSinglePayment = catchAsyncErrors(async (req, res, next) => {
  const paymented = await Payment.findById(req.params.id);

  if (!paymented) {
    return next(
      new ErrorHander(`Payment does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    paymented,
  });
});

// Update User Profile
exports.updatePayment = catchAsyncErrors(async (req, res, next) => {
  const newPayemtData = {
    bankname: req.body.bankname,
    bankbranch: req.body.bankbranch,
    accountbankname: req.body.accountbankname,
    banknumber: req.body.banknumber,
  };

  if (req.body.imageqrcode !== "undefined") {
    const paymentsData = await Payment.findById(req.params.id);

    const imageId = paymentsData.imageqrcode.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.imageqrcode, {
      folder: "payments",
      crop: "scale",
    });

    newPayemtData.imageqrcode = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const payment = await Payment.findByIdAndUpdate(
    req.params.id,
    newPayemtData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    payment,
  });
});

// Delete Payment -- Admin
exports.deletePayment = catchAsyncErrors(async (req, res, next) => {
  //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
  const payment = await Payment.findById(req.params.id);

  const imageId = payment.imageqrcode.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  if (!payment) {
    return next(new ErrorHander("Payment not found", 404));
  }

  await payment.remove();

  res.status(200).json({
    success: true,
    message: "Payment Delete Successfully",
  });
});
