const router = require("express").Router();
const cityController = require("../controllers/cityController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCity);

router.use(isAdmin);
router.post("/", cityController.addCity);
router.patch("/:id", cityController.editCity);
router.delete("/:id", cityController.deleteCity);
router.delete("/deleteWithSession/:id", cityController.deleteWithSession);

module.exports = router;

/**
 * @swagger
 * /cities:
 *  get:
 *   tags:
 *     - city
 *   summary: get all cities
 *   description: get all cities
 *   responses:
 *      200:
 *        description: success
 *
 *  post:
 *   tags:
 *     - city
 *   summary: create new city
 *   description: create new city
 *   security:
 *      - bearerAuth: []
 *   requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: "#definitions/City"
 *   responses:
 *      201:
 *        description: new city created successfully
 *      400:
 *        description: failure in creating new city "invalid request body"
 *      401:
 *        description: unauthorized access, user token must be provided
 *      403:
 *        description: forbidden "only admins can add city"
 *
 *
 * /cities/{id}:
 *  get:
 *   tags:
 *     - city
 *   summary: get specific city by id
 *   description: get specific city by id
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the city to get
 *   responses:
 *      200:
 *        description: success
 *      404:
 *        description: city not found
 *
 *  put:
 *   tags:
 *     - city
 *   summary: update specific city by id
 *   description: update specific city by id
 *   security:
 *      - bearerAuth: []
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the city to update
 *   requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: "#definitions/City"
 *   responses:
 *      200:
 *        description: success
 *      404:
 *        description: city not found
 *
 *  delete:
 *   tags:
 *     - city
 *   summary: delete specific city by id
 *   description: delete specific city by id
 *   security:
 *      - bearerAuth: []
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the city to delete
 *   responses:
 *      204:
 *        description: no content
 *      401:
 *        description: Unauthorized "no token provided"
 *      404:
 *        description: city not found
 */
