"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import mongoose using ES6 module syntax

var userSchema = new _mongoose.default.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  nickname: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ["admin", "editor", "user"],
    default: "user",
    required: true
  }
}, {
  timestamps: true
});

// Export the model
var _default = exports.default = _mongoose.default.model("User", userSchema);