"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responseHandler = exports.errorHandler = exports.canCreateUser = exports.authorizeOwner = exports.authorizeEditor = exports.authorizeDelete = exports.authorizeAdmin = void 0;
var _config = _interopRequireDefault(require("../db/config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Utility to recursively convert all BigInt values in an object to strings
function bigIntToString(obj) {
  for (var key in obj) {
    if (typeof obj[key] === 'bigint') {
      // Convert BigInt to string
      obj[key] = obj[key].toString();
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      bigIntToString(obj[key]); // Recursively update nested objects
    }
  }
}
var responseHandler = exports.responseHandler = function responseHandler(res, data) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Success';
  var status = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
  bigIntToString(data); // Convert all BigInts to strings in the data object
  res.status(status).json({
    status: status,
    message: message,
    data: data
  });
};

// Define errorHandler
var errorHandler = (res, status, message) => {
  if (typeof status !== 'number') {
    console.error('Invalid status code', status); // Log for debugging
    status = 500; // Set a default status code if invalid
  }
  res.status(status).json({
    success: false,
    error: message
  });
};

// Middleware to authorize Admin
exports.errorHandler = errorHandler;
var authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    errorHandler(res, 403, 'Access denied. Admins only.');
  }
};

// Middleware to authorize Owner
exports.authorizeAdmin = authorizeAdmin;
var authorizeOwner = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    errorHandler(res, 403, 'Access denied. Owners only.');
  }
};
exports.authorizeOwner = authorizeOwner;
var authorizeDelete = exports.authorizeDelete = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var userRole = req.user.role;
    var userId = req.user.id;
    var targetUserId = req.params.id;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var result = yield conn.query('SELECT role FROM users WHERE id = ?', [targetUserId]);
      conn.release();
      if (result.length === 0) {
        return res.status(404).json({
          error: 'User not found.'
        });
      }
      var targetUserRole = result[0].role;

      // Allow 'owner' to delete any user
      if (userRole === 'owner') {
        next();
      }
      // Allow 'admin' to delete only 'admin' and 'editor'
      else if (userRole === 'admin' && ['admin', 'editor'].includes(targetUserRole)) {
        next();
      } else {
        res.status(403).json({
          error: 'Access denied. You do not have permission to delete this user.'
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  });
  return function authorizeDelete(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Middleware to authorize Editor
var authorizeEditor = (req, res, next) => {
  if (req.user && req.user.role === 'editor') {
    next();
  } else {
    errorHandler(res, 403, 'Access denied. Editors only.');
  }
};
exports.authorizeEditor = authorizeEditor;
var canCreateUser = (req, res, next) => {
  var userRole = req.user.role;
  var newUserRole = req.body.role;

  // Editors cannot create any user
  if (userRole === 'editor') {
    return errorHandler(res, 403, 'Access Denied: Editors cannot create users.');
  }

  // Admins cannot create Owners
  if (userRole === 'admin' && newUserRole === 'owner') {
    return errorHandler(res, 403, 'Access Denied: Admins cannot create Owners.');
  }

  // If no rules are violated, proceed to the next middleware or controller
  next();
};
exports.canCreateUser = canCreateUser;