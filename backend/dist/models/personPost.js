"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var {
  Schema
} = _mongoose.default;
var mediaSchema = new Schema({
  images: [{
    url: {
      type: String
    },
    name: {
      type: String
    },
    fileType: {
      type: String
    } // Explicitly defining 'type' as a field
  }],
  audios: [{
    url: {
      type: String
    },
    name: {
      type: String
    },
    fileType: {
      type: String
    }
  }],
  videos: [{
    url: {
      type: String
    },
    name: {
      type: String
    },
    fileType: {
      type: String
    }
  }],
  documents: [{
    url: {
      type: String
    },
    name: {
      type: String
    },
    fileType: {
      type: String
    }
  }]
});
var workSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  publishTime: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: true
  },
  scheduledPublishTime: Date,
  externalSource: String,
  media: [mediaSchema],
  createdBy: String
});
var personDetailsSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  aboutPerson: {
    type: String,
    required: true
  },
  featured: String,
  createdBy: String
}, {
  timestamps: true
});
var personSchema = new Schema({
  person: personDetailsSchema,
  works: [workSchema],
  category: {
    type: String,
    required: true
  },
  visibility: String
});
var Person = _mongoose.default.model('Person', personSchema);
var _default = exports.default = Person;