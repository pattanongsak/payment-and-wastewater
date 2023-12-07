const Month = require("../../models/month_of_installment_Model");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apifeatures");

// Ctreate Month -- Employee - Admin
exports.createMonth = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const month = await Month.create(req.body);

  res.status(201).json({
    success: true,
    month,
  });
});

// // Get All Month (Admin And Employee)
exports.getAllMonth = catchAsyncErrors(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Month.find(), req.query);

  let months = await apiFeature.query;

  res.status(200).json({
    success: true,
    months,
  });
});
