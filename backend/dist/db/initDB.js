"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTableUsers = void 0;
var _config = _interopRequireDefault(require("./config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createTableUsers = exports.createTableUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var conn;
    try {
      conn = yield _config.default.getConnection();
      var sql = "\n        CREATE TABLE users (\n            id INT AUTO_INCREMENT PRIMARY KEY,\n            firstname VARCHAR(255),\n            lastname VARCHAR(255),\n            nickname VARCHAR(255),\n            username VARCHAR(255) NOT NULL,\n            email VARCHAR(255) NOT NULL UNIQUE,\n            verified BOOLEAN DEFAULT FALSE,\n            password VARCHAR(255) NOT NULL,\n            role ENUM('admin', 'editor', 'user') NOT NULL DEFAULT 'user',\n            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n        );\n        ";
      yield conn.query(sql);
      console.log("Table created successfully!");
    } catch (err) {
      console.error("Failed to create table:", err);
    } finally {
      if (conn) yield conn.end();
    }
  });
  return function createTableUsers() {
    return _ref.apply(this, arguments);
  };
}();

/* CREATE TABLE footer_companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(255),
    description TEXT,
    url VARCHAR(255),
    src VARCHAR(255),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); */

var mysql = require("mysql2/promise");
function initializeDatabase() {
  return _initializeDatabase.apply(this, arguments);
}
/* initializeDatabase(); */
/* CREATE TABLE IF NOT EXISTS works (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_id INT,
    title VARCHAR(255),
    content TEXT,
    publishTime VARCHAR(255),
    isPublished BOOLEAN,
    scheduledPublishTime DATETIME,
    externalSource VARCHAR(255),
    createdBy VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB; -- specifying engine might be important

-- Ensure the media table is defined correctly
CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    work_id INT,
    url VARCHAR(255),
    name VARCHAR(255),
    fileType VARCHAR(255),
    FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE
) ENGINE=InnoDB;  -- specifying engine might be important */
function _initializeDatabase() {
  _initializeDatabase = _asyncToGenerator(function* () {
    var connection = yield mysql.createConnection({
      host: "your_host",
      user: "your_username",
      password: "your_password",
      database: "your_database"
    });
    try {
      // Create the 'persons' table
      yield connection.execute("\n            CREATE TABLE IF NOT EXISTS persons (\n                id INT AUTO_INCREMENT PRIMARY KEY,\n                firstName VARCHAR(255),\n                lastName VARCHAR(255),\n                aboutPerson TEXT,\n                featured VARCHAR(255),\n                createdBy VARCHAR(255),\n                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n            );\n        ");

      // Create the 'works' table
      yield connection.execute("\n            CREATE TABLE IF NOT EXISTS works (\n                id INT AUTO_INCREMENT PRIMARY KEY,\n                person_id INT,\n                title VARCHAR(255),\n                content TEXT,\n                publishTime VARCHAR(255),\n                isPublished BOOLEAN,\n                scheduledPublishTime DATETIME,\n                externalSource VARCHAR(255),\n                createdBy VARCHAR(255),\n                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n                FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE\n            );\n        ");

      // Create the 'media' table
      yield connection.execute("\n            CREATE TABLE IF NOT EXISTS media (\n                id INT AUTO_INCREMENT PRIMARY KEY,\n                work_id INT,\n                url VARCHAR(255),\n                name VARCHAR(255),\n                fileType VARCHAR(255),\n                FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE\n            );\n        ");
      console.log("All tables created or already exist");
    } catch (error) {
      console.error("Error creating tables:", error);
    } finally {
      yield connection.end();
    }
  });
  return _initializeDatabase.apply(this, arguments);
}