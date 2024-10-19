"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrCreateSortItems = exports.getAllSortedItems = void 0;
var _sortItems = require("../models/sortItems.js");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var updateOrCreateSortItems = exports.updateOrCreateSortItems = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var {
      firstRowItems,
      secondRowItems,
      _id,
      userId
    } = req.body;
    try {
      var updatedOrNewDocument = yield _sortItems.SortItems.findOneAndUpdate({
        _id
      }, {
        firstRowItems,
        secondRowItems
      }, {
        new: true,
        // Return the modified document rather than the original
        upsert: true,
        // Create a new document if one doesn't exist
        runValidators: true,
        // Run model validators on update
        setDefaultsOnInsert: true // Apply the default values specified in the model's schema
      });
      res.status(200).json(updatedOrNewDocument);
    } catch (error) {
      next(error);
    }
  });
  return function updateOrCreateSortItems(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Handler to fetch all sorted items
var getAllSortedItems = exports.getAllSortedItems = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var sortedItems = yield _sortItems.SortItems.find({}).exec(); // Fetch all documents without filtering
      res.status(200).json(sortedItems);
    } catch (error) {
      next(error); // Pass errors to Express's default error handler
    }
  });
  return function getAllSortedItems(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();