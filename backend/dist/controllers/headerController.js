"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.updateHeaderConfig = exports.getHeaderConfig = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _config = _interopRequireDefault(require("../db/config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var protocol = process.env.PROTOCOL;
var storage = _multer.default.diskStorage({
  destination: './public/uploads/header',
  filename: function filename(req, file, cb) {
    // Use a fixed filename for the logo image
    var filename = 'logo' + _path.default.extname(file.originalname); // ensures the extension remains correct
    cb(null, filename);
  }
});
var upload = exports.upload = (0, _multer.default)({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  // for example, 10 MB limit for files
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var isFileTypeAllowed = filetypes.test(_path.default.extname(file.originalname).toLowerCase()) && filetypes.test(file.mimetype);
    if (isFileTypeAllowed) {
      cb(null, true);
    } else {
      cb('Error: Only images are allowed! (JPEG, JPG, PNG, GIF)');
    }
  }
});
var updateHeaderConfig = exports.updateHeaderConfig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      routes
    } = req.body;
    var logoImgPath = req.file ? "".concat(protocol, "://").concat(req.get('host'), "/api/uploads/header/").concat(req.file.filename) : null;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      // Perform the query and check for results
      var result = yield conn.query("SELECT id FROM header_config WHERE id = 1");

      // Check if any rows exist
      if (result && result.length > 0) {
        console.log('Updating existing record');
        yield conn.query("UPDATE header_config SET routes=?, logo_img_path=IFNULL(?, logo_img_path) WHERE id=1", [JSON.stringify(routes), logoImgPath]);
      } else {
        console.log('Inserting new record');
        yield conn.query("INSERT INTO header_config (id, routes, buttons, logo_img_path) VALUES (1, ?, ?)", [JSON.stringify(routes), logoImgPath]);
      }
      res.json({
        message: 'Header configuration updated successfully'
      });
    } catch (error) {
      console.error('Failed to update header configuration:', error);
      res.status(500).json({
        error: 'Database error',
        details: error.message
      });
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return function updateHeaderConfig(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Your route handler
var getHeaderConfig = exports.getHeaderConfig = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var conn = yield _config.default.getConnection();
      var [rows] = yield conn.query('SELECT * FROM header_config WHERE id=1');
      conn.release();

      // Check if rows is not an array and make it an array if it's not
      var results = Array.isArray(rows) ? rows : [rows];
      if (results.length > 0) {
        var config = results[0];

        // Parse routes and buttons from JSON strings to objects
        var routes = JSON.parse(config.routes);
        res.json({
          id: config.id,
          routes: routes,
          logoImgPath: config.logo_img_path
        });
      } else {
        res.status(404).json({
          error: 'Configuration not found'
        });
      }
    } catch (error) {
      console.error('Failed to fetch header config:', error);
      res.status(500).json({
        error: 'Database error',
        details: error.message
      });
    }
  });
  return function getHeaderConfig(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();