"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../middleware/auth.js");
var _personController = require("../controllers/personController.js");
var _config = _interopRequireDefault(require("../db/config.js"));
var _slugify = require("../utils/slugify.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = _express.default.Router();
function fetchTitle(_x, _x2, _x3) {
  return _fetchTitle.apply(this, arguments);
}
function _fetchTitle() {
  _fetchTitle = _asyncToGenerator(function* (req, res, next) {
    var workId = req.params.workId;
    try {
      var [rows, fields] = yield _config.default.query("SELECT title FROM works WHERE id = ?", [workId]);
      if (!rows || rows.length === 0) {
        return res.status(404).json({
          error: "Work not found"
        });
      }
      req.workTitle = (0, _slugify.slugify)(rows.title);
      next();
    } catch (error) {
      console.error("Failed to fetch title:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message
      });
    }
  });
  return _fetchTitle.apply(this, arguments);
}
router.get("/basic", _personController.getPersonBasics);
router.get("/list", _personController.getAllPersonsWithData);
// Route to delete multiple persons

router.get("/data", _personController.getPersonWithWorksAndMedia);
router.get("/find", _personController.searchPersonsByPartialName);
router.post("/delete-multiply", _auth.verifyToken, _personController.deleteMultiplePersons);
router.get("/:personId", _personController.getPersonWithWorksById);
router.put("/:personId", _personController.uploadPersonBasicFeature.single("featuredImage"), _personController.updatePersonBasicById);
router.route("/:title/:fullName").post(_auth.verifyToken, _personController.uploadMedia, _personController.addOrUpdatePersonAndWork);
router.delete("/media/:mediaId", _personController.deleteMediaById);

// POST route to handle media uploads for a specific work
router.post("/work/:workId/:fullName/media", fetchTitle, _personController.uploadMedia, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var workId = req.params.workId;
    var media = {
      images: [],
      videos: [],
      audios: [],
      documents: []
    };
    var title = req.workTitle;
    var {
      fullName
    } = req.params;
    var slugifyFullName = (0, _slugify.slugify)(fullName);
    var conn;
    try {
      conn = yield _config.default.getConnection(); // Ensure pool is defined and imported properly

      var promises = [];
      ["images", "videos", "audios", "documents"].forEach(type => {
        if (req.files && req.files[type]) {
          req.files[type].forEach(file => {
            var url = "".concat(req.protocol, "://").concat(req.get("host"), "/api/person-of-interest/").concat(slugifyFullName, "/").concat((0, _slugify.slugify)(title), "/").concat(type, "/").concat((0, _slugify.slugify)(file.originalname));
            var mediaItem = {
              url: url,
              name: file.originalname,
              fileType: file.mimetype,
              type: type
            };
            media[type].push(mediaItem);
            promises.push(conn.query("INSERT INTO media (work_id, url, name, fileType, type) VALUES (?, ?, ?, ?, ?)", [workId, url, file.originalname, file.mimetype, type]).then(insertResult => {
              mediaItem.mediaId = insertResult.insertId.toString();
            }));
          });
        }
      });
      yield Promise.all(promises);
      res.json({
        message: "Media files uploaded successfully",
        media: media
      });
    } catch (error) {
      console.error("Failed to upload and record media:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message
      });
    } finally {}
  });
  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());
function fetchWorkDetails(_x6, _x7) {
  return _fetchWorkDetails.apply(this, arguments);
}
function _fetchWorkDetails() {
  _fetchWorkDetails = _asyncToGenerator(function* (workId, conn) {
    var query = "\n    SELECT w.id, w.title, w.content, w.person_id, w.publishTime, w.isPublished, w.scheduledPublishTime, w.externalSource, w.work_view_count,\n           m.id AS mediaId, m.url, m.name AS mediaName, m.fileType, m.type\n    FROM works w\n    LEFT JOIN media m ON w.id = m.work_id\n    WHERE w.id = ?;\n  ";
    var rows = yield conn.query(query, [workId]);
    if (rows.length > 0) {
      var workDetails = {
        id: rows[0].id,
        title: rows[0].title,
        content: rows[0].content,
        person_id: rows[0].person_id,
        publishTime: rows[0].publishTime,
        isPublished: rows[0].isPublished,
        scheduledPublishTime: rows[0].scheduledPublishTime,
        externalSource: rows[0].externalSource,
        work_view_count: rows[0].work_view_count,
        media: {
          images: [],
          videos: [],
          audios: [],
          documents: []
        }
      };
      rows.forEach(row => {
        if (row.mediaId) {
          var mediaType = row.type.toLowerCase();
          if (workDetails.media.hasOwnProperty(mediaType)) {
            workDetails.media[mediaType].push({
              mediaId: row.mediaId,
              url: row.url,
              name: row.mediaName,
              fileType: row.fileType
            });
          }
        }
      });
      return workDetails;
    } else {
      throw new Error("Work not found");
    }
  });
  return _fetchWorkDetails.apply(this, arguments);
}
router.get("/works/:workId", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    if (!req.params || !req.params.workId) {
      return res.status(400).send("Work ID is required");
    }
    var {
      workId
    } = req.params;
    var ipAddress = req.ip;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      // Record the view

      yield (0, _personController.insertWorkView)(workId, ipAddress);

      // Fetch and send the work details
      var workDetails = yield fetchWorkDetails(workId, conn);
      res.json(workDetails);
    } catch (error) {
      console.error("Error handling request for work details:", error);
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message
      });
    }
  });
  return function (_x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/data/:personId", _personController.getPersonWithWorksAndMediaById);
router.get("/work/:workId", _personController.getWorkWithMediaById);
router.put("/work/:workId/:fullName", _personController.updateWorkById);
router.delete("/work/:workId", _personController.deleteWorkById);
// Route to delete a single person
router.delete("/:personId", _personController.deletePerson);
var _default = exports.default = router;