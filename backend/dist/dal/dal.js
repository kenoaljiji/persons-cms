"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregates = aggregates;
exports.countDocuments = countDocuments;
exports.create = create;
exports.createMany = createMany;
exports.deleteMany = deleteMany;
exports.find = find;
exports.findByID = findByID;
exports.findOne = findOne;
exports.findOneAndDelete = findOneAndDelete;
exports.findOneAndUpdate = findOneAndUpdate;
exports.findOneAndUpsert = findOneAndUpsert;
exports.updateMany = updateMany;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// DAL Functions in ES6 Module Syntax
function create(_x, _x2) {
  return _create.apply(this, arguments);
}
function _create() {
  _create = _asyncToGenerator(function* (model, body) {
    return yield model.create(body);
  });
  return _create.apply(this, arguments);
}
function createMany(_x3, _x4) {
  return _createMany.apply(this, arguments);
}
function _createMany() {
  _createMany = _asyncToGenerator(function* (model, body) {
    return yield model.insertMany(body);
  });
  return _createMany.apply(this, arguments);
}
function find(_x5) {
  return _find.apply(this, arguments);
}
function _find() {
  _find = _asyncToGenerator(function* (model) {
    var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var pagination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var sort = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var projection = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    return yield model.find(filter, projection).sort(sort).skip(pagination.skip).limit(pagination.limit);
  });
  return _find.apply(this, arguments);
}
function findOne(_x6, _x7) {
  return _findOne.apply(this, arguments);
}
function _findOne() {
  _findOne = _asyncToGenerator(function* (model, filter) {
    var projection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return yield model.findOne(filter, projection);
  });
  return _findOne.apply(this, arguments);
}
function findByID(_x8, _x9) {
  return _findByID.apply(this, arguments);
}
function _findByID() {
  _findByID = _asyncToGenerator(function* (model, id) {
    return yield model.findById(id);
  });
  return _findByID.apply(this, arguments);
}
function countDocuments(_x10, _x11) {
  return _countDocuments.apply(this, arguments);
}
function _countDocuments() {
  _countDocuments = _asyncToGenerator(function* (model, filter) {
    return yield model.countDocuments(filter);
  });
  return _countDocuments.apply(this, arguments);
}
function findOneAndUpdate(_x12, _x13, _x14) {
  return _findOneAndUpdate.apply(this, arguments);
}
function _findOneAndUpdate() {
  _findOneAndUpdate = _asyncToGenerator(function* (model, filter, body) {
    return yield model.findOneAndUpdate(filter, body, {
      new: true
    });
  });
  return _findOneAndUpdate.apply(this, arguments);
}
function findOneAndUpsert(_x15, _x16, _x17) {
  return _findOneAndUpsert.apply(this, arguments);
}
function _findOneAndUpsert() {
  _findOneAndUpsert = _asyncToGenerator(function* (model, filter, body) {
    return yield model.findOneAndUpdate(filter, body, {
      new: true,
      upsert: true,
      runValidators: true,
      context: "query",
      setDefaultsOnInsert: true
    });
  });
  return _findOneAndUpsert.apply(this, arguments);
}
function updateMany(_x18, _x19, _x20) {
  return _updateMany.apply(this, arguments);
}
function _updateMany() {
  _updateMany = _asyncToGenerator(function* (model, filter, body) {
    return yield model.updateMany(filter, body, {
      new: true
    });
  });
  return _updateMany.apply(this, arguments);
}
function findOneAndDelete(_x21, _x22) {
  return _findOneAndDelete.apply(this, arguments);
}
function _findOneAndDelete() {
  _findOneAndDelete = _asyncToGenerator(function* (model, filter) {
    return yield model.findOneAndDelete(filter);
  });
  return _findOneAndDelete.apply(this, arguments);
}
function deleteMany(_x23, _x24) {
  return _deleteMany.apply(this, arguments);
}
function _deleteMany() {
  _deleteMany = _asyncToGenerator(function* (model, filter) {
    return yield model.deleteMany(filter);
  });
  return _deleteMany.apply(this, arguments);
}
function aggregates(_x25, _x26) {
  return _aggregates.apply(this, arguments);
}
function _aggregates() {
  _aggregates = _asyncToGenerator(function* (model, query) {
    return yield model.aggregate(query).collation({
      locale: "de",
      strength: 1
    });
  });
  return _aggregates.apply(this, arguments);
}