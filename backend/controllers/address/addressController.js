const Address = require("../../models/addressModel");
const moment = require("moment");
const userSchema = require("../../models/userModel");
const ErrorHander = require("../../utils/errorhander");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apifeatures");
const Month = require("../../models/month_of_installment_Model");
const Year = require("../../models/year_of_installment_Model");
const jwt = require("jsonwebtoken");

// Ctreate Address -- Admin
exports.createAddress = catchAsyncErrors(async (req, res, next) => {
  const {
    identification,
    titlename,
    firstname,
    lastname,
    phone,
    paymenttype,
    place,
    homenumber,
    lane,
    villageno,
    road,
    province,
    district,
    subdistrict,
    zipcode,
    trash,
    wastewater,
    createyear,
    Stock,
  } = req.body;

  const currentYear = moment().year(); // ดึงปีค.ศ. ปัจจุบัน
  const year = moment(createyear).isValid()
    ? moment(createyear).year()
    : currentYear;

  const addressuser = await Address.create({
    identification,
    titlename,
    firstname,
    lastname,
    phone,
    paymenttype,
    place,
    homenumber,
    lane,
    villageno,
    road,
    province,
    district,
    subdistrict,
    zipcode,
    trash,
    wastewater,
    createyear: year,
    Stock,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    addressuser,
  });
});

// Get All Address (Admin, And Employee)
exports.getAllAddress = catchAsyncErrors(async (req, res, next) => {
  const addressCount = await Address.countDocuments();
  const resultPerPage = 10;

  const apiFeature = new ApiFeatures(Address.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let alladdress = await apiFeature.query;

  res.status(200).json({
    success: true,
    alladdress,
    addressCount,
    resultPerPage,
  });
});

//Update Address -- Admin
exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
  //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
  let address = await Address.findById(req.params.id);

  if (!address) {
    return next(new ErrorHander("Address not found", 404));
  }

  address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    address,
  });
});

// Delete Address -- Admin
exports.deleteAddress = catchAsyncErrors(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    return next(new ErrorHander("Address not found", 404));
  }

  await address.remove();

  res.status(200).json({
    success: true,
    message: "Address Delete Successfully",
  });
});

// get MyAddress
exports.myAddress = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  let userID = decodedData.id;
  let user = await userSchema.findById({ _id: userID });

  const apiFeature = new ApiFeatures(
    Address.findOne({
      identification: user.identification,
    }),
    req.query
  )
    .search()
    .filter()
    .pagination(); //Feature ใช้สำหรับการค้นหาข้อมูล

  let myaddress = await apiFeature.query;

  res.status(200).json({
    success: true,
    myaddress,
  });
});

// Get Address Details
exports.getAddressDetails = catchAsyncErrors(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  const apiFeature = new ApiFeatures(
    Month.aggregate([
      {
        $lookup: {
          from: "months",
          localField: "month",
          foreignField: "identification",
          as: "monthData_doc",
        },
      },
    ]),
    req.query
  );

  let months = await apiFeature.query;

  const apiFeatures = new ApiFeatures(
    Year.aggregate([
      {
        $lookup: {
          from: "years",
          localField: "year",
          foreignField: "identification",
          as: "yearData_doc",
        },
      },
    ]),
    req.query
  );

  let years = await apiFeatures.query;

  if (!address) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    address,
    months,
    years,
  });
});

exports.allAddressOfReport = catchAsyncErrors(async (req, res) => {
  const addressOfReportApiFeature = new ApiFeatures(Address.find(), req.query);

  let alladdress = await addressOfReportApiFeature.query;

  res.status(200).json({
    success: true,
    alladdress,
  });
});
