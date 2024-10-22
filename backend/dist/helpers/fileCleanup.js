"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanUpOrphanedFiles = cleanUpOrphanedFiles;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _util = require("util");
var _config = require("./db/config.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Your DB configuration using ES6 imports

var readdir = (0, _util.promisify)(_fs.default.readdir);
var unlink = (0, _util.promisify)(_fs.default.unlink);

/**
 * Cleans up orphaned files in a given directory based on a set of valid filenames.
 * @param {string} directoryPath - The path to the directory where files are stored.
 * @param {Set} validFiles - A set containing all valid filenames that should not be deleted.
 */
function cleanUpOrphanedFiles(_x, _x2) {
  return _cleanUpOrphanedFiles.apply(this, arguments);
}
function _cleanUpOrphanedFiles() {
  _cleanUpOrphanedFiles = _asyncToGenerator(function* (directoryPath, validFiles) {
    try {
      var filesInDirectory = yield readdir(directoryPath);
      var cleanupPromises = filesInDirectory.map(file => {
        if (!validFiles.has(file)) {
          var filePath = _path.default.join(directoryPath, file);
          console.log("Deleting orphaned file: ".concat(filePath));
          return unlink(filePath);
        }
      });
      yield Promise.all(cleanupPromises);
      console.log('Cleanup complete. Orphaned files removed.');
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  });
  return _cleanUpOrphanedFiles.apply(this, arguments);
}
function handleUploadsAndCleanup() {
  return _handleUploadsAndCleanup.apply(this, arguments);
} // Run the function to handle uploads and perform cleanup
function _handleUploadsAndCleanup() {
  _handleUploadsAndCleanup = _asyncToGenerator(function* () {
    // Example of fetching valid filenames from a database
    var [results] = yield (0, _config.query)('SELECT src FROM footer_companies');
    var validFiles = new Set(results.map(result => _path.default.basename(result.src)));

    // Call the cleanup function with the directory path and valid filenames
    yield cleanUpOrphanedFiles('./public/uploads/footer', validFiles);
  });
  return _handleUploadsAndCleanup.apply(this, arguments);
}
handleUploadsAndCleanup();
function performAllCleanups() {
  return _performAllCleanups.apply(this, arguments);
}
function _performAllCleanups() {
  _performAllCleanups = _asyncToGenerator(function* () {
    var footerFiles = yield getValidFilesFromDB('footer_companies');
    var profileFiles = yield getValidFilesFromDB('profile_companies');
    yield cleanUpOrphanedFiles('./public/uploads/footer', footerFiles);
    yield cleanUpOrphanedFiles('./public/uploads/profiles', profileFiles);
    // Add more directories as needed
  });
  return _performAllCleanups.apply(this, arguments);
}
function getValidFilesFromDB(_x3) {
  return _getValidFilesFromDB.apply(this, arguments);
}
function _getValidFilesFromDB() {
  _getValidFilesFromDB = _asyncToGenerator(function* (tableName) {
    var [results] = yield (0, _config.query)("SELECT src FROM ".concat(tableName));
    return new Set(results.map(result => _path.default.basename(result.src)));
  });
  return _getValidFilesFromDB.apply(this, arguments);
}
performAllCleanups();