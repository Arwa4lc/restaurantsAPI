require("dotenv").config();
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { User } = require("./models/userModel");
const app = require("express")();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurants API",
      version: "1.0.0",
      servers: ["http://localhost:3000/"],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          name: "authorization",
          scheme: "bearer",
          in: "header",
          bearerFormat: "Bearer",
        },
      },
    },
  },
  apis: [`${__dirname}/models/*.js`, `${__dirname}/routes/*.js`],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
