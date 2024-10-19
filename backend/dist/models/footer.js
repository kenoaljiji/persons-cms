"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var footerSchema = new _mongoose.default.Schema({
  companies: [{
    company: String,
    src: String,
    description: String,
    url: String
  }]
});
var FooterConfig = _mongoose.default.model('Footer', footerSchema);
var _default = exports.default = FooterConfig;