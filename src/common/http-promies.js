/**
 * @author: Wang Guanghang <guanghangwang@163.com>
 * @description Promise模式HTTP请求组件
 */

import axios from 'axios'
import qs from 'qs'

// 封装axios库
function httpPromies (opts = {}) {
  // axios请求的参数
  const {
    url,
    dataType = 'json',
    timeout = 5000000,
    param = {},
    type = 'post',
    ...other
  } = opts

  // 封装axios，提取公共方法
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: type,
      data: param,
      timeout,
      responseType: dataType,
      transformRequest: [function (data, headers) {
        // 发送请求时候对数据进行处理，解决axios发送post跨域请求时候发送两边问题
        data = qs.stringify(param)

        return data
      }],
      ...other
    }).then(res => {
      const data = res.data
      // 打印请求信息，方便调试
      const style = 'background-color: #174040;color: #ffffff;padding: 5px;border-radius: 5px;'
      console.log('%c' + url, style)
      console.log('%c[Param]', style, param)
      console.log('%c[Response]', style, data)

      if (data.code === -1) {
        console.log('服务器出错，请稍后尝试')
      } else {
        resolve(data)
      }
    }).catch(e => {
      reject(e)
      // this.$alert('数据请求失败，请稍后尝试', '提示')
    })
  })
}

export default httpPromies
