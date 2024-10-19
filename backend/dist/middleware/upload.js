"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Set storage engine
var storage = _multer.default.diskStorage({
  destination: './public/uploads/',
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path.default.extname(file.originalname));
  }
});

// Initialize upload
var upload = exports.upload = (0, _multer.default)({
  storage: storage,
  limits: {
    fileSize: 1000000000000000000
  },
  // 1MB for example
  fileFilter: function fileFilter(req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([{
  name: 'images'
}, {
  name: 'videos'
}, {
  name: 'audios'
}, {
  name: 'documents'
}, {
  name: 'featuredImage'
}]);
function checkFileType(file, cb) {
  var filetypes = /jpeg|jpg|png|gif|mp4|avi|mpeg|mp3|wav|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|html|css|js|zip|rar|7z|mov$/i;
  var extname = filetypes.test(_path.default.extname(file.originalname).toLowerCase());
  var mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Files Only!');
  }
}