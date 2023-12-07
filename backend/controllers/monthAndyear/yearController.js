const Year = require("../../models/year_of_installment_Model");
const AddressSchema = require("../../models/addressModel");
const UserSchema = require("../../models/userModel");
const OrderSchema = require("../../models/orderModel");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apifeatures");

// Ctreate Year -- Employee - Admin
exports.createYear = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const year = await Year.create(req.body);

  res.status(201).json({
    success: true,
    year,
  });
});

// Get All Year (Admin And Employee)
exports.getAllYear = catchAsyncErrors(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Year.find(), req.query);

  let years = await apiFeature.query;

  res.status(200).json({
    success: true,
    years,
  });
});

exports.getYearDetailsOfReport = catchAsyncErrors(async (req, res, next) => {
  const year = await Year.findById(req.params.id);

  // --------------------------------------------- User Model---------------------------------------------

  // ลูกหนี้ของแต่ละปี
  const usersofyearcount = await UserSchema.countDocuments({ role: "user" });

  // --------------------------------------------- Address Model ---------------------------------------------

  // จำนวนประเภทที่อยู่ ครั้วเรือน ของแต่ละที่อยู่ ของแต่ละปี
  const householdtypecount = await AddressSchema.countDocuments({
    paymenttype: "ครัวเรือน",
  });
  // จำนวนประเภทที่อยู่ ครั้วเรือน ของแต่ละที่อยู่ ของแต่ละปี
  const bisunestypecount = await AddressSchema.countDocuments({
    paymenttype: "กิจการ",
  });

  // จำนวนที่อยู่ทั้งหมด ของแต่ละปี
  const addressofyearcount = await AddressSchema.countDocuments();

  // จำนวนเงินทั้งหมด
  const addresses = await AddressSchema.find();

  const subtotal = addresses.reduce(
    (acc, item) => acc + item.trash * 12 + item.wastewater * 12,
    0
  );

  /* --------------------------------------------- Order Mode l--------------------------------------------- */
  /* --------------------------------------------- เริ่ม กิจการ l--------------------------------------------- */

  let databssuccess = 0;
  let databsTrash = 0;
  let databsWastWater = 0;

  let databswaitbisuness = 0;

  let databswaithousehold = 0;

  // ชำระแล้ว ของแต่ละปี
  const bissunespaymentsuccessamount = await OrderSchema.find({
    "ori.selectYear.year": year.year,
    "ori.paymenttype": "กิจการ",
    orderStatus: "success",
  });

  if (Array.isArray(bissunespaymentsuccessamount)) {
    for (const item of bissunespaymentsuccessamount) {
      for (let index in item.ori) {
        if (item.ori[index].trash) {
          databsTrash += item.itemsPrice;
        }
        if (item.ori[index].wastewater) {
          databsWastWater += item.itemsPrice;
        }
      }
    }
    databssuccess = databsTrash + databsWastWater;
  }

  // จำนวนเงินทั้งหมดกิจการ
  const addressesbisuness = await AddressSchema.find({ paymenttype: "กิจการ" });

  const subtotalsbisuness = addressesbisuness.reduce(
    (acc, item) => acc + item.trash * 12 + item.wastewater * 12,
    0
  );
  if (subtotalsbisuness == 0) {
    databswaitbisuness = 0;
  } else {
    databswaitbisuness = subtotalsbisuness - databssuccess;
  }

  /* --------------------------------------------- จบ กิจการ l--------------------------------------------- */

  /* --------------------------------------------- เริ่ม ครัวเรือน l--------------------------------------------- */

  let datahhsuccess = 0;
  let datahhTrash = 0;
  let datahhWastWater = 0;

  // ชำระแล้วครัวเรือน ของแต่ละปี
  const householdpaymentsuccessamount = await OrderSchema.find({
    "ori.selectYear.year": year.year,
    "ori.paymenttype": "ครัวเรือน",
    orderStatus: "success",
  });

  if (Array.isArray(householdpaymentsuccessamount)) {
    for (const item of householdpaymentsuccessamount) {
      for (let index in item.ori) {
        if (item.ori[index].trash) {
          datahhTrash += item.itemsPrice;
        }
        if (item.ori[index].wastewater) {
          datahhWastWater += item.itemsPrice;
        }
      }
    }
    datahhsuccess = datahhTrash + datahhWastWater;
  }

  // จำนวนเงินทั้งหมดกิจการ
  const addresseshousehold = await AddressSchema.find({
    paymenttype: "ครัวเรือน",
  });

  const subtotalshousehold = addresseshousehold.reduce(
    (acc, item) => acc + item.trash * 12 + item.wastewater * 12,
    0
  );
  if (subtotalshousehold == 0) {
    databswaithousehold = 0;
  } else {
    databswaithousehold = subtotalshousehold - datahhsuccess;
  }

  /* --------------------------------------------- จบ ครัวเรือน l--------------------------------------------- */

  const dataori = await OrderSchema.find({
    "ori.selectYear.year": year.year,
    orderStatus: "success",
  });

  // ยอด ค่าขยะ ค่าน้ำเสีย ที่ได้รับ ของเเต่ละปี

  let subtotaltrash = 0;
  let subtotalwastewater = 0;
  let subtotalwastewaterandtrah = 0;
  let subtotalAnother = 0;

  if (Array.isArray(dataori)) {
    for (const item of dataori) {
      for (let index in item.ori) {
        if (item.ori[index].trash) {
          subtotaltrash += item.itemsPrice;
        }
        if (item.ori[index].wastewater) {
          subtotalwastewater += item.itemsPrice;
        }
        if (item.another) {
          subtotalAnother += item.another;
        }
      }
    }
    subtotalwastewaterandtrah =
      subtotaltrash + subtotalwastewater + subtotalAnother;
  }

  res.status(200).json({
    success: true,
    year,
    usersofyearcount,
    databssuccess,
    datahhsuccess,
    databswaitbisuness,
    databswaithousehold,
    householdtypecount,
    bisunestypecount,
    subtotal,
    subtotalwastewaterandtrah,
    subtotaltrash,
    subtotalwastewater,
    subtotalAnother,
    addressofyearcount,
  });
});

exports.getYearAddressDetails = catchAsyncErrors(async (req, res, next) => {
  const year = await Year.findById(req.params.id1);
  const addresses = await AddressSchema.findById(req.params.id);

  const showDataConfiden = await OrderSchema.find({
    "ori.address": addresses._id,
    "ori.selectYear.year": year.year,
    $or: [
      { "ori.trash": addresses.trash },
      { "ori.wastewater": addresses.wastewater },
    ],
  });

  res.status(200).json({
    success: true,
    year,
    addresses,
    showDataConfiden,
  });
});

// Delete year -- Admin - Employee
exports.deleteYear = catchAsyncErrors(async (req, res, next) => {
  const year = await Year.findById(req.params.id);

  if (!year) {
    return next(
      new ErrorHander(`Year does not exist with Id: ${req.params.id}`)
    );
  }

  await year.remove();

  res.status(200).json({
    success: true,
    message: "Year Delete Successfully",
  });
});

// Delete year -- Admin - Employee
exports.orderOfYear = catchAsyncErrors(async (req, res, next) => {
  const year = await Year.findById(req.params.id);

  const resultPerPage = 10;
  const ordersOfYearCount = await OrderSchema.countDocuments({
    "ori.selectYear.year": year.year,
  });
  const ordersApiFeature = new ApiFeatures(
    OrderSchema.find({ "ori.selectYear.year": year.year }).populate(
      "user",
      "email titlename firstname lastname identification"
    ),
    req.query
  )
    .searchorder()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let ordersOfYear = await ordersApiFeature.query;

  res.status(200).json({
    success: true,
    year,
    ordersOfYear,
    ordersOfYearCount,
    resultPerPage,
  });
});
