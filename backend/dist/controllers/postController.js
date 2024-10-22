"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMultipleNewsPosts = exports.addOrUpdatePagesPost = exports.addNews = void 0;
exports.deleteNewsPost = deleteNewsPost;
exports.updateNewsById = exports.getPagePost = exports.getNewsById = exports.getNewsByCategory = exports.getAllNews = void 0;
var _config = _interopRequireDefault(require("../db/config.js"));
var schedule = _interopRequireWildcard(require("node-schedule"));
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Schedules a job to set isPublished to true at a specified UTC time.
 * @param {string} workId - The ID of the work item to publish.
 * @param {Date} scheduledTimeUTC - The UTC time when the work should be published.
 * @param {Pool} dbPool - The database connection pool.
 */

var protocol = process.env.PROTOCOL;
function schedulePublication(_x, _x2, _x3) {
  return _schedulePublication.apply(this, arguments);
} // Add news controller
function _schedulePublication() {
  _schedulePublication = _asyncToGenerator(function* (workId, scheduledTimeUTC, dbPool) {
    schedule.scheduleJob(workId.toString(), scheduledTimeUTC, /*#__PURE__*/_asyncToGenerator(function* () {
      var conn = yield dbPool.getConnection();
      try {
        yield conn.query('UPDATE news SET isPublished = 1 WHERE id = ?', [workId]);
      } catch (error) {} finally {
        if (conn) {
          conn.release();
        }
      }
    }));
  });
  return _schedulePublication.apply(this, arguments);
}
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
    var createdBy = req.user.role;
    var featuredImage;
    if ((_req$files = req.files) !== null && _req$files !== void 0 && (_req$files = _req$files.featuredImage) !== null && _req$files !== void 0 && _req$files[0]) {
      var file = req.files.featuredImage[0];
      featuredImage = "".concat(protocol, "://").concat(req.get('host'), "/api/uploads/").concat(file.filename);
    } else {
      featuredImage = null; // Handle the case where there's no featured image
    }
    var scheduledTimeUTC = _momentTimezone.default.tz(scheduledPublishTime, 'Europe/Berlin').utc().toDate();

    // Current time in UTC as a Date object
    var currentTimeUTC = new Date();
    var validScheduledTime = scheduledTimeUTC > currentTimeUTC;

    // Check if the scheduled time is in the future
    var publishStatus = isPublished;
    if (publishTime === 'Scheduled' && validScheduledTime) {
      publishStatus = false; // Set isPublished to false for future scheduled posts
    } else {
      publishStatus = true;
    }
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var result = yield conn.query('INSERT INTO news (category, title, content, publishTime, scheduledPublishTime, externalSource, visibility, isPublished, featured, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [category, title, content, publishTime, scheduledTimeUTC ? scheduledTimeUTC : null, externalSource, visibility, publishStatus, featuredImage, createdBy]);
      if (!publishStatus && validScheduledTime) {
        // Schedule a job to publish the work at the specified UTC time
        schedulePublication(result.insertId, scheduledTimeUTC, _config.default);
      }
      var newsItemId = result.insertId.toString(); // Convert BigInt to String to prevent serialization error

      res.json(_objectSpread(_objectSpread({}, data), {}, {
        id: newsItemId
      })); // Include the news item ID in the response
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function addNews(_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var getAllNews = exports.getAllNews = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection(); // Assuming 'pool' is your MariaDB connection pool
      var rows = yield conn.query('SELECT * FROM news ORDER BY created_at DESC');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching news items:', error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    } finally {
      if (conn) conn.release(); // always release the connection
    }
  });
  return function getAllNews(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var getNewsById = exports.getNewsById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      var newsId = req.params.id; // Extract the news ID from the request parameters

      conn = yield _config.default.getConnection();
      var rows = yield conn.query('SELECT * FROM news WHERE id = ?', [newsId]);
      if (rows.length === 0) {
        return res.status(404).json({
          message: 'News item not found'
        });
      }
      res.json(rows[0]); // send the first row of the results
    } catch (error) {
      console.error('Error fetching news item:', error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function getNewsById(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
function deleteNewsPost(_x10, _x11) {
  return _deleteNewsPost.apply(this, arguments);
}
function _deleteNewsPost() {
  _deleteNewsPost = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      var {
        postId
      } = req.params; // Assuming the post ID to delete is passed as a URL parameter (e.g., /news/:postId)

      conn = yield _config.default.getConnection();
      var result = yield conn.query('DELETE FROM news WHERE id = ?', [postId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'News post not found.'
        });
      }

      // News post deleted successfully
      res.json({
        message: 'News post deleted successfully.'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while deleting the news post.'
      });
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return _deleteNewsPost.apply(this, arguments);
}
var deleteMultipleNewsPosts = exports.deleteMultipleNewsPosts = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      personIds
    } = req.body;
    var postIds = personIds;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      yield conn.beginTransaction(); // Start transaction

      if (postIds && postIds.length) {
        console.log('Deleting news posts with IDs:', postIds);
        var result = yield conn.query('DELETE FROM news WHERE id IN (?)', [postIds]);
        yield conn.commit(); // Commit the transaction
        console.log("Deleted ".concat(result.affectedRows, " news posts successfully."));
        res.json({
          message: "".concat(result.affectedRows, " news posts have been successfully deleted.")
        });
      } else {
        res.status(400).json({
          message: 'No post IDs provided for deletion.'
        });
      }
    } catch (error) {
      yield conn.rollback(); // Rollback on error
      console.error('Failed to delete multiple news posts:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) {
        conn.release(); // Always release connection
      }
    }
  });
  return function deleteMultipleNewsPosts(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
var addOrUpdatePagesPost = exports.addOrUpdatePagesPost = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var _req$files2;
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
      title,
      content,
      publishTime,
      scheduledPublishTime,
      externalSource,
      visibility,
      isPublished,
      featured,
      category
    } = data;
    var createdBy = req.user.role;
    var featuredImage;
    if ((_req$files2 = req.files) !== null && _req$files2 !== void 0 && (_req$files2 = _req$files2.featuredImage) !== null && _req$files2 !== void 0 && _req$files2[0]) {
      var file = req.files.featuredImage[0];
      featuredImage = "".concat(protocol, "://").concat(req.get('host'), "/api/uploads/").concat(file.filename);
    } else {
      featuredImage = null;
    }
    var conn;
    try {
      conn = yield _config.default.getConnection();
      yield conn.beginTransaction();
      var path = data.category.toLowerCase();
      var [existing] = yield conn.query("SELECT id FROM ".concat(path, " LIMIT 1"));
      var postId = existing ? existing.id : null;
      if (postId) {
        yield conn.query("UPDATE ".concat(path, " SET \n        title=?, content=?, publishTime=?, scheduledPublishTime=?,\n        externalSource=?, visibility=?, isPublished=?, featured=? ,category=?, createdBy=?\n        WHERE id=?"), [title, content, publishTime, scheduledPublishTime ? new Date(scheduledPublishTime) : null, externalSource, visibility, isPublished, featuredImage, category, createdBy, existing.id]);
      } else {
        yield conn.query("INSERT INTO ".concat(path, " \n        (title, content, publishTime, scheduledPublishTime, externalSource, \n        visibility, isPublished, featured, category, createdBy) \n        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, 'admin')"), [title, content, publishTime ? new Date(publishTime) : null, scheduledPublishTime ? new Date(scheduledPublishTime) : null, externalSource, visibility, isPublished, featuredImage, category, createdBy]);
      }
      yield conn.commit();
      res.json({
        message: 'Page post updated successfully'
      });
    } catch (error) {
      yield conn.rollback();
      console.error('Failed to add or update about post:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return function addOrUpdatePagesPost(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

/* export const getPagePost = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT * FROM about LIMIT 1");
    if (rows.length === 0) {
      res.status(404).json({ message: "About post not found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error fetching about post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (conn) conn.release();
  }
};
 */

var getNewsByCategory = exports.getNewsByCategory = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      // Retrieve the 'category' from the query parameters
      var {
        category
      } = req.params;

      // Check if 'category' query parameter is provided
      if (!category) {
        return res.status(400).json({
          message: 'Category parameter is required'
        });
      }
      conn = yield _config.default.getConnection();
      // Using parameterized query to prevent SQL injection
      var query = 'SELECT * FROM news WHERE category = ? ORDER BY created_at DESC';
      var rows = yield conn.query(query, [category]);
      if (rows.length === 0) {
        return res.status(404).json({
          message: 'No news found for this category'
        });
      }
      res.json(rows);
    } catch (error) {
      console.error('Error fetching news items:', error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    } finally {
      if (conn) conn.release(); // Always release the connection
    }
  });
  return function getNewsByCategory(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
var getPagePost = exports.getPagePost = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var category = req.params.category;
    var allowedTables = ['about', 'button1', 'button2']; // list of allowed tables to prevent SQL injection
    var conn;
    if (!allowedTables.includes(category)) {
      return res.status(400).json({
        message: 'Invalid category'
      });
    }
    try {
      conn = yield _config.default.getConnection();
      var safeCategory = conn.escapeId(category); // Escaping identifier to prevent SQL Injection
      var query = "SELECT * FROM ".concat(safeCategory, " LIMIT 1");
      var [rows] = yield conn.query(query, [category]); // Safely passing table name as a parameter

      if (rows.length === 0) {
        res.status(404).json({
          message: "".concat(category, " post not found")
        });
      } else {
        res.json(rows);
      }
    } catch (error) {
      console.error("Error fetching ".concat(category, " post:"), error);
      res.status(500).json({
        message: 'Internal Server Error'
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function getPagePost(_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();
var updateNewsById = exports.updateNewsById = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    var {
      id
    } = req.params;
    var data;
    try {
      data = JSON.parse(req.body.data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return res.status(400).json({
        error: 'Invalid JSON data provided.'
      });
    }
    var {
      title,
      content,
      publishTime,
      isPublished,
      scheduledPublishTime,
      externalSource,
      category,
      featured
    } = data;
    var conn;
    try {
      var _req$files3;
      conn = yield _config.default.getConnection();

      // Optionally fetch the current data first to preserve the existing featured image

      /*    let featuredImage = current?.featured; // Use existing featured image if no new file is uploaded
       */
      var featuredImage;
      if ((_req$files3 = req.files) !== null && _req$files3 !== void 0 && (_req$files3 = _req$files3.featuredImage) !== null && _req$files3 !== void 0 && _req$files3[0]) {
        var file = req.files.featuredImage[0];
        featuredImage = "".concat(protocol, "://").concat(req.get('host'), "/api/uploads/").concat(file.filename);
      } else {
        featuredImage = null; // Or handle keeping the old image if needed
      }
      var scheduledTimeUTC = _momentTimezone.default.tz(scheduledPublishTime, 'Europe/Berlin').utc().toDate();

      // Current time in UTC as a Date object
      var currentTimeUTC = new Date();
      var validScheduledTime = scheduledTimeUTC > currentTimeUTC;

      // Check if the scheduled time is in the future
      var publishStatus = isPublished;
      if (publishTime === 'Scheduled' && validScheduledTime) {
        publishStatus = false; // Set isPublished to false for future scheduled posts
      } else {
        publishStatus = true;
      }
      var query = "\n      UPDATE news SET\n      title = ?,\n      content = ?,\n      featured = ?,\n      publishTime = ?,\n      isPublished = ?,\n      scheduledPublishTime = ?,\n      externalSource = ?,\n      category = ?\n      WHERE id = ?;\n    ";
      var params = [title, content, featuredImage, publishTime, publishStatus, scheduledTimeUTC ? scheduledTimeUTC : null, externalSource, category, id];
      var result = yield conn.query(query, params);
      if (!publishStatus && validScheduledTime) {
        // Schedule a job to publish the work at the specified UTC time
        schedulePublication(params[8], scheduledTimeUTC, _config.default);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'No news post found with given ID'
        });
      }
      res.json({
        message: 'Post updated successfully'
      });
    } catch (error) {
      console.error('Failed to update news post:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function updateNewsById(_x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();