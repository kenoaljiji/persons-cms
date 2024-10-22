"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../middleware/auth.js");
var _upload = require("../middleware/upload.js");
var _postController = require("../controllers/postController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var router = _express.default.Router();
router.post('/news', _auth.verifyToken, _upload.upload, _postController.addNews);
router.post('/news/delete-multiply', _postController.deleteMultipleNewsPosts);
router.get('/news', _postController.getAllNews);
router.post('/soon', _auth.verifyToken, _upload.upload, _postController.addOrUpdatePagesPost);

// Define the route with id to match only numeric values
router.get('/news/:id(\\d+)', _postController.getNewsById);
router.get('/news/:category', _postController.getNewsByCategory);
/* router.get("/page/:category", getPagePost); */
router.delete('/news/:postId', _postController.deleteNewsPost);
router.put('/news/:id', _upload.upload, _postController.updateNewsById);
var _default = exports.default = router;