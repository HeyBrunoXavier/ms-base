const express = require("express");
const router = express.Router();
const auth = require("../utils/Passport")();

const Authentication = require("../controllers/Authentication");
const HomeController = require("../controllers/HomeController");
const Root = require("../controllers/Root");

router.get('/', Root.all);

router.head('/v1/authentication/', Authentication.auth);

router.get('/v1/list/',auth.authenticate(), HomeController.list);
router.post('/v1/user/',auth.authenticate(), HomeController.insert);
router.get('/v1/email/:email/user/',auth.authenticate(), HomeController.findByEmail);
router.get('/v1/user_id/:id/user/',auth.authenticate(), HomeController.findById);

module.exports = router;
