const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");

module.exports = () => {
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.log("error", error.message);
    });

  // DB.connection.on("open", async (err) => {
  //   try {
  //     let user = await User.findOne({ role: "admin" });
  //     if (user) return console.log("MongoDB Connected");

  //     user = await User({
  //       name: "Arwa abdelrahem",
  //       email: process.env.USER_EMAIL,
  //       password: await bcrypt.hash(process.env.USER_PASSWORD, 12),
  //       role: "admin",
  //     }).save();
  //     console.log("Admin created");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
};
