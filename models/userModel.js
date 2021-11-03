const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongooseAutoIncrement = require("mongoose-auto-increment");

mongooseAutoIncrement.initialize(mongoose.connection);

const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
const passwordError = new Error(
  "Password must contain at least 1 lowercase alphabetical character, 1 numeric character, 1 special character & 6 characters or longer"
);

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
    default: "user",
    enum: ["admin", "user"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc) {
    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      role: doc.role,
    };
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY
  );
};

function signUp(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .error(new Error("Please enter a valid email."))
      .required(),
    password: Joi.string().regex(regex).error(passwordError).required(),
    role: Joi.string().required(),
  });

  return schema.validate(user);
}

function logIn(user) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .error(new Error("Please enter a valid email."))
      .required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

userSchema.plugin(mongooseAutoIncrement.plugin, { model: "User", startAt: 1 });

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.signUpValidation = signUp;
exports.logInValidation = logIn;

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *        name:
 *          type: string
 *          example: "Arwa Abdelrahem"
 *        email:
 *          type: string
 *          description: user's email address
 *          example: "arwaabdelrahem@example.com"
 *        password:
 *          type: string
 *          description: user's password
 *          example: "s3dhu#mwfx$vgu8"
 *        role:
 *          type: string
 *          description: user's role
 *          example: "admin"
 */
