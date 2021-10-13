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
