const express = require("express");
const router = express.Router();
const auth = require("../utils/Passport")();

const Authentication = require("../controllers/AuthenticationController");
const RoleController = require("../controllers/RolesController");
const HomeController = require("../controllers/HomeController");
const Root = require("../controllers/Root");

router.get('/', Root.all);

router.get('/v1/role',auth.authenticate(), RoleController.list);
router.post('/v1/role/',RoleController.insert);

router.head('/v1/authentication/', Authentication.auth);

router.get('/v1/user/list/',auth.authenticate(), HomeController.list);
router.post('/v1/user/', HomeController.insert);
router.get('/v1/email/:email/user/',auth.authenticate(), HomeController.findByEmail);
router.get('/v1/user_id/:id/user/',auth.authenticate(), HomeController.findById);

module.exports = router;
