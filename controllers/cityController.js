const { City, validate } = require("../models/cityModel");
const factory = require("../controllers/handlerFactory");

exports.getAllCities = factory.getAll(City);
exports.getCity = factory.getOne(City);
exports.addCity = factory.addOne(City, validate);
exports.editCity = factory.updateOne(City);
exports.deleteCity = factory.deleteOne(City);
