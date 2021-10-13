const router = require("express").Router();
const restaurantController = require("../controllers/restaurantController");
const isAdmin = require("../middlewares/isAdmin");
const multer = require("../middlewares/multer");

router.get("/", restaurantController.getAllRestaurants);
router.post("/search", restaurantController.search);

router.get("/nearBy", restaurantController.nearest);
router.get("/statistics", restaurantController.statistics);
router.get("/:id", restaurantController.getRestaurant);

router.use(isAdmin);
router.use(multer);

router.post("/cities/:cityId", restaurantController.addRestaurant);
router.put("/:id", restaurantController.editRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
