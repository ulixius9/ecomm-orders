require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//routers
const orderRouter = require("./route/order");

// DB CONN
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

// PORT
port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(
  bodyParser.json({
    type: "application/json",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(cors());

//ROUTERS
app.use("/api", orderRouter);

// SERVER
app.listen(port, () => console.log(`app running on ${port}`));
