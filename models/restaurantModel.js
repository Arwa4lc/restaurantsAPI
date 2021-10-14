const mongoose = require("mongoose");
const mongooseAutoIncrement = require("mongoose-auto-increment");

mongooseAutoIncrement.initialize(mongoose.connection);

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  city: {
    type: Number,
    ref: "City",
    required: true,
  },
  location: {
    type: {
      type: String,
      default: "Point",
      required: true,
    },
    coordinates: [
      // long came 1st
      {
        type: Number,
        required: true,
      },
    ],
  },
});

restaurantSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc) {
    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      image: doc.image,
      city: doc.city,
      location: doc.location,
    };
  },
});

restaurantSchema.plugin(mongooseAutoIncrement.plugin, {
  model: "Restaurant",
  startAt: 1,
});
restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

exports.Restaurant = Restaurant;

/**
 * @swagger
 * definitions:
 *  Restaurant:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: Restaurant name
 *        example: "Melodies Restaurant"
 *      email:
 *        type: string
 *        description: Restaurant's email address
 *        example: "melodies@example.com"
 *      image:
 *        type: string
 *        description: Restaurant's image
 *      city:
 *        type: number
 *        description: city_id
 *        example: "2"
 *      location:
 *        type: object
 *        properties:
 *          type:
 *            type: string
 *            description: geospatial type
 *            example: "Point"
 *          coordinates:
 *            type: [number]
 *            description: Restaurant coordinates
 *            example: [32.2858438,30.5858442]
 */
