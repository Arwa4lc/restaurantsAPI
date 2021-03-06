const {
  User,
  signUpValidation,
  logInValidation,
} = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { error } = signUpValidation(req.body);
    if (error) return res.status(400).json(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json("User with the same email already exits!!");

    delete req.body.role;
    req.body.password = await bcrypt.hash(req.body.password, 12);
    user = await User(req.body).save();

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { error } = logInValidation(req.body);
    if (error) return res.status(400).json(error.message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Invalid email or password");

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) return res.status(401).json("Invalid email or password");

    const token = user.generateToken();
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.makeAdmin = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { role: "admin" },
      { new: true }
    );
    if (!user) return res.status(401).json("Invalid email or password");

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
