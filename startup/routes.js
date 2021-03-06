const express = require("express");
const cors = require("cors");
const users = require("../routes/usersRoutes");
const cities = require("../routes/citiesRoutes");
const Restaurants = require("../routes/restaurantsRoutes");
const { errorHandler, serverErrorHandler } = require("../middlewares/error");

module.exports = function (app) {
  app.use("uploads", express.static("uploads"));
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/auth", users);
  app.use("/city", cities);
  app.use("/restaurant", Restaurants);
  app.use(errorHandler);
  app.use(serverErrorHandler);
};
// heroku git:remote -a restaurantsAPI
