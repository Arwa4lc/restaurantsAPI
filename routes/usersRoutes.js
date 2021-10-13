const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.logIn);

module.exports = router;
