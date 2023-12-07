const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

const bodyParser = require("body-parser");

/*------------------------------------------------ */
const fileUpload = require("express-fileupload");
/*------------------------------------------------ */

app.use(express.json());
app.use(cookieParser());

/*------------------------------------------------ */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
/*------------------------------------------------ */

// Route Import
const user = require("./routes/userRoute");
const address = require("./routes/addressRoute");
const payment = require("./routes/paymentRoute");
const month = require("./routes/monthRoute");
const year = require("./routes/yearRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", user);
app.use("/api/v1", address);
app.use("/api/v1", payment);
app.use("/api/v1", month);
app.use("/api/v1", year);
app.use("/api/v1", order);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
