import AWS from 'aws-sdk'
import path from 'path'
import fs from 'fs'

const upload = async (filePath) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    var folder = 'imgLokal/'
  } else {
    var folder = 'img/'
  }

  try {
    AWS.config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    })
    var s3 = new AWS.S3()
    var params = {
      Bucket: 'keepitbucket',
      Body: fs.createReadStream(filePath),
      Key: folder + path.basename(filePath),
      ACL: 'public-read',
    }
    s3.upload(params, function (err, data) {
      if (err) {
        console.log('Error', err)
      }
      if (data) {
        console.log('// Image Service -> SendToS3 -> success ->', data.Location)
      }
    })
  } catch (e) {
    return { message: 'Error in saving image' + e }
  }
}

const deleteImg = async (filePath) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    var folder = 'imgLokal/'
  } else {
    var folder = 'img/'
  }
  console.log('S3 -> Try to delete ', filePath)
  try {
    AWS.config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    })
    var s3 = new AWS.S3()
    var params = {
      Bucket: 'keepitbucket',
      Key: folder + path.basename(filePath),
    }
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log('Error', err)
      }
      if (data) {
        console.log('// Image Service -> SendToS3 -> success ->', data)
      }
    })
  } catch (e) {
    return { message: 'Error in saving image' + e }
  }
}

module.exports = {
  upload,
  deleteImg,
}
