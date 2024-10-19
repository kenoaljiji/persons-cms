"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agenda = void 0;
var _agenda = _interopRequireDefault(require("agenda"));
var _personPost = _interopRequireDefault(require("../models/personPost.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_dotenv.default.config();
var agenda = exports.agenda = new _agenda.default({
  db: {
    address: process.env.MONGO_URI,
    // Corrected environment variable access
    collection: 'scheduledJobs'
  }
});
agenda.define('publish work', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (job) {
    var {
      workId
    } = job.attrs.data;
    var personWithWork = yield _personPost.default.findOne({
      'works._id': workId
    });
    if (personWithWork) {
      var work = personWithWork.works.id(workId);
      if (work) {
        work.isPublished = true;
        work.publishTime = 'Now';
        yield personWithWork.save();
        console.log("Work ".concat(workId, " published."));
      }
    }
  });
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
_asyncToGenerator(function* () {
  // IIFE to give access to async/await
  yield agenda.start();
  console.log('Agenda started.');
  // Define other job processing rules here
})();