"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOrUpdatePersonAndWork = exports.addNews = void 0;
exports.deleteMultiplePosts = deleteMultiplePosts;
exports.deletePost = deletePost;
exports.searchUsersByPartialName = exports.getAllPersons = exports.displayPersonDetails = exports.displayPersonData = void 0;
var _personPost = _interopRequireDefault(require("../models/personPost.js"));
var _news = _interopRequireDefault(require("../models/news.js"));
var _agenda = require("../utils/agenda.js");
var _replaceDiacritics = require("../utils/replaceDiacritics.js");
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
var _admin = _interopRequireDefault(require("../models/admin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Ensure this path is correct
// Assuming 'scheduledPublishTime' is in local time and you want to convert it to UTC

// Controller to get all news items

var addOrUpdatePersonAndWork = exports.addOrUpdatePersonAndWork = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var data = JSON.parse(req.body.data);
    var {
      person: personData,
      category,
      title,
      content,
      publishTime,
      scheduledPublishTime,
      externalSource,
      visibility,
      isPublished
    } = data;
    try {
      var existingPerson = yield _personPost.default.findOne({
        "person.firstName": {
          $regex: new RegExp("^" + personData.firstName + "$", "i")
        },
        "person.lastName": {
          $regex: new RegExp("^" + personData.lastName + "$", "i")
        }
      });
      var featuredImage;
      if (req.files && req.files.featuredImage && req.files.featuredImage.length > 0) {
        var file = req.files.featuredImage[0];
        featuredImage = "".concat(req.protocol, "://").concat(req.get("host"), "/api/uploads/").concat(file.filename);
      } else {
        featuredImage = null; // or set a default value or handle the case where there's no featured image
      }

      // Assuming the featured image is uploaded with the field name 'featuredImage
      // Construct media object from uploaded files
      var mediaFiles = {
        images: req.files["images"] ? req.files["images"].map(file => ({
          url: "".concat(req.protocol, "://").concat(req.get("host"), "/api/uploads/").concat(file.filename),
          name: file.name,
          type: file.mimetype
        })) : [],
        audios: req.files["audios"] ? req.files["audios"].map(file => ({
          url: "".concat(req.protocol, "://").concat(req.get("host"), "/api/uploads/").concat(file.filename),
          name: file.originalname,
          fileType: file.mimetype
        })) : [],
        videos: req.files["videos"] ? req.files["videos"].map(file => ({
          url: "".concat(req.protocol, "://").concat(req.get("host"), "/api/uploads/").concat(file.filename),
          name: file.originalname,
          fileType: file.mimetype
        })) : [],
        documents: req.files["documents"] ? req.files["documents"].map(file => ({
          url: "".concat(req.protocol, "://").concat(req.get("host"), "/api/uploads/").concat(file.filename),
          name: file.originalname,
          fileType: file.mimetype
        })) : []
      };
      var user = yield _admin.default.findOne({
        _id: req.user._id
      }); //

      var newWork = {
        title,
        media: mediaFiles,
        content,
        publishTime,
        scheduledPublishTime,
        externalSource,
        visibility,
        isPublished,
        createdBy: user.username
      };
      var workId;
      var workAction;
      var publicationStatus;

      // Now convert the ISO format date to UTC with moment-timezone
      var scheduledTimeUTC = _momentTimezone.default.tz(scheduledPublishTime, "Europe/Berlin").utc().toISOString();
      if (!existingPerson) {
        var newPerson = new _personPost.default({
          person: _objectSpread(_objectSpread({}, personData), {}, {
            featured: featuredImage,
            createdBy: user.username
          }),
          works: [newWork],
          category,
          visibility
        });
        var savedPerson = yield newPerson.save();
        workId = savedPerson.works[savedPerson.works.length - 1]._id;
        workAction = "created";
      } else {
        existingPerson.works.push(newWork);
        var updatedPerson = yield existingPerson.save();
        workId = updatedPerson.works[updatedPerson.works.length - 1]._id;
        workAction = "added to existing person";
      }

      // Schedule publication if required
      if (publishTime === "Schedule" && scheduledPublishTime) {
        yield _agenda.agenda.schedule(scheduledTimeUTC, "publish work", {
          workId
        });
        publicationStatus = "scheduled for ".concat(scheduledPublishTime);
      } else publicationStatus = "published immediately";
      var message = "Work ".concat(workAction, " and ").concat(publicationStatus, ".");
      return res.status(200).json({
        message: message,
        workId
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error"
      });
    }
  });
  return function addOrUpdatePersonAndWork(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var addNews = exports.addNews = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var _req$files;
    var data;
    try {
      if (typeof req.body.data === "string") {
        data = JSON.parse(req.body.data);
      } else {
        data = req.body;
      }
    } catch (error) {
      return res.status(400).json({
        error: "Invalid JSON data provided."
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
      featuredImage = "".concat(req.protocol, "://").concat(req.get("host"), "/api/uploads/").concat(file.filename);
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
      publishTime: publishTime !== "Schedule" ? new Date() : null,
      scheduledPublishTime,
      externalSource,
      visibility,
      isPublished: isPublished === "true",
      // Convert to boolean if necessary
      featured: featuredImage,
      createdBy: user.username // or user.username, depending on your schema
    };
    try {
      var newsItem = new _news.default(newNewsItem);
      var savedNewsItem = yield newsItem.save();
      if (publishTime === "Schedule" && scheduledPublishTime) {
        var scheduledTimeUTC = _momentTimezone.default.tz(scheduledPublishTime, "Europe/Berlin").utc().toISOString();
        yield _agenda.agenda.schedule(scheduledTimeUTC, "publish news", {
          newsItemId: savedNewsItem._id
        });
      }
      return res.status(201).json(savedNewsItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error"
      });
    }
  });
  return function addNews(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Display details of a specific person
var displayPersonDetails = exports.displayPersonDetails = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var personId = req.params.id; // Assuming the ID is passed as a URL parameter
      var person = yield _personPost.default.findById(personId);
      res.json(person.person); // Send the 'person' subdocument as the response
    } catch (error) {
      console.error("Failed to fetch person details:", error);
      res.status(500).send("Failed to fetch person details");
    }
  });
  return function displayPersonDetails(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Display detailed data of a specific person, including populated works
var displayPersonData = exports.displayPersonData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var personId = req.params.id;
      var person = yield _personPost.default.findById(personId).populate("works");
      res.json(person); // Send the entire person document as the response
    } catch (error) {
      console.error("Failed to fetch person data:", error);
      res.status(500).send("Failed to fetch person data");
    }
  });
  return function displayPersonData(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Display details of all persons
var getAllPersons = exports.getAllPersons = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var persons = yield _personPost.default.find({}, {
        "person.firstName": 1,
        "person.lastName": 1,
        "person.aboutPerson": 1,
        "person.featured": 1,
        "person.createdBy": 1
      });
      res.json(persons); // Send the list of persons as the response
    } catch (error) {
      console.error("Failed to fetch persons:", error);
      res.status(500).send("Failed to fetch persons");
    }
  });
  return function getAllPersons(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Controller to search users by first name and last name
var searchUsersByPartialName = exports.searchUsersByPartialName = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    // Extract query parameter
    var {
      searchQuery
    } = req.query;
    var replaceReg = (0, _replaceDiacritics.replaceDiacritics)(searchQuery);
    var regex = new RegExp(replaceReg, "i");
    try {
      // Use a regular expression for partial, case-insensitive matching
      // The 'i' flag makes the search case-insensitive

      // Search for users where either first name or last name matches the regex
      var users = yield _personPost.default.find({
        $or: [{
          "person.firstName": regex
        }, {
          "person.lastName": regex
        }]
      },
      // Project only specific fields and exclude 'person.aboutPerson'
      {
        "person.firstName": 1,
        "person.lastName": 1,
        "person.featured": 1
        // Do not try to exclude 'person.aboutPerson' here; it's implicitly excluded by not being included.
      }).lean(); // Add

      if (users.length === 0) {
        return res.status(404).json({
          message: "No users found."
        });
      }
      res.json(users);
    } catch (error) {
      console.error("Search users by partial name error:", error);
      res.status(500).json({
        error: "Internal Server Error"
      });
    }
  });
  return function searchUsersByPartialName(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
function deletePost(_x13, _x14) {
  return _deletePost.apply(this, arguments);
}
function _deletePost() {
  _deletePost = _asyncToGenerator(function* (req, res) {
    try {
      // Assuming the post ID to delete is passed as a URL parameter (e.g., /posts/:id)
      var {
        postId
      } = req.params;
      var post = yield _personPost.default.findByIdAndDelete(postId);
      if (!post) {
        return res.status(404).json({
          message: "Post not found."
        });
      }

      // Post deleted successfully
      res.json({
        message: "Post deleted successfully."
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while deleting the post."
      });
    }
  });
  return _deletePost.apply(this, arguments);
}
function deleteMultiplePosts(_x15, _x16) {
  return _deleteMultiplePosts.apply(this, arguments);
}
function _deleteMultiplePosts() {
  _deleteMultiplePosts = _asyncToGenerator(function* (req, res) {
    try {
      // The request should contain an array of post IDs to be deleted
      var {
        postIds
      } = req.body;

      // Perform the delete operation
      var result = yield Post.deleteMany({
        _id: {
          $in: postIds
        }
      });

      // Respond with success message
      // result.deletedCount tells you how many documents were deleted
      res.json({
        message: "".concat(result.deletedCount, " posts have been successfully deleted.")
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while deleting posts."
      });
    }
  });
  return _deleteMultiplePosts.apply(this, arguments);
}