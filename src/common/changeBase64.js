/**
 * @author: Wang Guanghang <guanghangwang@163.com>
 * @description 将图片转成base64
 */

function fileToBase64func (file) {
  const format = file.type === 'image/jpeg' || 'image/png' || 'image/JPG'
  const isLt2M = file.size / 1024 / 1024 < 2

  return new Promise((resolve, reject) => {
    let resData = {
      code: 0,
      data: ''
    }
    if (!format) {
      resData.code = 1
      resData.data = '上传头像图片只能是 JPG，jpeg，png 格式!'
      resolve(resData)
    }
    if (!isLt2M) {
      resData.code = 1
      resData.data = '上传图片大小不能超过 2MB!'
      resolve(resData)
    }

    let fileReader = new FileReader()

    if (file) {
      fileReader.readAsDataURL(file)
    }
    fileReader.onload = () => {
      let base64Str = fileReader.result
      resData.data = base64Str
      resolve(resData)
    }
  })
}

export default fileToBase64func
