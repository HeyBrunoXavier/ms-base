var express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var Root = require("../controllers/Root");

router.get('/', Root.all);
router.get('/v1/list/', HomeController.list);
router.post('/v1/user/', HomeController.insert);
router.get('/v1/email/:email/user/', HomeController.findByEmail);
router.get('/v1/user_id/:id/user/', HomeController.findById);
router.head('/v1/authentication/', AuthenticationController.auth);

module.exports = router;