"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// logger.js

var logger = _winston.default.createLogger({
  level: 'info',
  // Minimalni nivo logiranja
  format: _winston.default.format.combine(_winston.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), _winston.default.format.errors({
    stack: true
  }), _winston.default.format.splat(), _winston.default.format.json()),
  defaultMeta: {
    service: 'user-service'
  },
  transports: [
  //
  // - Write all logs with importance level of `error` or lower to `error.log`
  // - Write all logs with importance level of `info` or lower to `combined.log`
  //
  new _winston.default.transports.File({
    filename: 'error.log',
    level: 'error'
  }), new _winston.default.transports.File({
    filename: 'combined.log'
  })]
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston.default.transports.Console({
    format: _winston.default.format.simple()
  }));
}
var _default = exports.default = logger;