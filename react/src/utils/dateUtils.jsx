import { data } from 'jquery'

export default {
  getdate () {
    let date = new Date()
    let newdate =
      date.getFullYear() +
      '-' +
      date.getMonth() +
      '-' +
      date.getDay() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    return newdate
  }
}
