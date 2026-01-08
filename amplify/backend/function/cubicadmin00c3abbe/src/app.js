const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { connectDB } = require("./database/connect.database");
const router = require("./router/router");
const cors = require("cors");
const queryString = require("query-string");
const axios = require("axios");
require("dotenv").config();

// declare a new express app
const app = express();
app.use(cors({ origin: "*" }));
app.use(
  express.json({
    limit: "50mb",
  }),
);
app.use(express.urlencoded());

if (process?.env?.NODE_ENV === "production") {
  app.use(awsServerlessExpressMiddleware.eventContext());
}

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(async (req, res, next) => {
  const defaultQuery = {
    limit: 100,
    skip: 0,
    sort: {},
    filter: {},
    select: "",
    populate: [],
    ...req?.query,
  };

  req.query = defaultQuery;
  next();
});

app.use("/api", router);
app.use((err, req, res, next) => {
  try {
    console.log("ERROR", err);
    axios({
      method: "post",
      url: "https://notify-api.line.me/api/notify",
      headers: {
        Authorization:
          "Bearer " + "IuJHNTYH0gOVjANgCBT3MltAKTL0MO4OepCGHp8tECL",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      data: queryString.stringify({
        message: err?.message,
      }),
    });
    res.status(500).json({
      message: err?.message,
      status: 500,
    });
  } catch (error) {
    console.log("middleware error", error);
  }
});
connectDB();
app.listen(1337, function () {
  console.log("App started");
});
module.exports = app;
