"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.updateFooterConfig = exports.getFooterData = void 0;
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
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var protocol = process.env.PROTOCOL;

/* const storage = multer.diskStorage({
  destination: "./public/uploads/footer",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
}); */

var storage = _multer.default.diskStorage({
  destination: './public/uploads/footer',
  filename: function filename(req, file, cb) {
    // Extract index from the fieldname which is assumed to be like companyImage-0, companyImage-1, etc.
    var match = file.fieldname.match(/companyImage-(\d+)/);
    var index = match ? match[1] : 'default';
    var fileExtension = _path.default.extname(file.originalname);

    // This filename will be consistent for the same field, causing new uploads to overwrite older ones
    var filename = "companyImage-".concat(index).concat(fileExtension);
    cb(null, filename);
  }
});

// Existing Multer configuration
var upload = exports.upload = (0, _multer.default)({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  // Limit the file size
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var isFileTypeAllowed = filetypes.test(_path.default.extname(file.originalname).toLowerCase()) && filetypes.test(file.mimetype);
    if (isFileTypeAllowed) {
      cb(null, true);
    } else {
      // Call callback with an error message
      cb(new Error('Only images are allowed! (JPEG, JPG, PNG, GIF)'));
    }
  }
}).fields([{
  name: 'companyImage-0'
}, {
  name: 'companyImage-1'
}, {
  name: 'companyImage-2'
}, {
  name: 'companyImage-3'
}, {
  name: 'companyImage-4'
}]);

/* 
export const uploadMiddleware = upload.fields([
  { name: "companyImage-0" },
  { name: "companyImage-1" },
  { name: "companyImage-2" },
  { name: "companyImage-3" },
  { name: "companyImage-4" },
]); */

function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString(); // convert BigInt to string
  } else {
    return value;
  }
}
var updateFooterConfig = exports.updateFooterConfig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var companiesData = JSON.parse(req.body.companies || '[]'); // Safely parse the JSON input

      var results = yield Promise.all(companiesData.map( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (company, index) {
          var file = req.files["companyImage-".concat(index)] ? req.files["companyImage-".concat(index)][0] : null;
          var filePath = company.src;
          if (file) {
            // If a new file is uploaded, update the file path
            filePath = "".concat(protocol, "://").concat(req.get('host'), "/").concat(_config2.baseRoute, "/uploads/footer/").concat(file.filename);
          } else if (company.id) {
            // If no new file and id exists, attempt to reuse the existing file path
            var [existing] = yield conn.query('SELECT src FROM footer_companies WHERE id = ?', [company.id]);
            if (existing.length > 0) {
              filePath = existing[0].src;
            }
          }
          if (company.id) {
            // Update existing company info
            yield conn.query('UPDATE footer_companies SET company = ?, description = ?, url = ?, src = ? WHERE id = ?', [company.company, company.description, company.url, filePath, company.id]);
          } else {
            // Insert new company info
            var result = yield conn.query('INSERT INTO footer_companies (company, description, url, src) VALUES (?, ?, ?, ?)', [company.company, company.description, company.url, filePath]);
            company.id = result.insertId; // Update company id with new ID from database
          }
          return _objectSpread(_objectSpread({}, company), {}, {
            src: filePath
          }); // Return the updated company info
        });
        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }()));

      // Use a replacer function to handle BigInt serialization in JSON
      function replacer(key, value) {
        if (typeof value === 'bigint') {
          return value.toString();
        }
        return value;
      }
      res.json({
        message: 'Footer configuration updated successfully',
        data: results
      });
    } catch (error) {
      console.error('Failed to update footer configuration:', error);
      res.status(500).send('Server error: ' + error.message);
    } finally {
      if (conn) {
        conn.release(); // Always release connection
      }
    }
  });
  return function updateFooterConfig(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getFooterData = exports.getFooterData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var results = yield conn.query('SELECT * FROM footer_companies'); // Get all companies

      if (results.length > 0) {
        // Process results into a more friendly format if necessary
        var companies = results.map(company => ({
          id: company.id,
          company: company.company,
          description: company.description,
          url: company.url,
          src: company.src,
          last_updated: company.last_updated
        }));

        // Send all companies as part of a footerConfig object
        res.json({
          message: 'Footer data fetched successfully',
          footerCompanies: companies
        });
      } else {
        res.status(404).json({
          message: 'Footer data not found'
        });
      }
    } catch (error) {
      console.error('Failed to fetch footer data:', error);
      res.status(500).send('Server error: ' + error.message);
    } finally {
      if (conn) {
        conn.release(); // Ensure connection is always released
      }
    }
  });
  return function getFooterData(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();