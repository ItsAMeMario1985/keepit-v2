const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
  keepitId: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Keepit',
  },
})

// export model user with ImageSchema
module.exports = mongoose.model('Image', ImageSchema)
