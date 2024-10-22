"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.getUserById = getUserById;
exports.getUserByIdController = void 0;
exports.handleDeleteMultipleUsers = handleDeleteMultipleUsers;
exports.handleDeleteUser = handleDeleteUser;
exports.login = login;
exports.register = register;
exports.updateUser = updateUser;
var adminDAL = _interopRequireWildcard(require("../dal/adminDAL.js"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _generateToken = require("../utils/generateToken.js");
var _responseHandler = require("../middleware/response-handler.js");
var _admin = require("../validator/admin.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function register(_x, _x2) {
  return _register.apply(this, arguments);
}
function _register() {
  _register = _asyncToGenerator(function* (req, res) {
    try {
      // Destructure all necessary fields from req.body
      var {
        firstname,
        lastname,
        nickname,
        username,
        email,
        password,
        role
      } = req.body;
      var hashedPassword = yield _bcryptjs.default.hash(password, 10);

      // Prepare additional fields with defaults if not provided
      var verified = false; // Default verification status
      var now = new Date(); // Current timestamp for created_at and updated_at

      // Create user with all required and optional fields
      var user = yield adminDAL.createUser({
        firstname,
        lastname,
        nickname,
        username,
        email,
        password: hashedPassword,
        role,
        verified,
        created_at: now,
        updated_at: now
      });
      var token = yield (0, _generateToken.generateToken)(user); // Generate a token for session/authentication

      // Constructing the success message based on user's role
      var successMessage = "".concat(user.role.charAt(0).toUpperCase() + user.role.slice(1), " Registered Successfully!");
      // Use the response handler to send a success response
      (0, _responseHandler.responseHandler)(res, {
        user,
        token
      }, successMessage, 201);
    } catch (error) {
      // Catch the specific 'Email already exists' error and handle it
      if (error.message) {
        return res.status(409).json({
          error: error.message
        }); // 409 Conflict might be a suitable status code
      }
      // For other types of errors, you might want to use your generic error handler
      (0, _responseHandler.errorHandler)(res, 500, 'An error occurred during registration.');
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
        username,
        password
      } = req.body;
      var user = yield adminDAL.getUserByUsername(username); // Ensure this DAL function is implemented properly
      if (!user) {
        return (0, _responseHandler.errorHandler)(res, 404, 'User not found.'); // Correctly pass status code before message
      }
      var isMatch = yield _bcryptjs.default.compare(password, user.password);
      if (!isMatch) {
        return (0, _responseHandler.errorHandler)(res, 401, 'Password is incorrect.'); // Correctly pass status code before message
      }
      var token = yield (0, _generateToken.generateToken)(user); // Ensure this function is correctly implemented
      (0, _responseHandler.responseHandler)(res, {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      }, 'Login successful.', 200); // Optionally only pass non-sensitive user info
    } catch (err) {
      console.log(err); // It's a good idea to log the actual error for debugging purposes
      (0, _responseHandler.errorHandler)(res, 500, 'Login failed.'); // Correctly pass status code before message
    }
  });
  return _login.apply(this, arguments);
}
function getAllUsers(_x5, _x6) {
  return _getAllUsers.apply(this, arguments);
}
function _getAllUsers() {
  _getAllUsers = _asyncToGenerator(function* (req, res) {
    try {
      var users = yield adminDAL.getAllUsers();
      (0, _responseHandler.responseHandler)(res, users, 'Users fetched successfully.', 200);
    } catch (err) {
      (0, _responseHandler.errorHandler)(res, 'Failed to fetch users.', 500);
    }
  });
  return _getAllUsers.apply(this, arguments);
}
function handleDeleteUser(_x7, _x8) {
  return _handleDeleteUser.apply(this, arguments);
}
function _handleDeleteUser() {
  _handleDeleteUser = _asyncToGenerator(function* (req, res) {
    try {
      yield adminDAL.deleteUser(req.params.id);
      res.json({
        message: 'User successfully deleted'
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Error deleting user'
      });
    }
  });
  return _handleDeleteUser.apply(this, arguments);
}
function handleDeleteMultipleUsers(_x9, _x10) {
  return _handleDeleteMultipleUsers.apply(this, arguments);
}
function _handleDeleteMultipleUsers() {
  _handleDeleteMultipleUsers = _asyncToGenerator(function* (req, res) {
    try {
      var userIds = req.body.userIds; // Extract user IDs from request body
      yield adminDAL.deleteMultipleUsers(userIds);
      res.json({
        message: "".concat(userIds.length, " users have been successfully deleted.")
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'An error occurred while deleting users.'
      });
    }
  });
  return _handleDeleteMultipleUsers.apply(this, arguments);
}
function getUser(_x11, _x12) {
  return _getUser.apply(this, arguments);
}
/* export const getUserById = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const results = await conn.query(
      "SELECT id, firstname, lastname, username, email, role, verified, created_at, updated_at FROM users WHERE id = ?;",
      [req.params.userId]
    );
    const user = results[0]; // Get the first result

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: "Error fetching user details" });
  } finally {
    if (conn) await conn.end();
  }
}; */
// In UserController.js or a similar file
function _getUser() {
  _getUser = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield pool.getConnection();
      var results = yield conn.query('SELECT * FROM users WHERE id = ?;', [req.user.id]);
      var user = results[0]; // Get the first result

      if (user) {
        (0, _responseHandler.responseHandler)(user, res);
      } else {
        (0, _responseHandler.errorHandler)(404, res, 'No user!');
      }
    } catch (err) {
      console.error(err);
      (0, _responseHandler.errorHandler)(500, res, err.message);
    } finally {
      if (conn) yield conn.end();
    }
  });
  return _getUser.apply(this, arguments);
}
function getUserById(_x13) {
  return _getUserById.apply(this, arguments);
} // In your adminController.js
function _getUserById() {
  _getUserById = _asyncToGenerator(function* (id) {
    try {
      var user = yield adminDAL.getUserByIdFromDB(id);
      if (!user) {
        return null; // or throw an error or handle the "not found" case as appropriate
      }
      delete user.password; // Remove sensitive data if not needed for the response
      return user;
    } catch (error) {
      console.error('Error fetching user by ID in Controller:', error);
      throw error; // Handle errors or rethrow them after logging
    }
  });
  return _getUserById.apply(this, arguments);
}
function updateUser(_x14, _x15) {
  return _updateUser.apply(this, arguments);
}
function _updateUser() {
  _updateUser = _asyncToGenerator(function* (req, res) {
    try {
      var {
        error,
        value
      } = _admin.updateSchema.validate(req.body, _admin.defaults);
      if (error) {
        return (0, _responseHandler.errorHandler)(res, 403, error.message);
      }

      /*  const isAdmin = req.user.role === 'admin' && req.user.role === 'owner'; */
      var targetUserId = req.params.id;

      // Update user in the database
      var updateSuccess = yield adminDAL.updateUserInDB(targetUserId, value);
      if (!updateSuccess) {
        throw new Error('Failed to update user');
      }

      // Optionally retrieve and send updated user data
      var updatedUser = yield adminDAL.getUserByIdFromDB(targetUserId);
      delete updatedUser.password; // Remove password for security reasons
      (0, _responseHandler.responseHandler)(res, updatedUser, 'User updated successfully');
    } catch (err) {
      console.error('Error in updateUser Controller:', err);
      (0, _responseHandler.errorHandler)(res, 500, err.message || 'Failed to update user.');
    }
  });
  return _updateUser.apply(this, arguments);
}
var getUserByIdController = exports.getUserByIdController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id
      } = req.params; // Extract the userId from route parameters
      var user = yield getUserById(id); // Use the DAL function to fetch the user

      if (!user) {
        // If no user is found with the given ID, return a 404 error
        return res.status(404).json({
          message: 'User not found'
        });
      }

      // Return the user data if found
      res.json(user);
    } catch (err) {
      console.error('Error fetching user by ID:', err);
      // Handle potential errors, such as database errors
      res.status(500).json({
        message: 'Error fetching user details'
      });
    }
  });
  return function getUserByIdController(_x16, _x17) {
    return _ref.apply(this, arguments);
  };
}();