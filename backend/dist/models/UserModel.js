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
  keepits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Keepit'
  }]
}); // export model user with UserSchema

module.exports = mongoose.model('User', UserSchema);