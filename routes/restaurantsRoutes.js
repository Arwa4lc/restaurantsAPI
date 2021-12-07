const router = require("express").Router();
const restaurantController = require("../controllers/restaurantController");
const isAdmin = require("../middlewares/isAdmin");
const multer = require("../middlewares/multer");

router.get("/", restaurantController.getRestaurants);
router.get("/statistics", restaurantController.statistics);
router.get("/:id", restaurantController.getRestaurant);

router.use(isAdmin);
router.use(multer);

router.post("/", restaurantController.addRestaurant);
router.patch("/:id", restaurantController.editRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;

/***
 * @swagger
 * /restaurants:
 *  get:
 *   tags:
 *     - Restaurant
 *   summary: get all restaurants
 *   description: get all restaurants
 *   parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: the name of the restaurant to search for
 *        example: "euphoria"
 *      - in: query
 *        name: longitude
 *        schema:
 *          type: number
 *        description: longitude point of the user location
 *        example: 32.298118
 *      - in: query
 *        name: latitude
 *        schema:
 *          type: number
 *        description: latitude point of the user location
 *        example: 30.611837
 *   responses:
 *      200:
 *        description: success
 *  post:
 *   tags:
 *     - Restaurant
 *   summary: create new restaurant
 *   description: create new restaurant
 *   security:
 *      - bearerAuth: []
 *   consumes:
 *      - multipart/form-data
 *   parameters:
 *      - in: path
 *        name: cityId
 *        required: true
 *        schema:
 *          type: integer
 *        description: city id
 *   requestBody:
 *    content:
 *      multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: restaurant name
 *               example: "melodies"
 *             email:
 *               type: string
 *               description: restaurant email
 *               example: "melodies@gmail.com"
 *             image:
 *               type: file
 *               description: restaurant image
 *             longitude:
 *               type: number
 *               description: restaurant longitude
 *               example: 32.2813771
 *             latitude:
 *               type: number
 *               description: restaurant latitude
 *               example: 31.2674729
 *   responses:
 *      201:
 *        description: new Restaurant created successfully
 *      400:
 *        description: failure in creating new Restaurant "invalid request body"
 *      401:
 *        description: unauthorized access, user token must be provided
 *      403:
 *        description: forbidden "only admins can add restaurant"

 * /restaurants/statistics:
 *  get:
 *   tags:
 *     - Restaurant
 *   summary: get all restaurants grouped by their count in each city
 *   description: get all restaurants grouped by their count in each city
 *   responses:
 *      200:
 *        description: success
 *
 * /restaurants/{id}:
 *  get:
 *   tags:
 *     - Restaurant
 *   summary: get specific restaurant by id
 *   description: get specific restaurant by id
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the restaurant to get
 *   responses:
 *      200:
 *        description: success
 *      404:
 *        description: restaurant not found
 *
 *  put:
 *   tags:
 *     - Restaurant
 *   summary: update specific restaurant by id
 *   description: update specific restaurant by id
 *   security:
 *      - bearerAuth: []
 *   consumes:
 *      - multipart/form-data
 *   parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: Restaurant id
 *   requestBody:
 *    content:
 *      multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: restaurant name
 *               example: "melodies"
 *             email:
 *               type: string
 *               description: restaurant email
 *               example: "melodies@gmail.com"
 *             image:
 *               type: file
 *               description: restaurant image
 *             longitude:
 *               type: number
 *               description: restaurant longitude
 *               example: 32.2813771
 *             latitude:
 *               type: number
 *               description: restaurant latitude
 *               example: 31.2674729
 *   responses:
 *      200:
 *        description: Restaurant updated successfully
 *      404:
 *        description: Restaurant with the given ID not found
 *      401:
 *        description: unauthorized access, user token must be provided
 *      403:
 *        description: forbidden "only admins can update restaurant"
 *
 *  delete:
 *   tags:
 *     - Restaurant
 *   summary: delete specific restaurant by id
 *   description: delete specific restaurant by id
 *   security:
 *      - bearerAuth: []
 *   parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the restaurant to delete
 *   responses:
 *      204:
 *        description: no content
 *      401:
 *        description: Unauthorized "no token provided"
 *      403:
 *        description: forbidden "only admins can delete restaurant"
 *      404:
 *        description: restaurant not found
 *

 */
