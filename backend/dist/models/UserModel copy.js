"use strict";

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Images'
  }]
}); // export model user with UserSchema

module.exports = mongoose.model('user', UserSchema);