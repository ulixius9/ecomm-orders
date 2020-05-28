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
var status = "DB DISCONNECTED";
var error = "NONE";
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => (status = "DB CONNECTED"))
  .catch((err) => (error = err));

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

//Home Page
var s = status + " " + port + "\n" + error;
app.get("/", (req, res) => {
  res.send(s);
  res.end();
});

// SERVER
app.listen(port, () => console.log(`app running on ${port}`));
