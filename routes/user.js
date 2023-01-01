const router = require("express").Router();
const userController = require("../controller/user");
const { auth } = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logOut", auth, userController.logOut);
router.post("/token/refresh", userController.generateNewAccessToken);

module.exports = router;
