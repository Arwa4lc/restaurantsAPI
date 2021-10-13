require("dotenv").config();
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const { User } = require("./models/userModel");
const app = require("express")();

app.use(helmet());
require("./startup/DB")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    let user = await User.findOne({ role: "admin" });
    if (user) return console.log(`Server listening on port ${port}`);

    user = await User({
      name: "Arwa abdelrahem",
      email: process.env.USER_EMAIL,
      password: await bcrypt.hash(process.env.USER_PASSWORD, 12),
      role: "admin",
    }).save();
    console.log("Admin created");
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
