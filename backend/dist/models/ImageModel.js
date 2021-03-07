"use strict";

const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}); // export model user with ImageSchema

module.exports = mongoose.model('image', ImageSchema);