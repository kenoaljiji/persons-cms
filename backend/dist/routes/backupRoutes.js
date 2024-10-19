'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = exports.backupBackend = void 0;
var _express = _interopRequireDefault(require('express'));
var _http = require('http');
var _fs = _interopRequireDefault(require('fs'));
var _path = _interopRequireDefault(require('path'));
var _archiver = _interopRequireDefault(require('archiver'));
var _util = require('util');
var _stream = require('stream');
var _config = _interopRequireDefault(require('../db/config.js'));
var _expressWs = _interopRequireDefault(require('express-ws'));
var _url = require('url');
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
var streamFinished = (0, _util.promisify)(_stream.finished);
var router = _express.default.Router();
(0, _expressWs.default)(router); // Initialize WebSocket on the router

var _filename = __filename;
var _dirname = _path.default.dirname(_filename);
var app = (0, _express.default)();
var server = (0, _http.createServer)(app); // Use createServer from 'http' module
(0, _expressWs.default)(app, server);
var backupDatabase = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(function* () {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var tables = yield conn.query('SHOW TABLES');
      var rootDir = _path.default.join(_dirname, '../'); // Adjust according to where your script is located
      var backupDir = _path.default.join(rootDir, 'backups');
      if (!_fs.default.existsSync(backupDir)) {
        _fs.default.mkdirSync(backupDir, {
          recursive: true,
        });
      }
      var backupPath = _path.default.join(
        backupDir,
        'backup-'.concat(new Date().toISOString().slice(0, 10), '.sql')
      );
      var stream = _fs.default.createWriteStream(backupPath, {
        encoding: 'utf-8',
      });
      var _loop = function* _loop() {
        var tableName = Object.values(tableInfo)[0];
        var data = yield conn.query('SELECT * FROM '.concat(tableName));
        if (data.length > 0) {
          var keys = Object.keys(data[0]);
          stream.write('-- Data for table '.concat(tableName, '\n'));
          data.forEach((row) => {
            var values = keys
              .map((key) => {
                var _row$key;
                return "'".concat(
                  (_row$key = row[key]) === null || _row$key === void 0
                    ? void 0
                    : _row$key.toString().replace(/'/g, "''"),
                  "'"
                );
              })
              .join(', ');
            stream.write(
              'INSERT INTO '
                .concat(tableName, ' (')
                .concat(keys.join(', '), ') VALUES (')
                .concat(values, ');\n')
            );
          });
        } else {
          stream.write(
            '-- No data available for table '.concat(tableName, '\n')
          );
        }
      };
      for (var tableInfo of tables) {
        yield* _loop();
      }
      stream.end();
      yield streamFinished(stream);
      return backupPath; // Return the path to the created backup file
    } catch (err) {
      console.error('Error during database backup:', err);
      throw err; // Throw error to be handled by route
    } finally {
      if (conn) {
        yield conn.end();
      }
    }
  });
  return function backupDatabase() {
    return _ref.apply(this, arguments);
  };
})();
var backupBackend = (exports.backupBackend = /*#__PURE__*/ (function () {
  var _ref2 = _asyncToGenerator(function* (ws) {
    var rootDir = _path.default.join(_dirname, '../');
    var backupsDir = _path.default.join(rootDir, 'backups');
    if (!_fs.default.existsSync(backupsDir)) {
      _fs.default.mkdirSync(backupsDir, {
        recursive: true,
      });
    }
    var backupFileName = 'backup-'.concat(
      new Date().toISOString().slice(0, 10),
      '.zip'
    );
    var backupPath = _path.default.join(backupsDir, backupFileName);
    var output = _fs.default.createWriteStream(backupPath);
    var archive = (0, _archiver.default)('zip', {
      zlib: {
        level: 9,
      },
    });
    var fileList = [];
    var collectFiles = (dir) => {
      _fs.default.readdirSync(dir).forEach((file) => {
        var fullPath = _path.default.join(dir, file);
        if (fullPath.includes('.env')) {
          // Ensure .env files are included
          fileList.push(fullPath);
        } else if (
          !fullPath.includes('node_modules') &&
          !fullPath.includes('backups')
        ) {
          if (_fs.default.statSync(fullPath).isDirectory()) {
            collectFiles(fullPath);
          } else {
            fileList.push(fullPath);
          }
        }
      });
    };
    collectFiles(rootDir);
    var processedFiles = 0;
    archive.on('entry', (entry) => {
      processedFiles++;
      var progress = Math.round((processedFiles / fileList.length) * 100);
      ws.send(
        JSON.stringify({
          progress,
        })
      );
      /*  console.log(
        `Processed: ${processedFiles}/${fileList.length}, Progress: ${progress}%`
      ); */
    });
    archive.on('warning', (err) => {
      console.warn('Archiver warning: '.concat(err));
    });
    archive.on('error', (err) => {
      console.error('Archiver error: '.concat(err));
      throw err;
    });
    archive.pipe(output);

    // Append files using glob which ensures all files are processed
    archive.glob('**/*', {
      cwd: rootDir,
      ignore: ['node_modules/**', 'backups/**'],
    });

    // Explicitly include specific files if necessary
    archive.file(_path.default.join(rootDir, 'backups/build.zip'), {
      name: 'backups/build.zip',
    });
    yield new Promise((resolve, reject) => {
      output.on('close', () => {
        ws.send(
          JSON.stringify({
            progress: 100,
            message: 'Backup complete',
            path: backupPath,
          })
        );
        resolve();
      });
      output.on('error', reject);
      archive.finalize().catch(reject);
    });
  });
  return function backupBackend(_x) {
    return _ref2.apply(this, arguments);
  };
})());
router.ws(
  '/ws/progress',
  /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(function* (ws, req) {
      try {
        var backupPath = yield backupBackend(ws);
        ws.send(
          JSON.stringify({
            message: 'Backup complete',
            path: backupPath,
          })
        );
      } catch (error) {
        ws.send(
          JSON.stringify({
            error: 'Failed to create backup',
          })
        );
      }
    });
    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  })()
);
router.get(
  '/backend',
  /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(function* (req, res) {
      req.setTimeout(0); // No timeout
      try {
        var backupPath = _path.default.join(
          _dirname,
          '../backups',
          'backup-'.concat(new Date().toISOString().slice(0, 10), '.zip')
        );
        res.setHeader('Content-Type', 'application/zip');
        res.download(backupPath, 'backend-archive.zip', (error) => {
          if (error) {
            console.error('Download failed:', error);
            res.status(500).send('Failed to download backup');
          }
        });
      } catch (error) {
        console.error('Error creating backup:', error);
        res.status(500).send('Failed to create backup');
      }
    });
    return function (_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  })()
);
router.get(
  '/db-backup',
  /*#__PURE__*/ (function () {
    var _ref5 = _asyncToGenerator(function* (req, res) {
      try {
        var backupPath = yield backupDatabase(); // Ensure the backup function returns the file path
        res.download(backupPath); // This sends the file to the client
      } catch (error) {
        console.error('Error during database backup:', error);
        res.status(500).send('Failed to create database backup');
      }
    });
    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  })()
);
var _default = (exports.default = router);
