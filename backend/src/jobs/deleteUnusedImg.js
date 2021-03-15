import schedule from 'node-schedule'
import imageService from '../services/image-service'

export default function deleteUnusedImg() {
  const job = schedule.scheduleJob('0 3 * * *', function () {
    imageService.deleteUnused()
  })
}
