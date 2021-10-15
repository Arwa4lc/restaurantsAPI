const router = require("express").Router();
const restaurantController = require("../controllers/restaurantController");
const isAdmin = require("../middlewares/isAdmin");
const multer = require("../middlewares/multer");

router.get("/", restaurantController.getAllRestaurants);
router.get("/search", restaurantController.search);
router.get("/nearBy", restaurantController.nearest);
router.get("/statistics", restaurantController.statistics);
router.get("/:id", restaurantController.getRestaurant);

router.use(isAdmin);
router.use(multer);

router.post("/cities/:cityId", restaurantController.addRestaurant);
router.put("/:id", restaurantController.editRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;

/***
 * @swagger
 * /restaurants:
 *  get:
 *   summary: get all restaurants
 *   description: get all restaurants
 *   responses:
 *      200:
 *        description: success
 *
 * /restaurants/search:
 *  get:
 *   summary: search for restaurants by their names
 *   description: search for restaurants by their names
 *   parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: the name of the restaurant to search for
 *   responses:
 *      200:
 *        description: success
 *      400:
 *        description: no results found
 *
 * /restaurants/nearBy:
 *  get:
 *   summary: get nearest restaurants by the user location
 *   description: get nearest restaurants by the user location
 *   parameters:
 *      - in: query
 *        name: lng
 *        schema:
 *          type: number
 *        description: longitude point of the user location
 *      - in: query
 *        name: lat
 *        schema:
 *          type: number
 *        description: latitude point of the user location
 *   responses:
 *      200:
 *        description: success
 *
 * /restaurants/statistics:
 *  get:
 *   summary: get all restaurants grouped by their count in each city
 *   description: get all restaurants grouped by their count in each city
 *   responses:
 *      200:
 *        description: success
 *
 * /restaurants/{id}:
 *  get:
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
 *   summary: update specific restaurant by id
 *   description: update specific restaurant by id
 *   consumes:
 *      - multipart/form-data
 *   parameters:
 *      - in: header
 *        name: auth-token
 *        required: true
 *        schema:
 *          type: string
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
 *             lng:
 *               type: number
 *               description: restaurant longitude
 *               example: 32.2813771
 *             lat:
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
 *   summary: delete specific restaurant by id
 *   description: delete specific restaurant by id
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
 *
 * /restaurants/cities/{cityId}:
 *  post:
 *   summary: create new restaurant
 *   description: create new restaurant
 *   consumes:
 *      - multipart/form-data
 *   parameters:
 *      - in: header
 *        name: auth-token
 *        required: true
 *        schema:
 *          type: string
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
 *             lng:
 *               type: number
 *               description: restaurant longitude
 *               example: 32.2813771
 *             lat:
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
 *
 *
 */
