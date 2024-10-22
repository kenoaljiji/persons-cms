"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSchema = exports.signUpSchema = exports.message = exports.logInSchema = exports.defaults = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import Joi using ES6 module syntax

// Define your schemas
var signUpSchema = exports.signUpSchema = _joi.default.object({
  firstname: _joi.default.string(),
  lastname: _joi.default.string(),
  nickname: _joi.default.string(),
  username: _joi.default.string().required(),
  email: _joi.default.string().required(),
  password: _joi.default.string().required(),
  role: _joi.default.string().required()
});
var logInSchema = exports.logInSchema = _joi.default.object({
  username: _joi.default.string().required(),
  password: _joi.default.string().required()
});
var updateSchema = exports.updateSchema = _joi.default.object({
  firstname: _joi.default.string(),
  lastname: _joi.default.string(),
  nickname: _joi.default.string(),
  username: _joi.default.string(),
  email: _joi.default.string(),
  password: _joi.default.string(),
  role: _joi.default.string()
});

// Define your defaults
var defaults = exports.defaults = {
  abortEarly: false,
  // include all errors
  allowUnknown: true,
  // ignore unknown props
  stripUnknown: true // remove unknown props
};

// Define a function to format messages
var message = error => "".concat(error.details.map(x => x.message).join(", "));

// Export your schemas, defaults, and message function
exports.message = message;