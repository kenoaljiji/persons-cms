"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mariadb = _interopRequireDefault(require("mariadb"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
var pool = _mariadb.default.createPool({
  host: process.env.NODE_DB_HOST,
  user: process.env.NODE_DB_USER,
  port: process.env.NODE_DB_PORT,
  password: process.env.NODE_DB_PASS,
  database: process.env.NODE_DB_NAME,
  connectionLimit: 50,
  idleTimeout: 30000,
  // milliseconds
  connectTimeout: 30000 // milliseconds
});
var _default = exports.default = pool;