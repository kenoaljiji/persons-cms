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
      isPlaying,
      active,
      text
    } = req.body;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var results = yield conn.query('SELECT id FROM text_settings LIMIT 1');
      var result;
      if (results.length === 0) {
        // No existing settings, create new
        result = yield conn.query('INSERT INTO text_settings (isPlaying, active, text) VALUES (?, ?, ?)', [isPlaying, active, text]);
        res.send({
          success: true,
          message: 'New settings created successfully',
          id: result.insertId.toString()
        });
      } else {
        // Update existing settings
        result = yield conn.query('UPDATE text_settings SET isPlaying = ?, active = ?, text = ? WHERE id = ?', [isPlaying, active, text, results[0].id]);
        if (result.affectedRows === 0) {
          res.status(404).send({
            success: false,
            message: 'Record not found for update'
          });
        } else {
          res.send({
            success: true,
            message: 'Settings updated successfully'
          });
        }
      }
      conn.release();
    } catch (err) {
      console.error(err);
      conn.release();
      res.status(500).send('Database error');
    }
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// GET settings data
router.get('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var results = yield conn.query('SELECT * FROM text_settings LIMIT 1'); // Fetch the single row
      conn.release();
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({
          message: 'Settings not found'
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Database error'
      });
    }
  });
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = exports.default = router;