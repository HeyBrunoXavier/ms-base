var express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");

router.get('/', HomeController.list);
router.post('/v1/user/', HomeController.insert);
router.get('/v1/:email/user/', HomeController.view);
router.head('/v1/authentication/', AuthenticationController.auth);

module.exports = router;