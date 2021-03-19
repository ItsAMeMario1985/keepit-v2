import Resizer from 'react-image-file-resizer'

export default function resizeImage(file) {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      'webp',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64'
    )
  })
}
