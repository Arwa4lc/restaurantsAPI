const mongoose = require("mongoose");
const Joi = require("joi");
const mongooseAutoIncrement = require("mongoose-auto-increment");

mongooseAutoIncrement.initialize(mongoose.connection);

const citySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

function bodyValidation(city) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(city);
}

citySchema.set("toJSON", {
  virtuals: true,
  transform: function (doc) {
    return {
      id: doc.id,
      name: doc.name,
    };
  },
});

citySchema.plugin(mongooseAutoIncrement.plugin, { model: "City", startAt: 1 });
const City = mongoose.model("City", citySchema);

exports.City = City;
exports.validate = bodyValidation;
