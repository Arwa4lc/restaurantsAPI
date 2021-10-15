const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

module.exports = async function (req, res, next) {
  let token = req.header("authorization");
  if (token) {
    if (token.startsWith("Bearer")) token = token.split(" ")[1];
  }
  if (!token) return res.status(401).json("Access denied. No token provided");

  console.log(token);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let user = await User.findById(decode._id);
    if (!user) return res.status(404).json("User Not found");

    if (user.role !== "admin")
      return res
        .status(403)
        .json("Forbidden, you don't have the access to these route");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ msg: "invalid token", error: error.message });
  }
};
