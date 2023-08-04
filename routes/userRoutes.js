const router = require("express").Router();
const usecontroller = require("./../controllers/userController");



router.get("/", usecontroller.home);
router.get("/signup", usecontroller.signup);
router.post('/signup', usecontroller.signup_post)
router.get("/login", usecontroller.login);
router.post('/login', usecontroller.login_post)


module.exports = router;
