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
 */
