"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortItems = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var {
  Schema,
  model
} = _mongoose.default;
var personSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  featured: {
    type: String,
    required: true
  } // Assuming this is a URL to an image
});
var itemSchema = new Schema({
  person: personSchema
}, {
  _id: true
}); // Include _id in the itemSchema

var rowItemsSchema = new Schema({
  firstRowItems: {
    type: itemSchema,
    // Single object for the first row
    required: true
  },
  secondRowItems: [itemSchema],
  // Array of objects for the second row
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
var SortItems = exports.SortItems = model('SortItems', rowItemsSchema);