const express = require("express");
const router = express.Router();
const AuthMiddleware = require('../Middleware/Auth');
const auth = require("../utils/Passport")();

const AuthenticationController = require("../controllers/AuthenticationController");
const RoleController = require("../controllers/RolesController");
const UserController = require("../controllers/UserController");
const PeopleController = require("../controllers/PeopleController");
const Root = require("../controllers/Root");

router.get('/', Root.all);

router.get('/v1/people/',AuthMiddleware.Auth,PeopleController.list);
router.post('/v1/people/',PeopleController.insert);

router.get('/v1/role/',AuthMiddleware.Auth, RoleController.list);
router.post('/v1/role/',RoleController.insert);

router.head('/v1/authentication/', AuthenticationController.auth);
router.post('/v1/logout/',AuthMiddleware.Auth, AuthenticationController.logout);

router.get('/v1/user/list/',AuthMiddleware.Auth, UserController.list);
router.post('/v1/user/', UserController.insert);
router.get('/v1/email/:email/user/',AuthMiddleware.Auth, UserController.findByEmail);
router.get('/v1/user_id/:id/user/',AuthMiddleware.Auth, UserController.findById);

module.exports = router;
