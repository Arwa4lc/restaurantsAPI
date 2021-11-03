require("dotenv").config();
const helmet = require("helmet");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
