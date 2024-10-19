"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _config = _interopRequireDefault(require("../db/config.js"));
var _config2 = require("../helpers/config.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Ensure your database configuration is correctly imported
var router = _express.default.Router();
var storage = _multer.default.diskStorage({
  destination: './public/uploads/partners',
  filename: function filename(req, file, cb) {
    var match = file.fieldname.match(/partnersImages-(\d+)/);
    var index = match ? match[1] : 'default';
    var fileExtension = _path.default.extname(file.originalname);
    var filename = "partnersImages-".concat(index).concat(fileExtension);
    cb(null, filename);
  }
});
var fields = [];
for (var i = 0; i < 21; i++) {
  fields.push({
    name: "partnersImages-".concat(i),
    maxCount: 1
  });
}
var upload = (0, _multer.default)({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    if (filetypes.test(_path.default.extname(file.originalname).toLowerCase()) && filetypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed! (JPEG, JPG, PNG, GIF)'));
    }
  }
}).fields(fields);
router.post('/', upload, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var partnersData = JSON.parse(req.body.partnersData || '[]'); // Parse the JSON input safely

      var results = yield Promise.all(partnersData.map( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (partnerData, index) {
          var file = req.files["partnersImages-".concat(index)] ? req.files["partnersImages-".concat(index)][0] : null;
          var filePath = partnerData.imagePath;
          var url = partnerData.url || ''; // Default to empty string if no URL provided

          if (file) {
            // If a new file is uploaded, update the file path
            filePath = "".concat(req.protocol, "://").concat(req.get('host'), "/").concat(_config2.baseRoute, "/uploads/partners/").concat(file.filename);
          } else if (partnerData.id) {
            // If no new file and id exists, attempt to reuse the existing file path
            var [existing] = yield conn.query('SELECT imagePath FROM partners WHERE id = ?', [partnerData.id]);
            if (existing.length > 0) {
              filePath = existing[0].imagePath;
            }
          }
          if (partnerData.id) {
            // Update existing partner info
            yield conn.query('UPDATE partners SET imagePath = ?, url = ?, createdAt = NOW() WHERE id = ?', [filePath, url, partnerData.id]);
          } else {
            // Insert new partner info
            var result = yield conn.query('INSERT INTO partners (imagePath, url, createdAt) VALUES (?, ?, NOW())', [filePath, url]);
            partnerData.id = result.insertId.toString(); // Update partnerData with new ID
          }
          return _objectSpread(_objectSpread({}, partnerData), {}, {
            imagePath: filePath,
            url
          }); // Return the updated partner info
        });
        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }()));
      res.json({
        message: 'Partners updated successfully',
        data: results
      });
    } catch (error) {
      console.error('Error updating partners:', error);
      res.status(500).send('Server error: ' + error.message);
    } finally {
      if (conn) {
        conn.release(); // Always release connection
      }
    }
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      // Establish a connection from the pool
      conn = yield _config.default.getConnection();
      var query = 'SELECT * FROM partners';
      var results = yield conn.query(query);
      if (results.length === 0) {
        // Properly handle the case where no records are found
        return res.status(404).json({
          message: 'No partners found'
        });
      }

      // Return all the fetched records properly formatted as JSON
      res.json({
        message: 'Successfully retrieved partners data',
        results
      });
    } catch (error) {
      // Log and return any errors encountered during the operation
      console.error('Error fetching partners data:', error);
      res.status(500).json({
        message: 'Server error',
        error: error.toString()
      });
    } finally {
      // Always release the connection back to the pool
      if (conn) {
        conn.release();
      }
    }
  });
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// DELETE route to delete a partner by ID
router.delete('/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var result = yield conn.query('DELETE FROM partners WHERE id = ?', [id]);
      if (result.affectedRows) {
        res.json({
          message: 'Partner deleted successfully'
        });
      } else {
        res.status(404).send('Partner not found');
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
      res.status(500).send('Server error');
    } finally {
      if (conn) {
        conn.release(); // Always release connection
      }
    }
  });
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = exports.default = router;