const express = require("express");
const router = express.Router();
const AuthMiddleware = require('../Middleware/Auth');
//const auth = require("../utils/Passport")();

const AuthenticationController = require("../controllers/AuthenticationController");
const DoctorController = require("../controllers/DoctorController");
const PeopleController = require("../controllers/PeopleController");
const PhysicalPeopleController = require("../controllers/PhysicalPeopleController");
const AddressController = require("../controllers/AddressController");
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


/**
 * People Physical
 */
 router.get('/v1/physical/people/',PhysicalPeopleController.list);
 router.post('/v1/physical/people/',PhysicalPeopleController.insert);
 router.get('/v1/physical/people/:id',PhysicalPeopleController.view);
 router.delete('/v1/physical/people/:id',PhysicalPeopleController.delete);


 /**
 * ADDRESS
 */
  router.get('/v1/address/',AddressController.list);
  router.post('/v1/address/',AddressController.insert);
  router.get('/v1/address/:id',AddressController.view);
  router.put('/v1/address/:id',AddressController.update);
  /*router.delete('/v1/people/:id',PeopleController.delete);*/


module.exports = router;
