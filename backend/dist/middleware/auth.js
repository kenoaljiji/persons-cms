"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _responseHandler = require("./response-handler.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var verifyToken = (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    return (0, _responseHandler.errorHandler)(res, 401, 'Unauthorized: No token provided.');
  }
  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }
    var decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    (0, _responseHandler.errorHandler)(res, 403, 'Failed to authenticate token.');
  }
};
exports.verifyToken = verifyToken;