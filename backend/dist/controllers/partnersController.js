"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCreatePartners = void 0;
var _config = _interopRequireDefault(require("../db/config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var protocol = process.env.PROTOCOL;
var updateCreatePartners = exports.updateCreatePartners = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var companiesData = JSON.parse(req.body.companies || '[]');
      var results = yield Promise.all(companiesData.map( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (company, index) {
          var file = req.files["companyImage-".concat(index)] ? req.files["companyImage-".concat(index)][0] : null;
          var filePath = company.src;
          if (file) {
            // New file uploaded, update the path
            filePath = "".concat(protocol, "://").concat(req.get('host'), "/api/uploads/partners/").concat(file.filename);
            // Overwrite logic: remove old file if new one uploaded
            fs.unlinkSync("./public/uploads/partners/".concat(company.src.split('/').pop()));
          } else if (company.id) {
            // No new file uploaded, attempt to reuse existing path
            var [existing] = yield conn.query('SELECT src FROM partners WHERE id = ?', [company.id]);
            filePath = existing.length > 0 ? existing[0].src : filePath;
          }
          if (company.id) {
            // Update existing record
            yield conn.query('UPDATE footer_companies SET company = ?, description = ?, url = ?, src = ? WHERE id = ?', [company.company, company.description, company.url, filePath, company.id]);
          } else {
            // Insert new record
            var result = yield conn.query('INSERT INTO footer_companies (company, description, url, src) VALUES (?, ?, ?, ?)', [company.company, company.description, company.url, filePath]);
            company.id = result.insertId;
          }
          return _objectSpread(_objectSpread({}, company), {}, {
            src: filePath
          });
        });
        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }()));
      res.json({
        message: 'Footer configuration updated successfully',
        data: results
      });
    } catch (error) {
      console.error('Failed to update footer configuration:', error);
      res.status(500).send('Server error: ' + error.message);
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return function updateCreatePartners(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();