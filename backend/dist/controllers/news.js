"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewsById = exports.getAllNews = exports.deletePerson = exports.deleteNewsPost = exports.deleteMultiplePersons = exports.deleteMultipleNewsPosts = exports.addNews = void 0;
var _personPost = _interopRequireDefault(require("../models/personPost.js"));
var _news = _interopRequireDefault(require("../models/news.js"));
var _agenda = require("../utils/agenda.js");
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
var _admin = _interopRequireDefault(require("../models/admin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Ensure this path is correct
var addNews = exports.addNews = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var _req$files;
    var data;
    try {
      if (typeof req.body.data === 'string') {
        data = JSON.parse(req.body.data);
      } else {
        data = req.body;
      }
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid JSON data provided.'
      });
    }
    var {
      category,
      title,
      content,
      publishTime,
      scheduledPublishTime,
      externalSource,
      visibility,
      isPublished
    } = data;
    var featuredImage;
    if ((_req$files = req.files) !== null && _req$files !== void 0 && (_req$files = _req$files.featuredImage) !== null && _req$files !== void 0 && _req$files[0]) {
      var file = req.files.featuredImage[0];
      featuredImage = "".concat(req.protocol, "://").concat(req.get('host'), "/uploads/").concat(file.filename);
    } else {
      featuredImage = null; // Handle the case where there's no featured image
    }

    // Extracting user from request, assuming middleware already validates and sets user
    var user = yield _admin.default.findOne({
      _id: req.user._id
    }); // Assuming your authentication middleware sets `req.user`

    // Construct the news item object, including the user who created it
    var newNewsItem = {
      category,
      title,
      content,
      publishTime: publishTime !== 'Schedule' ? new Date() : null,
      scheduledPublishTime,
      externalSource,
      visibility,
      isPublished: isPublished === 'true',
      // Convert to boolean if necessary
      featured: featuredImage,
      createdBy: user.username // or user.username, depending on your schema
    };
    try {
      var newsItem = new _news.default(newNewsItem);
      var savedNewsItem = yield newsItem.save();
      if (publishTime === 'Schedule' && scheduledPublishTime) {
        var scheduledTimeUTC = _momentTimezone.default.tz(scheduledPublishTime, 'Europe/Berlin').utc().toISOString();
        yield _agenda.agenda.schedule(scheduledTimeUTC, 'publish news', {
          newsItemId: savedNewsItem._id
        });
      }
      return res.status(201).json(savedNewsItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  });
  return function addNews(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAllNews = exports.getAllNews = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var newsItems = yield _news.default.find({}).sort({
        createdAt: -1
      }); // Fetch all news items and sort them by creation date
      res.json(newsItems);
    } catch (error) {
      console.error('Error fetching news items:', error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  });
  return function getAllNews(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Controller to get a specific news item by ID
var getNewsById = exports.getNewsById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var newsId = req.params.id; // Extract the news ID from the request parameters
      var newsItem = yield _news.default.findById(newsId);
      if (!newsItem) {
        return res.status(404).json({
          message: 'News item not found'
        });
      }
      res.json(newsItem);
    } catch (error) {
      console.error('Error fetching news item:', error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  });
  return function getNewsById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Function to create a delete controller for a given model
var createDeleteController = Model => {
  // Return the actual controller function
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(function* (req, res) {
      try {
        var {
          postId
        } = req.params; // Renamed `postId` to `id` for generality
        var document = yield Model.findByIdAndDelete(postId);
        if (!document) {
          return res.status(404).json({
            message: 'Document not found.'
          });
        }
        res.json({
          message: 'Document deleted successfully.'
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while deleting the document.'
        });
      }
    });
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
};

// Function to create a delete multiple controller for a given model
var createDeleteMultipleController = Model => {
  // Return the actual controller function
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(function* (req, res) {
      try {
        var {
          ids
        } = req.body; // Assuming an array of ids
        var result = yield Model.deleteMany({
          _id: {
            $in: ids
          }
        });
        res.json({
          message: "".concat(result.deletedCount, " documents have been successfully deleted.")
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while deleting documents.'
        });
      }
    });
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();
};

// Creating specific delete controllers for each model
var deleteNewsPost = exports.deleteNewsPost = createDeleteController(_news.default);
var deleteMultipleNewsPosts = exports.deleteMultipleNewsPosts = createDeleteMultipleController(_news.default);
var deletePerson = exports.deletePerson = createDeleteController(_personPost.default);
var deleteMultiplePersons = exports.deleteMultiplePersons = createDeleteMultipleController(_personPost.default);