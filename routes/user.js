const router = require("express").Router();
const userController = require("../controller/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logOut", userController.logOut);

module.exports = router;
