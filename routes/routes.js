const express = require("express");
const router = express.Router();
const AuthMiddleware = require('../Middleware/Auth');
//const auth = require("../utils/Passport")();

const AuthenticationController = require("../controllers/AuthenticationController");
const DoctorController = require("../controllers/DoctorController");
const PeopleController = require("../controllers/PeopleController");
const Root = require("../controllers/Root");

router.get('/', Root.all);

router.head('/v1/authentication/', AuthenticationController.auth);
router.post('/v1/logout/',AuthMiddleware.Auth, AuthenticationController.logout);
router.post('/v1/doctor/',DoctorController.insert);
router.get('/v1/doctor/',DoctorController.list);


/**
 * People
 */
router.get('/v1/people/',PeopleController.list);
router.post('/v1/people/',PeopleController.insert);
router.get('/v1/people/:id',PeopleController.view);
router.put('/v1/people/:id',PeopleController.update);
router.delete('/v1/people/:id',PeopleController.delete);


module.exports = router;
