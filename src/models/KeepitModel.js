const mongoose = require('mongoose')

const KeepitSchema = mongoose.Schema({
  userId: {
    type: String,
    default: 0,
  },
  city: {
    type: String,
    default: 0,
  },
  country: {
    type: String,
    default: 0,
  },
  latitude: {
    type: String,
    default: 0,
  },
  longitude: {
    type: String,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: 0,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
})

// export model user with KeepitSchema
module.exports = mongoose.model('Keepit', KeepitSchema)
