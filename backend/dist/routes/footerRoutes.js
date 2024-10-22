"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _footerController = require("../controllers/footerController.js");
var _auth = require("../middleware/auth.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var router = _express.default.Router();
router.get("/", _footerController.getFooterData);

// Route that uses the upload
router.post("/", _auth.verifyToken, (req, res, next) => {
  (0, _footerController.upload)(req, res, function (err) {
    if (err) {
      // Handle errors from Multer here
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    // If everything went fine, move to the next middleware
    next();
  });
}, _footerController.updateFooterConfig);
var _default = exports.default = router;