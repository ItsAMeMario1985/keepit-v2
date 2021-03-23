import AWS from 'aws-sdk'
import path from 'path'
import fs from 'fs'

const upload = async (filePath, userId) => {
  let folder = process.env.amazons3foler

  try {
    AWS.config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    })
    var s3 = new AWS.S3()
    var params = {
      Bucket: 'keepitbucket',
      Body: fs.createReadStream(filePath),
      Key: folder + '/' + userId + '_' + path.basename(filePath),
      ACL: 'public-read',
    }
    s3.upload(params, function (error, data) {
      if (error) {
        console.log('Error', error)
      }
      if (data) {
        console.log('// AWS Service -> SendToS3 -> success ->', data.Location)
      }
    })
  } catch (e) {
    return { message: '‼️ Error in saving image' + e }
  }
}

const deleteImg = async (filePath, userId) => {
  // Define image folder in S3
  let folder = process.env.amazons3foler

  console.log('// Called delete s3 service', filePath)
  try {
    AWS.config.update({
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    })
    var s3 = new AWS.S3()
    var params = {
      Bucket: 'keepitbucket',
      Key: folder + '/' + userId + '_' + path.basename(filePath),
    }
    s3.deleteObject(params, function (error, data) {
      if (error) {
        console.log('Error', error)
      }
      if (data) {
        console.log('// AWS Service -> DeleteFromS3 -> success', data)
      }
    })
  } catch (e) {
    return { message: '‼️ Error in saving image' + e }
  }
}

module.exports = {
  upload,
  deleteImg,
}
