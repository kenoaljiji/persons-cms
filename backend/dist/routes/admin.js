"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = require("../controllers/adminController.js");
var _auth = require("../middleware/auth.js");
var _responseHandler = require("../middleware/response-handler.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Assuming this is authorization middleware

var router = _express.default.Router();

// Setup routes
router.route('/user').post(_auth.verifyToken, _responseHandler.canCreateUser, _adminController.register).get(_auth.verifyToken, _adminController.getUser).put(_auth.verifyToken, _adminController.updateUser);

// Route for creating users, applying role-based access control

router.route('/user/login').post(_adminController.login); // User login
router.get('/user/list', _auth.verifyToken, _adminController.getAllUsers);
router.route('/delete-multiply').delete(_auth.verifyToken, _responseHandler.authorizeDelete, _adminController.handleDeleteMultipleUsers); // User login

// Parameterized routes for user operations
router.get('/user/:id', _auth.verifyToken, _adminController.getUserByIdController);
router.put('/user/:id', _auth.verifyToken, _adminController.updateUser);
router.delete('/user/:id', _auth.verifyToken, _responseHandler.authorizeDelete, _adminController.handleDeleteUser);
// Export the router using ES6 default export
var _default = exports.default = router;