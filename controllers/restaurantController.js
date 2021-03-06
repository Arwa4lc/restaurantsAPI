const { Restaurant } = require("../models/restaurantModel");
const factory = require("../controllers/handlerFactory");

exports.getRestaurants = async (req, res, next) => {
  try {
    let restaurant;
    if (req.query.name) {
      const text = `^${req.query.name}`;
      const Regex = new RegExp(text);
      restaurant = await Restaurant.find({
        name: req.query.name == "" ? /^$|/ : Regex,
      });
      if (!restaurant || restaurant.length === 0)
        return res.status(400).send("No results found");

      return res.status(200).json(restaurant);
    }

    if (req.query.longitude && req.query.latitude) {
      restaurant = await Restaurant.find({
        location: {
          $near: {
            $maxDistance: 1000,
            $geometry: {
              type: "Point",
              coordinates: [req.query.longitude, req.query.latitude],
            },
          },
        },
      });
      if (!restaurant || restaurant.length === 0)
        return res.status(400).send("No results found");

      return res.status(200).json(restaurant);
    }

    if (req.query.tags) {
      let query = req.query.tags.split(",");

      restaurant = await Restaurant.aggregate([
        { $addFields: { restaurantTags: "$tags" } },
        { $unwind: "$tags" },
        { $match: { tags: { $in: query } } },
        {
          $group: {
            _id: "$name",
            email: { $first: "$email" },
            city: { $first: "$city" },
            tags: { $first: "$restaurantTags" },
            location: { $first: "$location" },
            noOfMatches: { $sum: 1 },
          },
        },
        {
          $unset: ["noOfMatches"],
        },
        { $sort: { noOfMatches: -1 } },
      ]);
      if (!restaurant || restaurant.length === 0)
        return res.status(400).send("No results found");

      return res.status(200).json(restaurant);
    }

    restaurant = await Restaurant.find({});
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

exports.getRestaurant = factory.getOne(Restaurant);
exports.addRestaurant = factory.addOne(Restaurant);
exports.editRestaurant = factory.updateOne(Restaurant);
exports.deleteRestaurant = factory.deleteOne(Restaurant);
