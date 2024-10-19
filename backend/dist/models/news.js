"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var newsSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: String,
  visibility: String,
  publishTime: Date,
  scheduledPublishTime: Date,
  externalSource: String,
  isPublished: Boolean,
  featured: String,
  createdBy: String
  // Add any other fields you need
}, {
  timestamps: true
}); // Enable automatic createdAt and updatedAt fields

var News = _mongoose.default.model('News', newsSchema);
var _default = exports.default = News;