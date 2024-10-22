'use strict';

var _express = _interopRequireDefault(require('express'));
var _dotenv = _interopRequireDefault(require('dotenv'));
var _cors = _interopRequireDefault(require('cors'));
var _routes = _interopRequireDefault(require('./routes/routes.js'));
var _config = _interopRequireDefault(require('./db/config.js'));
var _requestIp = _interopRequireDefault(require('request-ip'));
var _path = _interopRequireWildcard(require('path'));
var _url = require('url');
var _winston = _interopRequireDefault(require('winston'));
var _util = require('util');
var _expressWs = _interopRequireDefault(require('express-ws'));
var _fs = _interopRequireDefault(require('fs'));
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
_dotenv.default.config();
var _filename = __filename;
var _dirname = (0, _path.dirname)(_filename);
var readFile = (0, _util.promisify)(_fs.default.readFile);
var logger = _winston.default.createLogger({
  level: 'info',
  format: _winston.default.format.combine(
    _winston.default.format.timestamp(),
    _winston.default.format.json()
  ),
  transports: [
    new _winston.default.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new _winston.default.transports.File({
      filename: 'combined.log',
    }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new _winston.default.transports.Console({
      format: _winston.default.format.simple(),
    })
  );
}
var app = (0, _express.default)();
(0, _expressWs.default)(app);
app.enable('trust proxy');

// Connecting to the database
var connectDB = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      var conn = yield _config.default.getConnection();
      if (conn) {
        conn.release();
      }
    } catch (err) {
      logger.error('Database connection error:', err);
    }
  });
  return function connectDB() {
    return _ref.apply(this, arguments);
  };
})();
connectDB();
var importSQL = /*#__PURE__*/ (function () {
  var _ref2 = _asyncToGenerator(function* () {
    try {
      var conn = yield _config.default.getConnection();
      if (conn) {
        logger.info('MariaDB Connected!');

        // Check if the database is empty
        var rows = yield conn.query('SHOW TABLES');
        if (rows.length === 0) {
          logger.info('Database is empty, importing data...');
          var sqlFilePath = _path.default.resolve(
            _dirname,
            'data',
            'keniba_persons.sql'
          );
          var sql = yield readFile(sqlFilePath, 'utf-8');
          var statements = sql.split(/;\s*$/m);
          for (var statement of statements) {
            if (statement.trim()) {
              yield conn.query(statement);
            }
          }
          logger.info('SQL file imported successfully!');
        } else {
          logger.info('Database is not empty, skipping import.');
        }
        conn.release();
      }
    } catch (err) {
      logger.error('Error importing SQL file:', err);
    }
  });
  return function importSQL() {
    return _ref2.apply(this, arguments);
  };
})();
importSQL();
app.enable('trust proxy');

// CORS middleware setup to allow requests from specified origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_DOMAIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(_requestIp.default.mw());

// Express middleware for parsing requests
app.use(
  _express.default.json({
    limit: '10mb',
  })
);
app.use(
  _express.default.urlencoded({
    limit: '10mb',
  })
);
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_requestIp.default.mw());
// Serve the static files from the React app
app.use(_express.default.static(_path.default.join(_dirname, '../build')));

// API routes

// Serve static files from the public/uploads directory
app.use('/api', _express.default.static('public/works'));
app.use('/api', _express.default.static('public'));

// WebSocket route for backup progress

app.use('/api', _routes.default);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});
var PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  logger.info(
    'Server running in '
      .concat(process.env.NODE_ENV, ' mode on port ')
      .concat(PORT)
  );
});
