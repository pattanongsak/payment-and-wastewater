const Order = require("../../models/orderModel");
const Address = require("../../models/addressModel");
const ErrorHander = require("../../utils/errorhander");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../../utils/apifeatures");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, another, itemsPrice } = req.body;

  const myCloud = await cloudinary.v2.uploader.upload(req.body.imageslip, {
    folder: "slips",
    crop: "scale",
  });

  var ori = [];
  let arr = await JSON.parse(orderItems);
  let arrTwo = await JSON.parse(shippingInfo);
  for (let v of arr) {
    ori.push(v);
  }

  let shipInfo = arrTwo;
  const dataObj = {
    shipInfo,
    ori,
    another,
    itemsPrice,
    imageslip: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    paidAt: Date.now(),
    user: req.user._id,
  };
  // console.log(dataObj)
  const order = await Order.create(dataObj);

  res.status(201).json({
    success: true,
    order,
  });
});

// Create new Order Success
exports.newOrderSuccess = catchAsyncErrors(async (req, res, next) => {
  const { orderItems, another, itemsPrice } = req.body;

  var ori = [];
  let arr = await JSON.parse(orderItems);

  for (let v of arr) {
    ori.push(v);
  }

  const dataObj = {
    ori,
    another,
    itemsPrice,
    orderStatus: "success",
    paidAt: Date.now(),
    user: req.user._id,
  };
  // console.log(dataObj)
  const order = await Order.create(dataObj);

  ori.forEach(async (o) => {
    await updateStock(o.address, o.quantity);
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Signle Order
exports.getSingOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email titlename firstname lastname"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get Logged in ser Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 10;
  const orderCount = await Order.countDocuments();
  const ordersApiFeature = new ApiFeatures(
    Order.find().populate(
      "user",
      "email titlename firstname lastname identification"
    ),
    req.query
  )
    .searchorder()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let orders = await ordersApiFeature.query;

  const orderStatusProcessingCount = await Order.countDocuments({
    orderStatus: "Processing",
  });
  const ordersStatusProcessingApiFeature = new ApiFeatures(
    Order.find({ orderStatus: "Processing" }).populate(
      "user",
      "email titlename firstname lastname identification"
    ),
    req.query
  )
    .searchorder()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let ordersStatusProcessing = await ordersStatusProcessingApiFeature.query;

  const orderStatusSuccessCount = await Order.countDocuments({
    orderStatus: "success",
  });
  const ordersStatusSuccessApiFeature = new ApiFeatures(
    Order.find({ orderStatus: "success" }).populate(
      "user",
      "email titlename firstname lastname identification"
    ),
    req.query
  )
    .searchorder()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let ordersStatusSuccess = await ordersStatusSuccessApiFeature.query;

  const orderStatusDefectiveCount = await Order.countDocuments({
    orderStatus: "defective",
  });
  const ordersStatusDefectiveApiFeature = new ApiFeatures(
    Order.find({ orderStatus: "defective" }).populate(
      "user",
      "email titlename firstname lastname identification"
    ),
    req.query
  )
    .searchorder()
    .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล

  let ordersStatusDefective = await ordersStatusDefectiveApiFeature.query;

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.itemsPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    //----------- start array -----------
    ordersStatusProcessing,
    ordersStatusSuccess,
    ordersStatusDefective,
    orders,
    //----------- end array -----------
    //----------- start count -----------
    orderStatusProcessingCount,
    orderStatusSuccessCount,
    orderStatusDefectiveCount,
    orderCount,
    //----------- end count -----------
    //----------- start array -----------
    resultPerPage,
  });
});

exports.allOrderOfReport = catchAsyncErrors(async (req, res, next) => {
  const orderCount = await Order.countDocuments();

  const ordersApiFeature = new ApiFeatures(Order.find(), req.query);

  let orders = await ordersApiFeature.query;

  res.status(200).json({
    success: true,
    orders,
    orderCount,
  });
});

// update Order Status -- Employee - Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  order.ori.forEach(async (o) => {
    await updateStock(o.address, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "success") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const address = await Address.findById(id);

  address.Stock -= quantity;

  await address.save({ validateBeforeSave: false });
}

