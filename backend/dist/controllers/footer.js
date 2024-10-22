"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadMiddleware = exports.upload = exports.updateFooterConfig = exports.getFooterData = void 0;
var _footer = _interopRequireDefault(require("../models/footer.js"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Set up storage for images

var storage = _multer.default.diskStorage({
  destination: './public/uploads/footer',
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path.default.extname(file.originalname));
  }
});
var upload = exports.upload = (0, _multer.default)({
  storage: storage,
  limits: {
    fileSize: 1000000000000000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
});
function checkFileType(file, cb) {
  // Allowed ext
  var filetypes = /jpeg|jpg|png|gif|mp4|avi|mpeg|mp3|wav|pdf|doc|docx/;
  // Check ext
  var extname = filetypes.test(_path.default.extname(file.originalname).toLowerCase());
  // Check mime
  var mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Files Only!');
  }
}
var uploadMiddleware = exports.uploadMiddleware = upload.fields([{
  name: 'companyImage-0'
}, {
  name: 'companyImage-1'
}, {
  name: 'companyImage-2'
}, {
  name: 'companyImage-3'
}, {
  name: 'companyImage-4'
}
// Add more if you expect more companies
// This setup expects up to 5 companies, each with one image. Adjust accordingly.
]);
var updateFooterConfig = exports.updateFooterConfig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var companiesData = req.body.companies;
      console.log(companiesData); // Corrected from "comaniesData" to "companiesData"
      var updatedCompanies = companiesData.map((company, index) => {
        // Check if there's an uploaded file for this company
        var file = req.files["companyImage-".concat(index)] ? req.files["companyImage-".concat(index)][0] : null;
        return _objectSpread(_objectSpread({}, company), {}, {
          src: file ? "".concat(req.protocol, "://").concat(req.get('host'), "/uploads/footer/").concat(file.filename) : company.src
        });
      });
      var result = yield _footer.default.findOneAndUpdate({},
      // An empty filter selects the first document in the collection
      {
        $set: {
          companies: updatedCompanies
        }
      }, {
        upsert: true,
        new: true
      } // Options to upsert and return the new document
      );
      res.json({
        message: 'Footer updated successfully',
        result
      });
    } catch (error) {
      console.error('Failed to update footer config:', error);
      res.status(500).send('Server error');
    }
  });
  return function updateFooterConfig(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Controller to get footer configuration
var getFooterData = exports.getFooterData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      // Attempt to find the footer configuration document in the database
      var footerConfig = yield _footer.default.findOne(); // Assuming there's only one footer config document

      // If a footer configuration exists, return it
      if (footerConfig) {
        res.json(footerConfig);
      } else {
        // If not found, you might want to return a default configuration or a not found error
        res.status(404).json({
          message: 'Footer data not found'
        });
      }
    } catch (error) {
      console.error('Failed to fetch footer data:', error);
      res.status(500).send('Server error');
    }
  });
  return function getFooterData(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();