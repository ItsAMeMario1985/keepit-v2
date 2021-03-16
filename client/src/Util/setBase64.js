export default function setBase64(file) {
  return new Promise((res) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      res(reader.result)
    })
    reader.readAsDataURL(file)
  })
}
