"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _admin = _interopRequireDefault(require("./admin.js"));
var _headerRoutes = _interopRequireDefault(require("./headerRoutes.js"));
var _personsRoutes = _interopRequireDefault(require("./personsRoutes.js"));
var _footerRoutes = _interopRequireDefault(require("./footerRoutes.js"));
var _sortRoutes = _interopRequireDefault(require("./sortRoutes.js"));
var _postRoutes = _interopRequireDefault(require("./postRoutes.js"));
var _partnersRoutes = _interopRequireDefault(require("./partnersRoutes.js"));
var _searchRoutes = _interopRequireDefault(require("./searchRoutes.js"));
var _vistiorsRoute = _interopRequireDefault(require("./vistiorsRoute.js"));
var _textSettingRoutes = _interopRequireDefault(require("./textSettingRoutes.js"));
var _themeRoutes = _interopRequireDefault(require("./themeRoutes.js"));
var _backupRoutes = _interopRequireDefault(require("./backupRoutes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var app = (0, _express.default)();
app.use("/", _admin.default);
app.use("/sort", _sortRoutes.default);
/* 
app.use("/", express.static("public/works"));
app.use("/", express.static("public")); */

app.use("/settings", _textSettingRoutes.default);
app.use("/footer", _footerRoutes.default);
app.use("/theme", _themeRoutes.default);
app.use("/header", _headerRoutes.default);
app.use("/post/persons", _personsRoutes.default);
app.use("/post", _postRoutes.default);
app.use("/post/partners", _partnersRoutes.default);
app.use("/search", _searchRoutes.default);
app.use("/visitors", _vistiorsRoute.default);
app.use("/download", _backupRoutes.default);
var _default = exports.default = app;