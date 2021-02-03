var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");

router.get('/', HomeController.list);
router.post('/v1/user/', HomeController.insert);
router.get('/v1/:email/user/', HomeController.view);

module.exports = router;