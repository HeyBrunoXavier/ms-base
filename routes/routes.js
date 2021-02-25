const express = require("express");
const router = express.Router();
const auth = require("../utils/Passport")();

const Authentication = require("../controllers/AuthenticationController");
const RoleController = require("../controllers/RolesController");
const UserController = require("../controllers/UserController");
const PeopleController = require("../controllers/PeopleController");
const Root = require("../controllers/Root");

router.get('/', Root.all);

router.get('/v1/people/',PeopleController.list);
router.post('/v1/people/',PeopleController.insert);

router.get('/v1/role/',auth.authenticate(), RoleController.list);
router.post('/v1/role/',RoleController.insert);

router.head('/v1/authentication/', Authentication.auth);

router.get('/v1/user/list/',auth.authenticate(), UserController.list);
router.post('/v1/user/', UserController.insert);
router.get('/v1/email/:email/user/',auth.authenticate(), UserController.findByEmail);
router.get('/v1/user_id/:id/user/',auth.authenticate(), UserController.findById);

module.exports = router;
