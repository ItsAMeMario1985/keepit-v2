const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
  keepitId: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  isCustom: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Keepit',
  },
})

// export model user with TagSchema
module.exports = mongoose.model('Tag', TagSchema)
