const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.logIn);

module.exports = router;

/**
 * @swagger
 * /users/auth/register:
 *  post:
 *   tags:
 *     - Auth
 *   summary: create new user account
 *   description: create new user account
 *   requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: "#definitions/User"
 *   responses:
 *      201:
 *        description: new user created successfully
 *      400:
 *        description: failure in creating new user "invalid request body"
 *
 * /users/auth/login:
 *  post:
 *   tags:
 *     - Auth
 *   summary: user login
 *   description: user login
 *   requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: user's email address
 *                     example: "example@example.com"
 *                   password:
 *                      type: string
 *                      description: user's password
 *                      example: "s3dhu#mwfx$vgu8"
 *   responses:
 *      201:
 *        description: logged in successfully
 *      400,401,404:
 *        description: invalid email or password
 */
