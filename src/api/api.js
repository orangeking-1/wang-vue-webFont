// const HOSTNAME = 'http://192.168.1.101'
// const PORT = '3333'
// const PATH = HOSTNAME + ':' + PORT
import config from '../config/config'
let PATH = config.PATH

export default {
  loginUrl: PATH + '/api/login',
  registerUrl: PATH + '/api/register',
  addArticleUrl: PATH + '/api/addArticle',
  getArticleList: PATH + '/api/getArticleList',
  getArticleDetail: PATH + '/api/getArticleDetail',
  deleteArticle: PATH + '/api/deleteArticle',
  editArticleUrl: PATH + '/api/editArticle',
  modifyUserInfoUrl: PATH + '/api/modifyUserInfo',
  addProjectUrl: PATH + '/api/addProject',
  getProjectListUrl: PATH + '/api/getProjectList',
  getProjectDetailUrl: PATH + '/api/getProjectDetail',
  deleteProjectUrl: PATH + '/api/deleteProject',
  editProjectUrl: PATH + '/api/editProject'
}
