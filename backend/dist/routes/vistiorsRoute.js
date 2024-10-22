"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressUseragent = _interopRequireDefault(require("express-useragent"));
var _config = _interopRequireDefault(require("../db/config.js"));
var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = _express.default.Router();
router.use(_expressUseragent.default.express());
router.post('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var ip = req.clientIp;
    var userAgent = req.headers['user-agent'];

    // Check if device info is provided in the query parameters
    var deviceInfo = req.body.params; // Adjust this based on how you send device info from frontend

    // Use ua-parser-js to parse the user-agent string
    var parser = new _uaParserJs.default(userAgent);
    var result = parser.getResult();
    var {
      browser,
      os,
      platform
    } = result;
    var isMobile = result.device.type === 'mobile';
    var isTablet = result.device.type === 'tablet';
    var isDesktop = !isMobile && !isTablet;
    var device = deviceInfo || 'Unknown'; // Use deviceInfo if provided, otherwise get device model from user-agent
    var platformType = result.platform ? result.platform.type : 'Unknown';
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var query = "\n      INSERT INTO visitors (ip_address, system_info, browser_name, os, platform, is_mobile, is_tablet, is_desktop, device)\n      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)\n      ON DUPLICATE KEY UPDATE count = count + 1, last_visit = CURRENT_TIMESTAMP";
      yield conn.query(query, [ip, userAgent, browser.name, os.name, platformType, isMobile, isTablet, isDesktop, device]);

      // Fetch the last inserted visitor
      var selectQuery = 'SELECT * FROM visitors WHERE ip_address = ? ORDER BY last_visit DESC LIMIT 1';
      var [visitor] = yield conn.query(selectQuery, [ip]);

      // Serialize the result for response
      var serializedResult = _objectSpread(_objectSpread({}, visitor), {}, {
        count: visitor.count.toString(),
        last_visit: visitor.last_visit.toString()
      });
      res.json(serializedResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/all', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var query = 'SELECT * FROM visitors ORDER BY last_visit DESC';
      var results = yield conn.query(query);

      // Custom replacer function to handle BigInt serialization
      var replacer = (key, value) => typeof value === 'bigint' ? value.toString() : value; // Convert BigInt to string

      // Serialize with the custom replacer
      var jsonString = JSON.stringify(results, replacer);
      res.setHeader('Content-Type', 'application/json');
      res.send(jsonString);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) conn.release(); // release the connection back to the pool
    }
  });
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Route to handle new visits

router.delete('/:id', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var {
        id
      } = req.params; // Get the ID from the request parameters
      var deleteQuery = 'DELETE FROM visitors WHERE id = ?';
      yield conn.query(deleteQuery, [id]);
      res.json({
        success: true,
        message: "Visitor with ID ".concat(id, " deleted successfully.")
      });
    } catch (error) {
      console.error('Failed to delete visitor:', error);
      res.status(500).send('Database error');
    } finally {
      if (conn) conn.release(); // Ensure the connection is released back to the pool
    }
  });
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = exports.default = router;