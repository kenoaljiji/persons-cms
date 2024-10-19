"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _sortItemController = require("../controllers/sortItemController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var router = _express.default.Router();
router.get('/', _sortItemController.getAllSortedItems);
router.put('/data', _sortItemController.updateSortedItems);
var _default = exports.default = router;