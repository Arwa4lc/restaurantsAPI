const { Restaurant } = require("../models/restaurantModel");
const factory = require("../controllers/handlerFactory");

exports.nearest = async (req, res, next) => {
  try {
    let restaurant = await Restaurant.find({
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [req.query.lng, req.query.lat],
          },
        },
      },
    });

    res.status(200).send(restaurant);
  } catch (error) {
    next(error);
  }
};

exports.statistics = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.aggregate([
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: "$city" },
      {
        $group: {
          _id: "$city.name",
          Restaurants: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    let restaurant;
    if (req.query.name) {
      const text = `^${req.query.name}`;
      const Regex = new RegExp(text);
      restaurant = await Restaurant.find({
        name: req.query.name == "" ? /^$|/ : Regex,
      });
    }
    if (restaurant.length === 0)
      return res.status(400).send("No results found");

    res.status(200).send(restaurant);
  } catch (error) {
    next(error);
  }
};

exports.getAllRestaurants = factory.getAll(Restaurant);
exports.getRestaurant = factory.getOne(Restaurant);
exports.addRestaurant = factory.addOne(Restaurant);
exports.editRestaurant = factory.updateOne(Restaurant);
exports.deleteRestaurant = factory.deleteOne(Restaurant);
