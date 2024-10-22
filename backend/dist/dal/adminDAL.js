'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createUser = createUser;
exports.deleteMultipleUsers = deleteMultipleUsers;
exports.deleteUser = deleteUser;
exports.emailExists = emailExists;
exports.executeQuery = executeQuery;
exports.getAllUsers = getAllUsers;
exports.getUserByIdFromDB = getUserByIdFromDB;
exports.getUserByUsername = getUserByUsername;
exports.updateUserInDB = updateUserInDB;
var _url = require('url');
var _fs = _interopRequireDefault(require('fs'));
var _path = _interopRequireDefault(require('path'));
var _config = _interopRequireDefault(require('../db/config.js'));
var _bcryptjs = _interopRequireDefault(require('bcryptjs'));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
      : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == typeof i ? i : i + '';
}
function _toPrimitive(t, r) {
  if ('object' != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != typeof i) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'next', n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n);
      }
      _next(void 0);
    });
  };
}
var _filename = __filename;
var _dirname = _path.default.dirname(_filename);
var queryPath = _path.default.join(_dirname, '../db/queries/adminQueries.sql');
var queries = _fs.default.readFileSync(queryPath, 'utf-8').split(';');
function emailExists(_x) {
  return _emailExists.apply(this, arguments);
} // Function to execute a specific query by index
function _emailExists() {
  _emailExists = _asyncToGenerator(function* (email) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var result = yield conn.query(
        'SELECT COUNT(*) as count FROM users WHERE email = ?;',
        [email]
      );
      return result[0].count > 0;
    } finally {
      if (conn) conn.release();
    }
  });
  return _emailExists.apply(this, arguments);
}
function executeQuery(_x2, _x3) {
  return _executeQuery.apply(this, arguments);
}
function _executeQuery() {
  _executeQuery = _asyncToGenerator(function* (queryIndex, params) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var result = yield conn.query(queries[queryIndex], params);
      return result;
    } finally {
      if (conn) conn.release();
    }
  });
  return _executeQuery.apply(this, arguments);
}
function getUserByUsername(_x4) {
  return _getUserByUsername.apply(this, arguments);
}
function _getUserByUsername() {
  _getUserByUsername = _asyncToGenerator(function* (username) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var rows = yield conn.query('SELECT * FROM users WHERE username = ?', [
        username,
      ]); // Direct query for clarity
      return rows[0]; // assuming the query returns at least one row
    } catch (err) {
      console.error('Database error in getUserByUsername:', err);
      throw err; // It's important to rethrow the error so the calling function knows something went wrong
    } finally {
      if (conn) yield conn.release(); // Ensure the connection is always released
    }
  });
  return _getUserByUsername.apply(this, arguments);
}
function createUser(_x5) {
  return _createUser.apply(this, arguments);
}
function _createUser() {
  _createUser = _asyncToGenerator(function* (details) {
    var conn;
    try {
      // First check if the email already exists
      if (yield emailExists(details.email)) {
        throw new Error('Email already exists');
      }
      conn = yield _config.default.getConnection();
      var result = yield conn.query(
        'INSERT INTO users (firstname, lastname, nickname, username, email, password, role, verified, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          details.firstname,
          details.lastname,
          details.nickname,
          details.username,
          details.email,
          details.password,
          details.role,
          details.verified,
          details.created_at,
          details.updated_at,
        ]
      );
      return _objectSpread(
        {
          id: result.insertId,
        },
        details
      );
    } finally {
      if (conn) conn.release();
    }
  });
  return _createUser.apply(this, arguments);
}
function deleteUser(_x6) {
  return _deleteUser.apply(this, arguments);
}
function _deleteUser() {
  _deleteUser = _asyncToGenerator(function* (id) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      yield conn.query('DELETE FROM users WHERE id = ?;', [id]); // Using parameterized queries for safety
    } finally {
      if (conn) yield conn.release(); // Ensure the connection is always released
    }
  });
  return _deleteUser.apply(this, arguments);
}
function getUserByIdFromDB(_x7) {
  return _getUserByIdFromDB.apply(this, arguments);
}
function _getUserByIdFromDB() {
  _getUserByIdFromDB = _asyncToGenerator(function* (id) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var sql =
        'SELECT id, firstname, lastname, username, email,nickname, role, verified, created_at, updated_at FROM users WHERE id = ?;';
      var result = yield conn.query(sql, [id]);
      return result[0]; // Assuming IDs are unique and only one record is returned
    } catch (error) {
      console.error('Error in getUserByIdFromDB:', error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  });
  return _getUserByIdFromDB.apply(this, arguments);
}
function deleteMultipleUsers(_x8) {
  return _deleteMultipleUsers.apply(this, arguments);
}
function _deleteMultipleUsers() {
  _deleteMultipleUsers = _asyncToGenerator(function* (userIds) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var query = 'DELETE FROM users WHERE id IN (?);'; // SQL query for multiple deletions
      var formattedIds = userIds.join(','); // Format array for SQL IN clause
      yield conn.query(query, [formattedIds]);
    } finally {
      if (conn) yield conn.release();
    }
  });
  return _deleteMultipleUsers.apply(this, arguments);
}
function getAllUsers() {
  return _getAllUsers.apply(this, arguments);
} // adminDAL.js
function _getAllUsers() {
  _getAllUsers = _asyncToGenerator(function* () {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var rows = yield conn.query(queries[4]); // SELECT * FROM users WHERE role IN...
      return rows;
    } finally {
      if (conn) yield conn.end();
    }
  });
  return _getAllUsers.apply(this, arguments);
}
function updateUserInDB(_x9, _x10) {
  return _updateUserInDB.apply(this, arguments);
}
function _updateUserInDB() {
  _updateUserInDB = _asyncToGenerator(function* (id, updates) {
    console.log(updates, id);
    var conn;
    try {
      conn = yield _config.default.getConnection();
      console.log([id]);
      // First, check if the user exists
      var user = yield conn.query('SELECT 1 FROM users WHERE id = ?', [id]);
      if (user.length === 0) {
        throw new Error('User does not exist');
      }

      // Proceed with update if user exists
      var sql = 'UPDATE users SET ';
      var updatesArray = [];
      var params = [];
      for (var key in updates) {
        if (updates[key] && key !== 'password') {
          updatesArray.push(''.concat(key, ' = ?'));
          params.push(updates[key]);
        }
      }
      if (updates.password && updates.password.trim() !== '') {
        var passwordHash = yield _bcryptjs.default.hash(updates.password, 10);
        updatesArray.push('password = ?');
        params.push(passwordHash);
      }
      if (updatesArray.length === 0) {
        return false; // No updates to make
      }
      sql += updatesArray.join(', ') + ' WHERE id = ?';
      params.push(id);
      var result = yield conn.query(sql, params);
      if (result.affectedRows === 0) {
        return false; // No rows updated
      }
      return true;
    } finally {
      if (conn) yield conn.release();
    }
  });
  return _updateUserInDB.apply(this, arguments);
}
