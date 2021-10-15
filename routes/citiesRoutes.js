const router = require("express").Router();
const cityController = require("../controllers/cityController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCity);

router.use(isAdmin);
router.post("/", cityController.addCity);
router.put("/:id", cityController.editCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;

/**
 * @swagger
 * /cities:
 *  get:
 *   summary: get all cities
 *   description: get all cities
 *   responses:
 *      200:
 *        description: success
 *
 *  post:
 *   summary: create new city account
 *   description: create new city account
 *   parameters:
 *      - in: header
 *        name: auth-token
 *        required: true
 *        schema:
 *          type: string
 *          format: string
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
 *
 *
 * /cities/{id}:
 *  get:
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
 *   summary: update specific city by id
 *   description: update specific city by id
 *   parameters:
 *      - in: header
 *        name: auth-token
 *        required: true
 *        schema:
 *          type: string
 *        description: User's access token.
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
 *   summary: delete specific city by id
 *   description: delete specific city by id
 *   parameters:
 *      - in: header
 *        name: auth-token
 *        required: true
 *        schema:
 *          type: string
 *        description: User's access token.
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
