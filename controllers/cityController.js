const { City, validate } = require("../models/cityModel");
const { Restaurant } = require("../models/restaurantModel");
const factory = require("../controllers/handlerFactory");
const mongoose = require("mongoose");

exports.getAllCities = factory.getAll(City);
exports.getCity = factory.getOne(City);
exports.addCity = factory.addOne(City, validate);
exports.editCity = factory.updateOne(City);
exports.deleteCity = factory.deleteOne(City);

exports.deleteWithSession = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const city = await City.findByIdAndDelete(req.params.id).session(session);

      const restaurants = await Restaurant.deleteMany({
        city: req.params.id,
      }).session(session);

      throw new Error("Something went wrong");
      await session.commitTransaction();
    });

    session.endSession();
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// async function register() {
//   const session = await conn.startSession();

//   await session.withTransaction(async () => {
//     const user = await User.create(
//       {
//         name: "Van Helsing",
//       },
//       { session }
//     );

//     await ShippingAddress.create(
//       {
//         address: "Any Address",
//         user_id: user.id,
//       },
//       { session }
//     );

//     return user;
//   });

//   session.endSession();

//   console.log("success");
// }
