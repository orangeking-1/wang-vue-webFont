let [HOSTNAME, PORT, PATH] = ['', '', '']

if (process.env.NODE_ENV === 'production') {
// 正式环境
  PATH = 'https://wangguanghang.com'
  // PATH = 'https://43.138.72.25:3333'
} else if (process.env.NODE_ENV === 'development') {
// 测试本地ip地址
  HOSTNAME = 'http://localhost'
  PORT = '3333'
  PATH = HOSTNAME + ':' + PORT
}
export default {
  HOSTNAME,
  PORT,
  PATH
}
