"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.login = login;
exports.register = register;
exports.updateUser = updateUser;
var _generateToken = require("../utils/generateToken.js");
var _admin = _interopRequireDefault(require("../models/admin.js"));
var validator = _interopRequireWildcard(require("../validator/admin.js"));
var _responseHandler = require("../middleware/response-handler.js");
var _dal = require("../dal/dal.js");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function register(_x, _x2) {
  return _register.apply(this, arguments);
}
function _register() {
  _register = _asyncToGenerator(function* (req, res) {
    console.log(req, res);
    try {
      var {
        error,
        value
      } = validator.signUpSchema.validate(req.body, validator.defaults);
      if (error) {
        return (0, _responseHandler.errorHandler)(403, res, error.message);
      }
      var passwordHash = yield _bcryptjs.default.hash(value.password, 10);
      var body = _objectSpread(_objectSpread({}, value), {}, {
        password: passwordHash
      });
      var user = yield (0, _dal.create)(_admin.default, body);
      var accessToken = yield (0, _generateToken.generateToken)(user);
      var data = {
        user: user,
        token: accessToken
      };
      (0, _responseHandler.responseHandler)(data, res, 'Admin Registered Successfully!', 201);
    } catch (err) {
      console.log(err);
      (0, _responseHandler.errorHandler)(500, res, err.message);
    }
  });
  return _register.apply(this, arguments);
}
function login(_x3, _x4) {
  return _login.apply(this, arguments);
}
function _login() {
  _login = _asyncToGenerator(function* (req, res) {
    try {
      var {
        error,
        value
      } = validator.logInSchema.validate(req.body, validator.defaults);
      if (error) {
        return (0, _responseHandler.errorHandler)(403, res, error.message);
      }
      var user = yield (0, _dal.findOne)(_admin.default, {
        username: value.username
      }, {
        password: 1,
        username: 1,
        email: 1
      });
      if (!user) {
        return (0, _responseHandler.errorHandler)(404, res, 'User Not Found!');
      }
      var allGood = yield _bcryptjs.default.compare(value.password, user.password);
      if (user && allGood) {
        var accessToken = yield (0, _generateToken.generateToken)(user);
        (0, _responseHandler.responseHandler)({
          user: user,
          token: accessToken
        }, res);
      } else {
        (0, _responseHandler.errorHandler)(401, res, 'Alert! Wrong Credentials.');
      }
    } catch (err) {
      console.log(err);
      (0, _responseHandler.errorHandler)(500, res, err.message);
    }
  });
  return _login.apply(this, arguments);
}
function getUser(_x5, _x6) {
  return _getUser.apply(this, arguments);
}
function _getUser() {
  _getUser = _asyncToGenerator(function* (req, res) {
    try {
      var user = yield (0, _dal.findOne)(_admin.default, {
        _id: req.user._id
      });
      user ? (0, _responseHandler.responseHandler)(user, res) : (0, _responseHandler.errorHandler)(404, res, 'No user!');
    } catch (err) {
      console.log(err);
      (0, _responseHandler.errorHandler)(500, res, err.message);
    }
  });
  return _getUser.apply(this, arguments);
}
function updateUser(_x7, _x8) {
  return _updateUser.apply(this, arguments);
} // Assuming you have a function in your DAL or you can directly use the model
// For example, let's say you have this in your dal.js
// export async function findAll(model) {
//   return await model.find({});
// }
// Import findAll if you're using a separate DAL function
// If not, you'll use the model directly
/* export async function getAllUsers(req, res) {
  try {
    // Directly using model.find() if not using a separate DAL function
    const users = await model.find({}).select("-password"); // Exclude passwords from the response
    if (users) {
      responseHandler(users, res, "Users fetched successfully", 200);
    } else {
      errorHandler(404, res, "No users found");
    }
  } catch (err) {
    console.log(err);
    errorHandler(500, res, "An error occurred while fetching users");
  }
} */
function _updateUser() {
  _updateUser = _asyncToGenerator(function* (req, res) {
    try {
      var {
        error,
        value
      } = validator.updateSchema.validate(req.body, validator.defaults);
      if (error) {
        return (0, _responseHandler.errorHandler)(403, res, error.message);
      }
      var user = yield (0, _dal.findOneAndUpdate)(_admin.default, {
        _id: req.user._id
      }, value);
      user ? (0, _responseHandler.responseHandler)(user, res) : (0, _responseHandler.errorHandler)(404, res, 'No user!');
    } catch (err) {
      console.log(err);
      (0, _responseHandler.errorHandler)(500, res, err.message);
    }
  });
  return _updateUser.apply(this, arguments);
}
function getAllUsers(_x9, _x10) {
  return _getAllUsers.apply(this, arguments);
}
function _getAllUsers() {
  _getAllUsers = _asyncToGenerator(function* (req, res) {
    try {
      // Query to fetch users with "user" or "editor" roles
      var users = yield _admin.default.find({
        role: {
          $in: ['user', 'editor']
        }
      }).select('-password'); // Exclude passwords from the response for security

      if (users && users.length > 0) {
        (0, _responseHandler.responseHandler)(users, res, 'Users fetched successfully', 200);
      } else {
        (0, _responseHandler.errorHandler)(404, res, 'No users found');
      }
    } catch (err) {
      console.log(err);
      (0, _responseHandler.errorHandler)(500, res, 'An error occurred while fetching users');
    }
  });
  return _getAllUsers.apply(this, arguments);
}
function deleteUser(_x11, _x12) {
  return _deleteUser.apply(this, arguments);
}
function _deleteUser() {
  _deleteUser = _asyncToGenerator(function* (req, res) {
    try {
      var user = yield (0, _dal.findOneAndDelete)(_admin.default, {
        _id: req.user._id
      });
      user ? (0, _responseHandler.responseHandler)(user, res) : (0, _responseHandler.errorHandler)(404, res, 'No user!');
    } catch (err) {
      console.log(err);
      (0, _responseHandler.errorHandler)(500, res, err.message);
    }
  });
  return _deleteUser.apply(this, arguments);
}