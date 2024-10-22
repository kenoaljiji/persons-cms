"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var generateToken = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id,
    role: user.role // Include user's role or any other user-specific info you need
    // Add other fields as needed
  }, process.env.JWT_SECRET, {
    expiresIn: "4h" // Token expiration time
  });
};
exports.generateToken = generateToken;