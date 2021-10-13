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
