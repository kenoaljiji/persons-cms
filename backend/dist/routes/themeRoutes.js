"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _config = _interopRequireDefault(require("../db/config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = _express.default.Router();
router.post('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      headerColor,
      footerColor,
      headerTextColor,
      footerTextColor
    } = req.body;
    var conn;
    try {
      var _conn = yield _config.default.getConnection();
      yield _conn.query("UPDATE theme_settings SET headerColor = ?, footerColor = ?, headerTextColor = ?, footerTextColor = ? WHERE id = 1", [headerColor, footerColor, headerTextColor, footerTextColor]);
      _conn.release();
      res.send({
        message: 'Theme updated successfully'
      });
    } catch (error) {
      conn.release();
      res.status(500).send('Database error');
    }
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      // Since there's only one row, we can directly fetch it without specifying an ID
      var results = yield conn.query('SELECT * FROM theme_settings WHERE id = 1');
      conn.release();
      if (results.length > 0) {
        res.json(results[0]); // Send the first row of results
      } else {
        res.status(404).json({
          message: 'Theme settings not found'
        });
      }
    } catch (error) {
      console.error('Failed to fetch theme settings:', error);
      res.status(500).json({
        message: 'Database error'
      });
    }
  });
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/maintenance', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var results = yield conn.query('SELECT maintenance FROM settings LIMIT 1');
      conn.release();
      if (results.length > 0) {
        res.json({
          maintenance: results[0].maintenance
        }); // Send the maintenance mode status
      } else {
        res.status(404).json({
          message: 'Maintenance settings not found'
        });
      }
    } catch (error) {
      console.error('Failed to fetch maintenance settings:', error);
      res.status(500).json({
        message: 'Database error'
      });
      if (conn) conn.release();
    }
  });
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// PUT route to update maintenance mode
router.put('/maintenance', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      if (typeof req.body.maintenance === 'undefined') {
        return res.status(400).json({
          message: 'Maintenance flag is required'
        });
      }
      var {
        maintenance
      } = req.body; // Should be a boolean value

      conn = yield _config.default.getConnection();
      yield conn.query('UPDATE settings SET maintenance = ? WHERE id = 1', [maintenance]);
      conn.release();
      res.json({
        success: true,
        maintenance
      });
    } catch (error) {
      console.error('Failed to update maintenance settings:', error);
      res.status(500).json({
        message: 'Database error',
        error: error.message
      });
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = exports.default = router;