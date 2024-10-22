'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.deleteMultiplePersons =
  exports.deleteMediaById =
  exports.addOrUpdatePersonAndWork =
    void 0;
exports.deletePerson = deletePerson;
exports.uploadPersonBasicFeature =
  exports.uploadMedia =
  exports.updateWorkById =
  exports.updatePersonBasicById =
  exports.searchPersonsByPartialName =
  exports.insertWorkView =
  exports.getWorkWithMediaById =
  exports.getPersonWithWorksById =
  exports.getPersonWithWorksAndMediaById =
  exports.getPersonWithWorksAndMedia =
  exports.getPersonBasicsById =
  exports.getPersonBasics =
  exports.getAllPersonsWithData =
  exports.deleteWorkById =
    void 0;
var _express = _interopRequireDefault(require('express'));
var _multer = _interopRequireDefault(require('multer'));
var _config = _interopRequireDefault(require('../db/config.js'));
var _url = require('url');
var _util = _interopRequireDefault(require('util'));
var _fs = _interopRequireDefault(require('fs'));
var _path = _interopRequireDefault(require('path'));
var _bodyParser = _interopRequireDefault(require('body-parser'));
var schedule = _interopRequireWildcard(require('node-schedule'));
var _momentTimezone = _interopRequireDefault(require('moment-timezone'));
var _slugify = require('../utils/slugify.js');
function _getRequireWildcardCache(e) {
  if ('function' != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || ('object' != typeof e && 'function' != typeof e))
    return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e)
    if ('default' !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
    }
  return (n.default = e), t && t.set(e, n), n;
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'next', n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n);
      }
      _next(void 0);
    });
  };
}
var app = (0, _express.default)();
app.use(
  _bodyParser.default.urlencoded({
    extended: true,
  })
); // o

var _dirname = __dirname;
var unlinkAsync = _util.default.promisify(_fs.default.unlink);
function serializeBigInt(key, value) {
  if (typeof value === 'bigint') {
    return value.toString(); // convert BigInt to string
  } else {
    return value; // return everything else unchanged
  }
}
var protocol = process.env.PROTOCOL;

/**
 * Schedules a job to set isPublished to true at a specified UTC time.
 * @param {string} workId - The ID of the work item to publish.
 * @param {Date} scheduledTimeUTC - The UTC time when the work should be published.
 * @param {Pool} dbPool - The database connection pool.
 */
function schedulePublication(_x, _x2, _x3) {
  return _schedulePublication.apply(this, arguments);
}
function _schedulePublication() {
  _schedulePublication = _asyncToGenerator(function* (
    workId,
    scheduledTimeUTC,
    dbPool
  ) {
    schedule.scheduleJob(
      workId.toString(),
      scheduledTimeUTC,
      /*#__PURE__*/ _asyncToGenerator(function* () {
        var conn = yield dbPool.getConnection();
        console.log(
          'Attempting to publish work ID: '
            .concat(workId, ' at ')
            .concat(new Date().toISOString())
        );
        try {
          yield conn.query('UPDATE works SET isPublished = 1 WHERE id = ?', [
            workId,
          ]);
          console.log('Work with ID '.concat(workId, ' has been published.'));
        } catch (error) {
          console.error('Failed to update publish status:', error);
        } finally {
          if (conn) {
            conn.release();
          }
        }
      })
    );
  });
  return _schedulePublication.apply(this, arguments);
}
var addOrUpdatePersonAndWork = (exports.addOrUpdatePersonAndWork =
  /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(function* (req, res) {
      var conn;
      try {
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
          isPublished,
        } = data;
        conn = yield _config.default.getConnection();
        yield conn.beginTransaction();
        var createdBy = req.user.role; // Use the username from the request object

        var featuredImage =
          req.files && req.files.featuredImage && req.files.featuredImage[0]
            ? ''
                .concat(protocol, '://')
                .concat(req.get('host'), '/api/featured/')
                .concat(req.files.featuredImage[0].filename)
            : null;
        var [existing] = yield conn.query(
          'SELECT id FROM persons WHERE id = ? AND firstName = ? AND lastName = ?',
          [personData.id, personData.firstName, personData.lastName]
        );
        var personId = existing ? existing.id : null;
        if (personId) {
          if (featuredImage) {
            yield conn.query('UPDATE persons SET featured = ? WHERE id = ?', [
              featuredImage,
              personId,
            ]);
          }
        } else {
          console.log('No existing person found, inserting new person'); // Confirm this logic branch
          var result = yield conn.query(
            'INSERT INTO persons (firstName, lastName, aboutPerson, featured, createdBy, category, visibility) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
              personData.firstName,
              personData.lastName,
              personData.aboutPerson,
              featuredImage,
              createdBy,
              category,
              visibility,
            ]
          );
          personId = result.insertId;
        }
        var scheduledTimeUTC = _momentTimezone.default
          .tz(scheduledPublishTime, 'Europe/Berlin')
          .utc()
          .toDate();

        // Current time in UTC as a Date object
        var currentTimeUTC = new Date();
        var validScheduledTime = scheduledTimeUTC > currentTimeUTC;

        // Check if the scheduled time is in the future
        var publishStatus = isPublished;
        if (publishTime === 'Scheduled' && validScheduledTime) {
          publishStatus = false; // Set isPublished to false for future scheduled posts
        }
        var workResult = yield conn.query(
          'INSERT INTO works (person_id, title, content, publishTime, scheduledPublishTime, externalSource, visibility, isPublished, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            personId,
            title,
            content,
            publishTime,
            scheduledTimeUTC ? scheduledTimeUTC : null,
            externalSource || null,
            visibility,
            publishStatus,
            createdBy,
          ]
        );
        var workId = workResult.insertId;
        var fullName =
          personData &&
          (0, _slugify.slugify)(
            ''.concat(personData.firstName, '-').concat(personData.lastName)
          );
        if (!publishStatus && validScheduledTime) {
          // Schedule a job to publish the work at the specified UTC time
          schedulePublication(workId, scheduledTimeUTC, _config.default);
        }
        var media = {
          images: [],
          videos: [],
          audios: [],
          documents: [],
        };
        ['images', 'videos', 'audios', 'documents'].forEach((type) => {
          if (req.files && req.files[type]) {
            req.files[type].forEach((file) => {
              var filePath = ''
                .concat(protocol, '://')
                .concat(req.get('host'), '/api/person-of-interest/')
                .concat(fullName, '/')
                .concat((0, _slugify.slugify)(title), '/')
                .concat(type, '/')
                .concat((0, _slugify.slugify)(file.originalname));
              media[type].push({
                url: filePath,
                name: file.originalname,
                fileType: file.mimetype,
                type,
              });
              conn.query(
                'INSERT INTO media (work_id, url, name, fileType, type) VALUES (?, ?, ?, ?, ?)',
                [workId, filePath, file.originalname, file.mimetype, type]
              );
            });
          }
        });
        yield conn.commit();
        res.json({
          message: 'Person and work added/updated successfully',
          personId: personId.toString(),
          // Handle BigInt correctly
          workId: workId.toString(),
        });
      } catch (error) {
        if (conn) {
          yield conn.rollback();
          conn.release();
        }
        console.error('Failed to add/update person and work:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release();
          console.log('Connection released.');
        }
      }
    });
    return function addOrUpdatePersonAndWork(_x4, _x5) {
      return _ref.apply(this, arguments);
    };
  })());
var searchPersonsByPartialName = (exports.searchPersonsByPartialName =
  /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(function* (req, res) {
      var { searchQuery } = req.query;
      var conn;
      try {
        conn = yield _config.default.getConnection();
        var query =
          "\n      SELECT id, firstName, lastName, featured\n      FROM persons\n      WHERE CONCAT(firstName, ' ', lastName) LIKE CONCAT('%', ?, '%')\n        OR firstName LIKE CONCAT('%', ?, '%')\n        OR lastName LIKE CONCAT('%', ?, '%');\n    ";
        var results = yield conn.query(query, [
          searchQuery,
          searchQuery,
          searchQuery,
        ]);
        if (!results) {
          res.status(404).json({
            message: 'No users found.',
          });
          return;
        }
        if (Array.isArray(results)) {
          var users = results.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            featured: user.featured,
          }));
          res.json(users);
        } else {
          res.status(500).json({
            message: 'Error processing results.',
          });
        }
      } catch (error) {
        console.error('Search users by partial name error:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release();
        }
      }
    });
    return function searchPersonsByPartialName(_x6, _x7) {
      return _ref2.apply(this, arguments);
    };
  })());
var getAllPersonsWithData = (exports.getAllPersonsWithData =
  /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(function* (req, res) {
      var conn;
      try {
        conn = yield _config.default.getConnection();
        var query =
          '\n            SELECT \n                p.id as person_id,\n                p.firstName,\n                p.lastName,\n                p.aboutPerson,\n                p.featured,\n                p.createdBy,\n                p.created_at,\n                w.id as work_id,\n                w.title,\n                w.content,\n                w.publishTime,\n                w.isPublished,\n                w.scheduledPublishTime,\n                w.externalSource,\n                m.id as media_id,\n                m.url,\n                m.name,\n                m.fileType\n            FROM \n                persons p\n            LEFT JOIN \n                works w ON p.id = w.person_id\n            LEFT JOIN \n                media m ON w.id = m.work_id;\n        ';
        var rows = yield conn.query(query);
        res.json(rows);
      } catch (error) {
        console.error('Failed to retrieve persons:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release();
        }
      }
    });
    return function getAllPersonsWithData(_x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  })());
var getPersonBasics = (exports.getPersonBasics = /*#__PURE__*/ (function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var query =
        '\n            SELECT\n                id,\n                firstName,\n                lastName,\n                featured,\n                aboutPerson,\n                createdBy\n            FROM \n                persons;\n        ';
      var rows = yield conn.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Failed to retrieve person basics:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message,
      });
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return function getPersonBasics(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
})());
var deleteMultiplePersons = (exports.deleteMultiplePersons =
  /*#__PURE__*/ (function () {
    var _ref5 = _asyncToGenerator(function* (req, res) {
      var { personIds } = req.body; // Expect an array of person IDs

      var conn;
      try {
        conn = yield _config.default.getConnection();
        yield conn.beginTransaction(); // Start transaction

        // Log the query for debugging
        console.log('Deleting works for persons IDs:', personIds);
        yield conn.query('DELETE FROM works WHERE person_id IN (?)', [
          personIds,
        ]);

        // Log the query for debugging
        console.log('Deleting persons with IDs:', personIds);
        var result = yield conn.query('DELETE FROM persons WHERE id IN (?)', [
          personIds,
        ]);
        yield conn.commit(); // Commit the transaction
        console.log(
          'Deleted '.concat(result.affectedRows, ' persons successfully.')
        );
        res.json({
          message: ''.concat(
            result.affectedRows,
            ' persons and their works have been successfully deleted.'
          ),
        });
      } catch (error) {
        yield conn.rollback(); // Rollback on error
        console.error('Failed to delete multiple persons:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release(); // Always release connection
        }
      }
    });
    return function deleteMultiplePersons(_x12, _x13) {
      return _ref5.apply(this, arguments);
    };
  })());
var getPersonWithWorksAndMedia = (exports.getPersonWithWorksAndMedia =
  /*#__PURE__*/ (function () {
    var _ref6 = _asyncToGenerator(function* (req, res) {
      var conn;
      try {
        conn = yield _config.default.getConnection();
        // Query to get all persons, their works, and media. Adjust table and column names as necessary.
        var query =
          '\n            SELECT p.id as personId, p.firstName, p.lastName, p.aboutPerson, w.id as workId, w.title, w.content, w.publishTime, w.isPublished, w.scheduledPublishTime, w.externalSource,\n                   m.id as mediaId, m.url, m.name as mediaName, m.fileType, m.type as mediaType\n            FROM persons p\n            LEFT JOIN works w ON p.id = w.person_id\n            LEFT JOIN media m ON w.id = m.work_id\n            ORDER BY p.id, w.id, m.id;\n        ';
        var results = yield conn.query(query);
        conn.release(); // Always release connection

        // Process the flat SQL results into nested JSON format
        var personsMap = new Map();
        results.forEach((row) => {
          if (!personsMap.has(row.personId)) {
            personsMap.set(row.personId, {
              id: row.personId,
              firstName: row.firstName,
              lastName: row.lastName,
              aboutPerson: row.aboutPerson,
              works: [],
            });
          }
          var person = personsMap.get(row.personId);
          var work = person.works.find((w) => w.id === row.workId);
          if (!work) {
            work = {
              id: row.workId,
              title: row.title,
              content: row.content,
              publishTime: row.publishTime,
              isPublished: row.isPublished,
              scheduledPublishTime: row.scheduledPublishTime,
              externalSource: row.externalSource,
              media: [],
            };
            person.works.push(work);
          }
          if (row.mediaId) {
            var mediaItem = {
              id: row.mediaId,
              url: row.url,
              name: row.mediaName,
              fileType: row.fileType,
              type: row.mediaType,
            };
            work.media.push(mediaItem);
          }
        });

        // Convert Map to array
        var persons = Array.from(personsMap.values());
        res.json(persons);
      } catch (error) {
        console.error('Failed to retrieve person data:', error);
        if (conn) conn.release();
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      }
    });
    return function getPersonWithWorksAndMedia(_x14, _x15) {
      return _ref6.apply(this, arguments);
    };
  })());
var updatePersonBasicById = (exports.updatePersonBasicById =
  /*#__PURE__*/ (function () {
    var _ref7 = _asyncToGenerator(function* (req, res) {
      var conn;
      try {
        conn = yield _config.default.getConnection();
        var { personId } = req.params;
        var data = JSON.parse(req.body.data);
        var { firstName, lastName, aboutPerson, featured } = data;
        var featuredImage = req.file
          ? ''
              .concat(protocol, '://')
              .concat(req.get('host'), '/api/featured/')
              .concat(req.file.filename)
          : featured;
        var query =
          '\n            UPDATE persons\n            SET firstName = ?,\n                lastName = ?,\n                featured = ?,\n                aboutPerson = ?\n            WHERE id = ?;\n        ';
        // Execute the update operation using parameterized query
        var result = yield conn.query(query, [
          firstName,
          lastName,
          featuredImage,
          aboutPerson,
          personId,
        ]);
        if (result.affectedRows === 0) {
          res.status(404).json({
            error: 'Person not found or no change made',
          });
        } else {
          res.json({
            message: 'Person updated successfully',
            personId: personId,
            imageUrl: featuredImage,
          });
        }
      } catch (error) {
        console.error('Failed to update person by ID:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release();
        }
      }
    });
    return function updatePersonBasicById(_x16, _x17) {
      return _ref7.apply(this, arguments);
    };
  })());

// Configure multer to use a file name based on personId
var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/featured/'); // Directory where files are saved
  },
  filename: function filename(req, file, cb) {
    var extension = file.originalname.split('.').pop();
    var personId = req.params.personId;
    // Assuming personId is in the route parameters
    cb(null, 'person-'.concat(personId, '.').concat(extension));
  },
});
var uploadPersonBasicFeature = (exports.uploadPersonBasicFeature = (0,
_multer.default)({
  storage: storage,
}));
var getPersonBasicsById = (exports.getPersonBasicsById =
  /*#__PURE__*/ (function () {
    var _ref8 = _asyncToGenerator(function* (req, res) {
      var conn;
      try {
        conn = yield _config.default.getConnection();
        var { personId } = req.params; // Assuming the ID is passed in the route parameter

        var query =
          '\n            SELECT\n                id,\n                firstName,\n                lastName,\n                featured,\n                aboutPerson,\n                scheduledPublishTime\n            FROM \n                persons\n            WHERE\n                id = ?;\n        ';
        var rows = yield conn.query(query, [personId]); // Using parameterized queries to prevent SQL injection

        if (rows.length) {
          res.json(rows[0]); // Send back the first row if found
        } else {
          res.status(404).json({
            error: 'Person not found',
          });
        }
      } catch (error) {
        console.error('Failed to retrieve person by ID:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release();
        }
      }
    });
    return function getPersonBasicsById(_x18, _x19) {
      return _ref8.apply(this, arguments);
    };
  })());
var getPersonWithWorksById = (exports.getPersonWithWorksById =
  /*#__PURE__*/ (function () {
    var _ref9 = _asyncToGenerator(function* (req, res) {
      var { personId } = req.params;
      var conn;
      try {
        conn = yield _config.default.getConnection();
        var query =
          '\n  SELECT \n    p.id AS personId, p.firstName, p.lastName, p.aboutPerson, p.featured,\n    w.id AS workId, w.title\n  FROM persons p\n  LEFT JOIN works w ON p.id = w.person_id\n  WHERE p.id = ?\n  ORDER BY w.scheduledPublishTime DESC;\n';
        var rows = yield conn.query(query, [personId]);
        if (!rows.length) {
          return res.status(404).json({
            error: 'Person not found',
          });
        }

        // Build the response object
        var response = {
          personId: personId,
          firstName: rows[0].firstName,
          lastName: rows[0].lastName,
          aboutPerson: rows[0].aboutPerson,
          featured: rows[0].featured,
          works: [],
        };
        rows.forEach((row) => {
          if (row.workId) {
            // Ensuring that there is a work associated with the person
            response.works.push({
              workId: row.workId,
              title: row.title,
            });
          }
        });
        res.json(response);
      } catch (error) {
        console.error('Failed to retrieve person with works:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release();
        }
      }
    });
    return function getPersonWithWorksById(_x20, _x21) {
      return _ref9.apply(this, arguments);
    };
  })());

// Assuming you use Node.js and MySQL/MariaDB driver

var insertWorkView = (exports.insertWorkView = /*#__PURE__*/ (function () {
  var _ref10 = _asyncToGenerator(function* (workId, ipAddress) {
    var today = new Date().toISOString().slice(0, 10); // Format today's date as YYYY-MM-DD

    var conn;
    try {
      conn = yield _config.default.getConnection();
      // Check if the view already exists for today

      // Increment the work view count
      var updateQuery =
        '\n                UPDATE works SET work_view_count = work_view_count + 1 WHERE id = ?\n            ';
      yield conn.query(updateQuery, [workId]);
    } catch (error) {
      console.error('Failed to log work view:', error);
      throw error; // Rethrowing the error for caller to handle
    } finally {
      conn.release();
    }
  });
  return function insertWorkView(_x22, _x23) {
    return _ref10.apply(this, arguments);
  };
})());
var getPersonWithWorksAndMediaById = (exports.getPersonWithWorksAndMediaById =
  /*#__PURE__*/ (function () {
    var _ref11 = _asyncToGenerator(function* (req, res) {
      var { personId } = req.params; // assuming person ID is sent as a URL parameter
      var ipAddress = req.ip; // Get the IP address from the request
      var today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

      var conn;
      try {
        var _rows$, _rows$2, _rows$3, _rows$4, _rows$5, _rows$6, _rows$7;
        conn = yield _config.default.getConnection();
        var incrementViewCount =
          '\n      UPDATE persons SET view_count = view_count + 1 WHERE id = ?\n    ';
        yield conn.query(incrementViewCount, [personId]);

        // Query to fetch person details, works, and associated media
        var query =
          '\n  SELECT p.id AS personId, p.firstName, p.lastName, p.aboutPerson, p.featured, p.created_at,p.view_count,\n         p.scheduledPublishTime AS personScheduledPublishTime, -- Aliased to personScheduledPublishTime\n         w.id AS workId, w.title, w.content, w.publishTime, w.isPublished,\n         w.scheduledPublishTime AS workScheduledPublishTime, -- Aliased to workScheduledPublishTime\n         w.externalSource, w.work_view_count, \n         m.id AS mediaId, m.url, m.name AS mediaName, m.fileType, m.type\n  FROM persons p\n  LEFT JOIN works w ON p.id = w.person_id\n  LEFT JOIN media m ON w.id = m.work_id\n  WHERE p.id = ?\n  ORDER BY w.scheduledPublishTime DESC, m.id;\n';
        var rows = yield conn.query(query, [personId]);

        // Formatting the response to include media sorted by type under each work
        var response = {
          personId: personId,
          firstName:
            (_rows$ = rows[0]) === null || _rows$ === void 0
              ? void 0
              : _rows$.firstName,
          lastName:
            (_rows$2 = rows[0]) === null || _rows$2 === void 0
              ? void 0
              : _rows$2.lastName,
          aboutPerson:
            (_rows$3 = rows[0]) === null || _rows$3 === void 0
              ? void 0
              : _rows$3.aboutPerson,
          featured:
            (_rows$4 = rows[0]) === null || _rows$4 === void 0
              ? void 0
              : _rows$4.featured,
          scheduledPublishTime:
            (_rows$5 = rows[0]) === null || _rows$5 === void 0
              ? void 0
              : _rows$5.personScheduledPublishTime,
          createdAt:
            (_rows$6 = rows[0]) === null || _rows$6 === void 0
              ? void 0
              : _rows$6.created_at,
          personViewCount:
            (_rows$7 = rows[0]) === null || _rows$7 === void 0
              ? void 0
              : _rows$7.view_count,
          works: [],
        };
        var currentWorkId = null;
        var work = {};
        rows.forEach((row) => {
          if (currentWorkId !== row.workId) {
            if (currentWorkId !== null) {
              response.works.push(work);
            }
            currentWorkId = row.workId;
            work = {
              workId: row.workId,
              title: row.title,
              content: row.content,
              publishTime: row.publishTime,
              isPublished: row.isPublished,
              scheduledPublishTime: row.workScheduledPublishTime,
              work_view_count: row.work_view_count,
              externalSource: row.externalSource,
              media: {
                images: [],
                videos: [],
                audios: [],
                documents: [],
              },
            };
          }
          if (row.mediaId) {
            work.media[row.type].push({
              mediaId: row.mediaId,
              url: row.url,
              name: row.mediaName,
              fileType: row.fileType,
            });
          }
        });
        if (work.workId) {
          response.works.push(work);
        }
        res.json(response);
      } catch (error) {
        console.error('Failed to retrieve person with works and media:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) conn.release();
      }
    });
    return function getPersonWithWorksAndMediaById(_x24, _x25) {
      return _ref11.apply(this, arguments);
    };
  })());

// Assuming you are using something like MySQL or PostgreSQL and have a connection pool configured
var deleteWorkById = (exports.deleteWorkById = /*#__PURE__*/ (function () {
  var _ref12 = _asyncToGenerator(function* (req, res) {
    var { workId } = req.params;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var result = yield conn.query('DELETE FROM works WHERE id = ?', [workId]);
      if (result.affectedRows > 0) {
        res.json({
          message: 'Work deleted successfully',
        });
      } else {
        res.status(404).json({
          error: 'Work not found',
        });
      }
    } catch (error) {
      console.error('Failed to delete work by ID:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message,
      });
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return function deleteWorkById(_x26, _x27) {
    return _ref12.apply(this, arguments);
  };
})());
var getWorkWithMediaById = (exports.getWorkWithMediaById =
  /*#__PURE__*/ (function () {
    var _ref13 = _asyncToGenerator(function* (req, res) {
      var { workId } = req.params; // Get work ID from URL parameters

      var conn;
      try {
        conn = yield _config.default.getConnection();
        var query =
          '\n      SELECT w.id, w.title, w.content, w.person_id, w.publishTime, w.isPublished, w.scheduledPublishTime, w.externalSource, w.work_view_count, \n             m.id AS mediaId, m.url, m.name AS mediaName, m.fileType, m.type\n      FROM works w\n      LEFT JOIN media m ON w.id = m.work_id\n      WHERE w.id = ?;\n    ';
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
            // Adding scheduled publish time
            externalSource: rows[0].externalSource,
            work_view_count: rows[0].work_view_count,
            media: {
              images: [],
              videos: [],
              audios: [],
              documents: [],
            },
          };

          // Iterate over each row to populate the media arrays by type
          rows.forEach((row) => {
            if (row.mediaId) {
              var mediaType = row.type.toLowerCase(); // assuming 'type' is something like 'image', 'video', etc.
              if (workDetails.media.hasOwnProperty(mediaType)) {
                workDetails.media[mediaType].push({
                  mediaId: row.mediaId,
                  url: row.url,
                  name: row.mediaName,
                  fileType: row.fileType,
                });
              } else {
                // In case there are types not predefined
                workDetails.media[mediaType] = [
                  {
                    mediaId: row.mediaId,
                    url: row.url,
                    name: row.mediaName,
                    fileType: row.fileType,
                  },
                ];
              }
            }
          });
          res.json(workDetails); // Send the detailed work data back to the client
        } else {
          res.status(404).json({
            error: 'Work not found',
          });
        }
      } catch (error) {
        console.error('Failed to retrieve work by ID:', error);
        res.status(500).json({
          error: 'Internal Server Error',
          details: error.message,
        });
      } finally {
        if (conn) {
          conn.release(); // Always release connection
        }
      }
    });
    return function getWorkWithMediaById(_x28, _x29) {
      return _ref13.apply(this, arguments);
    };
  })());
var mediaStorage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    var destPath;
    var { title } = req.params;
    var { fullName } = req.params;
    var slugifyTitle = req.workTitle
      ? req.workTitle
      : (0, _slugify.slugify)(title);
    var slugifyName = fullName && (0, _slugify.slugify)(fullName);
    if (file.fieldname === 'featuredImage') {
      // Special destination for featured imagesedit
      destPath = _path.default.join(_dirname, '../public', 'featured');
    } else {
      var fileType = file.mimetype.split('/')[0];
      var folderMap = {
        image: 'images',
        video: 'videos',
        audio: 'audios',
        application: 'documents',
      };
      var folderName = folderMap[fileType] || 'others';
      destPath = _path.default.join(
        _dirname,
        '../public/works/person-of-interest/' + slugifyName,
        slugifyTitle,
        folderName
      );
    }
    _fs.default.mkdir(
      destPath,
      {
        recursive: true,
      },
      (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, destPath);
      }
    );
  },
  filename: function filename(req, file, cb) {
    if (file.fieldname === 'featuredImage') {
      // Different filename format for featured images
      var extension = _path.default.extname(file.originalname);
      cb(null, 'person-'.concat(file.originalname));
      /* cb(null, `person-${file.originalname}`); */
    } else {
      // General case for other file types
      var slugifiedName = (0, _slugify.slugify)(file.originalname);
      cb(null, ''.concat(slugifiedName));
    }
  },
});
var uploadMedia = (exports.uploadMedia = (0, _multer.default)({
  storage: mediaStorage,
  limits: {
    fileSize: 10000000000000,
  },
  fileFilter: function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([
  {
    name: 'images',
    maxCount: 20,
  },
  {
    name: 'videos',
    maxCount: 20,
  },
  {
    name: 'audios',
    maxCount: 20,
  },
  {
    name: 'documents',
    maxCount: 20,
  },
  {
    name: 'featuredImage',
    maxCount: 20,
  },
]));

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  var filetypes = /jpeg|jpg|png|gif|mp4|avi|mpeg|mp3|wav|pdf|doc|mov|docx/;
  // Check ext
  var extname = filetypes.test(
    _path.default.extname(file.originalname).toLowerCase()
  );
  // Check mime
  var mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Files Only!');
  }
}

// controllers/workController.js
var updateWorkById = (exports.updateWorkById = /*#__PURE__*/ (function () {
  var _ref14 = _asyncToGenerator(function* (req, res) {
    var { workId } = req.params;
    var {
      title,
      content,
      publishTime,
      isPublished,
      scheduledPublishTime,
      externalSource,
      category,
    } = req.body;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var query =
        '\n        UPDATE works SET\n        title = ?,\n        content = ?,\n        publishTime = ?,\n        isPublished = ?,\n        scheduledPublishTime = ?,\n        externalSource = ?,\n        category = ?\n        WHERE id = ?;\n        ';
      var result = yield conn.query(query, [
        title,
        content,
        publishTime,
        isPublished,
        scheduledPublishTime,
        externalSource,
        category,
        workId,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'No work found with given ID',
        });
      }
      res.json({
        message: 'Work updated successfully',
      });
    } catch (error) {
      console.error('Failed to update work:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message,
      });
    } finally {
      if (conn) conn.release();
    }
  });
  return function updateWorkById(_x30, _x31) {
    return _ref14.apply(this, arguments);
  };
})());

// Import necessary modules
function removeEmptyDirectories(_x32) {
  return _removeEmptyDirectories.apply(this, arguments);
}
function _removeEmptyDirectories() {
  _removeEmptyDirectories = _asyncToGenerator(function* (directory) {
    try {
      var files = yield _fs.default.promises.readdir(directory);
      if (files.length === 0) {
        yield _fs.default.promises.rmdir(directory);
        console.log('Removed empty directory: '.concat(directory));
        // Optionally, recurse to remove parent directories if also empty
        yield removeEmptyDirectories(_path.default.dirname(directory));
      }
    } catch (err) {
      console.error('Error removing directory '.concat(directory, ':'), err);
    }
  });
  return _removeEmptyDirectories.apply(this, arguments);
}
var deleteMediaById = (exports.deleteMediaById = /*#__PURE__*/ (function () {
  var _ref15 = _asyncToGenerator(function* (req, res) {
    var { mediaId } = req.params;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var result = yield conn.query('SELECT url FROM media WHERE id = ?', [
        mediaId,
      ]);

      // Check if any media was found
      if (result.length === 0) {
        return res.status(404).json({
          message: 'Media not found',
        });
      }
      var media = result[0]; // Assuming the result is an array of objects

      // Assuming your server's public directory is set up to serve files from "public"
      var urlPath = new URL(media.url).pathname; // Extracts the path from the URL

      var localPath = _path.default.join(
        _dirname,
        '../public/works',
        urlPath.substring(1)
      ); // Adjust as necessary to match your directory structure

      // Proceed with file deletion
      try {
        yield _fs.default.promises.unlink(localPath);
        yield removeEmptyDirectories(_path.default.dirname(localPath));
      } catch (fileError) {
        // Handle specific file system errors, e.g., file not found
        if (fileError.code === 'ENOENT') {
          console.log(
            'No such file to delete, but continuing with DB deletion'
          );
        } else {
          throw fileError; // Rethrow the error if it is not a 'file not found' error
        }
      }
      yield conn.query('DELETE FROM media WHERE id = ?', [mediaId]);
      res.json({
        message: 'Media deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete media:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message,
      });
    } finally {
      if (conn) yield conn.end();
    }
  });
  return function deleteMediaById(_x33, _x34) {
    return _ref15.apply(this, arguments);
  };
})());
function deletePerson(_x35, _x36) {
  return _deletePerson.apply(this, arguments);
}
function _deletePerson() {
  _deletePerson = _asyncToGenerator(function* (req, res) {
    var { personId } = req.params;
    var conn;
    try {
      conn = yield _config.default.getConnection();
      yield conn.beginTransaction();

      // Get the URLs of all files associated with the person's works
      var files = yield conn.query(
        'SELECT media.url FROM media JOIN works ON works.id = media.work_id WHERE works.person_id = ?;',
        [personId]
      );

      // Check if there are files to delete
      if (files.length > 0) {
        var deletePromises = files.map(
          /*#__PURE__*/ (function () {
            var _ref17 = _asyncToGenerator(function* (file) {
              try {
                // Resolve the file path from the URL
                var filePath = _path.default.resolve(
                  _dirname,
                  '../public/works',
                  new URL(file.url).pathname.substring(1)
                );

                // Attempt to delete the file
                yield unlinkAsync(filePath);

                // Attempt to remove any empty directories after the file deletion
                yield removeEmptyDirectories(_path.default.dirname(filePath));
              } catch (err) {
                console.error(
                  'Error processing file URL '.concat(file.url, ':'),
                  err
                );
                return Promise.resolve(); // Resolve to avoid breaking Promise.all
              }
            });
            return function (_x37) {
              return _ref17.apply(this, arguments);
            };
          })()
        );
        yield Promise.all(deletePromises);
      } else {
        console.log(
          'No files found for person, but continuing to delete person'
        );
      }

      // Delete the person; assuming cascade deletes are setup to handle works/media
      var personDeleteResult = yield conn.query(
        'DELETE FROM persons WHERE id = ?',
        [personId]
      );
      if (personDeleteResult.affectedRows === 0) {
        yield conn.rollback();
        return res.status(404).json({
          message: 'Person not found.',
        });
      }
      yield conn.commit();
      res.json({
        message:
          'Person deleted successfully along with associated files (if any).',
      });
    } catch (error) {
      console.error(
        'An error occurred while deleting the person and files:',
        error
      );
      yield conn.rollback();
      res.status(500).json({
        message: 'An error occurred while deleting the person and files.',
      });
    } finally {
      if (conn) {
        conn.release();
      }
    }
  });
  return _deletePerson.apply(this, arguments);
}
